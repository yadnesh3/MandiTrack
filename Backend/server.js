const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

app.use(express.json());

connectDB();

const authRoutes = require("./Routes/authRoutes");
const lotRoutes = require("./Routes/lotRoutes");
const mandiPriceRoutes = require("./Routes/mandiPriceRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/lots", lotRoutes);
app.use("/api/mandi-prices", mandiPriceRoutes);

app.get("/", (req, res) => {
  res.send("MandiTrack Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});