import React, { useState, useEffect } from "react";
import { getMyLotsApi, getLotByIdApi } from "../../services/api";
import { MANDI_STAGES_CONFIG } from "../common/ProcessFlowCard";
import {
  Clock,
  CheckCircle2,
  Package,
  CreditCard,
  MapPin,
  Calendar,
  AlertCircle,
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
          const found = lots.find(
            (l) => l._id === selectedLotId
          );

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
        setError(
          err.message || "Failed to load lot tracking data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLotData();
  }, [selectedLotId]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl animate-fadeIn">
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-[#DCE3DB] bg-white px-6 text-center shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2E9]">
            <Clock
              size={22}
              className="animate-spin text-[#285C3A]"
            />
          </div>

          <h2 className="mt-4 text-sm font-bold text-[#19343A]">
            Loading live lot tracking
          </h2>

          <p className="mt-1 text-xs font-medium text-[#687779]">
            Fetching your latest mandi journey details...
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     NO ACTIVE LOT
  ========================================================= */

  if (!activeLot) {
    return (
      <div className="mx-auto max-w-5xl animate-fadeIn">
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-[#DCE3DB] bg-white px-6 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F7F2] text-[#687779]">
            <Package size={28} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-[#19343A]">
            No Active Lot to Track
          </h2>

          <p className="mt-2 max-w-sm text-xs font-medium leading-5 text-[#687779]">
            Please submit a harvest produce lot first to track its
            journey from Gate Entry to Payment.
          </p>

          {onBackToLots && (
            <button
              type="button"
              onClick={onBackToLots}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#285C3A] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#214D31] active:scale-[0.98]"
            >
              <ArrowLeft size={14} />
              Go to My Lots
            </button>
          )}
        </div>
      </div>
    );
  }

  /* =========================================================
     CURRENT STAGE
  ========================================================= */

  const currentStageIndex = MANDI_STAGES_CONFIG.findIndex(
    (s) =>
      s.id.toLowerCase() ===
      (activeLot.currentStage || "Queue").toLowerCase()
  );

  const resolvedStageIndex =
    currentStageIndex !== -1 ? currentStageIndex : 1;

  return (
    <div className="mx-auto max-w-5xl space-y-6 bg-[#F8F7F2] pb-8 animate-fadeIn">
      {/* =====================================================
          TOP HEADER
      ====================================================== */}

      <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            {onBackToLots && (
              <button
                type="button"
                onClick={onBackToLots}
                className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#687779] transition hover:text-[#285C3A]"
              >
                <ArrowLeft size={13} />
                <span>Back to All Lots</span>
              </button>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-[#19343A] sm:text-2xl">
                Live Produce Tracking
              </h1>

              <span className="rounded-full border border-[#E8DDBF] bg-[#F5EFDE] px-2.5 py-1 text-[10px] font-bold text-[#80672C]">
                {activeLot.tokenNumber || "F-2847"}
              </span>
            </div>

            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#687779]">
              <span>
                Lot ID:
                <span className="ml-1 font-mono font-semibold text-[#19343A]">
                  {activeLot.lotId}
                </span>
              </span>

              <span className="text-[#B8C1BF]">•</span>

              <span className="inline-flex items-center gap-1">
                <MapPin size={12} />
                {activeLot.mandi}
              </span>
            </p>
          </div>

          {/* LOT SWITCHER */}
          {allLots.length > 1 && (
            <div className="flex items-center gap-2 rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] p-2">
              <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-wide text-[#687779]">
                Switch Lot
              </span>

              <select
                value={activeLot._id}
                onChange={(e) => {
                  const target = allLots.find(
                    (l) => l._id === e.target.value
                  );

                  if (target) {
                    setActiveLot(target);
                  }
                }}
                className="rounded-md border border-[#DCE3DB] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#19343A] outline-none focus:border-[#285C3A] focus:ring-2 focus:ring-[#EAF2E9]"
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
      </div>

      {/* =====================================================
          ERROR MESSAGE
      ====================================================== */}

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-[#E8CCCC] bg-[#FAEEEE] p-4">
          <AlertCircle
            size={17}
            className="mt-0.5 shrink-0 text-[#A64B4B]"
          />

          <div>
            <p className="text-xs font-bold text-[#A64B4B]">
              Unable to load tracking information
            </p>

            <p className="mt-1 text-[11px] font-medium text-[#8F5B5B]">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          LOT OVERVIEW METRICS
      ====================================================== */}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {/* Crop */}
        <div className="rounded-xl border border-[#DCE3DB] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A]">
              <Package size={14} />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wide text-[#8A9695]">
              Crop & Quantity
            </span>
          </div>

          <div className="mt-3 truncate text-base font-bold text-[#19343A] sm:text-lg">
            {activeLot.crop}
          </div>

          <div className="mt-0.5 text-xs font-semibold text-[#285C3A]">
            {activeLot.quantity} {activeLot.unit}
          </div>
        </div>

        {/* Current Stage */}
        <div className="rounded-xl border border-[#DCE3DB] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F5EFDE] text-[#B58A35]">
              <ChevronRight size={15} />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wide text-[#8A9695]">
              Current Stage
            </span>
          </div>

          <div className="mt-3 truncate text-base font-bold text-[#80672C] sm:text-lg">
            {activeLot.currentStage || "Queue"}
          </div>

          <div className="mt-0.5 text-xs font-semibold text-[#687779]">
            Step {resolvedStageIndex + 1} of 8
          </div>
        </div>

        {/* Queue */}
        <div className="rounded-xl border border-[#DCE3DB] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EEF2F3] text-[#477A7A]">
              <Clock size={14} />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wide text-[#8A9695]">
              Queue Position
            </span>
          </div>

          <div className="mt-3 text-base font-bold text-[#19343A] sm:text-lg">
            #{activeLot.queueNumber || 1}
          </div>

          <div className="mt-0.5 text-xs font-semibold text-[#80672C]">
            Est. wait: ~
            {activeLot.estimatedWaitMinutes || 25} min
          </div>
        </div>

        {/* Payment */}
        <div className="rounded-xl border border-[#DCE3DB] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                activeLot.paymentStatus === "Paid"
                  ? "bg-[#EAF2E9] text-[#285C3A]"
                  : "bg-[#F5EFDE] text-[#B58A35]"
              }`}
            >
              <CreditCard size={14} />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wide text-[#8A9695]">
              Payment Status
            </span>
          </div>

          <div
            className={`mt-3 text-base font-bold sm:text-lg ${
              activeLot.paymentStatus === "Paid"
                ? "text-[#285C3A]"
                : "text-[#80672C]"
            }`}
          >
            {activeLot.paymentStatus || "Pending"}
          </div>

          <div className="mt-0.5 truncate text-xs font-semibold text-[#687779]">
            {activeLot.totalAmount
              ? `₹${activeLot.totalAmount.toLocaleString()}`
              : `Exp: ₹${activeLot.expectedPrice || 0}/q`}
          </div>
        </div>
      </div>

      {/* =====================================================
          MANDI JOURNEY
      ====================================================== */}

      <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 border-b border-[#E5E9E3] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold tracking-tight text-[#19343A] sm:text-lg">
              Mandi Journey Checkpoints
            </h2>

            <p className="mt-1 text-xs font-medium leading-5 text-[#687779]">
              Transparent step-by-step progress verified by APMC
              market officers.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#E8DDBF] bg-[#F5EFDE] px-3 py-1.5 text-[10px] font-bold text-[#80672C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B58A35]" />
            Active: {activeLot.currentStage || "Queue"}
          </span>
        </div>

        {/* ===================================================
            STEPPER
        ==================================================== */}

        <div className="overflow-x-auto pb-2 pt-6">
          <div className="relative flex min-w-[720px] items-start justify-between px-4">
            {/* Connector */}
            <div className="absolute left-9 right-9 top-5 h-[2px] bg-[#E1E6E1]" />

            {MANDI_STAGES_CONFIG.map((stage, idx) => {
              const isCompleted =
                idx < resolvedStageIndex;
              const isCurrent =
                idx === resolvedStageIndex;

              const Icon = stage.icon;

              return (
                <div
                  key={stage.id}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  {/* Circle */}
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                      isCompleted
                        ? "bg-[#285C3A] text-white ring-4 ring-[#EAF2E9]"
                        : isCurrent
                        ? "bg-[#B58A35] text-white ring-4 ring-[#F5EFDE]"
                        : "border-2 border-[#D5DCDA] bg-white text-[#8A9695]"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2
                        size={18}
                        strokeWidth={2.5}
                      />
                    ) : (
                      <Icon size={18} strokeWidth={2.1} />
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`mt-2 whitespace-nowrap text-[11px] font-bold ${
                      isCompleted
                        ? "text-[#285C3A]"
                        : isCurrent
                        ? "text-[#80672C]"
                        : "text-[#687779]"
                    }`}
                  >
                    {stage.label}
                  </span>

                  <span
                    className={`mt-0.5 text-[10px] font-medium ${
                      isCompleted
                        ? "text-[#477A7A]"
                        : isCurrent
                        ? "text-[#B58A35]"
                        : "text-[#9AA5A3]"
                    }`}
                  >
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

        {/* ===================================================
            CHECKPOINT DETAILS
        ==================================================== */}

        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-[#E5E9E3] pt-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Gate Entry */}
          <div className="rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] p-4">
            <div className="flex items-center justify-between">
              <div className="text-[9px] font-bold uppercase tracking-wide text-[#8A9695]">
                1. Gate Entry
              </div>

              <CheckCircle2
                size={14}
                className="text-[#285C3A]"
              />
            </div>

            <div className="mt-2 text-xs font-bold text-[#19343A]">
              Passed Entry Gate
            </div>

            <div className="mt-1 text-[10px] font-medium leading-4 text-[#687779]">
              Verified by APMC Gate Security
            </div>
          </div>

          {/* Quality */}
          <div className="rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] p-4">
            <div className="flex items-center justify-between">
              <div className="text-[9px] font-bold uppercase tracking-wide text-[#8A9695]">
                2. Quality Check
              </div>

              <CheckCircle2
                size={14}
                className={
                  resolvedStageIndex > 2
                    ? "text-[#285C3A]"
                    : "text-[#B58A35]"
                }
              />
            </div>

            <div className="mt-2 text-xs font-bold text-[#19343A]">
              {activeLot.qualityGrade ||
                (resolvedStageIndex > 2
                  ? "Grade A"
                  : "Pending Assaying")}
            </div>

            <div className="mt-1 text-[10px] font-medium leading-4 text-[#687779]">
              Standard moisture & size certified
            </div>
          </div>

          {/* Auction */}
          <div className="rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] p-4">
            <div className="flex items-center justify-between">
              <div className="text-[9px] font-bold uppercase tracking-wide text-[#8A9695]">
                3. Auction & Weighing
              </div>

              <span className="text-[9px] font-bold text-[#80672C]">
                MARKET
              </span>
            </div>

            <div className="mt-2 text-xs font-bold text-[#19343A]">
              {activeLot.finalPrice
                ? `₹${activeLot.finalPrice}/q • ${
                    activeLot.buyerName || "Mandi Trader"
                  }`
                : "Awaiting Auction Call"}
            </div>

            <div className="mt-1 text-[10px] font-medium leading-4 text-[#687779]">
              Net wt: {activeLot.actualWeight || activeLot.quantity}{" "}
              {activeLot.unit}
            </div>
          </div>

          {/* Settlement */}
          <div className="rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] p-4">
            <div className="flex items-center justify-between">
              <div className="text-[9px] font-bold uppercase tracking-wide text-[#8A9695]">
                4. Settlement & Exit
              </div>

              <CreditCard
                size={14}
                className={
                  activeLot.paymentStatus === "Paid"
                    ? "text-[#285C3A]"
                    : "text-[#B58A35]"
                }
              />
            </div>

            <div className="mt-2 text-xs font-bold text-[#19343A]">
              {activeLot.exitStatus || "In Mandi Premises"}
            </div>

            <div className="mt-1 text-[10px] font-medium leading-4 text-[#687779]">
              Ref: {activeLot.paymentRef || "Pending Bank Transfer"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}