import React, { useState, useEffect } from "react";
import { getMandiPricesApi } from "../../services/api";
import { useLang } from "../../context/LanguageContext";
import {
  BarChart3,
  Search,
  RefreshCw,
  TrendingUp,
  MapPin,
  IndianRupee,
  Sparkles,
  Calendar,
} from "lucide-react";

export default function MandiPricesView() {
  const { t, locale, lang } = useLang();

  const [rates, setRates] = useState([]);
  const [sourceInfo, setSourceInfo] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [unavailableError, setUnavailableError] = useState("");
  const [searchCrop, setSearchCrop] = useState("");
  const [searchMandi, setSearchMandi] = useState("");

  const fetchPrices = async () => {
    setLoading(true);
    setUnavailableError("");

    try {
      const res = await getMandiPricesApi();

      if (
        res &&
        res.success &&
        res.records &&
        res.records.length > 0
      ) {
        setRates(res.records);

        setSourceInfo(
          res.source || "Agmarknet / data.gov.in"
        );

        setUpdatedAt(
          res.updatedAt
            ? new Date(res.updatedAt).toLocaleString(locale)
            : new Date().toLocaleDateString(locale)
        );
      } else {
        setUnavailableError(
          res.message ||
            "Daily Agmarknet price feed is momentarily synchronizing."
        );
      }
    } catch {
      setUnavailableError(
        "Unable to fetch live prices from Agmarknet API at this time."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const filteredRates = rates.filter((item) => {
    const cropMatch =
      !searchCrop ||
      item.crop
        ?.toLowerCase()
        .includes(searchCrop.toLowerCase()) ||
      item.variety
        ?.toLowerCase()
        .includes(searchCrop.toLowerCase());

    const mandiMatch =
      !searchMandi ||
      item.mandi
        ?.toLowerCase()
        .includes(searchMandi.toLowerCase()) ||
      item.district
        ?.toLowerCase()
        .includes(searchMandi.toLowerCase());

    return cropMatch && mandiMatch;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6 bg-[#F8F7F2] pb-8 animate-fadeIn">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#E8DDBF] bg-[#F5EFDE] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#80672C]">
              <BarChart3
                size={13}
                className="text-[#B58A35]"
              />
              {t("officialApmcRatesBadge")}
            </div>

            <h1 className="text-xl font-bold tracking-tight text-[#19343A] sm:text-2xl">
              {t("todaysCommodityPrices")}
            </h1>

            <p className="mt-1 max-w-3xl text-xs leading-5 text-[#687779] sm:text-sm">
              {t("commodityPricesSub")}
            </p>
          </div>

          <button
            type="button"
            onClick={fetchPrices}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] px-4 py-2.5 text-xs font-semibold text-[#285C3A] transition hover:border-[#CFE2D4] hover:bg-[#EAF2E9] active:scale-[0.98]"
          >
            <RefreshCw
              size={13}
              className={loading ? "animate-spin" : ""}
            />
            {lang === "mr" ? "दर अद्यतन करा" : "Refresh Rates"}
          </button>
        </div>
      </div>

      {/* =====================================================
          FILTERS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-3 rounded-xl border border-[#DCE3DB] bg-white p-4 shadow-sm sm:grid-cols-2">
        {/* Crop Search */}
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3.5 top-3 text-[#8A9695]"
          />

          <input
            type="text"
            value={searchCrop}
            onChange={(e) => setSearchCrop(e.target.value)}
            placeholder={t("searchCropPlaceholder")}
            className="w-full rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] py-2.5 pl-9 pr-4 text-xs font-medium text-[#19343A] outline-none transition placeholder:text-[#9AA5A3] focus:border-[#285C3A] focus:bg-white focus:ring-2 focus:ring-[#EAF2E9]"
          />
        </div>

        {/* Mandi Search */}
        <div className="relative">
          <MapPin
            size={15}
            className="absolute left-3.5 top-3 text-[#8A9695]"
          />

          <input
            type="text"
            value={searchMandi}
            onChange={(e) => setSearchMandi(e.target.value)}
            placeholder={t("searchMandiPlaceholder")}
            className="w-full rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] py-2.5 pl-9 pr-4 text-xs font-medium text-[#19343A] outline-none transition placeholder:text-[#9AA5A3] focus:border-[#285C3A] focus:bg-white focus:ring-2 focus:ring-[#EAF2E9]"
          />
        </div>
      </div>

      {/* =====================================================
          LOADING
      ====================================================== */}

      {loading ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-[#DCE3DB] bg-white px-6 text-center shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2E9]">
            <RefreshCw
              size={21}
              className="animate-spin text-[#285C3A]"
            />
          </div>

          <h2 className="mt-4 text-sm font-bold text-[#19343A]">
            {lang === "mr" ? "बाजारभाव लोड होत आहेत..." : "Loading live Agmarknet prices"}
          </h2>

          <p className="mt-1 text-xs font-medium text-[#687779]">
            {lang === "mr" ? "नवीनतम बाजार समिती दर आणले जात आहेत..." : "Fetching the latest available mandi rates..."}
          </p>
        </div>
      ) : unavailableError && rates.length === 0 ? (
        /* ===================================================
           UNAVAILABLE
        ==================================================== */

        <div className="rounded-xl border border-[#E8DDBF] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F5EFDE] text-[#B58A35]">
            <Sparkles size={22} />
          </div>

          <h2 className="mt-4 text-sm font-bold text-[#19343A]">
            {t("officialFeedSync")}
          </h2>

          <p className="mx-auto mt-2 max-w-md text-xs font-medium leading-5 text-[#687779]">
            {unavailableError}
          </p>

          <button
            type="button"
            onClick={fetchPrices}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#285C3A] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#214D31] active:scale-[0.98]"
          >
            <RefreshCw size={13} />
            {t("retryFetchBtn")}
          </button>
        </div>
      ) : (
        /* ===================================================
           DATA TABLE
        ==================================================== */

        <div className="overflow-hidden rounded-xl border border-[#DCE3DB] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E5E9E3] px-4 py-3 sm:px-5">
            <div>
              <h2 className="text-sm font-bold text-[#19343A]">
                {t("availableMarketRates")}
              </h2>

              <p className="mt-0.5 text-[10px] font-medium text-[#8A9695]">
                Showing {Math.min(filteredRates.length, 30)} available
                records
              </p>
            </div>

            <div className="hidden items-center gap-1.5 rounded-full border border-[#CFE2D4] bg-[#EAF2E9] px-2.5 py-1 text-[10px] font-semibold text-[#285C3A] sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#285C3A]" />
              {t("officialFeedBadge")}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#DCE3DB] bg-[#F8F7F2] text-[10px] font-bold uppercase tracking-[0.08em] text-[#687779]">
                  <th className="px-4 py-3.5">
                    {t("colCrop")}
                  </th>

                  <th className="px-4 py-3.5">
                    {t("colVariety")}
                  </th>

                  <th className="px-4 py-3.5">
                    {t("colMandiMarket")}
                  </th>

                  <th className="px-4 py-3.5">
                    {t("colDistrict")}
                  </th>

                  <th className="px-4 py-3.5 text-right">
                    {t("colMinPrice")}
                  </th>

                  <th className="px-4 py-3.5 text-right">
                    {t("colMaxPrice")}
                  </th>

                  <th className="px-4 py-3.5 text-right">
                    {t("colModalPrice")}
                  </th>

                  <th className="px-4 py-3.5 text-center">
                    {t("colTrend")}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E5E9E3] text-xs font-medium text-[#19343A]">
                {filteredRates.slice(0, 30).map((item, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-[#F8F7F2]"
                  >
                    {/* Crop */}
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-[#19343A]">
                        {item.crop}
                      </div>
                    </td>

                    {/* Variety */}
                    <td className="px-4 py-3.5 text-[#687779]">
                      {item.variety || "Standard / Local"}
                    </td>

                    {/* Mandi */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 font-semibold text-[#285C3A]">
                        <MapPin
                          size={12}
                          className="shrink-0 text-[#B58A35]"
                        />
                        {item.mandi}
                      </div>
                    </td>

                    {/* District */}
                    <td className="px-4 py-3.5 text-[#687779]">
                      {item.district || "Maharashtra"}
                    </td>

                    {/* Min */}
                    <td className="px-4 py-3.5 text-right">
                      <span className="font-mono font-semibold text-[#687779]">
                        ₹{item.minPrice || item.min_price || "-"}
                      </span>
                    </td>

                    {/* Max */}
                    <td className="px-4 py-3.5 text-right">
                      <span className="font-mono font-semibold text-[#687779]">
                        ₹{item.maxPrice || item.max_price || "-"}
                      </span>
                    </td>

                    {/* Modal */}
                    <td className="px-4 py-3.5 text-right">
                      <span className="inline-flex items-center gap-0.5 rounded-md border border-[#CFE2D4] bg-[#EAF2E9] px-2 py-1 font-mono text-sm font-bold text-[#285C3A]">
                        <IndianRupee size={11} />
                        {item.modalPrice ||
                          item.modal_price ||
                          "-"}
                      </span>
                    </td>

                    {/* Trend */}
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#D5DDE0] bg-[#EEF2F3] px-2.5 py-1 text-[10px] font-semibold text-[#477A7A]">
                        <TrendingUp size={10} />
                        {t("trendStable")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* =================================================
              NO FILTER RESULTS
          ================================================== */}

          {filteredRates.length === 0 && (
            <div className="border-t border-[#E5E9E3] px-6 py-12 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F7F2] text-[#687779]">
                <Search size={19} />
              </div>

              <h3 className="mt-3 text-sm font-bold text-[#19343A]">
                {t("noMatchingMarketRates")}
              </h3>

              <p className="mt-1 text-xs font-medium text-[#687779]">
                {t("tryDifferentSearch")}
              </p>
            </div>
          )}

          {/* =================================================
              SOURCE FOOTER
          ================================================== */}

          <div className="flex flex-col gap-2 border-t border-[#E5E9E3] bg-[#F8F7F2] px-4 py-3.5 text-[10px] font-medium text-[#687779] sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <span>
              {t("sourceAgmarknet")}:{" "}
              <strong className="font-semibold text-[#19343A]">
                {sourceInfo}
              </strong>
            </span>

            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              {t("lastUpdated")}: {updatedAt}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}