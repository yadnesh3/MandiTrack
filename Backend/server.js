const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Refuse to start rather than signing tokens with `undefined`, which would
// make every token forgeable.
if (!process.env.JWT_SECRET) {
  console.error(
    "\nFATAL: JWT_SECRET is not set.\n" +
      "Copy Backend/.env.example to Backend/.env and generate a secret with:\n" +
      '  node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"\n'
  );
  process.exit(1);
}

if (process.env.JWT_SECRET.length < 32) {
  console.warn(
    "WARNING: JWT_SECRET is shorter than 32 characters. Use a longer random secret."
  );
}

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "https://mandi-track.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("CORS blocked:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json({ limit: "100kb" }));

connectDB();

const authRoutes = require("./Routes/authRoutes");
const lotRoutes = require("./Routes/lotRoutes");
const mandiPriceRoutes = require("./Routes/mandiPriceRoutes");
const adminRoutes = require("./Routes/adminRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/lots", lotRoutes);
app.use("/api/mandi-prices", mandiPriceRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("MandiTrack Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});