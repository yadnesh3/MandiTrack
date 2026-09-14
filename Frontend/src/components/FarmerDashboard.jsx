import React, { useState, useEffect } from "react";
import { getMyLotsApi } from "../services/api";
import AddLotModal from "./AddLotModal";
import MandiPriceInfo from "./MandiPriceInfo";
import VoiceHelpModal from "./VoiceHelpModal";
import { useLang } from "../context/LanguageContext";
import {
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Volume2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Scale,
  CreditCard,
  LogOut,
  Award,
  CircleDot,
} from "lucide-react";

const STAGES = [
  { id: "Gate Entry", labelEn: "Gate Entry", labelMr: "गेट प्रवेश" },
  { id: "Token / Lot ID", labelEn: "Token / Lot ID", labelMr: "टोकन / लॉट" },
  { id: "Queue", labelEn: "Queue", labelMr: "प्रतीक्षा रांग" },
  { id: "Quality Check", labelEn: "Quality Check", labelMr: "गुणवत्ता तपासणी" },
  { id: "Trading / Sale", labelEn: "Trading / Sale", labelMr: "लिलाव व विक्री" },
  { id: "Weighing", labelEn: "Weighing", labelMr: "वजन मापन" },
  { id: "Settlement", labelEn: "Settlement", labelMr: "हिशोब व पावती" },
  { id: "Payment", labelEn: "Payment", labelMr: "पेमेंट जमा" },
  { id: "Exit", labelEn: "Exit", labelMr: "गेट पास / निर्गमन" },
];

