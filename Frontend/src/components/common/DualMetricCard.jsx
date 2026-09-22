import React from "react";
import { Clock, Users, ArrowDownRight } from "lucide-react";

export default function DualMetricCard({
  processingTime = "54 min",
  processingTrend = "12%",
  waitingTime = "31 min",
  waitingTrend = "20%",
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-xs flex flex-col justify-center gap-3 transition-all hover:shadow-md ${className}`}
    >
      {/* Metric 1: Average Processing Time */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Clock size={16} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 leading-tight">
              Average Processing Time
            </div>
            <div className="text-base font-black text-slate-900 leading-tight">
              {processingTime}
            </div>
          </div>
        </div>
        {processingTrend && (
          <span className="text-[11px] font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-md">
            <ArrowDownRight size={13} className="mr-0.5" />
            {processingTrend}
          </span>
        )}
      </div>

      <div className="border-t border-slate-100" />

      {/* Metric 2: Average Waiting Time */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Users size={16} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 leading-tight">
              Average Waiting Time
            </div>
            <div className="text-base font-black text-slate-900 leading-tight">
              {waitingTime}
            </div>
          </div>
        </div>
        {waitingTrend && (
          <span className="text-[11px] font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-md">
            <ArrowDownRight size={13} className="mr-0.5" />
            {waitingTrend}
          </span>
        )}
      </div>
    </div>
  );
}
