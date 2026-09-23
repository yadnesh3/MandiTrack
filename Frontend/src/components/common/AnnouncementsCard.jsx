import React from "react";
import { Megaphone, ArrowRight } from "lucide-react";

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Gate No. 2 maintenance",
    subtitle: "(11 AM - 1 PM) Gate 1 and 3 operational",
    time: "2h ago",
    status: "normal",
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
      className={`bg-white rounded-xl border border-[#DCE3DB] shadow-sm overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E7EBE5]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#EEF3EC] text-[#285C3A] flex items-center justify-center">
            <Megaphone size={17} strokeWidth={2} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#19343A]">
              Important Announcements
            </h2>

            <p className="text-[11px] text-[#687779] mt-0.5">
              Latest mandi updates
            </p>
          </div>
        </div>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="group flex items-center gap-1.5 text-xs font-semibold text-[#285C3A] hover:text-[#214D31] transition-colors"
          >
            View All
            <ArrowRight
              size={13}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        )}
      </div>

      {/* Announcements */}
      <div className="p-3">
        {announcements.slice(0, 3).map((item, index) => {
          const isAlert = item.status === "alert";
          const isHigh = item.status === "high";

          const dotColor = isHigh
            ? "bg-[#B94A48]"
            : isAlert
            ? "bg-[#B58A35]"
            : "bg-[#285C3A]";

          const ringColor = isHigh
            ? "ring-[#F4DEDE]"
            : isAlert
            ? "ring-[#F5EFDE]"
            : "ring-[#EAF2E9]";

          return (
            <div
              key={item.id}
              className={`flex items-start justify-between gap-4 px-3 py-3 rounded-lg hover:bg-[#F8F7F2] transition-colors ${
                index !== announcements.slice(0, 3).length - 1
                  ? "border-b border-[#EEF1ED]"
                  : ""
              }`}
            >
              {/* Left content */}
              <div className="flex items-start gap-3 min-w-0">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${dotColor} mt-1.5 shrink-0 ring-4 ${ringColor}`}
                />

                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#19343A] leading-snug">
                    {item.title}
                  </div>

                  {item.subtitle && (
                    <div className="text-[11px] font-medium text-[#687779] mt-1 leading-relaxed">
                      {item.subtitle}
                    </div>
                  )}
                </div>
              </div>

              {/* Time */}
              <span className="text-[10px] font-medium text-[#8A9695] shrink-0 whitespace-nowrap pt-0.5">
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}