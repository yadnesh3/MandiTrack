import React from "react";
import { Clock, Users, ArrowDownRight } from "lucide-react";

export default function DualMetricCard({
  processingTime = "—",
  processingTrend = null,
  waitingTime = "—",
  waitingTrend = null,
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-xl p-4 border border-[#DCE3DB] shadow-sm flex flex-col justify-center gap-3 transition-all hover:shadow-md ${className}`}
    >
      {/* Metric 1: Average Processing Time */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#EEF3EC] text-[#285C3A] flex items-center justify-center shrink-0">
            <Clock size={16} strokeWidth={2} />
          </div>

          <div className="min-w-0">
            <div className="text-[11px] font-semibold text-[#687779] leading-tight">
              Average Processing Time
            </div>

            <div className="text-base font-bold text-[#19343A] leading-tight mt-0.5">
              {processingTime}
            </div>

            {processingTime === "—" && (
              <div className="text-[9px] text-[#8A9695] mt-0.5">
                Based on completed checkpoints
              </div>
            )}
          </div>
        </div>

        {processingTrend && (
          <span className="text-[10px] font-semibold text-[#285C3A] flex items-center gap-0.5 bg-[#EAF2E9] border border-[#D5E4D5] px-2 py-1 rounded-md shrink-0">
            <ArrowDownRight size={12} strokeWidth={2} />
            {processingTrend}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-[#E7EBE5]" />

      {/* Metric 2: Average Waiting Time */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#F5EFDE] text-[#B58A35] flex items-center justify-center shrink-0">
            <Users size={16} strokeWidth={2} />
          </div>

          <div className="min-w-0">
            <div className="text-[11px] font-semibold text-[#687779] leading-tight">
              Average Waiting Time
            </div>

            <div className="text-base font-bold text-[#19343A] leading-tight mt-0.5">
              {waitingTime}
            </div>

            {waitingTime === "—" && (
              <div className="text-[9px] text-[#8A9695] mt-0.5">
                Based on completed checkpoints
              </div>
            )}
          </div>
        </div>

        {waitingTrend && (
          <span className="text-[10px] font-semibold text-[#285C3A] flex items-center gap-0.5 bg-[#EAF2E9] border border-[#D5E4D5] px-2 py-1 rounded-md shrink-0">
            <ArrowDownRight size={12} strokeWidth={2} />
            {waitingTrend}
          </span>
        )}
      </div>
    </div>
  );
}