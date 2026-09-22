import React, { useState, useEffect } from "react";
import { getMyLotsApi, getLotByIdApi } from "../../services/api";
import { MANDI_STAGES_CONFIG } from "../common/ProcessFlowCard";
import {
  Clock,
  CheckCircle2,
  Package,
  Scale,
  CreditCard,
  LogOut,
  MapPin,
  Calendar,
  AlertCircle,
  FileCheck,
  Gavel,
  Receipt,
  Users,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

export default function LotTrackingView({
  selectedLotId,
  onBackToLots,
  user,
}) {
  const [allLots, setAllLots] = useState([]);
  const [activeLot, setActiveLot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLotData = async () => {
      setLoading(true);
      setError("");
      try {
        const myLotsRes = await getMyLotsApi();
        const lots = myLotsRes.lots || [];
        setAllLots(lots);

        if (selectedLotId) {
          const found = lots.find((l) => l._id === selectedLotId);
          if (found) {
            setActiveLot(found);
          } else {
            const single = await getLotByIdApi(selectedLotId);
            setActiveLot(single.lot);
          }
        } else if (lots.length > 0) {
          setActiveLot(lots[0]);
        }
      } catch (err) {
        setError(err.message || "Failed to load lot tracking data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLotData();
  }, [selectedLotId]);

  if (loading) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs text-xs font-bold text-slate-400">
        Loading live lot tracking...
      </div>
    );
  }

  if (!activeLot) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4">
        <Package size={36} className="mx-auto text-slate-400" />
        <h2 className="text-lg font-bold text-slate-800">No Active Lot to Track</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Please submit a harvest produce lot first to track its journey from Gate Entry to Payment.
        </p>
        {onBackToLots && (
          <button
            onClick={onBackToLots}
            className="px-5 py-2.5 rounded-xl bg-[#EA8F0B] text-white font-extrabold text-xs shadow-xs"
          >
            Go to My Lots
          </button>
        )}
      </div>
    );
  }

  const currentStageIndex = MANDI_STAGES_CONFIG.findIndex(
    (s) => s.id.toLowerCase() === (activeLot.currentStage || "Queue").toLowerCase()
  );
  const resolvedStageIndex = currentStageIndex !== -1 ? currentStageIndex : 1;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner with Lot Selector */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {onBackToLots && (
            <button
              onClick={onBackToLots}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 mb-2 transition"
            >
              <ArrowLeft size={13} />
              <span>Back to All Lots</span>
            </button>
          )}
          <h1 className="text-2xl font-black text-[#0C192C] tracking-tight">
            Live Produce Tracking:{" "}
            <span className="text-[#EA8F0B]">
              {activeLot.tokenNumber || "F-2847"}
            </span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Lot ID: <span className="font-mono text-slate-700">{activeLot.lotId}</span> &bull; {activeLot.mandi}
          </p>
        </div>

        {/* Switcher if user has multiple lots */}
        {allLots.length > 1 && (
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-500">Switch Lot:</span>
            <select
              value={activeLot._id}
              onChange={(e) => {
                const target = allLots.find((l) => l._id === e.target.value);
                if (target) setActiveLot(target);
              }}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 font-bold text-slate-800 text-xs focus:outline-none"
            >
              {allLots.map((l) => (
                <option key={l._id} value={l._id}>
                  {l.tokenNumber || l.lotId} ({l.crop})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Lot Overview Key Metrics Card matching reference */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Crop & Quantity</div>
          <div className="text-xl font-black text-slate-900 mt-1">
            {activeLot.crop}
          </div>
          <div className="text-xs text-emerald-700 font-extrabold mt-0.5">
            {activeLot.quantity} {activeLot.unit}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Current Stage</div>
          <div className="text-xl font-black text-[#EA8F0B] mt-1 truncate">
            {activeLot.currentStage || "Queue"}
          </div>
          <div className="text-xs text-slate-500 font-semibold mt-0.5">
            Step {resolvedStageIndex + 1} of 8
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Queue Position</div>
          <div className="text-xl font-black text-slate-900 mt-1">
            #{activeLot.queueNumber || 1}
          </div>
          <div className="text-xs text-amber-600 font-semibold mt-0.5">
            Est. wait: ~{activeLot.estimatedWaitMinutes || 25} min
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Payment Status</div>
          <div
            className={`text-xl font-black mt-1 ${
              activeLot.paymentStatus === "Paid"
                ? "text-emerald-700"
                : "text-amber-600"
            }`}
          >
            {activeLot.paymentStatus || "Pending"}
          </div>
          <div className="text-xs text-slate-500 font-semibold mt-0.5">
            {activeLot.totalAmount ? `₹${activeLot.totalAmount.toLocaleString()}` : `Exp: ₹${activeLot.expectedPrice || 0}/q`}
          </div>
        </div>
      </div>

      {/* Prominent Visual Horizontal Process Timeline matching reference */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Mandi Journey Checkpoints
            </h2>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Transparent step-by-step progress verified by APMC market officers.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-[#EA8F0B] border border-amber-200">
            Active: {activeLot.currentStage}
          </span>
        </div>

        {/* Stepper bar */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[720px] flex items-center justify-between relative px-4">
            <div className="absolute left-8 right-8 top-5 h-[3px] bg-slate-200 -z-0" />

            {MANDI_STAGES_CONFIG.map((stage, idx) => {
              const isCompleted = idx < resolvedStageIndex;
              const isCurrent = idx === resolvedStageIndex;
              const Icon = stage.icon;

              return (
                <div
                  key={stage.id}
                  className="relative z-10 flex flex-col items-center group text-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xs ${
                      isCompleted
                        ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                        : isCurrent
                        ? "bg-[#EA8F0B] text-white ring-4 ring-amber-100 scale-110 animate-bounce-subtle"
                        : "bg-white border-2 border-slate-300 text-slate-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={18} strokeWidth={2.6} />
                    ) : (
                      <Icon size={18} strokeWidth={2.2} />
                    )}
                  </div>

                  <span
                    className={`text-xs font-black mt-2 whitespace-nowrap ${
                      isCompleted
                        ? "text-emerald-800"
                        : isCurrent
                        ? "text-[#EA8F0B]"
                        : "text-slate-500"
                    }`}
                  >
                    {stage.label}
                  </span>

                  <span className="text-[10px] text-slate-400 font-semibold mt-0.5">
                    {isCompleted
                      ? "Completed"
                      : isCurrent
                      ? "In Progress"
                      : "Pending"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Checkpoint Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase">1. Gate Entry</div>
            <div className="text-xs font-black text-slate-900">Passed Entry Gate</div>
            <div className="text-[11px] text-slate-500 font-medium">
              Verified by APMC Gate Security
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase">2. Quality Check</div>
            <div className="text-xs font-black text-slate-900">
              {activeLot.qualityGrade || (resolvedStageIndex > 2 ? "Grade A" : "Pending Assaying")}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Standard moisture & size certified
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase">3. Auction & Weighing</div>
            <div className="text-xs font-black text-slate-900">
              {activeLot.finalPrice
                ? `₹${activeLot.finalPrice}/q &bull; ${activeLot.buyerName || "Mandi Trader"}`
                : "Awaiting Auction Call"}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Net wt: {activeLot.actualWeight || activeLot.quantity} {activeLot.unit}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase">4. Settlement & Exit</div>
            <div className="text-xs font-black text-slate-900">
              {activeLot.exitStatus || "In Mandi Premises"}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Ref: {activeLot.paymentRef || "Pending Bank Transfer"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
