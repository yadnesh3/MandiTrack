import React from "react";
import {
  Check,
  Clock,
  CheckCircle2,
  FileCheck,
  Gavel,
  Scale,
  Receipt,
  CreditCard,
  LogOut,
  Users,
} from "lucide-react";

export const MANDI_STAGES_CONFIG = [
  {
    id: "Gate Entry",
    label: "Gate Entry",
    icon: CheckCircle2,
    desc: "Vehicle entry & token verification",
  },
  {
    id: "Token / Lot ID",
    label: "Token / Lot ID",
    icon: Users,
    desc: "Lot registration and digital token allocation",
  },
  {
    id: "Queue",
    label: "Queue",
    icon: Clock,
    desc: "Lots waiting in vehicle queue for unloading",
  },
  {
    id: "Quality Check",
    label: "Quality Check",
    icon: FileCheck,
    desc: "Assaying and quality grade certification (Grade A/B/C)",
  },
  {
    id: "Trading / Sale",
    label: "Trading / Sale",
    icon: Gavel,
    desc: "Open auction & dynamic bidding among licensed buyers",
  },
  {
    id: "Weighing",
    label: "Weighing",
    icon: Scale,
    desc: "Electronic weighing bridge slip & tare deduction",
  },
  {
    id: "Settlement",
    label: "Settlement",
    icon: Receipt,
    desc: "Bill calculation, commission & mandi cess billing",
  },
  {
    id: "Payment",
    label: "Payment",
    icon: CreditCard,
    desc: "Direct Bank / UPI transfer to farmer account",
  },
  {
    id: "Exit",
    label: "Exit",
    labelAlt: "Gate Pass",
    icon: LogOut,
    desc: "Gate pass generation and produce clearance",
  },
];

export default function ProcessFlowCard({
  currentStage = "Queue",
  currentStageIndex = 2,
  onViewAll,
  onAdvanceClick,
  isOfficer = false,
  className = "",
}) {
  // Normalize index
  const normalizedCurrent = currentStage.toLowerCase() === "trading" ? "trading / sale" : currentStage.toLowerCase();
  const activeIndex = MANDI_STAGES_CONFIG.findIndex(
    (s) => s.id.toLowerCase() === normalizedCurrent
  );

  const resolvedIndex =
    activeIndex !== -1 ? activeIndex : currentStageIndex;

  const currentStageObj =
    MANDI_STAGES_CONFIG[resolvedIndex] || MANDI_STAGES_CONFIG[2];

  return (
    <div
      className={`bg-white rounded-xl p-5 sm:p-6 border border-[#DCE3DB] shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-bold text-[#19343A] tracking-tight">
            Mandi Process Flow
          </h2>

          <span className="text-[10px] font-semibold text-[#285C3A] bg-[#EAF2E9] border border-[#D5E4D5] px-2 py-1 rounded-full">
            9 Checkpoints
          </span>
        </div>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#285C3A] hover:text-[#214D31] transition-colors"
          >
            View All
            <span>→</span>
          </button>
        )}
      </div>

      {/* Horizontal Stepper */}
      <div className="overflow-x-auto pb-2 pt-1">
        <div className="min-w-[620px] flex items-center justify-between relative px-2">
          {/* Background Connecting Line */}
          <div className="absolute left-6 right-6 top-[18px] h-[2px] bg-[#E1E4DE] z-0" />

          {MANDI_STAGES_CONFIG.map((stage, idx) => {
            const isCompleted = idx < resolvedIndex;
            const isCurrent = idx === resolvedIndex;

            const Icon = stage.icon;

            return (
              <div
                key={stage.id}
                className="relative z-10 flex flex-col items-center group cursor-pointer"
                title={`${stage.label}: ${stage.desc}`}
              >
                {/* Node */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? "bg-[#285C3A] text-white ring-4 ring-[#EAF2E9]"
                      : isCurrent
                      ? "bg-[#B58A35] text-white ring-4 ring-[#F5EFDE] scale-105"
                      : "bg-white border-2 border-[#CBD5CF] text-[#8A9695] group-hover:border-[#285C3A] group-hover:text-[#285C3A]"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    <Icon size={16} strokeWidth={2.2} />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-[10px] sm:text-[11px] font-semibold mt-2 text-center whitespace-nowrap ${
                    isCompleted
                      ? "text-[#285C3A]"
                      : isCurrent
                      ? "text-[#B58A35]"
                      : "text-[#687779]"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Stage Callout */}
      <div className="mt-4 p-3.5 rounded-xl bg-[#F5EFDE] border border-[#E8DDBF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white text-[#B58A35] border border-[#E8DDBF] flex items-center justify-center shrink-0">
            <Users size={17} strokeWidth={2} />
          </div>

          <div>
            <div className="text-xs font-bold text-[#6F531D]">
              Current Stage: {currentStageObj.label}
            </div>

            <div className="text-[11px] text-[#80672C] font-medium mt-0.5">
              {currentStageObj.desc}
            </div>
          </div>
        </div>

        {isOfficer && onAdvanceClick && (
          <button
            onClick={onAdvanceClick}
            className="shrink-0 px-3.5 py-2 bg-[#285C3A] hover:bg-[#214D31] text-white font-semibold text-xs rounded-lg shadow-sm transition active:scale-95"
          >
            Advance Checkpoint →
          </button>
        )}
      </div>
    </div>
  );
}