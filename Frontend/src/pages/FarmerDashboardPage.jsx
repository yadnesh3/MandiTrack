import React, { useState, useEffect } from "react";
import { getMyLotsApi } from "../services/api";

function FarmerDashboardPage({ user, onNavigateTab }) {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const response = await getMyLotsApi();
        setLots(response.lots || []);
      } catch (err) {
        console.error("Failed to load lots", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLots();
  }, []);

  const totalLots = lots.length;
  const pendingCount = lots.filter((l) => l.status === "pending").length;
  const approvedCount = lots.filter((l) => l.status === "approved").length;
  const rejectedCount = lots.filter((l) => l.status === "rejected").length;

  return (
    <div className="space-y-6">
      {/* Hero Banner Card Matching Panel 4 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-green-800 to-emerald-700 text-white p-6 sm:p-8 shadow-lg border border-green-700/40">
        
        {/* Plant Background Decorative Icon */}
        <div className="absolute right-4 bottom-0 opacity-25 text-9xl pointer-events-none select-none">
          🌱
        </div>

        <div className="relative z-10 max-w-xl space-y-3">
          <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-emerald-200 border border-white/20">
            🌾 Mandi Track Portal
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Grow Today <br />
            <span className="text-emerald-300">For a Better Tomorrow</span>
          </h2>

          <p className="text-emerald-100 text-sm leading-relaxed pt-1">
            Track your produce. Get fair prices. Build a stronger future.
          </p>
        </div>
      </div>

      {/* 4 Stat Cards Matching Panel 4 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Lots */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-3xl font-extrabold text-slate-900">
            {loading ? "..." : totalLots}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Lots
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white p-6 rounded-2xl border border-yellow-200 bg-yellow-50/20 shadow-xs space-y-1">
          <div className="text-3xl font-extrabold text-amber-600">
            {loading ? "..." : pendingCount}
          </div>
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
            Pending
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white p-6 rounded-2xl border border-green-200 bg-green-50/20 shadow-xs space-y-1">
          <div className="text-3xl font-extrabold text-green-700">
            {loading ? "..." : approvedCount}
          </div>
          <div className="text-xs font-semibold text-green-800 uppercase tracking-wider">
            Approved
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-white p-6 rounded-2xl border border-red-200 bg-red-50/20 shadow-xs space-y-1">
          <div className="text-3xl font-extrabold text-red-600">
            {loading ? "..." : rejectedCount}
          </div>
          <div className="text-xs font-semibold text-red-700 uppercase tracking-wider">
            Rejected
          </div>
        </div>
      </div>

      {/* Action CTA Button Matching Panel 4 */}
      <div className="pt-2">
        <button
          onClick={() => onNavigateTab("add-produce")}
          className="w-full py-4 bg-green-700 hover:bg-green-800 active:scale-98 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition-all text-base flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span> Add New Produce
        </button>
      </div>
    </div>
  );
}

export default FarmerDashboardPage;
