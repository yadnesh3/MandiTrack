import React, { useState, useEffect } from "react";
import { getMandiPricesApi } from "../services/api";
import { useLang } from "../context/LanguageContext";
import {
  RefreshCw,
  AlertTriangle,
  Landmark,
  Clock3,
  Search,
} from "lucide-react";

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

      if (
        response &&
        response.success &&
        response.records &&
        response.records.length > 0
      ) {
        setRates(response.records);

        setSourceInfo(
          response.source || "Agmarknet Portal / data.gov.in"
        );

        setUpdatedAt(
          response.updatedAt
            ? new Date(response.updatedAt).toLocaleString(locale)
            : new Date().toLocaleDateString(locale)
        );
      } else {
        setUnavailableError(
          response.message || t("pricesUnavailable")
        );
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
    String(value || "")
      .toLowerCase()
      .includes(needle.toLowerCase());

  const filteredRates = rates.filter((item) => {
    const matchesCrop = includes(item.crop, cropFilter);

    const matchesMandi =
      includes(item.mandi, mandiFilter) ||
      includes(item.district, mandiFilter);

    return matchesCrop && matchesMandi;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#DCE3DB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF2E9] text-[#285C3A] text-[10px] font-bold uppercase tracking-wider border border-[#C9DDCC] mb-2">
            <Landmark size={13} />
            {t("mandiPricesBadge")}
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#19343A] tracking-tight">
            {t("mandiPricesHeading")}
          </h2>

          <p className="text-[#687779] text-sm mt-1.5 max-w-2xl">
            {t("mandiPricesSubtext")}
          </p>
        </div>

        <button
          onClick={fetchMarketPrices}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] text-xs font-semibold text-[#19343A] hover:bg-[#EEF3EC] transition disabled:opacity-60 shrink-0 self-start md:self-auto"
        >
          <RefreshCw
            size={14}
            className={loading ? "animate-spin" : ""}
          />

          {t("refreshPrices")}
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl p-12 border border-[#DCE3DB] text-center space-y-3 shadow-sm">
          <div className="w-9 h-9 border-[3px] border-[#285C3A] border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-sm font-medium text-[#687779]">
            {t("fetchingPrices")}
          </p>
        </div>
      )}

      {/* Unavailable State */}
      {!loading && unavailableError && (
        <div className="bg-[#F5EFDE] rounded-xl p-8 border border-[#E8DDBF] text-center space-y-3 shadow-sm">
          <div className="w-11 h-11 rounded-full bg-white border border-[#E8DDBF] text-[#B58A35] flex items-center justify-center mx-auto">
            <AlertTriangle size={21} />
          </div>

          <h3 className="text-lg font-bold text-[#6F531D]">
            {unavailableError}
          </h3>

          <p className="text-xs text-[#80672C] max-w-md mx-auto leading-relaxed">
            {t("pricesUnavailableHelp")}
          </p>
        </div>
      )}

      {/* Live Data Display */}
      {!loading && !unavailableError && rates.length > 0 && (
        <div className="bg-white rounded-xl border border-[#DCE3DB] shadow-sm overflow-hidden">
          {/* Source & Date Banner */}
          <div className="bg-[#F8F7F2] px-5 sm:px-6 py-3.5 border-b border-[#E7EBE5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#687779]">
            <div className="flex items-start gap-2">
              <Landmark
                size={14}
                className="text-[#285C3A] mt-0.5 shrink-0"
              />

              <div>
                <span className="font-semibold text-[#19343A]">
                  {t("sourceLabel")}:
                </span>{" "}
                {sourceInfo}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock3
                size={14}
                className="text-[#B58A35]"
              />

              <div>
                <span className="font-semibold text-[#19343A]">
                  {t("dataDateLabel")}:
                </span>{" "}
                {updatedAt}
              </div>
            </div>
          </div>

          {/* Search Controls */}
          <div className="p-5 sm:p-6 border-b border-[#E7EBE5] bg-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#EAF2E9] text-[#285C3A] flex items-center justify-center">
                <Search size={14} />
              </div>

              <span className="text-xs font-bold text-[#19343A]">
                Filter Market Prices
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-[#687779] uppercase tracking-wide mb-1.5">
                  {t("filterByCrop")}
                </label>

                <input
                  type="text"
                  placeholder={t("filterByCropHint")}
                  value={cropFilter}
                  onChange={(e) => setCropFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#DCE3DB] bg-white rounded-lg text-sm text-[#19343A] placeholder:text-[#9AA6A5] outline-none focus:ring-2 focus:ring-[#EAF2E9] focus:border-[#285C3A] transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#687779] uppercase tracking-wide mb-1.5">
                  {t("filterByMandi")}
                </label>

                <input
                  type="text"
                  placeholder={t("filterByMandiHint")}
                  value={mandiFilter}
                  onChange={(e) => setMandiFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#DCE3DB] bg-white rounded-lg text-sm text-[#19343A] placeholder:text-[#9AA6A5] outline-none focus:ring-2 focus:ring-[#EAF2E9] focus:border-[#285C3A] transition"
                />
              </div>
            </div>
          </div>

          {/* No Matching Prices */}
          {filteredRates.length === 0 ? (
            <div className="p-10 text-center">
              <div className="w-11 h-11 rounded-full bg-[#F8F7F2] border border-[#E1E4DE] flex items-center justify-center mx-auto mb-3 text-[#687779]">
                <Search size={18} />
              </div>

              <p className="text-sm text-[#687779] font-medium">
                {t("noMatchingPrices")}
              </p>
            </div>
          ) : (
            /* Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#F8F7F2] border-b border-[#DCE3DB] text-[10px] uppercase font-bold text-[#687779] tracking-wide">
                    <th className="py-3.5 px-6">
                      {t("colCommodity")}
                    </th>

                    <th className="py-3.5 px-4">
                      {t("colMarket")}
                    </th>

                    <th className="py-3.5 px-4">
                      {t("colDistrict")}
                    </th>

                    <th className="py-3.5 px-4">
                      {t("colMinPrice")}
                    </th>

                    <th className="py-3.5 px-4">
                      {t("colMaxPrice")}
                    </th>

                    <th className="py-3.5 px-4">
                      {t("colModalPrice")}
                    </th>

                    <th className="py-3.5 px-6 text-right">
                      {t("colArrivalDate")}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E7EBE5]">
                  {filteredRates.map((rec, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[#F8F7F2] transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#19343A]">
                          {rec.crop}
                        </div>

                        <span className="text-[11px] font-normal text-[#687779] block mt-0.5">
                          {rec.variety}
                        </span>
                      </td>

                      <td className="py-4 px-4 font-semibold text-[#19343A]">
                        {rec.mandi}
                      </td>

                      <td className="py-4 px-4 text-xs text-[#687779]">
                        {rec.district
                          ? `${rec.district}, ${rec.state}`
                          : rec.state}
                      </td>

                      <td className="py-4 px-4 text-[#687779]">
                        ₹
                        {Number(rec.minPrice).toLocaleString(
                          locale
                        )}
                      </td>

                      <td className="py-4 px-4 text-[#687779]">
                        ₹
                        {Number(rec.maxPrice).toLocaleString(
                          locale
                        )}
                      </td>

                      <td className="py-4 px-4 bg-[#EAF2E9]">
                        <div className="font-bold text-[#285C3A]">
                          ₹
                          {Number(
                            rec.modalPrice
                          ).toLocaleString(locale)}
                        </div>

                        <span className="text-[10px] font-normal text-[#687779]">
                          / {tUnit(rec.unit)}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right text-xs text-[#687779] font-mono">
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