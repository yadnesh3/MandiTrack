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

module.exports = { overview };
