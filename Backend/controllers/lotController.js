const mongoose = require("mongoose");
const Lot = require("../models/Lot");
const { MANDI_STAGES } = require("../models/Lot");

// Normalize mandi name for location comparison
const normalizeMandi = (name) => {
  if (!name) return "";
  return name.toLowerCase().replace(/\s*apmc\s*/g, "").replace(/\s*market\s*/g, "").trim();
};

// Check if two mandi names refer to the same APMC market
const isMandiMatch = (m1, m2) => {
  if (!m1 || !m2) return false;
  const n1 = normalizeMandi(m1);
  const n2 = normalizeMandi(m2);
  return n1.includes(n2) || n2.includes(n1);
};

// Build MongoDB regex query for an officer's mandi
const buildMandiQuery = (mandiName) => {
  if (!mandiName || !mandiName.trim()) return {};
  const clean = normalizeMandi(mandiName);
  return { mandi: new RegExp(clean, "i") };
};

// Generate unique Lot ID
const generateLotId = async (mandi) => {
  const year = new Date().getFullYear();
  let uniqueId = "";
  let exists = true;
  while (exists) {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    uniqueId = `LOT-${year}-${randomNum}`;
    exists = await Lot.findOne({ lotId: uniqueId });
  }
  return uniqueId;
};

// 1. Create a new produce lot (Farmer only)
const createLot = async (req, res) => {
  try {
    const { crop, quantity, unit, mandi, expectedPrice } = req.body;

    if (!crop || !quantity || !mandi || expectedPrice === undefined) {
      return res.status(400).json({
        message: "Crop, quantity, mandi and expected price are required",
      });
    }

    if (
      typeof crop !== "string" ||
      typeof mandi !== "string" ||
      !Number.isFinite(Number(quantity)) ||
      Number(quantity) <= 0 ||
      !Number.isFinite(Number(expectedPrice)) ||
      Number(expectedPrice) < 0
    ) {
      return res.status(400).json({ message: "Please enter valid produce details." });
    }

    // Generate unique lot ID and token
    const lotId = await generateLotId(mandi);
    const tokenNumber = `TK-${Math.floor(1000 + Math.random() * 9000)}`;

    // Calculate queue number for this mandi
    const mandiQuery = buildMandiQuery(mandi);
    const activeLotsCount = await Lot.countDocuments({
      ...mandiQuery,
      status: { $nin: ["sold", "rejected", "completed"] },
    });
    const queueNumber = activeLotsCount + 1;

    const lot = new Lot({
      farmer: req.user.id,
      lotId,
      tokenNumber,
      queueNumber,
      crop: crop.trim(),
      quantity: Number(quantity),
      unit: unit ? (unit.toLowerCase() === "quintal" ? "Quintal" : unit.toLowerCase() === "ton" ? "Ton" : "kg") : "kg",
      mandi: mandi.trim(),
      expectedPrice: Number(expectedPrice),
      status: "pending",
      currentStage: "Queue",
      currentStageIndex: 2,
    });

    lot.initCheckpoints("APMC Gate Security");
    await lot.save();
    await lot.populate("farmer", "name mobile");

    res.status(201).json({
      message: "Lot created successfully",
      lot,
    });
  } catch (error) {
    console.error("Error creating lot:", error);
    res.status(500).json({
      message: "Failed to create lot",
      error: error.message,
    });
  }
};

// 2. Get lots submitted by the authenticated farmer
const getMyLots = async (req, res) => {
  try {
    const lots = await Lot.find({
      farmer: req.user.id,
    })
      .populate("farmer", "name mobile")
      .sort({ createdAt: -1 });

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

// 3. Get single lot with location & ownership security
const getLotById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Lot not found" });
    }
    const lot = await Lot.findById(id).populate("farmer", "name mobile");

    if (!lot) {
      return res.status(404).json({ message: "Lot not found" });
    }

    // Farmer authorization check: farmers can only see their own lots
    if (req.user.role === "farmer" && lot.farmer._id.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied. You can only view your own lots.",
      });
    }

    // Officer location authorization check: officers can only see lots for their assigned mandi
    if (req.user.role === "officer" && req.user.mandi && !isMandiMatch(lot.mandi, req.user.mandi)) {
      return res.status(403).json({
        message: `Access denied. You are assigned to ${req.user.mandi} APMC and cannot access lots from ${lot.mandi}.`,
      });
    }

    res.status(200).json({ lot });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lot details" });
  }
};

