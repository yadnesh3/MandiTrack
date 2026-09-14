const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");

const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

// The end-to-end verification script hammers these endpoints on purpose.
// Let it opt out rather than making the real limits uselessly loose.
const rateLimitDisabled =
  process.env.DISABLE_RATE_LIMIT === "1" || process.env.NODE_ENV === "test";

const makeLimiter = ({ windowMs, limit, message }) =>
  rateLimit({
    windowMs,
    limit,
    skip: () => rateLimitDisabled,
    standardHeaders: true,
    legacyHeaders: false,
    // Count only failed attempts, so someone logging in normally on a shared
    // village connection is not locked out by their neighbours.
    skipSuccessfulRequests: true,
    handler: (req, res) => res.status(429).json({ message }),
  });

const loginLimiter = makeLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: "Too many login attempts. Please try again in 15 minutes.",
});

const registerLimiter = makeLimiter({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  message: "Too many accounts created from this device. Try again later.",
});

router.post("/register", registerLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);
router.get("/me", protect, getMe);

module.exports = router;
