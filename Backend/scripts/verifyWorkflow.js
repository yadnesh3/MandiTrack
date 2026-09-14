/*
 * End-to-end verification of the core MandiTrack workflow:
 *   Farmer registers -> creates a Lot -> Officer sees it -> Officer updates status -> Farmer sees the update
 *
 * Run against a throwaway database, never the production one:
 *   MONGO_URI="mongodb://127.0.0.1:27017/manditrack_e2e" PORT=5050 node server.js
 *   API_URL="http://localhost:5050/api" node scripts/verifyWorkflow.js
 */

const API = process.env.API_URL || "http://localhost:5050/api";

let passed = 0;
let failed = 0;

const check = (label, condition, detail = "") => {
  if (condition) {
    passed += 1;
    console.log(`  PASS  ${label}`);
  } else {
    failed += 1;
    console.log(`  FAIL  ${label}${detail ? ` -> ${detail}` : ""}`);
  }
};

const call = async (path, { method = "GET", token, body } = {}) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  return { status: res.status, data };
};

/**
 * Deletes the account straight out of MongoDB, then replays its still-valid
 * token. Verifying the signature alone would let this through, so this is the
 * check that proves `protect` reloads the user.
 *
 * Skipped when MONGO_URI is not set, since it needs database access.
 */
const checkDeletedUserToken = async (token, mobile) => {
  if (!process.env.MONGO_URI) {
    console.log("  SKIP  deleted-user token rejected (set MONGO_URI to run)");
    return;
  }

  const mongoose = require("mongoose");
  const User = require("../models/User");

  await mongoose.connect(process.env.MONGO_URI);
  const stillWorks = await call("/lots/my-lots", { token });
  check("token works while the account exists", stillWorks.status === 200, `status ${stillWorks.status}`);

  await User.deleteOne({ mobile });

  const afterDelete = await call("/lots/my-lots", { token });
  check("deleted user's token rejected", afterDelete.status === 401, `status ${afterDelete.status}`);

  await mongoose.disconnect();
};

