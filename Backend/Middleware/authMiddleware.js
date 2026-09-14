const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized. Token is required.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized. Invalid or expired token.",
    });
  }
};

const farmerOnly = (req, res, next) => {
  if (req.user.role !== "farmer") {
    return res.status(403).json({
      message: "Access denied. Farmers only.",
    });
  }

  next();
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied. Administrators only." });
  next();
};

const officerOnly = (req, res, next) => {
  if (req.user.role !== "officer") {
    return res.status(403).json({
      message: "Access denied. Officers only.",
    });
  }

  next();
};

module.exports = {
  protect,
  farmerOnly,
  officerOnly,
  adminOnly,
};
