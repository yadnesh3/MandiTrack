const User = require("../models/User");
const Lot = require("../models/Lot");

const overview = async (_req, res) => {
  try {
    const [
      farmers,
      officers,
      totalLots,
      statusGrouped,
      stageGrouped,
      mandiGrouped,
      recentLots,
      users,
    ] = await Promise.all([
      User.countDocuments({ role: "farmer" }),
      User.countDocuments({ role: "officer" }),
      Lot.countDocuments(),
      Lot.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Lot.aggregate([{ $group: { _id: "$currentStage", count: { $sum: 1 } } }]),
      Lot.aggregate([
        {
          $group: {
            _id: "$mandi",
            totalLots: { $sum: 1 },
            pendingLots: {
              $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
            },
            soldLots: {
              $sum: { $cond: [{ $eq: ["$status", "sold"] }, 1, 0] },
            },
          },
        },
        { $sort: { totalLots: -1 } },
      ]),
      Lot.find({})
        .populate("farmer", "name mobile")
        .sort({ updatedAt: -1 })
        .limit(20),
      User.find({}, "name mobile role mandi createdAt")
        .sort({ createdAt: -1 })
        .limit(100),
    ]);

    const lotStatus = Object.fromEntries(
      statusGrouped.map((item) => [item._id || "pending", item.count])
    );

    const stageStats = Object.fromEntries(
      stageGrouped.map((item) => [item._id || "Queue", item.count])
    );

    res.status(200).json({
      farmers,
      officers,
      lots: totalLots,
      mandisCount: mandiGrouped.length,
      lotStatus,
      stageStats,
      mandiOverview: mandiGrouped,
      recentActivity: recentLots,
      users,
    });
  } catch (error) {
    console.error("Admin overview error:", error);
    res.status(500).json({ message: "Unable to load administration overview." });
  }
};

const bcrypt = require("bcryptjs");
const MOBILE_PATTERN = /^[6-9]\d{9}$/;

// Admin creates an officer account with unique Officer ID and location assignment
const createOfficer = async (req, res) => {
  try {
    const { officerId, name, mobile, password, mandi } = req.body;

    if (!officerId || !name || !mobile || !password || !mandi) {
      return res.status(400).json({
        message: "Officer ID, Full Name, Mobile, Password, and Assigned Mandi are required.",
      });
    }

    const cleanOfficerId = String(officerId).trim().toUpperCase();
    const cleanMobile = String(mobile).trim();
    const cleanName = String(name).trim();
    const cleanMandi = String(mandi).trim();

    if (cleanOfficerId.length < 3) {
      return res.status(400).json({ message: "Officer ID must be at least 3 characters." });
    }

    if (!MOBILE_PATTERN.test(cleanMobile)) {
      return res.status(400).json({ message: "Enter a valid 10-digit mobile number." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    // Check duplicate mobile
    const existingMobile = await User.findOne({ mobile: cleanMobile });
    if (existingMobile) {
      return res.status(400).json({ message: "A user with this mobile number already exists." });
    }

    // Check duplicate officerId
    const existingOfficerId = await User.findOne({ officerId: cleanOfficerId });
    if (existingOfficerId) {
      return res.status(400).json({ message: "This Officer ID is already assigned." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const officer = await User.create({
      officerId: cleanOfficerId,
      name: cleanName,
      mobile: cleanMobile,
      password: hashedPassword,
      role: "officer",
      mandi: cleanMandi,
    });

    res.status(201).json({
      message: `Officer account created successfully with ID: ${cleanOfficerId}`,
      officer: {
        id: officer._id,
        officerId: officer.officerId,
        name: officer.name,
        mobile: officer.mobile,
        role: officer.role,
        mandi: officer.mandi,
        createdAt: officer.createdAt,
      },
    });
  } catch (error) {
    console.error("Create officer error:", error);
    res.status(500).json({ message: "Failed to create officer account." });
  }
};

const getOfficers = async (_req, res) => {
  try {
    const officers = await User.find(
      { role: "officer" },
      "officerId name mobile role mandi createdAt"
    ).sort({ createdAt: -1 });

    res.status(200).json({ officers });
  } catch (error) {
    console.error("Get officers error:", error);
    res.status(500).json({ message: "Failed to fetch officers." });
  }
};

module.exports = { overview, createOfficer, getOfficers };
