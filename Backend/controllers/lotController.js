const Lot = require("../models/Lot");

const createLot = async (req, res) => {
  try {
    const {
      crop,
      quantity,
      unit,
      mandi,
      expectedPrice,
    } = req.body;

    if (!crop || !quantity || !mandi || expectedPrice === undefined) {
      return res.status(400).json({
        message: "Crop, quantity, mandi and expected price are required",
      });
    }

    if (typeof crop !== "string" || typeof mandi !== "string" || !Number.isFinite(Number(quantity)) || Number(quantity) <= 0 || !Number.isFinite(Number(expectedPrice)) || Number(expectedPrice) < 0) {
      return res.status(400).json({ message: "Please enter valid produce details." });
    }

    const lot = await Lot.create({
      farmer: req.user.id,
      crop,
      quantity,
      unit,
      mandi,
      expectedPrice,
    });

    res.status(201).json({
      message: "Lot created successfully",
      lot,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create lot",
    });
  }
};

const getMyLots = async (req, res) => {
  try {
    const lots = await Lot.find({
      farmer: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Lots fetched successfully",
      count: lots.length,
      lots,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch lots",
    });
  }
};

const getAllLots = async (req, res) => {
  try {
    const lots = await Lot.find()
      .populate("farmer", "name mobile")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All lots fetched successfully",
      count: lots.length,
      lots,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch all lots",
    });
  }
};

const getPendingLots = async (req, res) => {
  try {
    const lots = await Lot.find({ status: "pending" })
      .populate("farmer", "name mobile")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Pending lots fetched successfully",
      count: lots.length,
      lots,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch pending lots",
    });
  }
};

const updateLotStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["pending", "approved", "rejected", "sold"];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    const lot = await Lot.findById(id);

    if (!lot) {
      return res.status(404).json({
        message: "Lot not found",
      });
    }

    lot.status = status;
    await lot.save();
    await lot.populate("farmer", "name mobile");

    res.status(200).json({
      message: `Lot status updated to ${status} successfully`,
      lot,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update lot status",
    });
  }
};

module.exports = {
  createLot,
  getMyLots,
  getAllLots,
  getPendingLots,
  updateLotStatus,
};
