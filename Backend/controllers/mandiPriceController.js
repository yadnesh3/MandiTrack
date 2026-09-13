const https = require("https");

// Controller to fetch live/open market prices from Agmarknet (data.gov.in)
const getMandiPrices = async (req, res) => {
  try {
    const apiKey = process.env.DATA_GOV_API_KEY || "579b464db66ec23bdd000001cdd3946368fd46334d9659e7b87f3bc5";
    const resourceId = "9ef0be3a-08d4-458b-a3a3-a7787b2e4509";
    const apiUrl = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=60`;

    const request = https.get(apiUrl, { timeout: 8000 }, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        try {
          if (response.statusCode !== 200) {
            return res.status(503).json({
              success: false,
              message: "Market price data is currently unavailable.",
              source: "Ministry of Agriculture and Farmers Welfare (Agmarknet / data.gov.in)",
            });
          }

          const parsed = JSON.parse(data);

          if (!parsed.records || !Array.isArray(parsed.records) || parsed.records.length === 0) {
            return res.status(200).json({
              success: false,
              message: "Market price data is currently unavailable.",
              source: "Ministry of Agriculture and Farmers Welfare (Agmarknet / data.gov.in)",
            });
          }

          const records = parsed.records.map((rec) => ({
            crop: rec.commodity || "N/A",
            variety: rec.variety || "Standard",
            mandi: rec.market || "APMC Market",
            district: rec.district || "",
            state: rec.state || "",
            minPrice: Number(rec.min_price) || 0,
            maxPrice: Number(rec.max_price) || 0,
            modalPrice: Number(rec.modal_price) || 0,
            date: rec.arrival_date || new Date().toLocaleDateString("en-IN"),
            unit: "Quintal",
          }));

          return res.status(200).json({
            success: true,
            source: "Ministry of Agriculture and Farmers Welfare, Govt of India (Agmarknet / data.gov.in)",
            updatedAt: parsed.updated_date || new Date().toISOString(),
            count: records.length,
            records,
          });
        } catch (parseError) {
          return res.status(503).json({
            success: false,
            message: "Market price data is currently unavailable.",
            source: "Ministry of Agriculture and Farmers Welfare (Agmarknet / data.gov.in)",
          });
        }
      });
    });

    request.on("error", (err) => {
      return res.status(503).json({
        success: false,
        message: "Market price data is currently unavailable.",
        source: "Ministry of Agriculture and Farmers Welfare (Agmarknet / data.gov.in)",
      });
    });

    request.on("timeout", () => {
      request.destroy();
      return res.status(503).json({
        success: false,
        message: "Market price data is currently unavailable.",
        source: "Ministry of Agriculture and Farmers Welfare (Agmarknet / data.gov.in)",
      });
    });
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: "Market price data is currently unavailable.",
      source: "Ministry of Agriculture and Farmers Welfare (Agmarknet / data.gov.in)",
    });
  }
};

module.exports = {
  getMandiPrices,
};