// 4. Get all lots (Officer restricted by mandi; Admin sees all)
const getAllLots = async (req, res) => {
  try {
    let query = {};

    // LOCATION-BASED RESTRICTION FOR OFFICERS
    if (req.user.role === "officer" && req.user.mandi) {
      query = buildMandiQuery(req.user.mandi);
    } else if (req.user.role === "admin" && req.query.mandi) {
      query = buildMandiQuery(req.query.mandi);
    }

    const lots = await Lot.find(query)
      .populate("farmer", "name mobile")
      .sort({ createdAt: -1 });

    // Flag delayed lots (created > 2h ago and still pending or in queue)
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const enrichedLots = lots.map((l) => {
      const isDelayed =
        (l.status === "pending" || l.currentStage === "Queue" || l.currentStage === "Quality Check") &&
        new Date(l.createdAt) < twoHoursAgo;
      return {
        ...l.toObject(),
        delayed: l.delayed || isDelayed,
      };
    });

    res.status(200).json({
      message: "All lots fetched successfully",
      count: enrichedLots.length,
      lots: enrichedLots,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch all lots",
    });
  }
};

// 5. Get pending lots (Officer restricted by mandi; Admin sees all)
const getPendingLots = async (req, res) => {
  try {
    let query = { status: "pending" };

    // LOCATION-BASED RESTRICTION FOR OFFICERS
    if (req.user.role === "officer" && req.user.mandi) {
      query = {
        ...query,
        ...buildMandiQuery(req.user.mandi),
      };
    } else if (req.user.role === "admin" && req.query.mandi) {
      query = {
        ...query,
        ...buildMandiQuery(req.query.mandi),
      };
    }

    const lots = await Lot.find(query)
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

// 6. Update lot status (Backward compatibility & stage synchronization)
const updateLotStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Lot not found" });
    }

    const allowedStatuses = ["pending", "approved", "rejected", "sold", "completed"];

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

    // LOCATION-BASED ACCESS CONTROL:
    // If officer is updating, they MUST belong to the lot's mandi
    if (req.user.role === "officer" && req.user.mandi && !isMandiMatch(lot.mandi, req.user.mandi)) {
      return res.status(403).json({
        message: `Access denied. You are assigned to ${req.user.mandi} APMC and cannot modify lots from ${lot.mandi}.`,
      });
    }

    lot.status = status;

    // Synchronize stages with status
    if (status === "approved") {
      if (lot.currentStageIndex < 3) {
        lot.currentStage = "Quality Check";
        lot.currentStageIndex = 3;
      }
    } else if (status === "sold" || status === "completed") {
      lot.currentStage = "Payment";
      lot.currentStageIndex = 7;
      lot.paymentStatus = "Paid";
      // Mark up to Payment as completed
      if (lot.checkpoints && lot.checkpoints.length) {
        lot.checkpoints.forEach((cp, idx) => {
          if (idx <= 7) {
            cp.status = "completed";
            if (!cp.timestamp) cp.timestamp = new Date();
          }
        });
      }
    } else if (status === "rejected") {
      lot.currentStage = "Exit";
      lot.currentStageIndex = 8;
      lot.exitStatus = "Gate Pass Issued";
    }

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

// 7. Advance checkpoint / Mandi workflow stage (Officer only, location restricted)
const advanceCheckpoint = async (req, res) => {
  try {
    const { id } = req.params;
    let {
      nextStage,
      qualityGrade,
      actualWeight,
      finalPrice,
      buyerName,
      paymentStatus,
      paymentRef,
      exitStatus,
      notes,
    } = req.body;

    const lot = await Lot.findById(id);
    if (!lot) {
      return res.status(404).json({ message: "Lot not found" });
    }

    // LOCATION-BASED ACCESS CONTROL:
    if (req.user.role === "officer" && req.user.mandi && !isMandiMatch(lot.mandi, req.user.mandi)) {
      return res.status(403).json({
        message: `Access denied. You are assigned to ${req.user.mandi} APMC and cannot manage lots from ${lot.mandi}.`,
      });
    }

    // Ensure checkpoints are fully initialized if missing or incomplete
    if (!lot.checkpoints || lot.checkpoints.length < MANDI_STAGES.length) {
      const existing = lot.checkpoints || [];
      lot.checkpoints = MANDI_STAGES.map((stage, idx) => {
        const found = existing.find((c) => c.stageIndex === idx || c.stage === stage);
        if (found) return found;
        return {
          stage,
          stageIndex: idx,
          status: idx < lot.currentStageIndex ? "completed" : idx === lot.currentStageIndex ? "current" : "pending",
          timestamp: idx <= lot.currentStageIndex ? new Date() : null,
          officerName: req.user.name || "APMC Officer",
          officerId: req.user.id || null,
          notes: "",
        };
      });
    }

    // Normalize nextStage alias
    if (nextStage) {
      if (nextStage.toLowerCase() === "trading") {
        nextStage = "Trading / Sale";
      } else if (nextStage.toLowerCase().includes("token")) {
        nextStage = "Token / Lot ID";
      }
    }

    // Determine target stage index
    let targetIndex = lot.currentStageIndex + 1;
    if (nextStage) {
      const idx = MANDI_STAGES.findIndex(
        (s) => s.toLowerCase() === nextStage.toLowerCase()
      );
      if (idx !== -1) targetIndex = idx;
    }

    if (targetIndex >= MANDI_STAGES.length) {
      targetIndex = MANDI_STAGES.length - 1;
    }

    const stageName = MANDI_STAGES[targetIndex];

    // Mark all prior checkpoints as completed
    lot.checkpoints.forEach((cp) => {
      if (cp.stageIndex < targetIndex) {
        cp.status = "completed";
        if (!cp.timestamp) cp.timestamp = new Date();
        if (!cp.officerName) cp.officerName = req.user.name;
        if (!cp.officerId) cp.officerId = req.user.id;
      } else if (cp.stageIndex === targetIndex) {
        cp.status =
          targetIndex === MANDI_STAGES.length - 1 && exitStatus === "Exited"
            ? "completed"
            : "current";
        cp.timestamp = new Date();
        cp.officerName = req.user.name;
        cp.officerId = req.user.id;
        if (notes) cp.notes = notes;
      } else {
        cp.status = "pending";
      }
    });

    lot.currentStageIndex = targetIndex;
    lot.currentStage = stageName;

    // Apply stage outcome data
    if (qualityGrade) lot.qualityGrade = qualityGrade;
    if (actualWeight !== undefined && actualWeight !== null && actualWeight !== "") {
      lot.actualWeight = Number(actualWeight);
    }
    if (finalPrice !== undefined && finalPrice !== null && finalPrice !== "") {
      lot.finalPrice = Number(finalPrice);
      const wt = lot.actualWeight || lot.quantity;
      lot.totalAmount = wt * Number(finalPrice);
    }
    if (buyerName) lot.buyerName = buyerName;
    if (paymentStatus) lot.paymentStatus = paymentStatus;
    if (paymentRef) lot.paymentRef = paymentRef;
    if (exitStatus) {
      lot.exitStatus = exitStatus;
      if (exitStatus === "Exited") lot.exitTime = new Date();
    }

    // Status sync with workflow
    if (targetIndex >= 3 && lot.status === "pending") {
      lot.status = "approved";
    }
    if (targetIndex >= 4 && lot.status !== "completed") {
      lot.status = "sold";
    }
    if (targetIndex === MANDI_STAGES.length - 1 && lot.exitStatus === "Exited") {
      lot.status = "completed";
    }

    await lot.save();
    await lot.populate("farmer", "name mobile");

    res.status(200).json({
      message: `Lot advanced to stage: ${stageName}`,
      lot,
    });
  } catch (error) {
    console.error("Error advancing lot checkpoint:", error);
    res.status(500).json({ message: "Failed to advance lot checkpoint" });
  }
};

module.exports = {
  createLot,
  getMyLots,
  getLotById,
  getAllLots,
  getPendingLots,
  updateLotStatus,
  advanceCheckpoint,
};
