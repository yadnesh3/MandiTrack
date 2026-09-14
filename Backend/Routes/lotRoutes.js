const express = require("express");

const {
  createLot,
  getMyLots,
  getAllLots,
  getPendingLots,
  updateLotStatus,
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
router.get("/all", protect, officerOrAdmin, getAllLots);
router.get("/pending", protect, officerOrAdmin, getPendingLots);
router.patch("/:id/status", protect, officerOrAdmin, updateLotStatus);

module.exports = router;