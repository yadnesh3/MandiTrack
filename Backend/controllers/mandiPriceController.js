const https = require("https");

const DEFAULT_MANDI_API_BASE_URL = "https://mandi-api.onrender.com";

const sendUnavailable = (res, code, message) =>
  res.status(503).json({
    success: false,
    code,
    message,
    source: "Mandi Price API",
  });

// Fetch daily mandi prices from the keyless Mandi Price API and return the
// shape already consumed by the React price table.
const getMandiPrices = (req, res) => {
  const baseUrl = process.env.MANDI_API_BASE_URL || DEFAULT_MANDI_API_BASE_URL;
  const state = String(req.query.state || "Maharashtra").trim();
  const commodity = String(req.query.commodity || "").trim();

  let apiUrl;

  try {
    apiUrl = new URL("/v1/prices", baseUrl);
    apiUrl.searchParams.set("state", state);

    if (commodity) {
      apiUrl.searchParams.set("commodity", commodity);
    }
  } catch (error) {
    console.error("Invalid MANDI_API_BASE_URL:", error.message);
    return sendUnavailable(
      res,
      "MANDI_PRICE_API_NOT_CONFIGURED",
      "Live mandi price service is not configured correctly."
    );
  }

  let completed = false;

  const finishUnavailable = (code, message) => {
    if (completed) return;
    completed = true;
    sendUnavailable(res, code, message);
  };

  const request = https.get(
    apiUrl,
    { timeout: 10000, headers: { Accept: "application/json" } },
    (response) => {
      let body = "";

      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });

      response.on("end", () => {
        if (completed) return;

        if (response.statusCode !== 200) {
          console.error(`Mandi Price API request failed with HTTP ${response.statusCode}.`);
          return finishUnavailable(
            "MANDI_PRICE_UPSTREAM_ERROR",
            "Live mandi prices are temporarily unavailable. Please try again shortly."
          );
        }

        try {
          const payload = JSON.parse(body);
          const prices = Array.isArray(payload.data) ? payload.data : [];

          if (!payload.success || prices.length === 0) {
            completed = true;
            return res.status(200).json({
              success: false,
              code: "MANDI_PRICE_NO_RESULTS",
              message: "No mandi prices are currently available for the selected filters.",
              source: "Mandi Price API",
              records: [],
            });
          }

          const records = prices.map((price) => ({
            crop: price.commodity || "N/A",
            variety: price.variety || "Standard",
            mandi: price.market || "APMC Market",
            district: price.district || "",
            state: price.state || state,
            minPrice: Number(price.min_price) || 0,
            maxPrice: Number(price.max_price) || 0,
            modalPrice: Number(price.modal_price) || 0,
            date: price.arrival_date || "",
            unit: "Quintal",
          }));

          completed = true;
          return res.status(200).json({
            success: true,
            source: "Mandi Price API (daily mandi market data)",
            updatedAt: payload.meta?.latest_fetched_at || new Date().toISOString(),
            count: records.length,
            records,
          });
        } catch (error) {
          console.error("Unable to parse the Mandi Price API response:", error.message);
          return finishUnavailable(
            "MANDI_PRICE_UPSTREAM_ERROR",
            "Live mandi prices returned an invalid response. Please try again later."
          );
        }
      });
    }
  );

  request.on("error", (error) => {
    console.error("Mandi Price API request failed:", error.message);
    finishUnavailable(
      "MANDI_PRICE_UPSTREAM_ERROR",
      "Live mandi prices are temporarily unavailable. Please try again shortly."
    );
  });

  request.on("timeout", () => {
    request.destroy();
    console.error("Mandi Price API request timed out after 10 seconds.");
    finishUnavailable(
      "MANDI_PRICE_UPSTREAM_TIMEOUT",
      "Live mandi prices are taking too long to respond. Please try again shortly."
    );
  });
};

module.exports = {
  getMandiPrices,
};
