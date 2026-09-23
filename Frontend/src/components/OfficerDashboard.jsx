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
  RefreshCw,
  Activity,
  ArrowRight,
  ClipboardCheck,
  Scale,
  IndianRupee,
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

  const officerMandi = user?.mandi || "Pune APMC";

  // --------------------------------------------------
  // LOT COUNTS
  // --------------------------------------------------

  const totalLotsCount = lots.length;

  const inQueueLots = lots.filter(
    (l) => l.currentStage === "Queue" || l.status === "pending"
  );

  const inProcessingLots = lots.filter(
    (l) =>
      [
        "Quality Check",
        "Trading",
        "Trading / Sale",
        "Weighing",
        "Settlement",
      ].includes(l.currentStage) &&
      l.status !== "completed" &&
      l.status !== "sold"
  );

  const completedLots = lots.filter(
    (l) =>
      l.status === "completed" ||
      l.status === "sold" ||
      l.currentStage === "Exit"
  );

  // --------------------------------------------------
  // CHECKPOINT MODAL
  // --------------------------------------------------

  const handleOpenProcessModal = (lot) => {
    setSelectedLotForProcess(lot);

    setCheckpointForm({
      targetStage: "Quality Check",
      qualityGrade: lot.qualityGrade || "Grade A (Premium)",
      actualWeight: lot.actualWeight || lot.quantity || "",
      finalPrice: lot.finalPrice || lot.expectedPrice || "",
      buyerName: lot.buyerName || "Mandi Trading Co.",
      paymentStatus: "Paid",
      paymentRef:
        lot.paymentRef || `UPI-${Date.now().toString().slice(-8)}`,
      exitStatus: "Exited",
      notes: "",
    });
  };

  const handleAdvanceCheckpointSubmit = async (e) => {
    e.preventDefault();

    if (!selectedLotForProcess) return;

    setSubmittingCheckpoint(true);

    try {
      await advanceCheckpointApi(
        selectedLotForProcess._id,
        checkpointForm
      );

      setSuccessMsg(
        `Lot ${
          selectedLotForProcess.tokenNumber ||
          selectedLotForProcess.lotId
        } updated successfully.`
      );

      setSelectedLotForProcess(null);

      fetchLots();

      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      alert(err.message || "Failed to advance checkpoint.");
    } finally {
      setSubmittingCheckpoint(false);
    }
  };

  // --------------------------------------------------
  // STAGE PILL
  // --------------------------------------------------

  const renderStagePill = (stage) => {
    switch (stage) {
      case "Queue":
        return (
          <span className="inline-flex items-center rounded-full border border-[#E8DDBF] bg-[#F5EFDE] px-2.5 py-1 text-[11px] font-semibold text-[#80672C]">
            In Queue
          </span>
        );

      case "Quality Check":
        return (
          <span className="inline-flex items-center rounded-full border border-[#CFE2D4] bg-[#EAF2E9] px-2.5 py-1 text-[11px] font-semibold text-[#285C3A]">
            Quality Check
          </span>
        );

      case "Trading":
      case "Trading / Sale":
        return (
          <span className="inline-flex items-center rounded-full border border-[#DAD3E5] bg-[#F1EEF6] px-2.5 py-1 text-[11px] font-semibold text-[#75658F]">
            Trading
          </span>
        );

      case "Weighing":
        return (
          <span className="inline-flex items-center rounded-full border border-[#E8DDBF] bg-[#F5EFDE] px-2.5 py-1 text-[11px] font-semibold text-[#80672C]">
            Weighing
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center rounded-full border border-[#CFE2D4] bg-[#EAF2E9] px-2.5 py-1 text-[11px] font-semibold text-[#285C3A]">
            {stage || "Completed"}
          </span>
        );
    }
  };

  // --------------------------------------------------
  // ACTIVITY
  // --------------------------------------------------

  const activityList = [
    {
      time: "10:05 AM",
      text: "Token F-2846 moved to Weighing checkpoint",
    },
    {
      time: "09:50 AM",
      text: "Token F-2845 completed Trading auction",
    },
    {
      time: "09:35 AM",
      text: "New lot registered (Wheat - 40 Quintal)",
    },
    {
      time: "09:20 AM",
      text: "Token F-2844 moved to Quality Check",
    },
  ];

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="min-h-full space-y-6 bg-[#F8F7F2] pb-8 animate-fadeIn">
      {/* =====================================================
          GREETING
      ====================================================== */}

      <GreetingBanner
        user={user}
        greeting="Namaskar"
        subtitle="Let's keep the mandi moving."
      />

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E8CCCC] bg-[#FAEEEE] px-4 py-3 text-sm text-[#A64B4B]">
          <div>
            <p className="font-semibold">Unable to load dashboard data</p>
            <p className="mt-0.5 text-xs">{error}</p>
          </div>

          <button
            type="button"
            onClick={fetchLots}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#E0C2C2] bg-white px-3 py-2 text-xs font-semibold text-[#A64B4B] transition hover:bg-[#FFF7F7]"
          >
            <RefreshCw size={13} />
            Retry
          </button>
        </div>
      )}

      {/* =====================================================
          SUCCESS
      ====================================================== */}

      {successMsg && (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-[#CFE2D4] bg-[#EAF2E9] px-4 py-3 text-sm text-[#285C3A] animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={17} />

            <span className="font-semibold">
              {successMsg}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSuccessMsg("")}
            className="rounded-md p-1 text-[#285C3A] transition hover:bg-white"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* =====================================================
          STAT CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          icon={Layers}
          color="green"
          value={totalLotsCount > 0 ? totalLotsCount : 127}
          label="Total Lots Today"
          trend="12% from yesterday"
          trendType="up"
        />

        <StatCard
          icon={Clock}
          color="orange"
          value={inQueueLots.length > 0 ? inQueueLots.length : 43}
          label="Waiting in Queue"
          trend="5% from yesterday"
          trendType="up"
        />

        <StatCard
          icon={Settings}
          color="blue"
          value={
            inProcessingLots.length > 0
              ? inProcessingLots.length
              : 18
          }
          label="In Processing"
          trend="8% from yesterday"
          trendType="down"
        />

        <StatCard
          icon={CheckCircle2}
          color="purple"
          value={
            completedLots.length > 0
              ? completedLots.length
              : 52
          }
          label="Completed Today"
          trend="18% from yesterday"
          trendType="up"
        />

        <DualMetricCard
          processingTime="54 min"
          processingTrend="12%"
          waitingTime="31 min"
          waitingTrend="20%"
        />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* ===================================================
            LEFT COLUMN
        ==================================================== */}

        <div className="space-y-6 lg:col-span-7">
          {/* -------------------------------------------------
              LIVE QUEUE
          -------------------------------------------------- */}

          <div className="overflow-hidden rounded-xl border border-[#DCE3DB] bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-[#E5E9E3] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A]">
                    <Layers size={16} />
                  </div>

                  <h2 className="text-base font-bold text-[#19343A]">
                    Live Queue
                  </h2>
                </div>

                <p className="mt-1 pl-10 text-xs text-[#687779]">
                  Vehicles and token holders awaiting inspection at{" "}
                  <span className="font-semibold text-[#285C3A]">
                    {officerMandi}
                  </span>
                </p>
              </div>

              {onNavigateToTab && (
                <button
                  type="button"
                  onClick={() =>
                    onNavigateToTab("waiting-queue")
                  }
                  className="inline-flex items-center gap-1 self-start text-xs font-semibold text-[#285C3A] transition hover:text-[#214D31] hover:underline sm:self-auto"
                >
                  View All
                  <ArrowRight size={13} />
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center px-6 py-12">
                <div className="flex items-center gap-2 text-sm text-[#687779]">
                  <RefreshCw
                    size={16}
                    className="animate-spin text-[#285C3A]"
                  />
                  Loading live queue...
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead>
                    <tr className="border-b border-[#E5E9E3] bg-[#FAFAF7] text-[10px] font-bold uppercase tracking-[0.08em] text-[#687779]">
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Token No.</th>
                      <th className="px-4 py-3">Farmer</th>
                      <th className="px-4 py-3">Crop</th>
                      <th className="px-4 py-3">Quantity</th>
                      <th className="px-4 py-3">Stage</th>
                      <th className="px-4 py-3 text-right">
                        Waiting
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#E8ECE7] text-xs">
                    {(inQueueLots.length > 0
                      ? inQueueLots
                      : lots
                    )
                      .slice(0, 5)
                      .map((lot, idx) => {
                        const fallbackWait = `${
                          40 - idx * 6
                        } min`;

                        return (
                          <tr
                            key={lot._id || idx}
                            onClick={() =>
                              handleOpenProcessModal(lot)
                            }
                            className="cursor-pointer transition hover:bg-[#F8F7F2]"
                            title="Click to process checkpoint"
                          >
                            <td className="px-4 py-3.5 font-semibold text-[#8A9695]">
                              {idx + 1}
                            </td>

                            <td className="px-4 py-3.5 font-bold text-[#285C3A]">
                              {lot.tokenNumber ||
                                `F-${2847 + idx}`}
                            </td>

                            <td className="px-4 py-3.5 font-semibold text-[#19343A]">
                              {lot.farmer?.name ||
                                (idx === 0
                                  ? "Ramesh Patil"
                                  : idx === 1
                                  ? "Suresh Jadhav"
                                  : idx === 2
                                  ? "Anita Gaikwad"
                                  : idx === 3
                                  ? "Vilas Mane"
                                  : "Prakash More")}
                            </td>

                            <td className="px-4 py-3.5 font-medium text-[#687779]">
                              {lot.crop ||
                                (idx === 0
                                  ? "Onion"
                                  : idx === 1
                                  ? "Tomato"
                                  : idx === 2
                                  ? "Soybean"
                                  : idx === 3
                                  ? "Wheat"
                                  : "Chilli")}
                            </td>

                            <td className="px-4 py-3.5 font-semibold text-[#19343A]">
                              {lot.quantity
                                ? `${lot.quantity} ${
                                    lot.unit || "Q"
                                  }`
                                : idx === 0
                                ? "50 Q"
                                : idx === 1
                                ? "30 Q"
                                : idx === 2
                                ? "25 Q"
                                : idx === 3
                                ? "40 Q"
                                : "20 Q"}
                            </td>

                            <td className="px-4 py-3.5">
                              {renderStagePill(
                                lot.currentStage ||
                                  (idx === 0
                                    ? "Queue"
                                    : idx === 1
                                    ? "Quality Check"
                                    : idx === 2
                                    ? "Queue"
                                    : idx === 3
                                    ? "Trading"
                                    : "Weighing")
                              )}
                            </td>

                            <td className="px-4 py-3.5 text-right font-semibold text-[#A64B4B]">
                              {lot.waitingTime ||
                                fallbackWait}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* -------------------------------------------------
              RECENT LOTS
          -------------------------------------------------- */}

          <div className="overflow-hidden rounded-xl border border-[#DCE3DB] bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-[#E5E9E3] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5EFDE] text-[#B58A35]">
                    <ClipboardCheck size={16} />
                  </div>

                  <h2 className="text-base font-bold text-[#19343A]">
                    Recent Lots Processed
                  </h2>
                </div>

                <p className="mt-1 pl-10 text-xs text-[#687779]">
                  Completed auctions, weighments and gate passes
                </p>
              </div>

              {onNavigateToTab && (
                <button
                  type="button"
                  onClick={() =>
                    onNavigateToTab("all-lots")
                  }
                  className="inline-flex items-center gap-1 self-start text-xs font-semibold text-[#285C3A] transition hover:text-[#214D31] hover:underline sm:self-auto"
                >
                  View All
                  <ArrowRight size={13} />
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left">
                <thead>
                  <tr className="border-b border-[#E5E9E3] bg-[#FAFAF7] text-[10px] font-bold uppercase tracking-[0.08em] text-[#687779]">
                    <th className="px-4 py-3">Token No.</th>
                    <th className="px-4 py-3">Farmer</th>
                    <th className="px-4 py-3">Crop</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Processing Time</th>
                    <th className="px-4 py-3 text-right">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E8ECE7] text-xs">
                  {[
                    {
                      token: "F-2843",
                      farmer: "Sunil Pawar",
                      crop: "Onion",
                      qty: "35 Q",
                      time: "48 min",
                    },
                    {
                      token: "F-2842",
                      farmer: "Mahesh Kale",
                      crop: "Tomato",
                      qty: "40 Q",
                      time: "52 min",
                    },
                    {
                      token: "F-2841",
                      farmer: "Kavita Deshmukh",
                      crop: "Soybean",
                      qty: "28 Q",
                      time: "46 min",
                    },
                    {
                      token: "F-2840",
                      farmer: "Nitin Bhosale",
                      crop: "Chilli",
                      qty: "22 Q",
                      time: "50 min",
                    },
                    {
                      token: "F-2839",
                      farmer: "Ajay Thorat",
                      crop: "Wheat",
                      qty: "50 Q",
                      time: "58 min",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="transition hover:bg-[#F8F7F2]"
                    >
                      <td className="px-4 py-3.5 font-bold text-[#285C3A]">
                        {row.token}
                      </td>

                      <td className="px-4 py-3.5 font-semibold text-[#19343A]">
                        {row.farmer}
                      </td>

                      <td className="px-4 py-3.5 font-medium text-[#687779]">
                        {row.crop}
                      </td>

                      <td className="px-4 py-3.5 font-semibold text-[#19343A]">
                        {row.qty}
                      </td>

                      <td className="px-4 py-3.5 font-medium text-[#687779]">
                        {row.time}
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#CFE2D4] bg-[#EAF2E9] px-2.5 py-1 text-[11px] font-semibold text-[#285C3A]">
                          <CheckCircle2 size={11} />
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

        {/* ===================================================
            RIGHT COLUMN
        ==================================================== */}

        <div className="space-y-6 lg:col-span-5">
          {/* -------------------------------------------------
              PROCESS FLOW
          -------------------------------------------------- */}

          <ProcessFlowCard
            currentStage="Queue"
            currentStageIndex={1}
            isOfficer={true}
            onViewAll={() =>
              onNavigateToTab &&
              onNavigateToTab("process-lot")
            }
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

          {/* -------------------------------------------------
              TODAY'S ACTIVITY
          -------------------------------------------------- */}

          <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between border-b border-[#E5E9E3] pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A]">
                  <Activity size={16} />
                </div>

                <h2 className="text-base font-bold text-[#19343A]">
                  Today's Activity
                </h2>
              </div>

              {onNavigateToTab && (
                <button
                  type="button"
                  onClick={() =>
                    onNavigateToTab("reports")
                  }
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#285C3A] hover:underline"
                >
                  View All
                  <ArrowRight size={13} />
                </button>
              )}
            </div>

            <div className="relative mt-5 space-y-5 pl-7">
              <div className="absolute bottom-2 left-[10px] top-2 w-px bg-[#CFE2D4]" />

              {activityList.map((act, i) => (
                <div
                  key={i}
                  className="relative flex items-start gap-3"
                >
                  <span className="absolute -left-[25px] top-1.5 flex h-2.5 w-2.5 rounded-full border-2 border-white bg-[#285C3A] shadow-sm" />

                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-xs font-bold text-[#19343A]">
                        {act.time}
                      </span>

                      <span className="text-xs text-[#687779]">
                        {act.text}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* -------------------------------------------------
              ANNOUNCEMENTS
          -------------------------------------------------- */}

          <AnnouncementsCard
            onViewAll={() =>
              onNavigateToTab &&
              onNavigateToTab("announcements")
            }
          />

          {/* -------------------------------------------------
              VOICE ASSISTANT
          -------------------------------------------------- */}

          <AskMandiTrackCard
            onOpenFullVoiceModal={onOpenVoiceModal}
          />
        </div>
      </div>

      {/* =====================================================
          CHECKPOINT MODAL
      ====================================================== */}

      {selectedLotForProcess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#19343A]/60 backdrop-blur-sm"
            onClick={() =>
              setSelectedLotForProcess(null)
            }
          />

          {/* Modal */}
          <div className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#DCE3DB] bg-white shadow-2xl animate-scaleUp">
            {/* Modal Header */}
            <div className="border-b border-[#E5E9E3] px-5 py-5 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E8DDBF] bg-[#F5EFDE] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#80672C]">
                    <Scale size={11} />
                    APMC Stage Advancement
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-[#19343A]">
                    Process Lot:{" "}
                    {selectedLotForProcess.tokenNumber ||
                      selectedLotForProcess.lotId}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-[#687779]">
                    {selectedLotForProcess.crop}{" "}
                    <span className="mx-1 text-[#A3AEAC]">
                      •
                    </span>
                    {selectedLotForProcess.quantity}{" "}
                    {selectedLotForProcess.unit ||
                      "Quintal"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedLotForProcess(null)
                  }
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] text-[#687779] transition hover:bg-white hover:text-[#19343A]"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form
              onSubmit={handleAdvanceCheckpointSubmit}
              className="space-y-5 px-5 py-5 sm:px-6 sm:py-6"
            >
              {/* Target Stage */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#19343A]">
                  Advance to Mandi Stage
                </label>

                <select
                  value={checkpointForm.targetStage}
                  onChange={(e) =>
                    setCheckpointForm({
                      ...checkpointForm,
                      targetStage: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] px-3.5 py-2.5 text-xs font-semibold text-[#19343A] outline-none transition focus:border-[#285C3A] focus:bg-white focus:ring-2 focus:ring-[#285C3A]/10"
                >
                  <option value="Quality Check">
                    Quality Check (गुणवत्ता तपासणी)
                  </option>

                  <option value="Trading">
                    Trading / Auction (लिलाव व विक्री)
                  </option>

                  <option value="Weighing">
                    Weighing (वजन मापन)
                  </option>

                  <option value="Settlement">
                    Settlement (हिशोब व पावती)
                  </option>

                  <option value="Payment">
                    Payment (पेमेंट जमा)
                  </option>

                  <option value="Exit">
                    Exit Gate Pass (निर्गमन)
                  </option>
                </select>
              </div>

              {/* Quality + Price */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#19343A]">
                    Quality Grade
                  </label>

                  <select
                    value={checkpointForm.qualityGrade}
                    onChange={(e) =>
                      setCheckpointForm({
                        ...checkpointForm,
                        qualityGrade: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] px-3 py-2.5 text-xs font-semibold text-[#19343A] outline-none focus:border-[#285C3A] focus:bg-white"
                  >
                    <option value="Grade A (Premium)">
                      Grade A (Premium)
                    </option>

                    <option value="Grade B (Standard)">
                      Grade B (Standard)
                    </option>

                    <option value="Grade C (Fair)">
                      Grade C (Fair)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-[#19343A]">
                    <IndianRupee size={12} />
                    Auction Price (₹/unit)
                  </label>

                  <input
                    type="number"
                    value={checkpointForm.finalPrice}
                    onChange={(e) =>
                      setCheckpointForm({
                        ...checkpointForm,
                        finalPrice: e.target.value,
                      })
                    }
                    placeholder="e.g. 2150"
                    className="w-full rounded-lg border border-[#DCE3DB] bg-white px-3 py-2.5 text-xs font-semibold text-[#19343A] outline-none transition placeholder:text-[#9AA5A3] focus:border-[#285C3A] focus:ring-2 focus:ring-[#285C3A]/10"
                  />
                </div>
              </div>

              {/* Buyer */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#19343A]">
                  Buyer Name / License No.
                </label>

                <input
                  type="text"
                  value={checkpointForm.buyerName}
                  onChange={(e) =>
                    setCheckpointForm({
                      ...checkpointForm,
                      buyerName: e.target.value,
                    })
                  }
                  placeholder="e.g. Maharashtra Agro Traders"
                  className="w-full rounded-lg border border-[#DCE3DB] bg-white px-3 py-2.5 text-xs font-medium text-[#19343A] outline-none transition placeholder:text-[#9AA5A3] focus:border-[#285C3A] focus:ring-2 focus:ring-[#285C3A]/10"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#19343A]">
                  Officer Notes
                </label>

                <input
                  type="text"
                  value={checkpointForm.notes}
                  onChange={(e) =>
                    setCheckpointForm({
                      ...checkpointForm,
                      notes: e.target.value,
                    })
                  }
                  placeholder="e.g. Moisture 11%, Passed electronic weigh scale #2"
                  className="w-full rounded-lg border border-[#DCE3DB] bg-white px-3 py-2.5 text-xs font-medium text-[#19343A] outline-none transition placeholder:text-[#9AA5A3] focus:border-[#285C3A] focus:ring-2 focus:ring-[#285C3A]/10"
                />
              </div>

              {/* Existing form values retained */}
              <div className="grid grid-cols-1 gap-3 rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] p-4 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-[#687779]">
                    Actual Weight
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#19343A]">
                    {checkpointForm.actualWeight || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-[#687779]">
                    Payment Status
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#285C3A]">
                    {checkpointForm.paymentStatus}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-[#687779]">
                    Payment Reference
                  </p>

                  <p className="mt-1 break-all text-xs font-semibold text-[#19343A]">
                    {checkpointForm.paymentRef || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-[#687779]">
                    Exit Status
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#285C3A]">
                    {checkpointForm.exitStatus}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-2 border-t border-[#E5E9E3] pt-5 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedLotForProcess(null)
                  }
                  className="rounded-lg border border-[#DCE3DB] bg-white px-4 py-2.5 text-xs font-semibold text-[#687779] transition hover:bg-[#F8F7F2] hover:text-[#19343A]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submittingCheckpoint}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#285C3A] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#214D31] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submittingCheckpoint ? (
                    <>
                      <RefreshCw
                        size={14}
                        className="animate-spin"
                      />
                      Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={14} />
                      Confirm & Advance
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}