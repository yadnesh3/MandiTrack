const User = require("../models/User");
const Lot = require("../models/Lot");

const overview = async (_req, res) => {
  try {
    const [farmers, officers, lots, grouped, users] = await Promise.all([
      User.countDocuments({ role: "farmer" }), User.countDocuments({ role: "officer" }), Lot.countDocuments(),
      Lot.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      User.find({}, "name mobile role createdAt").sort({ createdAt: -1 }).limit(100),
    ]);
    res.json({ farmers, officers, lots, lotStatus: Object.fromEntries(grouped.map((item) => [item._id, item.count])), users });
  } catch (_) { res.status(500).json({ message: "Unable to load administration overview." }); }
};
module.exports = { overview };
