const express = require("express");
const rateLimit = require("express-rate-limit");
const { chat } = require("../controllers/chatController");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.DISABLE_RATE_LIMIT === "1" || process.env.NODE_ENV === "test",
  handler: (req, res) =>
    res.status(429).json({
      message: "Too many chat requests. Please try again in a few minutes.",
    }),
});

router.post("/", protect, chatLimiter, chat);

module.exports = router;
