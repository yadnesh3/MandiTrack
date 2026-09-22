import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  icon: Icon,
  color = "green", // "green" | "orange" | "blue" | "purple"
  value,
  label,
  trend, // e.g. "↑ 12% from yesterday"
  trendType = "up", // "up" | "down" | "neutral"
  subtext,
  className = "",
}) {
  const colorMap = {
    green: {
      bg: "bg-emerald-500",
      text: "text-emerald-700",
      pill: "bg-emerald-50 text-emerald-700",
      ring: "ring-emerald-100",
    },
    orange: {
      bg: "bg-[#EA8F0B]",
      text: "text-[#EA8F0B]",
      pill: "bg-amber-50 text-[#EA8F0B]",
      ring: "ring-amber-100",
    },
    blue: {
      bg: "bg-[#0284C7]",
      text: "text-[#0284C7]",
      pill: "bg-sky-50 text-[#0284C7]",
      ring: "ring-sky-100",
    },
    purple: {
      bg: "bg-[#8B5CF6]",
      text: "text-[#8B5CF6]",
      pill: "bg-purple-50 text-[#8B5CF6]",
      ring: "ring-purple-100",
    },
  };

  const c = colorMap[color] || colorMap.green;

  return (
    <div
      className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4 transition-all hover:shadow-md hover:border-slate-300/80 ${className}`}
    >
      {/* Circle Icon Badge */}
      <div
        className={`w-13 h-13 rounded-full ${c.bg} text-white flex items-center justify-center shrink-0 shadow-xs ring-4 ${c.ring}`}
      >
        {Icon && <Icon size={24} strokeWidth={2.2} />}
      </div>

      {/* Metric Content */}
      <div className="flex-1 min-w-0">
        <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
          {value !== undefined ? value : "0"}
        </div>
        <div className="text-xs font-bold text-slate-500 mt-1 truncate">
          {label}
        </div>
        {trend && (
          <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold">
            {trendType === "up" ? (
              <span className="text-emerald-600 flex items-center">
                <ArrowUpRight size={13} className="inline mr-0.5" />
                {trend}
              </span>
            ) : trendType === "down" ? (
              <span className="text-emerald-600 flex items-center">
                <ArrowDownRight size={13} className="inline mr-0.5" />
                {trend}
              </span>
            ) : (
              <span className="text-slate-500">{trend}</span>
            )}
          </div>
        )}
        {subtext && !trend && (
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
}
