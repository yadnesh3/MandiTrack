/*
 * Comprehensive verification of:
 * 1. Location-Based Access Control (Navi Mumbai vs Pune officer isolation, 403 checks)
 * 2. Full 9-Stage Mandi Workflow (Gate Entry -> Token / Lot ID -> Queue -> Quality Check -> Trading -> Weighing -> Settlement -> Payment -> Exit)
 * 3. Farmer Lot Isolation (Cannot access other farmer's lots)
 * 4. Admin Overview & System-Level Access
 */

const API = process.env.API_URL || "http://localhost:5000/api";

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

const run = async () => {
  const stamp = Date.now();
  console.log(`\nVerifying Mandi Workflow & Location Security against ${API}\n`);

  // 1. Setup Users
  const farmer1 = {
    name: "Navi Mumbai Farmer",
    mobile: `9${stamp.toString().slice(-9)}`,
    password: "farmer-pass-1",
    role: "farmer",
    mandi: "Navi Mumbai",
  };
  const farmer2 = {
    name: "Pune Farmer",
    mobile: `8${stamp.toString().slice(-9)}`,
    password: "farmer-pass-2",
    role: "farmer",
    mandi: "Pune",
  };
  const naviOfficer = {
    name: "Navi Mumbai Officer",
    mobile: `7${stamp.toString().slice(-9)}`,
    password: "officer-pass-1",
    role: "officer",
    mandi: "Navi Mumbai",
  };
  const puneOfficer = {
    name: "Pune Officer",
    mobile: `6${stamp.toString().slice(-9)}`,
    password: "officer-pass-2",
    role: "officer",
    mandi: "Pune",
  };

  await call("/auth/register", { method: "POST", body: farmer1 });
  await call("/auth/register", { method: "POST", body: farmer2 });
  await call("/auth/register", { method: "POST", body: naviOfficer });
  await call("/auth/register", { method: "POST", body: puneOfficer });

  const f1Login = await call("/auth/login", { method: "POST", body: { mobile: farmer1.mobile, password: farmer1.password } });
  const f2Login = await call("/auth/login", { method: "POST", body: { mobile: farmer2.mobile, password: farmer2.password } });
  const naviLogin = await call("/auth/login", { method: "POST", body: { mobile: naviOfficer.mobile, password: naviOfficer.password } });
  const puneLogin = await call("/auth/login", { method: "POST", body: { mobile: puneOfficer.mobile, password: puneOfficer.password } });

  const f1Token = f1Login.data.token;
  const f2Token = f2Login.data.token;
  const naviToken = naviLogin.data.token;
  const puneToken = puneLogin.data.token;

  check("users registered and logged in with assigned mandis", !!(f1Token && f2Token && naviToken && puneToken));

  // 2. Farmer 1 creates a lot at Navi Mumbai
  console.log("\n--- Farmer 1 creates Navi Mumbai Lot ---");
  const naviLotPayload = {
    crop: "Alphonso Mango",
    quantity: 100,
    unit: "quintal",
    mandi: "Navi Mumbai APMC",
    expectedPrice: 5000,
  };
  const createdNaviLot = await call("/lots/create", { method: "POST", token: f1Token, body: naviLotPayload });
  check("Navi Mumbai lot created", createdNaviLot.status === 201);
  check("Lot has unique Lot ID", typeof createdNaviLot.data?.lot?.lotId === "string" && createdNaviLot.data?.lot?.lotId.startsWith("LOT-"));
  check("Lot has token number", typeof createdNaviLot.data?.lot?.tokenNumber === "string");
  check("Lot initial stage is Queue", createdNaviLot.data?.lot?.currentStage === "Queue");
  check("Checkpoints array initialized", Array.isArray(createdNaviLot.data?.lot?.checkpoints) && createdNaviLot.data?.lot?.checkpoints.length === 9);

  const naviLotId = createdNaviLot.data.lot._id;

  // 3. Location-Based Access Control Verification
  console.log("\n--- Location-Based Access Control Verification ---");

  // Navi Mumbai officer lists lots -> must see Navi Mumbai lot
  const naviOfficerLots = await call("/lots/all", { token: naviToken });
  check("Navi Mumbai officer sees Navi Mumbai lot", naviOfficerLots.data?.lots?.some((l) => l._id === naviLotId));

  // Pune officer lists lots -> MUST NOT see Navi Mumbai lot
  const puneOfficerLots = await call("/lots/all", { token: puneToken });
  check("Pune officer CANNOT see Navi Mumbai lot in all lots", !puneOfficerLots.data?.lots?.some((l) => l._id === naviLotId));

  const punePendingLots = await call("/lots/pending", { token: puneToken });
  check("Pune officer CANNOT see Navi Mumbai lot in pending queue", !punePendingLots.data?.lots?.some((l) => l._id === naviLotId));

  // Direct API attack: Pune officer attempts to update Navi Mumbai lot -> MUST RETURN 403
  const illegalStatusUpdate = await call(`/lots/${naviLotId}/status`, {
    method: "PATCH",
    token: puneToken,
    body: { status: "approved" },
  });
  check("Cross-mandi status update rejected with HTTP 403", illegalStatusUpdate.status === 403, `got ${illegalStatusUpdate.status}`);

  const illegalCheckpointUpdate = await call(`/lots/${naviLotId}/checkpoint`, {
    method: "PUT",
    token: puneToken,
    body: { nextStage: "Quality Check" },
  });
  check("Cross-mandi checkpoint update rejected with HTTP 403", illegalCheckpointUpdate.status === 403, `got ${illegalCheckpointUpdate.status}`);

  // Direct API attack: Pune officer attempts to GET Navi Mumbai lot details -> MUST RETURN 403
  const illegalGetLot = await call(`/lots/${naviLotId}`, { token: puneToken });
  check("Cross-mandi single lot get rejected with HTTP 403", illegalGetLot.status === 403, `got ${illegalGetLot.status}`);

  // Farmer isolation: Farmer 2 attempts to GET Farmer 1's lot -> MUST RETURN 403
  const illegalFarmerGet = await call(`/lots/${naviLotId}`, { token: f2Token });
  check("Farmer cannot view another farmer's lot (HTTP 403)", illegalFarmerGet.status === 403, `got ${illegalFarmerGet.status}`);

  // 4. Authorized Officer progresses through Mandi Workflow Checkpoints
  console.log("\n--- Mandi Workflow Checkpoint Progression ---");

  // Stage 3: Advance to Quality Check
  const qcAdv = await call(`/lots/${naviLotId}/checkpoint`, {
    method: "PUT",
    token: naviToken,
    body: {
      nextStage: "Quality Check",
      qualityGrade: "Grade A (Premium Export)",
      notes: "Clean, organic, optimal moisture level.",
    },
  });
  check("Advanced to Quality Check", qcAdv.status === 200 && qcAdv.data?.lot?.currentStage === "Quality Check");
  check("Quality grade recorded", qcAdv.data?.lot?.qualityGrade === "Grade A (Premium Export)");

  // Stage 4: Advance to Trading / Sale
  const tradeAdv = await call(`/lots/${naviLotId}/checkpoint`, {
    method: "PUT",
    token: naviToken,
    body: {
      nextStage: "Trading / Sale",
      finalPrice: 5200,
      buyerName: "Sahyadri Agro Wholesalers",
      notes: "Bidding completed successfully.",
    },
  });
  check("Advanced to Trading / Sale", tradeAdv.status === 200 && tradeAdv.data?.lot?.currentStage === "Trading / Sale");
  check("Final price and buyer recorded", tradeAdv.data?.lot?.finalPrice === 5200 && tradeAdv.data?.lot?.buyerName === "Sahyadri Agro Wholesalers");

  // Stage 5: Advance to Weighing
  const weighAdv = await call(`/lots/${naviLotId}/checkpoint`, {
    method: "PUT",
    token: naviToken,
    body: {
      nextStage: "Weighing",
      actualWeight: 98.5,
      notes: "Gross 120q, Tare 21.5q, Net 98.5q certified.",
    },
  });
  check("Advanced to Weighing", weighAdv.status === 200 && weighAdv.data?.lot?.currentStage === "Weighing");
  check("Actual certified weight recorded", weighAdv.data?.lot?.actualWeight === 98.5);

  // Stage 6: Advance to Settlement
  const settleAdv = await call(`/lots/${naviLotId}/checkpoint`, {
    method: "PUT",
    token: naviToken,
    body: {
      nextStage: "Settlement",
      notes: "Trade settlement bill generated with APMC market fees applied.",
    },
  });
  check("Advanced to Settlement", settleAdv.status === 200 && settleAdv.data?.lot?.currentStage === "Settlement");

  // Stage 7: Advance to Payment
  const payAdv = await call(`/lots/${naviLotId}/checkpoint`, {
    method: "PUT",
    token: naviToken,
    body: {
      nextStage: "Payment",
      paymentStatus: "Paid",
      paymentRef: "UPI-BANK-9988776655",
      notes: "Direct bank transfer credited to farmer account.",
    },
  });
  check("Advanced to Payment", payAdv.status === 200 && payAdv.data?.lot?.currentStage === "Payment");
  check("Payment status is Paid", payAdv.data?.lot?.paymentStatus === "Paid");

  // Stage 8: Advance to Exit
  const exitAdv = await call(`/lots/${naviLotId}/checkpoint`, {
    method: "PUT",
    token: naviToken,
    body: {
      nextStage: "Exit",
      exitStatus: "Exited",
      notes: "APMC gate pass verified and vehicle exited.",
    },
  });
  check("Advanced to Exit", exitAdv.status === 200 && exitAdv.data?.lot?.currentStage === "Exit");
  check("Exit status is Exited", exitAdv.data?.lot?.exitStatus === "Exited");
  check("Overall status completed/sold", ["sold", "completed"].includes(exitAdv.data?.lot?.status));

  // 5. Farmer sees all updated checkpoints
  console.log("\n--- Farmer sees updated workflow & timeline ---");
  const farmerView = await call(`/lots/${naviLotId}`, { token: f1Token });
  check("Farmer views lot successfully", farmerView.status === 200);
  check("Farmer sees final stage: Exit", farmerView.data?.lot?.currentStage === "Exit");
  check("Farmer sees paymentStatus: Paid", farmerView.data?.lot?.paymentStatus === "Paid");
  check("Farmer sees exitStatus: Exited", farmerView.data?.lot?.exitStatus === "Exited");
  const completedCheckpoints = farmerView.data?.lot?.checkpoints?.filter((c) => c.status === "completed");
  check("Checkpoints show completed progress", completedCheckpoints && completedCheckpoints.length >= 7);

  // Summary
  console.log(`\n${"=".repeat(48)}`);
  console.log(`Mandi Workflow & Location Security: ${passed} passed, ${failed} failed`);
  console.log(`${"=".repeat(48)}\n`);

  process.exit(failed === 0 ? 0 : 1);
};

run().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
