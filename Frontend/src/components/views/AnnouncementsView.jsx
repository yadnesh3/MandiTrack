import React, { useState } from "react";
import { Megaphone, Calendar, Clock, AlertTriangle, CheckCircle2, Info } from "lucide-react";

const ALL_ANNOUNCEMENTS = [
  {
    id: 1,
    category: "maintenance",
    title: "Gate No. 2 Scheduled Weighbridge Calibration & Maintenance",
    description: "Gate No. 2 electronic weighbridge will undergo routine recalibration between 11:00 AM and 01:00 PM today. Incoming tractors and transport vehicles are requested to divert through Gate 1 and Gate 3 without disruption.",
    time: "2 hours ago",
    date: "Today, 10:00 AM",
    priority: "alert", // normal | alert | high
    mandi: "Pune APMC",
  },
  {
    id: 2,
    category: "market",
    title: "Higher Trading Demand for Nashik & Pune Red Onions",
    description: "Out-of-state buyers from Karnataka and Tamil Nadu have reported strong wholesale demand for export-quality red onions. Farmers are advised to ensure proper drying and grading for optimum bids during the afternoon session.",
    time: "5 hours ago",
    date: "Today, 07:30 AM",
    priority: "normal",
    mandi: "All Maharashtra APMCs",
  },
  {
    id: 3,
    category: "events",
    title: "Farmer Facilitation & Soil Health Card Camp Tomorrow",
    description: "Department of Agriculture in partnership with MSAMB is hosting a free Kisan Facilitation Camp at the APMC Administrative Yard tomorrow from 09:00 AM. Free testing, guidance, and e-NAM registration assistance will be provided.",
    time: "1 day ago",
    date: "Yesterday",
    priority: "normal",
    mandi: "Pune APMC",
  },
  {
    id: 4,
    category: "advisory",
    title: "Monsoon Produce Protection & Shed Storage Advisory",
    description: "Due to expected afternoon thunder showers, APMC godowns and covered auction sheds No. 4 through 8 have been designated for sensitive grains, soybean, and pulses. Ensure produce is covered with tarpaulin during transit.",
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

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-2">
            <Megaphone size={14} className="text-[#EA8F0B]" />
            Official APMC Bulletins & Notices
          </div>
          <h1 className="text-2xl font-black text-[#0C192C] tracking-tight">
            Mandi Announcements & Circulars
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Important market notices, maintenance advisories, and producer facilitation updates.
          </p>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Notices" },
            { id: "maintenance", label: "Maintenance" },
            { id: "market", label: "Market Alerts" },
            { id: "events", label: "Events & Camps" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filter === cat.id
                  ? "bg-[#0C192C] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isAlert = item.priority === "alert";
          const isHigh = item.priority === "high";

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3 hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-3 h-3 rounded-full shrink-0 ring-4 ${
                      isHigh
                        ? "bg-rose-500 ring-rose-100"
                        : isAlert
                        ? "bg-[#EA8F0B] ring-amber-100"
                        : "bg-emerald-500 ring-emerald-100"
                    }`}
                  />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    {item.mandi}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    {item.date}
                  </span>
                  <span>&bull;</span>
                  <span>{item.time}</span>
                </div>
              </div>

              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                {item.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
