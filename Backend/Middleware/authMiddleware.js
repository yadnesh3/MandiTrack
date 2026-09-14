const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Verifies the bearer token AND confirms the user still exists.
 *
 * Verifying the signature alone is not enough: a token issued to an account
 * that has since been deleted stays valid until it expires, so we reload the
 * user on every request and hang the live record off req.user.
 */
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized. Token is required.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Not authorized. This account no longer exists.",
      });
    }

    // Trust the database over the token: if an admin changed someone's role,
    // the old token must not keep the old privileges.
    req.user = {
      id: user._id.toString(),
      name: user.name,
      mobile: user.mobile,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized. Invalid or expired token.",
    });
  }
};

/** Builds a middleware that only lets the listed roles through. */
const allowRoles = (...roles) => {
  const label = roles.map((r) => `${r}s`).join(" or ");

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. ${label.charAt(0).toUpperCase()}${label.slice(1)} only.`,
      });
    }

    next();
  };
};

const farmerOnly = allowRoles("farmer");
const officerOnly = allowRoles("officer");
const adminOnly = allowRoles("admin");

// Officers and admins share the review screens.
const officerOrAdmin = allowRoles("officer", "admin");

module.exports = {
  protect,
  allowRoles,
  farmerOnly,
  officerOnly,
  adminOnly,
  officerOrAdmin,
};