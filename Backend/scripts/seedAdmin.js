/*
 * Creates or promotes the first admin account.
 *
 * Admins cannot sign themselves up through the public form, so the first one
 * has to be made here. Run it from the Backend directory:
 *
 *   node scripts/seedAdmin.js "Name" 9876543210 "a-strong-password"
 *
 * If the mobile already belongs to someone, that account is promoted to admin
 * instead of being duplicated (their password is left alone).
 */

require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const [name, mobile, password] = process.argv.slice(2);

const usage = () => {
  console.error(
    '\nUsage: node scripts/seedAdmin.js "Full Name" <10-digit-mobile> <password>\n'
  );
  process.exit(1);
};

const run = async () => {
  if (!name || !mobile) usage();

  if (!process.env.MONGO_URI) {
    console.error("\nMONGO_URI is not set. Copy .env.example to .env first.\n");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ mobile: mobile.trim() });

  if (existing) {
    if (existing.role === "admin") {
      console.log(`${existing.name} (${existing.mobile}) is already an admin.`);
    } else {
      existing.role = "admin";
      await existing.save();
      console.log(`Promoted ${existing.name} (${existing.mobile}) to admin.`);
    }

    await mongoose.disconnect();
    return;
  }

  if (!password || password.length < 6) {
    console.error("\nA password of at least 6 characters is required.\n");
    await mongoose.disconnect();
    process.exit(1);
  }

  const admin = await User.create({
    name: name.trim(),
    mobile: mobile.trim(),
    password: await bcrypt.hash(password, 10),
    role: "admin",
  });

  console.log(`Created admin ${admin.name} (${admin.mobile}).`);
  await mongoose.disconnect();
};

run().catch(async (err) => {
  console.error("\nSeeding failed:", err.message, "\n");
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
