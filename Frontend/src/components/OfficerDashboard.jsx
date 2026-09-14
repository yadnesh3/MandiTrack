import React, { useState, useEffect } from "react";
import { getAllLotsApi, advanceCheckpointApi, updateLotStatusApi } from "../services/api";
import MandiPriceInfo from "./MandiPriceInfo";
import { useLang } from "../context/LanguageContext";
import {
  Building2,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Scale,
  CreditCard,
  LogOut,
  TrendingUp,
  Filter,
  Check,
  X,
  Play,
  ArrowRight,
  ShieldCheck,
  Search,
} from "lucide-react";

const STAGES = [
  "Gate Entry",
  "Token / Lot ID",
  "Queue",
  "Quality Check",
  "Trading / Sale",
  "Weighing",
  "Settlement",
  "Payment",
  "Exit",
];

export default function OfficerDashboard({ user }) {
  const { t, tUnit, locale } = useLang();

  const [activeNavTab, setActiveNavTab] = useState("lots"); // "lots" | "prices"
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Filters
  const [stageFilter, setStageFilter] = useState("all"); // "all" | stage name | "delayed"
  const [searchQuery, setSearchQuery] = useState("");

  // Checkpoint Modal
  const [selectedLotForProcess, setSelectedLotForProcess] = useState(null);
  const [checkpointForm, setCheckpointForm] = useState({
    targetStage: "",
    qualityGrade: "Grade A (Premium)",
    actualWeight: "",
    finalPrice: "",
    buyerName: "",
    paymentStatus: "Paid",
    paymentRef: "",
    exitStatus: "Exited",
    notes: "",
  });
  const [submittingCheckpoint, setSubmittingCheckpoint] = useState(false);

  const fetchLots = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getAllLotsApi();
      setLots(response.lots || []);
    } catch (err) {
      console.error("Officer fetch lots error:", err);
      setError(err.message || t("officerLoadFailed"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  // Quick action: Open checkpoint modal for a lot
  const handleOpenProcessModal = (lot) => {
    const currentIdx = STAGES.indexOf(lot.currentStage || "Queue");
    const nextIdx = currentIdx < STAGES.length - 1 ? currentIdx + 1 : currentIdx;
    const nextStage = STAGES[nextIdx];

    setSelectedLotForProcess(lot);
    setCheckpointForm({
      targetStage: nextStage,
      qualityGrade: lot.qualityGrade || "Grade A (Premium)",
      actualWeight: lot.actualWeight || lot.quantity || "",
      finalPrice: lot.finalPrice || lot.expectedPrice || "",
      buyerName: lot.buyerName || "",
      paymentStatus: lot.paymentStatus === "Paid" ? "Paid" : "Paid",
      paymentRef: lot.paymentRef || `UPI-${Date.now().toString().slice(-8)}`,
      exitStatus: "Exited",
      notes: "",
    });
  };

  const handleAdvanceSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLotForProcess) return;

    setSubmittingCheckpoint(true);
    setError("");
    setSuccessMsg("");

    try {
      const payload = {
        nextStage: checkpointForm.targetStage,
        notes: checkpointForm.notes,
      };

      if (checkpointForm.targetStage === "Quality Check") {
        payload.qualityGrade = checkpointForm.qualityGrade;
      }
      if (checkpointForm.targetStage === "Trading / Sale") {
        payload.finalPrice = Number(checkpointForm.finalPrice);
        payload.buyerName = checkpointForm.buyerName;
      }
      if (checkpointForm.targetStage === "Weighing") {
        payload.actualWeight = Number(checkpointForm.actualWeight);
      }
      if (checkpointForm.targetStage === "Settlement") {
        payload.actualWeight = Number(checkpointForm.actualWeight || selectedLotForProcess.actualWeight || selectedLotForProcess.quantity);
        payload.finalPrice = Number(checkpointForm.finalPrice || selectedLotForProcess.finalPrice || selectedLotForProcess.expectedPrice);
      }
      if (checkpointForm.targetStage === "Payment") {
        payload.paymentStatus = checkpointForm.paymentStatus;
        payload.paymentRef = checkpointForm.paymentRef;
      }
      if (checkpointForm.targetStage === "Exit") {
        payload.exitStatus = checkpointForm.exitStatus;
      }

      const res = await advanceCheckpointApi(selectedLotForProcess._id, payload);

      setLots((prev) =>
        prev.map((l) => (l._id === selectedLotForProcess._id ? res.lot : l))
      );

      setSuccessMsg(`✅ Lot #${selectedLotForProcess.lotId || selectedLotForProcess._id.slice(-6)} advanced to ${checkpointForm.targetStage}`);
      setSelectedLotForProcess(null);
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      console.error("Checkpoint advance error:", err);
      setError(err.message || "Failed to update checkpoint. Please verify authorization.");
    } finally {
      setSubmittingCheckpoint(false);
    }
  };

  // Delayed lots count
  const delayedLots = lots.filter((l) => l.delayed);

  // Filtered lots
  const filteredLots = lots.filter((lot) => {
    if (stageFilter === "delayed") {
      return lot.delayed;
    }
    if (stageFilter !== "all" && lot.currentStage !== stageFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCrop = lot.crop?.toLowerCase().includes(q);
      const matchFarmer = lot.farmer?.name?.toLowerCase().includes(q);
      const matchLotId = lot.lotId?.toLowerCase().includes(q);
      const matchToken = lot.tokenNumber?.toLowerCase().includes(q);
      return matchCrop || matchFarmer || matchLotId || matchToken;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Officer Welcome & Location Restriction Header */}
      <div className="bg-gradient-to-r from-[#0E2A3F] via-[#123954] to-[#0A2131] text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#D9A227]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
              <ShieldCheck size={14} />
              {t("officerPortal")}
            </span>

            {user.mandi ? (
              <span className="text-xs text-white font-bold bg-emerald-600/60 px-3 py-1 rounded-full border border-emerald-400/40 flex items-center gap-1">
                <MapPin size={12} className="text-emerald-300" />
                {t("assignedMandi")}: {user.mandi}
              </span>
            ) : (
              <span className="text-xs text-slate-300 font-semibold bg-white/10 px-3 py-1 rounded-full">
                All APMC Mandis
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
            {t("officerTitle")} &bull; {user.name}
          </h1>
          <p className="text-slate-300 text-sm mt-1.5 max-w-xl leading-relaxed">
            {t("officerSubtext")} Enforcing checkpoint verification from gate entry to exit.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {lots.length > 0 && (
            <button
              onClick={() => {
                const nextLot = lots.find((l) => l.currentStage !== "Exit" && l.status !== "sold");
                if (nextLot) handleOpenProcessModal(nextLot);
              }}
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-2 text-xs"
            >
              <Play size={14} fill="currentColor" />
              {t("processNextStageBtn")}
            </button>
          )}

          <button
            onClick={fetchLots}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-white/20"
          >
            🔄 {t("refresh")}
          </button>
        </div>
      </div>

      {/* Delayed Alert Banner */}
      {delayedLots.length > 0 && (
        <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300/80 flex items-center justify-between gap-4 text-amber-900 text-xs">
          <div className="flex items-center gap-2.5">
            <AlertTriangle size={18} className="text-amber-600 shrink-0" />
            <span>
              <strong>{delayedLots.length} delayed produce lot(s)</strong> require checkpoint attention.
            </span>
          </div>
          <button
            onClick={() => setStageFilter("delayed")}
            className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition"
          >
            Filter Delayed
          </button>
        </div>
      )}

      {/* Messages */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 size={18} className="text-emerald-600" />
          {successMsg}
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 rounded-2xl border border-red-300 text-red-800 text-sm font-semibold flex items-center gap-2 animate-fadeIn">
          <AlertTriangle size={18} className="text-red-600" />
          {error}
        </div>
      )}

      {/* Nav Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveNavTab("lots")}
          className={`pb-3 text-sm font-bold transition-colors flex items-center gap-2 ${
            activeNavTab === "lots"
              ? "border-b-2 border-[#0E2A3F] text-[#0E2A3F]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          🏛️ {t("allLots")} ({lots.length})
        </button>
        <button
          onClick={() => setActiveNavTab("prices")}
          className={`pb-3 text-sm font-bold transition-colors flex items-center gap-2 ${
            activeNavTab === "prices"
              ? "border-b-2 border-[#0E2A3F] text-[#0E2A3F]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          📊 {t("mandiPricesTitle")}
        </button>
      </div>

      {activeNavTab === "prices" ? (
        <MandiPriceInfo />
      ) : (
        <>
          {/* Workflow Stage Filter Pills */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                Filter by Mandi Stage:
              </span>

              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lot ID, farmer, crop..."
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs w-60 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setStageFilter("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  stageFilter === "all"
                    ? "bg-[#0E2A3F] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All ({lots.length})
              </button>

              {STAGES.map((stg) => {
                const count = lots.filter((l) => l.currentStage === stg).length;
                return (
                  <button
                    key={stg}
                    onClick={() => setStageFilter(stg)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      stageFilter === stg
                        ? "bg-[#0E2A3F] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <span>{stg}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        stageFilter === stg ? "bg-amber-400 text-slate-950 font-black" : "bg-slate-200"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}

              {delayedLots.length > 0 && (
                <button
                  onClick={() => setStageFilter("delayed")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    stageFilter === "delayed"
                      ? "bg-red-700 text-white"
                      : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                  }`}
                >
                  <AlertTriangle size={12} />
                  <span>Delayed ({delayedLots.length})</span>
                </button>
              )}
            </div>
          </div>

          {/* Lots Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
            {loading ? (
              <div className="p-12 text-center text-slate-500 text-sm">
                {t("loading")}
              </div>
            ) : filteredLots.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-sm">
                No lots found for the selected filter in your mandi.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b text-xs uppercase font-bold text-slate-500 tracking-wider">
                      <th className="py-3.5 px-4">Lot & Token</th>
                      <th className="py-3.5 px-4">Farmer Details</th>
                      <th className="py-3.5 px-4">Produce</th>
                      <th className="py-3.5 px-4">Current Stage</th>
                      <th className="py-3.5 px-4">Inspection / Trade</th>
                      <th className="py-3.5 px-4 text-center">Status</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLots.map((lot) => (
                      <tr key={lot._id} className="hover:bg-slate-50/80 transition">
                        {/* Lot & Token */}
                        <td className="py-4 px-4">
                          <div className="font-mono font-bold text-slate-900 text-xs">
                            {lot.lotId || `LOT-${lot._id.slice(-6)}`}
                          </div>
                          {lot.tokenNumber && (
                            <div className="font-mono text-[11px] text-amber-800 font-semibold">
                              Token #{lot.tokenNumber}
                            </div>
                          )}
                          {lot.delayed && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-full">
                              Delayed
                            </span>
                          )}
                        </td>

                        {/* Farmer Details */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-800 text-xs">
                            {lot.farmer?.name || "Farmer"}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {lot.farmer?.mobile}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin size={11} className="text-slate-400" />
                            {lot.mandi}
                          </div>
                        </td>

                        {/* Produce */}
                        <td className="py-4 px-4">
                          <div className="font-semibold text-slate-900 text-xs">
                            {lot.crop}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {lot.quantity} {lot.unit}
                          </div>
                          <div className="text-[11px] text-emerald-800 font-bold">
                            ₹{lot.expectedPrice} / {lot.unit}
                          </div>
                        </td>

                        {/* Current Stage */}
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 font-bold text-xs">
                            {lot.currentStage || "Queue"}
                          </span>
                          <div className="text-[10px] text-slate-400 mt-1">
                            Queue #{lot.queueNumber || 1}
                          </div>
                        </td>

                        {/* Inspection / Trade details */}
                        <td className="py-4 px-4 text-xs space-y-0.5">
                          {lot.qualityGrade && (
                            <div className="text-slate-700">
                              Grade: <strong>{lot.qualityGrade}</strong>
                            </div>
                          )}
                          {lot.finalPrice && (
                            <div className="text-emerald-800 font-semibold">
                              Rate: ₹{lot.finalPrice}
                            </div>
                          )}
                          {lot.actualWeight && (
                            <div className="text-slate-600">
                              Weight: {lot.actualWeight} {lot.unit}
                            </div>
                          )}
                          {lot.paymentStatus && (
                            <div className="text-blue-700 font-semibold">
                              Pay: {lot.paymentStatus}
                            </div>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4 text-center">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              lot.status === "approved" || lot.status === "sold" || lot.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : lot.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {lot.status}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => handleOpenProcessModal(lot)}
                            className="px-3.5 py-2 bg-[#0E2A3F] hover:bg-[#163c5a] text-white text-xs font-bold rounded-xl shadow-xs transition active:scale-95 flex items-center gap-1.5 ml-auto border border-[#D9A227]/30"
                          >
                            <span>Process Stage</span>
                            <ArrowRight size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Checkpoint Advancement Modal */}
      {selectedLotForProcess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FBF8EF] border-2 border-[#D9A227]/40 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#0E2A3F] text-white px-6 py-5 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-amber-300">
                  Mandi Checkpoint Verification
                </span>
                <h3 className="text-lg font-bold">
                  {selectedLotForProcess.crop} &bull; {selectedLotForProcess.lotId || selectedLotForProcess._id.slice(-6)}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLotForProcess(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAdvanceSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* Lot Summary Header */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Farmer:</span>
                  <span className="font-bold text-slate-800">{selectedLotForProcess.farmer?.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Mandi:</span>
                  <span className="font-bold text-slate-800">{selectedLotForProcess.mandi}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Current Stage:</span>
                  <span className="font-bold text-emerald-800">{selectedLotForProcess.currentStage || "Queue"}</span>
                </div>
              </div>

              {/* Target Stage Selector */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  Advance to Stage:
                </label>
                <select
                  value={checkpointForm.targetStage}
                  onChange={(e) => setCheckpointForm({ ...checkpointForm, targetStage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {STAGES.map((stg) => (
                    <option key={stg} value={stg}>
                      {stg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic Inputs based on Target Stage */}
              {checkpointForm.targetStage === "Quality Check" && (
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    Official Quality Grade:
                  </label>
                  <select
                    value={checkpointForm.qualityGrade}
                    onChange={(e) => setCheckpointForm({ ...checkpointForm, qualityGrade: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                  >
                    <option value="Grade A (Premium Export)">Grade A (Premium Export Quality)</option>
                    <option value="Grade B (Standard Market)">Grade B (Standard Market Quality)</option>
                    <option value="Grade C (Processing Grade)">Grade C (Processing / Domestic Grade)</option>
                  </select>
                </div>
              )}

              {checkpointForm.targetStage === "Trading / Sale" && (
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Agreed Final Sale Price (₹ per {selectedLotForProcess.unit}):
                    </label>
                    <input
                      type="number"
                      required
                      value={checkpointForm.finalPrice}
                      onChange={(e) => setCheckpointForm({ ...checkpointForm, finalPrice: e.target.value })}
                      placeholder="e.g. 2450"
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Buyer / Merchant Name:
                    </label>
                    <input
                      type="text"
                      value={checkpointForm.buyerName}
                      onChange={(e) => setCheckpointForm({ ...checkpointForm, buyerName: e.target.value })}
                      placeholder="e.g. Sahyadri Agro Traders"
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                </div>
              )}

              {checkpointForm.targetStage === "Weighing" && (
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Certified Electronic Net Weight ({selectedLotForProcess.unit}):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={checkpointForm.actualWeight}
                    onChange={(e) => setCheckpointForm({ ...checkpointForm, actualWeight: e.target.value })}
                    placeholder={`e.g. ${selectedLotForProcess.quantity}`}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
              )}

              {checkpointForm.targetStage === "Payment" && (
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Payment Status:
                    </label>
                    <select
                      value={checkpointForm.paymentStatus}
                      onChange={(e) => setCheckpointForm({ ...checkpointForm, paymentStatus: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                    >
                      <option value="Paid">Paid (Direct Account / UPI Credited)</option>
                      <option value="Processing">Processing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Payment Reference ID / UTR:
                    </label>
                    <input
                      type="text"
                      value={checkpointForm.paymentRef}
                      onChange={(e) => setCheckpointForm({ ...checkpointForm, paymentRef: e.target.value })}
                      placeholder="e.g. UPI-BANK-12345678"
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                </div>
              )}

              {checkpointForm.targetStage === "Exit" && (
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Exit Gate Pass Verification:
                  </label>
                  <select
                    value={checkpointForm.exitStatus}
                    onChange={(e) => setCheckpointForm({ ...checkpointForm, exitStatus: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                  >
                    <option value="Exited">Gate Pass Verified & Exited</option>
                    <option value="Gate Pass Issued">Gate Pass Issued (Vehicle Queuing to Exit)</option>
                  </select>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Checkpoint Inspection Notes:
                </label>
                <textarea
                  rows={2}
                  value={checkpointForm.notes}
                  onChange={(e) => setCheckpointForm({ ...checkpointForm, notes: e.target.value })}
                  placeholder="Enter any relevant officer remarks..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedLotForProcess(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingCheckpoint}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
                >
                  {submittingCheckpoint ? "Updating Checkpoint..." : "Confirm & Advance Stage"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
