const express = require("express");

const {
  createLot,
  getMyLots,
  getLotById,
  getAllLots,
  getPendingLots,
  updateLotStatus,
  advanceCheckpoint,
} = require("../controllers/lotController");

const {
  protect,
  farmerOnly,
  officerOrAdmin,
} = require("../Middleware/authMiddleware");

const router = express.Router();

// Farmer routes
router.post("/create", protect, farmerOnly, createLot);
router.get("/my-lots", protect, farmerOnly, getMyLots);

// Review routes — officers do the day-to-day work, admins can step in.
// IMPORTANT: Literal routes MUST come BEFORE /:id
router.get("/all", protect, officerOrAdmin, getAllLots);
router.get("/pending", protect, officerOrAdmin, getPendingLots);

// Single lot details & updates (parameterized routes)
router.get("/:id", protect, getLotById);
router.patch("/:id/status", protect, officerOrAdmin, updateLotStatus);
router.put("/:id/checkpoint", protect, officerOrAdmin, advanceCheckpoint);
router.patch("/:id/checkpoint", protect, officerOrAdmin, advanceCheckpoint);

module.exports = router;