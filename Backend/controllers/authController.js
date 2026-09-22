const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const MOBILE_PATTERN = /^[6-9]\d{9}$/;
const MIN_PASSWORD_LENGTH = 6;

// Roles a visitor is allowed to pick for themselves. "officer" and "admin"
// are strictly prohibited — officers are created exclusively by administrators,
// and admins are provisioned by seed scripts or system admin.
const SELF_SERVICE_ROLES = ["farmer"];

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  mobile: user.mobile,
  role: user.role,
  mandi: user.mandi || "",
  officerId: user.officerId || "",
});

/** Returns an error string, or null when the input is usable. */
const validateCredentials = ({ name, mobile, password }) => {
  if (typeof name !== "string" || name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }

  if (name.trim().length > 60) {
    return "Name must be 60 characters or fewer";
  }

  if (!MOBILE_PATTERN.test(String(mobile).trim())) {
    return "Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9";
  }

  if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }

  if (password.length > 128) {
    return "Password must be 128 characters or fewer";
  }

  return null;
};

const registerUser = async (req, res) => {
  try {
    const { name, mobile, password, role, mandi } = req.body;

    if (!name || !mobile || !password) {
      return res.status(400).json({
        message: "Name, mobile and password are required",
      });
    }

    const validationError = validateCredentials({ name, mobile, password });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const requestedRole = role || "farmer";

    if (!SELF_SERVICE_ROLES.includes(requestedRole)) {
      return res.status(403).json({
        message:
          "Officer IDs and accounts must be created directly by the Mandi Administrator. Normal users cannot register as officers.",
      });
    }

    const cleanMobile = String(mobile).trim();
    const existingUser = await User.findOne({ mobile: cleanMobile });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      mobile: cleanMobile,
      password: hashedPassword,
      role: requestedRole,
      mandi: typeof mandi === "string" ? mandi.trim() : "",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: publicUser(user),
    });
  } catch (error) {
    // A duplicate key can still slip past the findOne above if two requests
    // race each other; the unique index is the real guard.
    if (error.code === 11000) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({
      message: "Registration failed",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { mobile, officerId, password } = req.body;
    const identifier = (mobile || officerId || "").toString().trim();

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Mobile number / Officer ID and password are required",
      });
    }

    // Support logging in with 10-digit mobile number OR unique Officer ID
    const query = MOBILE_PATTERN.test(identifier)
      ? { mobile: identifier }
      : {
          $or: [
            { mobile: identifier },
            { officerId: identifier.toUpperCase() },
            { officerId: identifier },
          ],
        };

    // password is select:false on the schema, so ask for it explicitly.
    const user = await User.findOne(query).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials. Please check your mobile/officer ID and password.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid credentials. Please check your mobile/officer ID and password.",
      });
    }

    res.status(200).json({
      message: "Login successful",
      token: signToken(user),
      user: publicUser(user),
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
    });
  }
};

/**
 * Lets the frontend check a token it restored from localStorage before it
 * renders a dashboard, instead of discovering the token is stale on the
 * first data request.
 */
const getMe = async (req, res) => {
  res.status(200).json({
    user: {
      id: req.user.id,
      name: req.user.name,
      mobile: req.user.mobile,
      role: req.user.role,
      mandi: req.user.mandi || "",
      officerId: req.user.officerId || "",
    },
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};