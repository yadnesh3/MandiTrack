import React, { useState, useEffect } from "react";
import { getMyLotsApi } from "../../services/api";
import {
  Package,
  ArrowRight,
  Search,
} from "lucide-react";

export default function MyLotsView({ _user, onSelectLotToTrack, onNavigateToAddProduce }) {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchLots = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getMyLotsApi();
      setLots(res.lots || []);
    } catch (err) {
      setError(err.message || "Failed to load your lots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  const filteredLots = lots.filter((lot) => {
    const matchesSearch =
      !searchQuery ||
      lot.crop?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.lotId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.tokenNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.mandi?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      lot.status?.toLowerCase() === statusFilter.toLowerCase() ||
      lot.currentStage?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const renderStageBadge = (stage) => {
    switch (stage) {
      case "Gate Entry":
      case "Completed":
      case "Exit":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            {stage}
          </span>
        );
      case "Queue":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FDF0DE] text-[#B86200] border border-[#F6DCBA]">
            In Queue
          </span>
        );
      case "Quality Check":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
            Quality Check
          </span>
        );
      case "Trading":
      case "Trading / Sale":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
            Trading
          </span>
        );
      case "Weighing":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            Weighing
          </span>
        );
      case "Settlement":
      case "Payment":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
            {stage}
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            {stage || "In Process"}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-2">
            <Package size={14} className="text-[#EA8F0B]" />
            Produce Lots Directory
          </div>
          <h1 className="text-2xl font-black text-[#0C192C] tracking-tight">
            My Submitted Lots
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Manage your harvest records, review mandi valuations, and track live stages.
          </p>
        </div>

        {onNavigateToAddProduce && (
          <button
            onClick={onNavigateToAddProduce}
            className="px-5 py-2.5 rounded-xl bg-[#EA8F0B] hover:bg-[#d47f06] text-white font-extrabold text-xs shadow-xs transition flex items-center justify-center gap-2 active:scale-95 shrink-0"
          >
            <PlusCircle size={15} />
            <span>Add New Produce</span>
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crop, Token (F-2847), Mandi..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {["all", "queue", "quality check", "trading", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition ${
                statusFilter === tab
                  ? "bg-[#0C192C] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab === "all" ? "All Lots" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Table / Cards */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs text-xs font-bold text-slate-400">
          Loading your lots...
        </div>
      ) : error ? (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
          {error}
        </div>
      ) : filteredLots.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Package size={28} />
          </div>
          <div className="text-sm font-black text-slate-800">No Produce Lots Found</div>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You have not registered any produce lots under this filter yet. Add your crop to obtain a queue token.
          </p>
          {onNavigateToAddProduce && (
            <button
              onClick={onNavigateToAddProduce}
              className="px-5 py-2.5 rounded-xl bg-[#EA8F0B] text-white font-extrabold text-xs shadow-xs"
            >
              Register First Lot
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                  <th className="py-3.5 px-4"># Token</th>
                  <th className="py-3.5 px-4">Lot ID</th>
                  <th className="py-3.5 px-4">Crop</th>
                  <th className="py-3.5 px-4">Quantity</th>
                  <th className="py-3.5 px-4">Mandi Market</th>
                  <th className="py-3.5 px-4">Current Stage</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-800">
                {filteredLots.map((lot, idx) => (
                  <tr
                    key={lot._id}
                    className="hover:bg-amber-50/30 transition-colors group cursor-pointer"
                    onClick={() => onSelectLotToTrack && onSelectLotToTrack(lot._id)}
                  >
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px] group-hover:bg-amber-100 group-hover:text-amber-900 transition-colors">
                        {lot.tokenNumber || `TK-${idx + 101}`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      {lot.lotId}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {lot.crop}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-slate-900">{lot.quantity}</span>{" "}
                      <span className="text-slate-500 font-semibold">{lot.unit}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {lot.mandi}
                    </td>
                    <td className="py-3.5 px-4">
                      {renderStageBadge(lot.currentStage || "Queue")}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[11px] font-bold ${
                          lot.paymentStatus === "Paid"
                            ? "text-emerald-700"
                            : "text-amber-700"
                        }`}
                      >
                        {lot.paymentStatus || "Pending"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectLotToTrack) onSelectLotToTrack(lot._id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#EA8F0B] hover:text-white text-slate-700 font-bold text-[11px] transition shadow-2xs inline-flex items-center gap-1"
                      >
                        <span>Track</span>
                        <ArrowRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
