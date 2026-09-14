import React, { useState, useEffect } from "react";
import { getMandiPricesApi } from "../services/api";
import { useLang } from "../context/LanguageContext";

function MandiPriceInfo() {
  const { t, tUnit, locale } = useLang();

  const [rates, setRates] = useState([]);
  const [sourceInfo, setSourceInfo] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [unavailableError, setUnavailableError] = useState("");
  const [cropFilter, setCropFilter] = useState("");
  const [mandiFilter, setMandiFilter] = useState("");

  const fetchMarketPrices = async () => {
    setLoading(true);
    setUnavailableError("");
    try {
      const response = await getMandiPricesApi();
      if (response && response.success && response.records && response.records.length > 0) {
        setRates(response.records);
        setSourceInfo(response.source || "Agmarknet Portal / data.gov.in");
        setUpdatedAt(
          response.updatedAt
            ? new Date(response.updatedAt).toLocaleString(locale)
            : new Date().toLocaleDateString(locale)
        );
      } else {
        setUnavailableError(response.message || t("pricesUnavailable"));
      }
    } catch (err) {
      setUnavailableError(t("pricesUnavailable"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketPrices();
  }, []);

  const includes = (value, needle) =>
    String(value || "").toLowerCase().includes(needle.toLowerCase());

  const filteredRates = rates.filter((item) => {
    const matchesCrop = includes(item.crop, cropFilter);
    const matchesMandi =
      includes(item.mandi, mandiFilter) || includes(item.district, mandiFilter);
    return matchesCrop && matchesMandi;
  });

  return (
    <div className="space-y-6">
      {/* Header Container */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            {t("mandiPricesBadge")}
          </span>
          <h2 className="text-2xl font-bold text-gray-900">
            {t("mandiPricesHeading")}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {t("mandiPricesSubtext")}
          </p>
        </div>

        <button
          onClick={fetchMarketPrices}
          className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-xs shrink-0 self-start md:self-auto"
        >
          🔄 {t("refreshPrices")}
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center space-y-3 shadow-sm">
          <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-medium text-gray-600">
            {t("fetchingPrices")}
          </p>
        </div>
      )}

      {/* Unavailable State */}
      {!loading && unavailableError && (
        <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 text-center space-y-2 shadow-sm">
          <div className="text-3xl">⚠️</div>
          <h3 className="text-lg font-bold text-amber-900">
            {unavailableError}
          </h3>
          <p className="text-xs text-amber-700 max-w-md mx-auto">
            {t("pricesUnavailableHelp")}
          </p>
        </div>
      )}

      {/* Live Data Display Table */}
      {!loading && !unavailableError && rates.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden space-y-0">

          {/* Source & Date Banner */}
          <div className="bg-gray-50 px-6 py-3 border-b flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-600 gap-2">
            <div>
              🏛️ <span className="font-semibold text-gray-800">{t("sourceLabel")}:</span> {sourceInfo}
            </div>
            <div>
              🕒 <span className="font-semibold text-gray-800">{t("dataDateLabel")}:</span> {updatedAt}
            </div>
          </div>

          {/* Search Controls */}
          <div className="p-4 border-b bg-white grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                {t("filterByCrop")}
              </label>
              <input
                type="text"
                placeholder={t("filterByCropHint")}
                value={cropFilter}
                onChange={(e) => setCropFilter(e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                {t("filterByMandi")}
              </label>
              <input
                type="text"
                placeholder={t("filterByMandiHint")}
                value={mandiFilter}
                onChange={(e) => setMandiFilter(e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          {filteredRates.length === 0 ? (
            <div className="p-10 text-center text-sm text-gray-500">
              {t("noMatchingPrices")}
            </div>
          ) : (
            /* Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100/80 border-b text-xs uppercase font-semibold text-gray-600">
                    <th className="py-3.5 px-6">{t("colCommodity")}</th>
                    <th className="py-3.5 px-4">{t("colMarket")}</th>
                    <th className="py-3.5 px-4">{t("colDistrict")}</th>
                    <th className="py-3.5 px-4">{t("colMinPrice")}</th>
                    <th className="py-3.5 px-4">{t("colMaxPrice")}</th>
                    <th className="py-3.5 px-4">{t("colModalPrice")}</th>
                    <th className="py-3.5 px-6 text-right">{t("colArrivalDate")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRates.map((rec, index) => (
                    <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-900">
                        {rec.crop} <span className="text-xs font-normal text-gray-500 block">{rec.variety}</span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-800">
                        {rec.mandi}
                      </td>
                      <td className="py-4 px-4 text-xs text-gray-500">
                        {rec.district ? `${rec.district}, ${rec.state}` : rec.state}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        ₹{Number(rec.minPrice).toLocaleString(locale)}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        ₹{Number(rec.maxPrice).toLocaleString(locale)}
                      </td>
                      <td className="py-4 px-4 font-extrabold text-green-800 bg-green-50/50">
                        ₹{Number(rec.modalPrice).toLocaleString(locale)} <span className="text-xs font-normal text-gray-500">/ {tUnit(rec.unit)}</span>
                      </td>
                      <td className="py-4 px-6 text-right text-xs text-gray-500 font-mono">
                        {rec.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MandiPriceInfo;
