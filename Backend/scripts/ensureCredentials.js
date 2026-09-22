require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    // 1. Admin Account
    const adminMobile = "9876500001";
    const adminPass = "admin123";
    const adminHashed = await bcrypt.hash(adminPass, 10);

    const admin = await User.findOneAndUpdate(
      { mobile: adminMobile },
      {
        name: "Mandi Administrator",
        mobile: adminMobile,
        password: adminHashed,
        role: "admin",
        mandi: "Pune APMC",
      },
      { upsert: true, new: true }
    );
    console.log("Admin account configured:", admin.mobile);

    // 2. Officer Account (Matching Reference Dashboard: Sandeep Shinde)
    const officerMobile = "9876500002";
    const officerId = "OFF-PUN-01";
    const officerPass = "officer123";
    const officerHashed = await bcrypt.hash(officerPass, 10);

    const officer = await User.findOneAndUpdate(
      { mobile: officerMobile },
      {
        name: "Sandeep Shinde",
        mobile: officerMobile,
        officerId: officerId,
        password: officerHashed,
        role: "officer",
        mandi: "Pune APMC",
      },
      { upsert: true, new: true }
    );
    console.log("Officer account configured:", officer.officerId, officer.mobile);

    // 3. Farmer Account (Ramesh Patil)
    const farmerMobile = "9876500003";
    const farmerPass = "farmer123";
    const farmerHashed = await bcrypt.hash(farmerPass, 10);

    const farmer = await User.findOneAndUpdate(
      { mobile: farmerMobile },
      {
        name: "Ramesh Patil",
        mobile: farmerMobile,
        password: farmerHashed,
        role: "farmer",
        mandi: "Pune APMC",
      },
      { upsert: true, new: true }
    );
    console.log("Farmer account configured:", farmer.mobile);

    await mongoose.disconnect();
    console.log("Done.");
  } catch (err) {
    console.error("Error setting up credentials:", err);
    process.exit(1);
  }
}

main();
