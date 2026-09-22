import React from "react";
import {
  FileText,
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Layers,
  Scale,
  IndianRupee,
} from "lucide-react";

export default function ReportsView({ user }) {
  const mandiName = user?.mandi || "Pune APMC";

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 mb-2">
            <FileText size={14} />
            Mandi Analytics & Records
          </div>
          <h1 className="text-2xl font-black text-[#0C192C] tracking-tight">
            Operational Reports & Summaries
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Produce arrival volumes, auction settlement stats, and daily realization metrics for {mandiName}.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-5 py-2.5 rounded-xl bg-[#0C192C] hover:bg-[#162f52] text-white font-extrabold text-xs shadow-xs transition flex items-center justify-center gap-2 active:scale-95 shrink-0"
        >
          <Download size={14} />
          <span>Export Summary (PDF)</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Monthly Arrival Volume</div>
          <div className="text-2xl font-black text-slate-900 mt-1">4,820 Q</div>
          <div className="text-xs text-emerald-600 font-bold mt-0.5">↑ 14% vs last month</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Auction Clearance Rate</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">98.4%</div>
          <div className="text-xs text-slate-500 font-semibold mt-0.5">Same-day settlement</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Average Realization</div>
          <div className="text-2xl font-black text-[#EA8F0B] mt-1">₹2,340/Q</div>
          <div className="text-xs text-slate-500 font-semibold mt-0.5">Across all top 10 crops</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Active Registered Traders</div>
          <div className="text-2xl font-black text-slate-900 mt-1">142</div>
          <div className="text-xs text-emerald-600 font-bold mt-0.5">Active licensed buyers</div>
        </div>
      </div>

      {/* Top Commodities Breakdown Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Commodity Turnover Breakdown (This Month)
          </h2>
          <span className="text-xs font-bold text-slate-500">Live APMC Aggregates</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                <th className="py-3 px-4">Commodity</th>
                <th className="py-3 px-4">Total Lots</th>
                <th className="py-3 px-4">Volume (Quintals)</th>
                <th className="py-3 px-4 text-right">Avg Rate (₹/Q)</th>
                <th className="py-3 px-4 text-right">Gross Turnover</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-800">
              {[
                { name: "Onion (कांदा)", lots: 124, vol: "1,450 Q", avg: "₹1,820", turnover: "₹26,39,000" },
                { name: "Tomato (टोमॅटो)", lots: 96, vol: "920 Q", avg: "₹1,450", turnover: "₹13,34,000" },
                { name: "Soybean (सोयाबीन)", lots: 88, vol: "1,100 Q", avg: "₹4,250", turnover: "₹46,75,000" },
                { name: "Wheat (गहू)", lots: 64, vol: "850 Q", avg: "₹2,650", turnover: "₹22,52,500" },
                { name: "Green Chilli (मिरची)", lots: 42, vol: "310 Q", avg: "₹3,400", turnover: "₹10,54,000" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-black text-slate-900">{row.name}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{row.lots}</td>
                  <td className="py-3 px-4 text-slate-700">{row.vol}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">{row.avg}</td>
                  <td className="py-3 px-4 text-right font-mono font-black text-emerald-700">{row.turnover}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