const run = async () => {
  const stamp = Date.now();
  const farmer = { name: "E2E Farmer", mobile: `9${stamp.toString().slice(-9)}`, password: "farmer-pass-1", role: "farmer" };
  const officer = { name: "E2E Officer", mobile: `8${stamp.toString().slice(-9)}`, password: "officer-pass-1", role: "officer" };

  console.log(`\nVerifying core workflow against ${API}\n`);

  // ---- 1. Registration -------------------------------------------------
  console.log("1. Registration");
  const regFarmer = await call("/auth/register", { method: "POST", body: farmer });
  check("farmer registers", regFarmer.status === 201, `status ${regFarmer.status}`);
  check("farmer role persisted", regFarmer.data?.user?.role === "farmer", `got ${regFarmer.data?.user?.role}`);

  const regOfficer = await call("/auth/register", { method: "POST", body: officer });
  check("officer registers", regOfficer.status === 201, `status ${regOfficer.status}`);
  check("officer role persisted", regOfficer.data?.user?.role === "officer", `got ${regOfficer.data?.user?.role}`);

  const dupe = await call("/auth/register", { method: "POST", body: farmer });
  check("duplicate mobile rejected", dupe.status === 400, `status ${dupe.status}`);

  // ---- 2. Login --------------------------------------------------------
  console.log("\n2. Login");
  const farmerLogin = await call("/auth/login", { method: "POST", body: { mobile: farmer.mobile, password: farmer.password } });
  check("farmer logs in", farmerLogin.status === 200, `status ${farmerLogin.status}`);
  check("farmer receives token", typeof farmerLogin.data?.token === "string", "no token");
  const farmerToken = farmerLogin.data?.token;

  const officerLogin = await call("/auth/login", { method: "POST", body: { mobile: officer.mobile, password: officer.password } });
  check("officer logs in", officerLogin.status === 200, `status ${officerLogin.status}`);
  const officerToken = officerLogin.data?.token;

  const badLogin = await call("/auth/login", { method: "POST", body: { mobile: farmer.mobile, password: "wrong" } });
  check("wrong password rejected", badLogin.status === 401, `status ${badLogin.status}`);

  // ---- 3. Farmer creates a lot ----------------------------------------
  console.log("\n3. Farmer creates a lot");
  const lotPayload = { crop: "Wheat (गहू)", quantity: 50, unit: "quintal", mandi: "Pune APMC", expectedPrice: 2400 };
  const created = await call("/lots/create", { method: "POST", token: farmerToken, body: lotPayload });
  check("lot created", created.status === 201, `status ${created.status}`);
  check("lot defaults to pending", created.data?.lot?.status === "pending", `got ${created.data?.lot?.status}`);
  check("lot bound to farmer", !!created.data?.lot?.farmer, "no farmer ref");
  const lotId = created.data?.lot?._id;

  const noAuth = await call("/lots/create", { method: "POST", body: lotPayload });
  check("unauthenticated create rejected", noAuth.status === 401, `status ${noAuth.status}`);

  const officerCreate = await call("/lots/create", { method: "POST", token: officerToken, body: lotPayload });
  check("officer cannot create a lot", officerCreate.status === 403, `status ${officerCreate.status}`);

  // ---- 4. Farmer sees own lot -----------------------------------------
  console.log("\n4. Farmer sees own lot");
  const myLots = await call("/lots/my-lots", { token: farmerToken });
  check("farmer lists own lots", myLots.status === 200, `status ${myLots.status}`);
  check("created lot present", myLots.data?.lots?.some((l) => l._id === lotId), "lot missing");

  // ---- 5. Officer sees the lot ----------------------------------------
  console.log("\n5. Officer sees the lot");
  const allLots = await call("/lots/all", { token: officerToken });
  check("officer lists all lots", allLots.status === 200, `status ${allLots.status}`);
  const officerView = allLots.data?.lots?.find((l) => l._id === lotId);
  check("officer sees farmer's lot", !!officerView, "lot missing");
  check("farmer details populated for officer", !!officerView?.farmer?.name && !!officerView?.farmer?.mobile, "farmer not populated");

  const pending = await call("/lots/pending", { token: officerToken });
  check("officer lists pending lots", pending.status === 200, `status ${pending.status}`);
  check("new lot is in pending queue", pending.data?.lots?.some((l) => l._id === lotId), "lot missing from queue");

  const farmerPeek = await call("/lots/all", { token: farmerToken });
  check("farmer cannot list all lots", farmerPeek.status === 403, `status ${farmerPeek.status}`);

  // ---- 6. Officer updates status --------------------------------------
  console.log("\n6. Officer updates status");
  const approve = await call(`/lots/${lotId}/status`, { method: "PATCH", token: officerToken, body: { status: "approved" } });
  check("officer approves lot", approve.status === 200, `status ${approve.status}`);
  check("status is approved", approve.data?.lot?.status === "approved", `got ${approve.data?.lot?.status}`);

  const farmerUpdate = await call(`/lots/${lotId}/status`, { method: "PATCH", token: farmerToken, body: { status: "sold" } });
  check("farmer cannot update status", farmerUpdate.status === 403, `status ${farmerUpdate.status}`);

  const badStatus = await call(`/lots/${lotId}/status`, { method: "PATCH", token: officerToken, body: { status: "banana" } });
  check("invalid status rejected", badStatus.status === 400, `status ${badStatus.status}`);

  // ---- 7. Farmer sees the update (the loop closes) ---------------------
  console.log("\n7. Farmer sees the update");
  const afterApproval = await call("/lots/my-lots", { token: farmerToken });
  const farmerSees = afterApproval.data?.lots?.find((l) => l._id === lotId);
  check("farmer sees approved status", farmerSees?.status === "approved", `got ${farmerSees?.status}`);

  const sold = await call(`/lots/${lotId}/status`, { method: "PATCH", token: officerToken, body: { status: "sold" } });
  check("officer marks lot sold", sold.data?.lot?.status === "sold", `got ${sold.data?.lot?.status}`);

  const afterSold = await call("/lots/my-lots", { token: farmerToken });
  const finalView = afterSold.data?.lots?.find((l) => l._id === lotId);
  check("farmer sees sold status", finalView?.status === "sold", `got ${finalView?.status}`);

  const gonePending = await call("/lots/pending", { token: officerToken });
  check("sold lot left the pending queue", !gonePending.data?.lots?.some((l) => l._id === lotId), "still pending");

  // ---- 8. Auth hardening ----------------------------------------------
  console.log("\n8. Auth hardening");

  const me = await call("/auth/me", { token: farmerToken });
  check("/auth/me returns the current user", me.status === 200 && me.data?.user?.mobile === farmer.mobile, `status ${me.status}`);
  check("/auth/me never leaks the password hash", me.data?.user?.password === undefined, "password present");
  check("login response never leaks the password hash", farmerLogin.data?.user?.password === undefined, "password present");

  const meNoToken = await call("/auth/me");
  check("/auth/me rejects a missing token", meNoToken.status === 401, `status ${meNoToken.status}`);

  const meBadToken = await call("/auth/me", { token: "not.a.real.token" });
  check("/auth/me rejects a malformed token", meBadToken.status === 401, `status ${meBadToken.status}`);

  const shortMobile = await call("/auth/register", { method: "POST", body: { ...farmer, mobile: "12345" } });
  check("short mobile rejected", shortMobile.status === 400, `status ${shortMobile.status}`);

  const badPrefixMobile = await call("/auth/register", { method: "POST", body: { ...farmer, mobile: "1234567890" } });
  check("mobile not starting 6-9 rejected", badPrefixMobile.status === 400, `status ${badPrefixMobile.status}`);

  const weakPassword = await call("/auth/register", { method: "POST", body: { ...farmer, mobile: `7${stamp.toString().slice(-9)}`, password: "123" } });
  check("weak password rejected", weakPassword.status === 400, `status ${weakPassword.status}`);

  const shortName = await call("/auth/register", { method: "POST", body: { ...farmer, mobile: `7${stamp.toString().slice(-9)}`, name: "A" } });
  check("one-character name rejected", shortName.status === 400, `status ${shortName.status}`);

  const selfAdmin = await call("/auth/register", { method: "POST", body: { ...farmer, mobile: `7${stamp.toString().slice(-9)}`, role: "admin" } });
  check("admin self-registration blocked", selfAdmin.status === 403, `status ${selfAdmin.status}`);

  // A token for an account that has since been deleted must stop working.
  await checkDeletedUserToken(farmerToken, farmer.mobile);

  // ---- Summary ---------------------------------------------------------
  console.log(`\n${"-".repeat(48)}`);
  console.log(`  ${passed} passed, ${failed} failed`);
  console.log(`${"-".repeat(48)}\n`);

  process.exit(failed === 0 ? 0 : 1);
};

run().catch((err) => {
  console.error("\nVerification crashed:", err.message);
  process.exit(1);
});
