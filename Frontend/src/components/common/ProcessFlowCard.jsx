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
  { id: "Gate Entry", label: "Gate Entry", icon: CheckCircle2, desc: "Vehicle entry & token verification" },
  { id: "Queue", label: "Queue", icon: Clock, desc: "Lots waiting in vehicle queue for unloading" },
  { id: "Quality Check", label: "Quality Check", icon: FileCheck, desc: "Assaying and quality grade certification (Grade A/B/C)" },
  { id: "Trading", label: "Trading", icon: Gavel, desc: "Open auction & dynamic bidding among licensed buyers" },
  { id: "Weighing", label: "Weighing", icon: Scale, desc: "Electronic weighing bridge slip & tare deduction" },
  { id: "Settlement", label: "Settlement", icon: Receipt, desc: "Bill calculation, commission & mandi cess billing" },
  { id: "Payment", label: "Payment", icon: CreditCard, desc: "Direct Bank / UPI transfer to farmer account" },
  { id: "Exit", label: "Exit", labelAlt: "Gate Pass", icon: LogOut, desc: "Gate pass generation and produce clearance" },
];

export default function ProcessFlowCard({
  currentStage = "Queue",
  currentStageIndex = 1,
  onViewAll,
  onAdvanceClick,
  isOfficer = false,
  className = "",
}) {
  // Normalize index
  const activeIndex = MANDI_STAGES_CONFIG.findIndex(
    (s) => s.id.toLowerCase() === currentStage.toLowerCase()
  );
  const resolvedIndex = activeIndex !== -1 ? activeIndex : currentStageIndex;

  const currentStageObj =
    MANDI_STAGES_CONFIG[resolvedIndex] || MANDI_STAGES_CONFIG[1];

  return (
    <div
      className={`bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
            Mandi Process Flow
          </h2>
          <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            8 Checkpoints
          </span>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            View All &rarr;
          </button>
        )}
      </div>

      {/* Horizontal Node Stepper matching reference */}
      <div className="overflow-x-auto pb-2 pt-1">
        <div className="min-w-[620px] flex items-center justify-between relative px-2">
          {/* Background Connecting Line */}
          <div className="absolute left-6 right-6 top-4.5 h-[2px] bg-slate-200 -z-0" />

          {MANDI_STAGES_CONFIG.map((stage, idx) => {
            const isCompleted = idx < resolvedIndex;
            const isCurrent = idx === resolvedIndex;
            const isUpcoming = idx > resolvedIndex;

            const Icon = stage.icon;

            return (
              <div
                key={stage.id}
                className="relative z-10 flex flex-col items-center group cursor-pointer"
                title={`${stage.label}: ${stage.desc}`}
              >
                {/* Node Circle */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-xs ${
                    isCompleted
                      ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                      : isCurrent
                      ? "bg-[#EA8F0B] text-white ring-4 ring-amber-100 scale-105"
                      : "bg-white border-2 border-slate-300 text-slate-400 group-hover:border-slate-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    <Icon size={16} strokeWidth={2.2} />
                  )}
                </div>

                {/* Node Label */}
                <span
                  className={`text-[11px] font-bold mt-2 text-center whitespace-nowrap ${
                    isCompleted
                      ? "text-emerald-800"
                      : isCurrent
                      ? "text-[#EA8F0B]"
                      : "text-slate-500"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Stage Callout Box matching reference */}
      <div className="mt-4 p-3.5 rounded-xl bg-[#FDF6ED] border border-[#F6DCBA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#EA8F0B]/15 text-[#EA8F0B] flex items-center justify-center shrink-0">
            <Users size={18} />
          </div>
          <div>
            <div className="text-xs font-black text-[#925400]">
              Current Stage: {currentStageObj.label}
            </div>
            <div className="text-[11px] text-[#A36605] font-medium">
              {currentStageObj.desc}
            </div>
          </div>
        </div>

        {isOfficer && onAdvanceClick && (
          <button
            onClick={onAdvanceClick}
            className="shrink-0 px-3.5 py-1.5 bg-[#EA8F0B] hover:bg-[#d47f06] text-white font-bold text-xs rounded-lg shadow-xs transition active:scale-95"
          >
            Advance Checkpoint &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
