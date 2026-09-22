import React from "react";
import { Megaphone, ExternalLink } from "lucide-react";

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Gate No. 2 maintenance",
    subtitle: "(11 AM - 1 PM) Gate 1 and 3 operational",
    time: "2h ago",
    status: "normal", // normal (green) | alert (orange) | high (red)
  },
  {
    id: 2,
    title: "Higher demand for onion",
    subtitle: "Better prices expected in afternoon session",
    time: "5h ago",
    status: "alert",
  },
  {
    id: 3,
    title: "Farmer Facilitation Camp",
    subtitle: "Tomorrow at Pune APMC Administrative Block",
    time: "1d ago",
    status: "normal",
  },
  {
    id: 4,
    title: "e-NAM Electronic Weighing Advisory",
    subtitle: "Ensure digital weigh slip before trading approval",
    time: "2d ago",
    status: "normal",
  },
];

export default function AnnouncementsCard({
  announcements = DEFAULT_ANNOUNCEMENTS,
  onViewAll,
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
            <Megaphone size={15} />
          </div>
          <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Important Announcements
          </h2>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800"
          >
            View All &rarr;
          </button>
        )}
      </div>

      {/* Announcements List matching reference */}
      <div className="space-y-3">
        {announcements.slice(0, 3).map((item) => {
          const dotColor =
            item.status === "alert"
              ? "bg-amber-500"
              : item.status === "high"
              ? "bg-rose-500"
              : "bg-emerald-500";

          return (
            <div
              key={item.id}
              className="flex items-start justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${dotColor} mt-1 shrink-0 ring-3 ${
                    item.status === "alert" ? "ring-amber-100" : "ring-emerald-100"
                  }`}
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 leading-tight truncate">
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <div className="text-[11px] font-medium text-slate-500 mt-0.5 truncate">
                      {item.subtitle}
                    </div>
                  )}
                </div>
              </div>

              <span className="text-[11px] font-semibold text-slate-400 shrink-0 whitespace-nowrap">
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
