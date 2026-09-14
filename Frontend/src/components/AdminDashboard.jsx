import React, { useState, useEffect } from "react";
import { getAdminOverviewApi } from "../services/api";
import { useLang } from "../context/LanguageContext";
import { Users, Building2, Package, MapPin, Activity, ShieldCheck, Search, Filter } from "lucide-react";

export default function AdminDashboard({ user }) {
  const { t, locale } = useLang();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOverview = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAdminOverviewApi();
      setData(res);
    } catch (err) {
      console.error("Admin overview fetch error:", err);
      setError(err.message || "Failed to load administration overview.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const STAGE_NAMES = [
    "Gate Entry",
    "Token / Lot ID",
    "Queue",
    "Quality Check",
    "Trading / Sale",
    "Weighing",
    "Settlement",
    "Payment",
    "Exit",
  ];

  const filteredUsers = (data?.users || []).filter((u) => {
    const matchesRole = userRoleFilter === "all" || u.role === userRoleFilter;
    const matchesSearch =
      !searchQuery ||
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.mobile?.includes(searchQuery) ||
      u.mandi?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Admin Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0E2A3F] via-[#163b57] to-[#0A2131] text-white p-6 sm:p-8 shadow-lg border-2 border-[#D9A227]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            <ShieldCheck size={14} />
            {t("adminPortal")}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
            {t("adminTitle")} &bull; {user.name}
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            System-level control, location oversight, and mandi analytics
          </p>
        </div>

        <button
          onClick={fetchOverview}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition active:scale-95 text-xs flex items-center gap-2"
        >
          🔄 {t("refresh")}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-center justify-between">
          <span>⚠️ {error}</span>
          <button onClick={fetchOverview} className="underline font-bold text-xs">
            Retry
          </button>
        </div>
      )}

      {/* 4 Main Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("adminTotalFarmers")}
            </span>
            <Users size={20} className="text-green-700" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {loading ? "..." : data?.farmers ?? 0}
          </div>
          <div className="text-xs text-green-700 font-medium">Registered Producers</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("adminTotalOfficers")}
            </span>
            <Building2 size={20} className="text-blue-700" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {loading ? "..." : data?.officers ?? 0}
          </div>
          <div className="text-xs text-blue-700 font-medium">Market Inspectors</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("adminTotalLots")}
            </span>
            <Package size={20} className="text-amber-700" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {loading ? "..." : data?.lots ?? 0}
          </div>
          <div className="text-xs text-amber-700 font-medium">Produce Submissions</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("adminMandisCount")}
            </span>
            <MapPin size={20} className="text-purple-700" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {loading ? "..." : data?.mandisCount ?? 0}
          </div>
          <div className="text-xs text-purple-700 font-medium">Connected APMC Markets</div>
        </div>
      </div>

      {/* Stage Distribution & Mandi Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflow Stage Distribution */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Activity size={18} className="text-green-700" />
              {t("adminStageDistribution")}
            </h3>
            <span className="text-xs font-semibold text-slate-400">9-Stage Workflow</span>
          </div>

          <div className="space-y-3">
            {STAGE_NAMES.map((stage, idx) => {
              const count = data?.stageStats?.[stage] || 0;
              const total = data?.lots || 1;
              const pct = Math.round((count / (total || 1)) * 100);

              return (
                <div key={stage} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-700">
                      {idx + 1}. {stage}
                    </span>
                    <span className="font-bold text-slate-900">
                      {count} lots ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        idx < 3
                          ? "bg-amber-500"
                          : idx < 7
                          ? "bg-blue-600"
                          : "bg-green-600"
                      }`}
                      style={{ width: `${Math.max(pct, count > 0 ? 5 : 0)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mandi Location Overview */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <MapPin size={18} className="text-blue-700" />
              {t("adminMandiBreakdown")}
            </h3>
            <span className="text-xs font-semibold text-slate-400">Location Control</span>
          </div>

          {loading ? (
            <div className="text-center py-8 text-xs text-slate-400">Loading mandis...</div>
          ) : !data?.mandiOverview?.length ? (
            <div className="text-center py-8 text-xs text-slate-400">No mandi data available</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b bg-slate-50 text-slate-500 font-bold uppercase">
                    <th className="py-2.5 px-3">APMC Mandi</th>
                    <th className="py-2.5 px-3 text-center">Total Lots</th>
                    <th className="py-2.5 px-3 text-center">Pending</th>
                    <th className="py-2.5 px-3 text-center">Sold / Done</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.mandiOverview.map((m) => (
                    <tr key={m._id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-slate-800 flex items-center gap-1.5">
                        <MapPin size={14} className="text-slate-400 shrink-0" />
                        {m._id || "Unknown APMC"}
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-slate-900">
                        {m.totalLots}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                          {m.pendingLots}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-bold">
                          {m.soldLots}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Live System Activity Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Activity size={18} className="text-amber-600" />
            {t("adminRecentActivity")}
          </h3>
          <span className="text-xs text-slate-500 font-medium">Real-time lot workflow feed</span>
        </div>

        {loading ? (
          <div className="text-center py-10 text-xs text-slate-400">Loading activity...</div>
        ) : !data?.recentActivity?.length ? (
          <div className="text-center py-10 text-xs text-slate-400">No recent activity recorded</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b bg-slate-50 text-slate-500 font-bold uppercase">
                  <th className="py-3 px-4">Lot ID</th>
                  <th className="py-3 px-4">Farmer</th>
                  <th className="py-3 px-4">Produce</th>
                  <th className="py-3 px-4">APMC Mandi</th>
                  <th className="py-3 px-4">Current Stage</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.recentActivity.map((lot) => (
                  <tr key={lot._id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {lot.lotId || lot._id.slice(-6)}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{lot.farmer?.name || "Farmer"}</div>
                      <div className="text-[11px] text-slate-400">{lot.farmer?.mobile}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{lot.crop}</div>
                      <div className="text-[11px] text-slate-500">
                        {lot.quantity} {lot.unit}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{lot.mandi}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-bold text-[11px]">
                        {lot.currentStage || "Queue"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          lot.status === "approved" || lot.status === "sold" || lot.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : lot.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {lot.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-400 text-[11px]">
                      {new Date(lot.updatedAt || lot.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Directory */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Users size={18} className="text-blue-700" />
              {t("adminUserDirectory")}
            </h3>
            <p className="text-xs text-slate-500">Inspect registered farmers and assigned officers</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, mobile, mandi..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs w-52 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <select
              value={userRoleFilter}
              onChange={(e) => setUserRoleFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white"
            >
              <option value="all">All Roles</option>
              <option value="farmer">Farmers Only</option>
              <option value="officer">Officers Only</option>
              <option value="admin">Admins Only</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b bg-slate-50 text-slate-500 font-bold uppercase">
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3">Mobile</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Assigned Mandi</th>
                <th className="py-2.5 px-3 text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <tr key={u._id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{u.name}</td>
                  <td className="py-2.5 px-3 text-slate-600">{u.mobile}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                        u.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : u.role === "officer"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-700">
                    {u.mandi ? (
                      <span className="inline-flex items-center gap-1 text-slate-800">
                        <MapPin size={12} className="text-amber-600" />
                        {u.mandi}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Universal / All</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-400">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
