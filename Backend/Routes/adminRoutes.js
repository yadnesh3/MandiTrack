const express = require("express");
const { protect, adminOnly } = require("../Middleware/authMiddleware");
const { overview } = require("../controllers/adminController");
const router = express.Router();
router.get("/overview", protect, adminOnly, overview);
module.exports = router;
