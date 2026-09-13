const express = require("express");
const { getMandiPrices } = require("../controllers/mandiPriceController");

const router = express.Router();

// Public endpoint for Mandi Market Prices
router.get("/", getMandiPrices);

module.exports = router;
