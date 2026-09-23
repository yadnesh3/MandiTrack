import React, { useState } from "react";
import {
  Megaphone,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";

const ALL_ANNOUNCEMENTS = [
  {
    id: 1,
    category: "maintenance",
    title: "Gate No. 2 Scheduled Weighbridge Calibration & Maintenance",
    description:
      "Gate No. 2 electronic weighbridge will undergo routine recalibration between 11:00 AM and 01:00 PM today. Incoming tractors and transport vehicles are requested to divert through Gate 1 and Gate 3 without disruption.",
    time: "2 hours ago",
    date: "Today, 10:00 AM",
    priority: "alert",
    mandi: "Pune APMC",
  },
  {
    id: 2,
    category: "market",
    title: "Higher Trading Demand for Nashik & Pune Red Onions",
    description:
      "Out-of-state buyers from Karnataka and Tamil Nadu have reported strong wholesale demand for export-quality red onions. Farmers are advised to ensure proper drying and grading for optimum bids during the afternoon session.",
    time: "5 hours ago",
    date: "Today, 07:30 AM",
    priority: "normal",
    mandi: "All Maharashtra APMCs",
  },
  {
    id: 3,
    category: "events",
    title: "Farmer Facilitation & Soil Health Card Camp Tomorrow",
    description:
      "Department of Agriculture in partnership with MSAMB is hosting a free Kisan Facilitation Camp at the APMC Administrative Yard tomorrow from 09:00 AM. Free testing, guidance, and e-NAM registration assistance will be provided.",
    time: "1 day ago",
    date: "Yesterday",
    priority: "normal",
    mandi: "Pune APMC",
  },
  {
    id: 4,
    category: "advisory",
    title: "Monsoon Produce Protection & Shed Storage Advisory",
    description:
      "Due to expected afternoon thunder showers, APMC godowns and covered auction sheds No. 4 through 8 have been designated for sensitive grains, soybean, and pulses. Ensure produce is covered with tarpaulin during transit.",
    time: "2 days ago",
    date: "10 Aug 2025",
    priority: "high",
    mandi: "Pune & Western Maharashtra",
  },
];

export default function AnnouncementsView() {
  const [filter, setFilter] = useState("all");

  const filtered = ALL_ANNOUNCEMENTS.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  const getPriorityStyle = (priority) => {
    if (priority === "high") {
      return {
        dot: "bg-[#A64B4B]",
        ring: "ring-[#FAEEEE]",
        badge: "border-[#E8CCCC] bg-[#FAEEEE] text-[#A64B4B]",
        label: "High Priority",
        icon: AlertTriangle,
      };
    }

    if (priority === "alert") {
      return {
        dot: "bg-[#B58A35]",
        ring: "ring-[#F5EFDE]",
        badge: "border-[#E8DDBF] bg-[#F5EFDE] text-[#80672C]",
        label: "Attention",
        icon: AlertTriangle,
      };
    }

    return {
      dot: "bg-[#285C3A]",
      ring: "ring-[#EAF2E9]",
      badge: "border-[#CFE2D4] bg-[#EAF2E9] text-[#285C3A]",
      label: "Notice",
      icon: Info,
    };
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 bg-[#F8F7F2] pb-8 animate-fadeIn">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5">
          {/* Heading */}
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#E8DDBF] bg-[#F5EFDE] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#80672C]">
              <Megaphone
                size={13}
                className="text-[#B58A35]"
              />
              Official APMC Bulletins & Notices
            </div>

            <h1 className="text-xl font-bold tracking-tight text-[#19343A] sm:text-2xl">
              Mandi Announcements & Circulars
            </h1>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-[#687779] sm:text-sm">
              Important market notices, maintenance advisories,
              and producer facilitation updates.
            </p>
          </div>

          {/* =================================================
              FILTERS
          ================================================== */}

          <div className="flex items-center gap-2 overflow-x-auto border-t border-[#E5E9E3] pt-4 pb-1">
            {[
              { id: "all", label: "All Notices" },
              { id: "maintenance", label: "Maintenance" },
              { id: "market", label: "Market Alerts" },
              { id: "events", label: "Events & Camps" },
            ].map((cat) => {
              const isActive = filter === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFilter(cat.id)}
                  className={`whitespace-nowrap rounded-lg border px-3.5 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "border-[#285C3A] bg-[#285C3A] text-white shadow-sm"
                      : "border-[#DCE3DB] bg-[#F8F7F2] text-[#687779] hover:bg-white hover:text-[#19343A]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
          ANNOUNCEMENTS
      ====================================================== */}

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-[#DCE3DB] bg-white px-6 py-12 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F8F7F2] text-[#687779]">
              <Megaphone size={20} />
            </div>

            <h2 className="mt-4 text-sm font-bold text-[#19343A]">
              No announcements found
            </h2>

            <p className="mt-1 text-xs text-[#687779]">
              There are no notices in this category right now.
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const priority = getPriorityStyle(
              item.priority
            );

            const PriorityIcon = priority.icon;

            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-xl border border-[#DCE3DB] bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Priority Accent */}
                <div
                  className={`h-1 w-full ${
                    item.priority === "high"
                      ? "bg-[#A64B4B]"
                      : item.priority === "alert"
                      ? "bg-[#B58A35]"
                      : "bg-[#285C3A]"
                  }`}
                />

                <div className="p-5 sm:p-6">
                  {/* Top Information */}
                  <div className="flex flex-col gap-3 border-b border-[#E5E9E3] pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ring-4 ${priority.dot} ${priority.ring}`}
                      />

                      <span className="truncate text-[10px] font-bold uppercase tracking-[0.12em] text-[#687779]">
                        {item.mandi}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-[#8A9695]">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {item.date}
                      </span>

                      <span className="hidden text-[#C4CCCA] sm:inline">
                        •
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {item.time}
                      </span>
                    </div>
                  </div>

                  {/* Title + Priority */}
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h2 className="text-base font-bold leading-snug text-[#19343A] sm:text-lg">
                      {item.title}
                    </h2>

                    <span
                      className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${priority.badge}`}
                    >
                      <PriorityIcon size={11} />
                      {priority.label}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs font-medium leading-6 text-[#687779] sm:text-sm">
                    {item.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-5 flex items-center gap-2 border-t border-[#E5E9E3] pt-4 text-[10px] font-medium text-[#8A9695]">
                    <CheckCircle2
                      size={13}
                      className="text-[#285C3A]"
                    />

                    <span>
                      Official notice published for the
                      mandi network
                    </span>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}