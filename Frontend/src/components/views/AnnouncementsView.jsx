import React, { useState, useEffect } from "react";
import { useLang } from "../../context/LanguageContext";
import {
  Megaphone,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Info,
  Edit2,
  X,
  Save,
} from "lucide-react";

const INITIAL_ANNOUNCEMENTS = [
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

export default function AnnouncementsView({ user }) {
  const { t } = useLang();
  const [filter, setFilter] = useState("all");

  const [announcements, setAnnouncements] = useState(() => {
    try {
      const saved = localStorage.getItem("manditrack_announcements");
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  // Edit modal state
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    priority: "normal",
    mandi: "",
  });

  const canEdit = user?.role === "officer" || user?.role === "admin";

  const handleStartEdit = (item) => {
    setEditingItem(item);
    setEditForm({
      title: item.title,
      description: item.description,
      priority: item.priority || "normal",
      mandi: item.mandi || "Pune APMC",
    });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    const updated = announcements.map((a) =>
      a.id === editingItem.id
        ? {
            ...a,
            title: editForm.title.trim() || a.title,
            description: editForm.description.trim() || a.description,
            priority: editForm.priority,
            mandi: editForm.mandi.trim() || a.mandi,
          }
        : a
    );

    setAnnouncements(updated);
    try {
      localStorage.setItem("manditrack_announcements", JSON.stringify(updated));
    } catch {
      // safe fallback
    }
    setEditingItem(null);
  };

  const filtered = announcements.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  const getPriorityStyle = (priority) => {
    if (priority === "high") {
      return {
        dot: "bg-[#A64B4B]",
        ring: "ring-[#FAEEEE]",
        badge: "border-[#E8CCCC] bg-[#FAEEEE] text-[#A64B4B]",
        label: t("highPriority"),
        icon: AlertTriangle,
      };
    }

    if (priority === "alert") {
      return {
        dot: "bg-[#B58A35]",
        ring: "ring-[#F5EFDE]",
        badge: "border-[#E8DDBF] bg-[#F5EFDE] text-[#80672C]",
        label: t("attentionPriority"),
        icon: AlertTriangle,
      };
    }

    return {
      dot: "bg-[#285C3A]",
      ring: "ring-[#EAF2E9]",
      badge: "border-[#CFE2D4] bg-[#EAF2E9] text-[#285C3A]",
      label: t("noticePriority"),
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
              <Megaphone size={13} className="text-[#B58A35]" />
              {t("announcementsBadge")}
            </div>

            <h1 className="text-xl font-bold tracking-tight text-[#19343A] sm:text-2xl">
              {t("announcementsHeading")}
            </h1>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-[#687779] sm:text-sm">
              {t("announcementsSub")}
            </p>
          </div>

          {/* =================================================
              FILTERS
          ================================================== */}

          <div className="flex items-center gap-2 overflow-x-auto border-t border-[#E5E9E3] pt-4 pb-1">
            {[
              { id: "all", label: t("filterAll") },
              { id: "maintenance", label: t("filterMaintenance") },
              { id: "market", label: t("filterMarket") },
              { id: "events", label: t("filterEvents") },
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
              {t("noAnnouncementsFound")}
            </h2>

            <p className="mt-1 text-xs text-[#687779]">
              {t("noNoticesInCategory")}
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const priority = getPriorityStyle(item.priority);
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

                    <div className="flex flex-wrap items-center gap-3">
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

                      {/* EDIT OPTION FOR OFFICER / ADMIN */}
                      {canEdit && (
                        <button
                          type="button"
                          onClick={() => handleStartEdit(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#DCE3DB] bg-[#F8F7F2] hover:bg-[#EAF2E9] hover:border-[#CFE2D4] text-[#285C3A] text-xs font-semibold transition"
                          title={t("editAnnouncementBtn")}
                        >
                          <Edit2 size={12} />
                          <span>{t("editAnnouncementBtn")}</span>
                        </button>
                      )}
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
                    <CheckCircle2 size={13} className="text-[#285C3A]" />

                    <span>{t("officialNoticeFooter")}</span>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* =====================================================
          EDIT ANNOUNCEMENT MODAL
      ====================================================== */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#19343A]/60 backdrop-blur-sm"
            onClick={handleCancelEdit}
          />

          <div className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#DCE3DB] bg-white shadow-2xl animate-scaleUp">
            <div className="border-b border-[#E5E9E3] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#EAF2E9] text-[#285C3A] flex items-center justify-center">
                  <Edit2 size={16} />
                </div>
                <h3 className="text-base font-bold text-[#19343A]">
                  {t("editAnnouncementTitle")}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="p-1 rounded-md text-[#687779] hover:bg-[#F8F7F2]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#19343A] mb-1">
                  {t("announcementTitleLabel")}
                </label>
                <input
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#DCE3DB] bg-white px-3.5 py-2.5 text-xs font-medium text-[#19343A] outline-none focus:border-[#285C3A] focus:ring-2 focus:ring-[#285C3A]/10"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#19343A] mb-1">
                  {t("priorityLevelLabel")}
                </label>
                <select
                  value={editForm.priority}
                  onChange={(e) =>
                    setEditForm({ ...editForm, priority: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#DCE3DB] bg-white px-3.5 py-2.5 text-xs font-medium text-[#19343A] outline-none focus:border-[#285C3A]"
                >
                  <option value="normal">{t("noticePriority")}</option>
                  <option value="alert">{t("attentionPriority")}</option>
                  <option value="high">{t("highPriority")}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#19343A] mb-1">
                  {t("mandi")}
                </label>
                <input
                  type="text"
                  value={editForm.mandi}
                  onChange={(e) =>
                    setEditForm({ ...editForm, mandi: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#DCE3DB] bg-white px-3.5 py-2.5 text-xs font-medium text-[#19343A] outline-none focus:border-[#285C3A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#19343A] mb-1">
                  {t("announcementDescLabel")}
                </label>
                <textarea
                  rows={4}
                  required
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#DCE3DB] bg-white px-3.5 py-2.5 text-xs font-medium text-[#19343A] outline-none focus:border-[#285C3A] focus:ring-2 focus:ring-[#285C3A]/10"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E5E9E3]">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 rounded-lg border border-[#DCE3DB] bg-white text-xs font-semibold text-[#687779] hover:bg-[#F8F7F2]"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#285C3A] hover:bg-[#214D31] text-xs font-semibold text-white shadow-sm transition active:scale-95"
                >
                  <Save size={13} />
                  <span>{t("saveChangesBtn")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}