export default function FarmerDashboard({ user }) {
  const { t, tUnit, locale } = useLang();

  const [activeTab, setActiveTab] = useState("lots"); // "lots" | "prices"
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [expandedLotId, setExpandedLotId] = useState(null);

  const fetchLots = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getMyLotsApi();
      setLots(response.lots || []);
    } catch (err) {
      setError(err.message || t("loadFailed"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  const handleLotCreated = (newLot) => {
    setLots((prev) => [newLot, ...prev]);
  };

  const toggleExpand = (lotId) => {
    setExpandedLotId((prev) => (prev === lotId ? null : lotId));
  };

  // Helper status badge
  const renderStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-600"></span>
            {t("approved")}
          </span>
        );
      case "sold":
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            {t("soldCompleted")}
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold border border-red-200">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            {t("rejected")}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold border border-yellow-200">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            {t("pending")}
          </span>
        );
    }
  };

  // Stats
  const inQueueCount = lots.filter((l) => l.currentStage === "Queue" || l.status === "pending").length;
  const inProcessCount = lots.filter(
    (l) => ["Quality Check", "Trading / Sale", "Weighing", "Settlement"].includes(l.currentStage)
  ).length;
  const soldCount = lots.filter((l) => l.status === "sold" || l.status === "completed" || l.currentStage === "Payment" || l.currentStage === "Exit").length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#064e3b] via-[#0E2A3F] to-[#0A2131] text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#D9A227]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-emerald-200 font-bold bg-white/10 px-3 py-1 rounded-full border border-white/20">
              {t("farmerPortal")}
            </span>
            {user.mandi && (
              <span className="text-xs text-amber-300 font-semibold bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1">
                <MapPin size={12} /> {user.mandi}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
            {t("welcomeFarmer")}, {user.name}!
          </h1>
          <p className="text-emerald-100 text-sm mt-1.5 max-w-xl leading-relaxed">
            📱 {user.mobile} &bull; {t("farmerSubtext")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Voice Guide Button */}
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="flex-1 sm:flex-initial px-4 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-2 text-xs"
          >
            <Volume2 size={16} />
            {t("voiceHelpBtn")}
          </button>

          {/* Add Produce Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 sm:flex-initial px-5 py-3 bg-white text-emerald-950 hover:bg-emerald-50 font-bold rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-2 text-xs"
          >
            {t("addProduceBtn")}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab("lots")}
          className={`pb-3 text-sm font-bold transition-colors flex items-center gap-2 ${
            activeTab === "lots"
              ? "border-b-2 border-emerald-700 text-emerald-900"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Package size={16} />
          {t("myProduceLots")} ({lots.length})
        </button>
        <button
          onClick={() => setActiveTab("prices")}
          className={`pb-3 text-sm font-bold transition-colors flex items-center gap-2 ${
            activeTab === "prices"
              ? "border-b-2 border-emerald-700 text-emerald-900"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <TrendingUp size={16} />
          {t("mandiPricesTitle")}
        </button>
      </div>

      {activeTab === "prices" ? (
        <MandiPriceInfo />
      ) : (
        <>
          {/* Summary Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t("totalSubmitted")}
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">
                {lots.length}
              </div>
              <div className="text-xs text-slate-400 mt-1">Total Lots</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-yellow-200 shadow-xs bg-yellow-50/20">
              <div className="text-xs font-bold uppercase tracking-wider text-yellow-700">
                In Mandi Queue
              </div>
              <div className="text-3xl font-extrabold text-yellow-800 mt-1">
                {inQueueCount}
              </div>
              <div className="text-xs text-yellow-700 font-medium mt-1">Awaiting Inspection</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-xs bg-blue-50/20">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                In Grading / Trade
              </div>
              <div className="text-3xl font-extrabold text-blue-800 mt-1">
                {inProcessCount}
              </div>
              <div className="text-xs text-blue-700 font-medium mt-1">Active Trading</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-green-200 shadow-xs bg-green-50/20">
              <div className="text-xs font-bold uppercase tracking-wider text-green-700">
                {t("soldCompleted")}
              </div>
              <div className="text-3xl font-extrabold text-green-800 mt-1">
                {soldCount}
              </div>
              <div className="text-xs text-green-700 font-medium mt-1">Paid / Finalized</div>
            </div>
          </div>

          {/* Lots Card List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{t("myProduceLots")}</h2>
                <p className="text-xs text-slate-500">{t("myLotsSubtext")}</p>
              </div>
              <button
                onClick={fetchLots}
                className="px-3.5 py-1.5 border rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition flex items-center gap-1.5"
              >
                🔄 {t("refresh")}
              </button>
            </div>

            {loading ? (
              <div className="p-12 text-center text-slate-500 text-sm bg-white rounded-3xl border">
                {t("loading")}
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-600 text-sm bg-red-50 rounded-3xl border border-red-200">
                {error}
              </div>
            ) : lots.length === 0 ? (
              <div className="p-12 text-center max-w-md mx-auto space-y-3 bg-white rounded-3xl border border-slate-200 shadow-xs">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
                  🌾
                </div>
                <h3 className="font-bold text-slate-800 text-base">{t("noLotsTitle")}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t("noLotsSubtext")}
                </p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  {t("addProduceBtn")}
                </button>
              </div>
            ) : (
              lots.map((lot) => {
                const isExpanded = expandedLotId === lot._id;
                const stageIdx = lot.currentStageIndex ?? 2;
                const progressPct = Math.round(((stageIdx + 1) / 9) * 100);

                return (
                  <div
                    key={lot._id}
                    className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden transition hover:border-slate-300"
                  >
                    {/* Lot Main Header Row */}
                    <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Identifiers & Crop */}
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-black bg-slate-900 text-amber-400 px-2.5 py-1 rounded-lg">
                            {lot.lotId || `LOT-${lot._id.slice(-6)}`}
                          </span>
                          {lot.tokenNumber && (
                            <span className="font-mono text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-lg">
                              Token #{lot.tokenNumber}
                            </span>
                          )}
                          <span className="text-xs text-slate-400 font-medium">
                            {new Date(lot.createdAt).toLocaleDateString(locale, {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-extrabold text-slate-900">
                            {lot.crop}
                          </h3>
                          <span className="text-sm font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                            {lot.quantity} {tUnit(lot.unit)}
                          </span>
                        </div>

                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin size={13} className="text-slate-400" />
                          <span>{lot.mandi}</span>
                          <span className="mx-1.5 text-slate-300">&bull;</span>
                          <span>Expected: ₹{Number(lot.expectedPrice).toLocaleString(locale)}/{tUnit(lot.unit)}</span>
                        </div>
                      </div>

                      {/* Right: Stage & Queue Information */}
                      <div className="flex flex-wrap items-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0">
                        {/* Current Stage Indicator */}
                        <div className="text-left lg:text-right space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            {t("currentStageLabel")}
                          </span>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-xs">
                            <CircleDot size={12} className="text-emerald-600 animate-pulse" />
                            {lot.currentStage || "Queue"}
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="text-left lg:text-right">
                          {renderStatusBadge(lot.status)}
                        </div>

                        {/* View Timeline Toggle */}
                        <button
                          onClick={() => toggleExpand(lot._id)}
                          className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 font-bold text-xs text-slate-700 flex items-center gap-1.5 transition active:scale-95 shrink-0 ml-auto lg:ml-0"
                        >
                          {isExpanded ? (
                            <>
                              <span>Hide Timeline</span>
                              <ChevronUp size={16} />
                            </>
                          ) : (
                            <>
                              <span>{t("stageTimeline")}</span>
                              <ChevronDown size={16} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="px-5 sm:px-6 pb-4">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1">
                        <span>Workflow Progress: Step {stageIdx + 1} of 9</span>
                        <span className="font-bold text-emerald-800">{progressPct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 via-emerald-600 to-emerald-700 rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Expandable 9-Stage Mandi Process Timeline */}
                    {isExpanded && (
                      <div className="border-t-2 border-slate-100 bg-[#FBF8EF] p-5 sm:p-7 space-y-6 animate-fadeIn">
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                            <Clock size={16} className="text-amber-600" />
                            {t("stageTimeline")}
                          </h4>
                          <span className="text-xs text-slate-500">
                            Queue Position: #{lot.queueNumber || 1}
                          </span>
                        </div>

                        {/* 9 Stage Step Timeline */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-3">
                          {STAGES.map((stg, idx) => {
                            const isPast = idx < stageIdx;
                            const isCurrent = idx === stageIdx;
                            const isFuture = idx > stageIdx;

                            return (
                              <div
                                key={stg.id}
                                className={`p-3 rounded-2xl border flex flex-col justify-between transition ${
                                  isCurrent
                                    ? "bg-white border-emerald-600 ring-2 ring-emerald-600/30 shadow-sm"
                                    : isPast
                                    ? "bg-emerald-50/50 border-emerald-200"
                                    : "bg-white/40 border-slate-200 opacity-60"
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span
                                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                                        isPast
                                          ? "bg-emerald-600 text-white"
                                          : isCurrent
                                          ? "bg-amber-500 text-slate-950 animate-pulse"
                                          : "bg-slate-200 text-slate-500"
                                      }`}
                                    >
                                      {isPast ? "✓" : idx + 1}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400">
                                      {isPast
                                        ? t("checkpointCompleted")
                                        : isCurrent
                                        ? t("checkpointCurrent")
                                        : t("checkpointPending")}
                                    </span>
                                  </div>
                                  <div className="font-bold text-xs text-slate-800">
                                    {locale === "mr" ? stg.labelMr : stg.labelEn}
                                  </div>
                                </div>

                                {/* Step specific outcomes */}
                                <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-600">
                                  {idx === 0 && (
                                    <span>Gate entry verified</span>
                                  )}
                                  {idx === 1 && (
                                    <span>{lot.tokenNumber || "Token issued"}</span>
                                  )}
                                  {idx === 2 && (
                                    <span>Queue #{lot.queueNumber || 1}</span>
                                  )}
                                  {idx === 3 && (
                                    <span>{lot.qualityGrade ? `Grade: ${lot.qualityGrade}` : "Inspection"}</span>
                                  )}
                                  {idx === 4 && (
                                    <span>{lot.finalPrice ? `₹${lot.finalPrice}` : "Bidding rate"}</span>
                                  )}
                                  {idx === 5 && (
                                    <span>{lot.actualWeight ? `${lot.actualWeight} q` : "Certified wt"}</span>
                                  )}
                                  {idx === 6 && (
                                    <span>{lot.totalAmount ? `₹${lot.totalAmount}` : "Trade bill"}</span>
                                  )}
                                  {idx === 7 && (
                                    <span className="font-bold text-emerald-800">
                                      {lot.paymentStatus || "Pending"}
                                    </span>
                                  )}
                                  {idx === 8 && (
                                    <span>{lot.exitStatus || "Waiting"}</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Detailed Checkpoint Result Summary Card */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                          <div>
                            <span className="text-slate-400 block">{t("qualityGrade")}</span>
                            <span className="font-bold text-slate-800 text-sm">
                              {lot.qualityGrade || "Pending Inspection"}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">{t("actualWeight")}</span>
                            <span className="font-bold text-slate-800 text-sm">
                              {lot.actualWeight ? `${lot.actualWeight} ${lot.unit}` : "Awaiting Weighbridge"}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">{t("finalPrice")}</span>
                            <span className="font-bold text-emerald-800 text-sm">
                              {lot.finalPrice ? `₹${lot.finalPrice} / ${lot.unit}` : "Awaiting Auction"}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">{t("paymentStatus")}</span>
                            <span
                              className={`font-bold text-sm ${
                                lot.paymentStatus === "Paid"
                                  ? "text-emerald-700"
                                  : "text-amber-700"
                              }`}
                            >
                              {lot.paymentStatus || "Pending"}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* Add Produce Modal */}
      <AddLotModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onLotCreated={handleLotCreated}
      />

      {/* Voice Help Modal */}
      <VoiceHelpModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
    </div>
  );
}
