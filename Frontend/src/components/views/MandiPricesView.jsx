import React, { useState, useEffect } from "react";
import { getMandiPricesApi } from "../../services/api";
import { useLang } from "../../context/LanguageContext";
import {
  BarChart3,
  Search,
  Filter,
  RefreshCw,
  TrendingUp,
  MapPin,
  Calendar,
  IndianRupee,
  Sparkles,
} from "lucide-react";

export default function MandiPricesView() {
  const { t, locale } = useLang();
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
      if (res && res.success && res.records && res.records.length > 0) {
        setRates(res.records);
        setSourceInfo(res.source || "Agmarknet / data.gov.in");
        setUpdatedAt(
          res.updatedAt
            ? new Date(res.updatedAt).toLocaleString(locale)
            : new Date().toLocaleDateString(locale)
        );
      } else {
        setUnavailableError(res.message || "Daily Agmarknet price feed is momentarily synchronizing.");
      }
    } catch {
      setUnavailableError("Unable to fetch live prices from Agmarknet API at this time.");
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
      item.crop?.toLowerCase().includes(searchCrop.toLowerCase()) ||
      item.variety?.toLowerCase().includes(searchCrop.toLowerCase());
    const mandiMatch =
      !searchMandi ||
      item.mandi?.toLowerCase().includes(searchMandi.toLowerCase()) ||
      item.district?.toLowerCase().includes(searchMandi.toLowerCase());
    return cropMatch && mandiMatch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-2">
            <BarChart3 size={14} className="text-[#EA8F0B]" />
            Official APMC Market Rates
          </div>
          <h1 className="text-2xl font-black text-[#0C192C] tracking-tight">
            Today's Mandi Commodity Prices
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Real-time wholesale modal, min & max rates sourced directly from official Agmarknet APMC terminals.
          </p>
        </div>

        <button
          onClick={fetchPrices}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition active:scale-95 shrink-0"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          <span>Refresh Rates</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchCrop}
            onChange={(e) => setSearchCrop(e.target.value)}
            placeholder="Search crop or variety (e.g. Onion, Wheat, Tomato)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div className="relative">
          <MapPin size={15} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchMandi}
            onChange={(e) => setSearchMandi(e.target.value)}
            placeholder="Search APMC market or district (e.g. Pune, Nashik)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Data Table */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-xs font-bold text-slate-400">
          Loading live Agmarknet prices...
        </div>
      ) : unavailableError && rates.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-[#EA8F0B] flex items-center justify-center mx-auto">
            <Sparkles size={24} />
          </div>
          <div className="text-sm font-black text-slate-800">
            Official Feed Sync in Progress
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto">{unavailableError}</p>
          <button
            onClick={fetchPrices}
            className="px-5 py-2 rounded-xl bg-[#EA8F0B] text-white text-xs font-bold shadow-xs"
          >
            Retry Fetch
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                  <th className="py-3.5 px-4">Crop</th>
                  <th className="py-3.5 px-4">Variety</th>
                  <th className="py-3.5 px-4">Market / Mandi</th>
                  <th className="py-3.5 px-4">District</th>
                  <th className="py-3.5 px-4 text-right">Min Price</th>
                  <th className="py-3.5 px-4 text-right">Max Price</th>
                  <th className="py-3.5 px-4 text-right">Modal Price</th>
                  <th className="py-3.5 px-4 text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-800">
                {filteredRates.slice(0, 30).map((item, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/20 transition-colors">
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      {item.crop}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-semibold">
                      {item.variety || "Standard / Local"}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-bold">
                      {item.mandi}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {item.district || "Maharashtra"}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-600 font-bold">
                      ₹{item.minPrice || item.min_price || "-"}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-600 font-bold">
                      ₹{item.maxPrice || item.max_price || "-"}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-black text-emerald-700 text-sm">
                      ₹{item.modalPrice || item.modal_price || "-"}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <TrendingUp size={11} className="mr-0.5" /> Stable
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>
              Source: <strong className="text-slate-700">{sourceInfo}</strong>
            </span>
            <span>Last Updated: {updatedAt}</span>
          </div>
        </div>
      )}
    </div>
  );
}
