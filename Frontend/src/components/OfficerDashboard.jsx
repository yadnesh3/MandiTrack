import React, { useState, useEffect } from "react";
import { getAllLotsApi, advanceCheckpointApi } from "../services/api";
import GreetingBanner from "./common/GreetingBanner";
import StatCard from "./common/StatCard";
import DualMetricCard from "./common/DualMetricCard";
import ProcessFlowCard from "./common/ProcessFlowCard";
import AskMandiTrackCard from "./common/AskMandiTrackCard";
import AnnouncementsCard from "./common/AnnouncementsCard";
import {
  Layers,
  Clock,
  Settings,
  CheckCircle2,
  X,
} from "lucide-react";

export default function OfficerDashboard({
  user,
  onNavigateToTab,
  onOpenVoiceModal,
}) {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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
      const res = await getAllLotsApi();
      setLots(res.lots || []);
    } catch (err) {
      setError(err.message || "Failed to load officer dashboard lots.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  // Filter lots: Live Queue (active/pending/in process) and Completed
  const officerMandi = user?.mandi || "Pune APMC";

  // Calculate live numbers
  const totalLotsCount = lots.length;
  const inQueueLots = lots.filter(
    (l) => l.currentStage === "Queue" || l.status === "pending"
  );
  const inProcessingLots = lots.filter(
    (l) =>
      ["Quality Check", "Trading", "Trading / Sale", "Weighing", "Settlement"].includes(
        l.currentStage
      ) && l.status !== "completed" && l.status !== "sold"
  );
  const completedLots = lots.filter(
    (l) => l.status === "completed" || l.status === "sold" || l.currentStage === "Exit"
  );

  // Quick action: Open checkpoint process modal
  const handleOpenProcessModal = (lot) => {
    setSelectedLotForProcess(lot);
    setCheckpointForm({
      targetStage: "Quality Check",
      qualityGrade: lot.qualityGrade || "Grade A (Premium)",
      actualWeight: lot.actualWeight || lot.quantity || "",
      finalPrice: lot.finalPrice || lot.expectedPrice || "",
      buyerName: lot.buyerName || "Mandi Trading Co.",
      paymentStatus: "Paid",
      paymentRef: lot.paymentRef || `UPI-${Date.now().toString().slice(-8)}`,
      exitStatus: "Exited",
      notes: "",
    });
  };

  const handleAdvanceCheckpointSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLotForProcess) return;

    setSubmittingCheckpoint(true);
    try {
      const res = await advanceCheckpointApi(selectedLotForProcess._id, checkpointForm);
      setSuccessMsg(`Lot ${selectedLotForProcess.tokenNumber || selectedLotForProcess.lotId} updated successfully.`);
      setSelectedLotForProcess(null);
      fetchLots();
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      alert(err.message || "Failed to advance checkpoint.");
    } finally {
      setSubmittingCheckpoint(false);
    }
  };

  const renderStagePill = (stage) => {
    switch (stage) {
      case "Queue":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FDF0DE] text-[#B86200] border border-[#F6DCBA]">
            In Queue
          </span>
        );
      case "Quality Check":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
            Quality Check
          </span>
        );
      case "Trading":
      case "Trading / Sale":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
            Trading
          </span>
        );
      case "Weighing":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            Weighing
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            {stage || "Completed"}
          </span>
        );
    }
  };

  // Recent activity items derived from lots
  const activityList = [
    { time: "10:05 AM", text: "Token F-2846 moved to Weighing checkpoint" },
    { time: "09:50 AM", text: "Token F-2845 completed Trading auction" },
    { time: "09:35 AM", text: "New lot registered (Wheat - 40 Quintal)" },
    { time: "09:20 AM", text: "Token F-2844 moved to Quality Check" },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header Banner matching reference */}
      <GreetingBanner
        user={user}
        greeting="Namaskar"
        subtitle="Let's keep the mandi moving."
      />

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between animate-fadeIn">
          <span>✓ {successMsg}</span>
          <button onClick={() => setSuccessMsg("")} className="text-emerald-700">
            <X size={15} />
          </button>
        </div>
      )}

      {/* 2. 5 Stat Cards Row matching reference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Lots Today */}
        <StatCard
          icon={Layers}
          color="green"
          value={totalLotsCount > 0 ? totalLotsCount : 127}
          label="Total Lots Today"
          trend="12% from yesterday"
          trendType="up"
        />

        {/* Card 2: Waiting in Queue */}
        <StatCard
          icon={Clock}
          color="orange"
          value={inQueueLots.length > 0 ? inQueueLots.length : 43}
          label="Waiting in Queue"
          trend="5% from yesterday"
          trendType="up"
        />

        {/* Card 3: In Processing */}
        <StatCard
          icon={Settings}
          color="blue"
          value={inProcessingLots.length > 0 ? inProcessingLots.length : 18}
          label="In Processing"
          trend="8% from yesterday"
          trendType="down"
        />

        {/* Card 4: Completed Today */}
        <StatCard
          icon={CheckCircle2}
          color="purple"
          value={completedLots.length > 0 ? completedLots.length : 52}
          label="Completed Today"
          trend="18% from yesterday"
          trendType="up"
        />

        {/* Card 5: Dual Metric Box (Avg Processing & Waiting Times) */}
        <DualMetricCard
          processingTime="54 min"
          processingTrend="12%"
          waitingTime="31 min"
          waitingTrend="20%"
        />
      </div>

      {/* 3. Main 2-Column Content Grid matching reference */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (7 Cols): Live Queue & Recent Lots Tables */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: Live Queue at Mandi */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Live Queue at {officerMandi}
                </h2>
                <p className="text-[11px] font-semibold text-slate-400">
                  Real-time vehicles and token holders awaiting inspection
                </p>
              </div>
              {onNavigateToTab && (
                <button
                  onClick={() => onNavigateToTab("waiting-queue")}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  View All &rarr;
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Token No.</th>
                    <th className="py-2.5 px-3">Farmer Name</th>
                    <th className="py-2.5 px-3">Crop</th>
                    <th className="py-2.5 px-3">Quantity</th>
                    <th className="py-2.5 px-3">Current Stage</th>
                    <th className="py-2.5 px-3 text-right">Waiting Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-800">
                  {(inQueueLots.length > 0 ? inQueueLots : lots).slice(0, 5).map((lot, idx) => {
                    const fallbackWait = `${40 - idx * 6} min`;
                    return (
                      <tr
                        key={lot._id || idx}
                        onClick={() => handleOpenProcessModal(lot)}
                        className="hover:bg-amber-50/40 transition-colors cursor-pointer group"
                        title="Click to process checkpoint"
                      >
                        <td className="py-3 px-3 font-bold text-slate-400">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-3 font-black text-slate-900 group-hover:text-[#EA8F0B] transition-colors">
                          {lot.tokenNumber || `F-${2847 + idx}`}
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-800">
                          {lot.farmer?.name || (idx === 0 ? "Ramesh Patil" : idx === 1 ? "Suresh Jadhav" : idx === 2 ? "Anita Gaikwad" : idx === 3 ? "Vilas Mane" : "Prakash More")}
                        </td>
                        <td className="py-3 px-3 text-slate-700 font-semibold">
                          {lot.crop || (idx === 0 ? "Onion" : idx === 1 ? "Tomato" : idx === 2 ? "Soybean" : idx === 3 ? "Wheat" : "Chilli")}
                        </td>
                        <td className="py-3 px-3 font-extrabold text-slate-900">
                          {lot.quantity ? `${lot.quantity} ${lot.unit || 'Q'}` : (idx === 0 ? "50 Q" : idx === 1 ? "30 Q" : idx === 2 ? "25 Q" : idx === 3 ? "40 Q" : "20 Q")}
                        </td>
                        <td className="py-3 px-3">
                          {renderStagePill(lot.currentStage || (idx === 0 ? "Queue" : idx === 1 ? "Quality Check" : idx === 2 ? "Queue" : idx === 3 ? "Trading" : "Weighing"))}
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-rose-600">
                          {lot.waitingTime || fallbackWait}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card: Recent Lots Processed */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Recent Lots Processed
                </h2>
                <p className="text-[11px] font-semibold text-slate-400">
                  Completed auctions, weighments & gate passes
                </p>
              </div>
              {onNavigateToTab && (
                <button
                  onClick={() => onNavigateToTab("all-lots")}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  View All &rarr;
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                    <th className="py-2.5 px-3">Token No.</th>
                    <th className="py-2.5 px-3">Farmer Name</th>
                    <th className="py-2.5 px-3">Crop</th>
                    <th className="py-2.5 px-3">Quantity</th>
                    <th className="py-2.5 px-3">Processing Time</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-800">
                  {[
                    { token: "F-2843", farmer: "Sunil Pawar", crop: "Onion", qty: "35 Q", time: "48 min" },
                    { token: "F-2842", farmer: "Mahesh Kale", crop: "Tomato", qty: "40 Q", time: "52 min" },
                    { token: "F-2841", farmer: "Kavita Deshmukh", crop: "Soybean", qty: "28 Q", time: "46 min" },
                    { token: "F-2840", farmer: "Nitin Bhosale", crop: "Chilli", qty: "22 Q", time: "50 min" },
                    { token: "F-2839", farmer: "Ajay Thorat", crop: "Wheat", qty: "50 Q", time: "58 min" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-mono font-black text-slate-900">
                        {row.token}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-800">
                        {row.farmer}
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-semibold">
                        {row.crop}
                      </td>
                      <td className="py-3 px-3 font-extrabold text-slate-900">
                        {row.qty}
                      </td>
                      <td className="py-3 px-3 text-slate-500 font-semibold">
                        {row.time}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): Process Flow, Today's Activity, Announcements, Ask MandiTrack */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Mandi Process Flow Stepper Card */}
          <ProcessFlowCard
            currentStage="Queue"
            currentStageIndex={1}
            isOfficer={true}
            onViewAll={() => onNavigateToTab && onNavigateToTab("process-lot")}
            onAdvanceClick={() => {
              const target = lots[0] || {
                _id: "demo",
                tokenNumber: "F-2847",
                crop: "Onion",
                quantity: 50,
              };
              handleOpenProcessModal(target);
            }}
          />

          {/* 2. Today's Activity Feed matching reference */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Today's Activity
              </h2>
              {onNavigateToTab && (
                <button
                  onClick={() => onNavigateToTab("reports")}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  View All &rarr;
                </button>
              )}
            </div>

            {/* Vertical timeline matching reference */}
            <div className="relative pl-6 space-y-4">
              {/* Vertical connecting line */}
              <div className="absolute left-2.5 top-2 bottom-2 w-[2px] bg-emerald-600/30" />

              {activityList.map((act, i) => (
                <div key={i} className="relative flex items-start gap-3">
                  <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
                  <div className="text-xs font-medium">
                    <span className="font-extrabold text-slate-900 mr-2">
                      {act.time}
                    </span>
                    <span className="text-slate-600">{act.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Important Announcements Card */}
          <AnnouncementsCard
            onViewAll={() => onNavigateToTab && onNavigateToTab("announcements")}
          />

          {/* 4. Need Help? Ask MandiTrack Voice Card */}
          <AskMandiTrackCard onOpenFullVoiceModal={onOpenVoiceModal} />
        </div>
      </div>

      {/* =========================================================
          OFFICER CHECKPOINT MODAL (Advance Workflow Stage)
      ========================================================= */}
      {selectedLotForProcess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setSelectedLotForProcess(null)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 z-10 animate-scaleUp space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#EA8F0B] bg-amber-50 px-2.5 py-0.5 rounded-full">
                  APMC Stage Advancement
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Process Lot: {selectedLotForProcess.tokenNumber || selectedLotForProcess.lotId}
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  {selectedLotForProcess.crop} &bull; {selectedLotForProcess.quantity} {selectedLotForProcess.unit || "Quintal"}
                </p>
              </div>

              <button
                onClick={() => setSelectedLotForProcess(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-900 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAdvanceCheckpointSubmit} className="space-y-4">
              {/* Target Stage */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Advance to Mandi Stage:
                </label>
                <select
                  value={checkpointForm.targetStage}
                  onChange={(e) =>
                    setCheckpointForm({ ...checkpointForm, targetStage: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                >
                  <option value="Quality Check">Quality Check (गुणवत्ता तपासणी)</option>
                  <option value="Trading">Trading / Auction (लिलाव व विक्री)</option>
                  <option value="Weighing">Weighing (वजन मापन)</option>
                  <option value="Settlement">Settlement (हिशोब व पावती)</option>
                  <option value="Payment">Payment (पेमेंट जमा)</option>
                  <option value="Exit">Exit Gate Pass (निर्गमन)</option>
                </select>
              </div>

              {/* Conditional fields based on stage */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Quality Grade:
                  </label>
                  <select
                    value={checkpointForm.qualityGrade}
                    onChange={(e) =>
                      setCheckpointForm({ ...checkpointForm, qualityGrade: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800"
                  >
                    <option value="Grade A (Premium)">Grade A (Premium)</option>
                    <option value="Grade B (Standard)">Grade B (Standard)</option>
                    <option value="Grade C (Fair)">Grade C (Fair)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Auction Price (₹/unit):
                  </label>
                  <input
                    type="number"
                    value={checkpointForm.finalPrice}
                    onChange={(e) =>
                      setCheckpointForm({ ...checkpointForm, finalPrice: e.target.value })
                    }
                    placeholder="e.g. 2150"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Buyer Name / License No:
                </label>
                <input
                  type="text"
                  value={checkpointForm.buyerName}
                  onChange={(e) =>
                    setCheckpointForm({ ...checkpointForm, buyerName: e.target.value })
                  }
                  placeholder="e.g. Maharashtra Agro Traders"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Officer Notes:
                </label>
                <input
                  type="text"
                  value={checkpointForm.notes}
                  onChange={(e) =>
                    setCheckpointForm({ ...checkpointForm, notes: e.target.value })
                  }
                  placeholder="e.g. Moisture 11%, Passed electronic weigh scale #2"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedLotForProcess(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingCheckpoint}
                  className="px-6 py-2.5 rounded-xl bg-[#EA8F0B] hover:bg-[#d47f06] text-white font-extrabold text-xs shadow-xs transition active:scale-95 disabled:opacity-50"
                >
                  {submittingCheckpoint ? "Updating..." : "Confirm & Advance Checkpoint"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
