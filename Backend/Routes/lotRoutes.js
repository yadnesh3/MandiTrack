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
  officerOnly,
} = require("../Middleware/authMiddleware");

const router = express.Router();

// Farmer routes
router.post("/create", protect, farmerOnly, createLot);
router.get("/my-lots", protect, farmerOnly, getMyLots);

// Officer routes
router.get("/all", protect, officerOnly, getAllLots);
router.get("/pending", protect, officerOnly, getPendingLots);
router.patch("/:id/status", protect, officerOnly, updateLotStatus);

module.exports = router;