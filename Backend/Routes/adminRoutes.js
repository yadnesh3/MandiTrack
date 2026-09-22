const express = require("express");
const { protect, adminOnly } = require("../Middleware/authMiddleware");
const { overview, createOfficer, getOfficers } = require("../controllers/adminController");
const router = express.Router();

router.get("/overview", protect, adminOnly, overview);
router.post("/officers", protect, adminOnly, createOfficer);
router.get("/officers", protect, adminOnly, getOfficers);

module.exports = router;
