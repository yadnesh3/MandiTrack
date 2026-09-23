import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  icon: Icon,
  color = "green", // "green" | "orange" | "blue" | "purple"
  value,
  label,
  trend, // e.g. "12% from yesterday"
  trendType = "up", // "up" | "down" | "neutral"
  subtext,
  className = "",
}) {
  const colorMap = {
    green: {
      bg: "bg-[#285C3A]",
      text: "text-[#285C3A]",
      pill: "bg-[#EAF2E9] text-[#285C3A]",
      ring: "ring-[#EAF2E9]",
    },

    orange: {
      bg: "bg-[#B58A35]",
      text: "text-[#B58A35]",
      pill: "bg-[#F5EFDE] text-[#80672C]",
      ring: "ring-[#F5EFDE]",
    },

    blue: {
      bg: "bg-[#477A7A]",
      text: "text-[#477A7A]",
      pill: "bg-[#E8F0F0] text-[#477A7A]",
      ring: "ring-[#E8F0F0]",
    },

    purple: {
      bg: "bg-[#75658F]",
      text: "text-[#75658F]",
      pill: "bg-[#EEEAF3] text-[#75658F]",
      ring: "ring-[#EEEAF3]",
    },
  };

  const c = colorMap[color] || colorMap.green;

  return (
    <div
      className={`bg-white rounded-xl p-5 border border-[#DCE3DB] shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:border-[#C8D2CA] ${className}`}
    >
      {/* Icon Badge */}
      <div
        className={`w-12 h-12 rounded-xl ${c.bg} text-white flex items-center justify-center shrink-0 shadow-sm ring-4 ${c.ring}`}
      >
        {Icon && <Icon size={22} strokeWidth={2.2} />}
      </div>

      {/* Metric Content */}
      <div className="flex-1 min-w-0">
        <div className="text-2xl sm:text-3xl font-bold text-[#19343A] leading-none">
          {value !== undefined ? value : "0"}
        </div>

        <div className="text-xs font-semibold text-[#687779] mt-1.5 truncate">
          {label}
        </div>

        {/* Trend */}
        {trend && (
          <div className="flex items-center gap-1 mt-1.5 text-[11px] font-semibold">
            {trendType === "up" ? (
              <span className="text-[#285C3A] flex items-center">
                <ArrowUpRight
                  size={13}
                  strokeWidth={2.2}
                  className="mr-0.5"
                />
                {trend}
              </span>
            ) : trendType === "down" ? (
              <span className="text-[#285C3A] flex items-center">
                <ArrowDownRight
                  size={13}
                  strokeWidth={2.2}
                  className="mr-0.5"
                />
                {trend}
              </span>
            ) : (
              <span className="text-[#687779]">{trend}</span>
            )}
          </div>
        )}

        {/* Subtext */}
        {subtext && !trend && (
          <div className="text-[11px] text-[#8A9695] font-medium mt-1.5">
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
}