import React, { useState, useEffect } from "react";
import { getAllLotsApi } from "../services/api";
import StatusBadge from "../components/StatusBadge";

function OfficerDashboardPage({ user, onNavigateToReviewLots }) {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const response = await getAllLotsApi();
        setLots(response.lots || []);
      } catch (err) {
        console.error("Failed to load lots", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLots();
  }, []);

  const totalLots = lots.length;
  const pendingCount = lots.filter((l) => l.status === "pending").length;
  const approvedCount = lots.filter((l) => l.status === "approved").length;
  const rejectedCount = lots.filter((l) => l.status === "rejected").length;

  const recentLots = lots.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards Matching Panel 7 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Lots */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-3xl font-extrabold text-blue-700">
            {loading ? "..." : totalLots}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Lots
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white p-6 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs space-y-1">
          <div className="text-3xl font-extrabold text-amber-600">
            {loading ? "..." : pendingCount}
          </div>
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
            Pending
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white p-6 rounded-2xl border border-green-200 bg-green-50/20 shadow-xs space-y-1">
          <div className="text-3xl font-extrabold text-green-700">
            {loading ? "..." : approvedCount}
          </div>
          <div className="text-xs font-semibold text-green-800 uppercase tracking-wider">
            Approved
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-white p-6 rounded-2xl border border-red-200 bg-red-50/20 shadow-xs space-y-1">
          <div className="text-3xl font-extrabold text-red-600">
            {loading ? "..." : rejectedCount}
          </div>
          <div className="text-xs font-semibold text-red-700 uppercase tracking-wider">
            Rejected
          </div>
        </div>
      </div>

      {/* Recent Submissions Section Matching Panel 7 */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">
            Recent Submissions
          </h3>
          <button
            onClick={onNavigateToReviewLots}
            className="text-xs font-bold text-green-800 hover:underline flex items-center gap-1"
          >
            View All &rarr;
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            Loading recent submissions...
          </div>
        ) : recentLots.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No produce submissions found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-xs font-bold text-slate-600">
                  <th className="py-4 px-6 w-12">#</th>
                  <th className="py-4 px-4 font-extrabold">Farmer</th>
                  <th className="py-4 px-4 font-extrabold">Crop</th>
                  <th className="py-4 px-4 font-extrabold">Quantity</th>
                  <th className="py-4 px-4 font-extrabold">Mandi</th>
                  <th className="py-4 px-4 font-extrabold">Status</th>
                  <th className="py-4 px-6 font-extrabold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLots.map((lot, index) => (
                  <tr key={lot._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-400 text-xs">
                      {index + 1}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">
                      {lot.farmer?.name || "Unknown Farmer"}
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-800">
                      {lot.crop}
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {lot.quantity} {lot.unit}
                    </td>
                    <td className="py-4 px-4 text-slate-800 font-medium">
                      {lot.mandi}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={lot.status} />
                    </td>
                    <td className="py-4 px-6 text-right text-xs font-semibold text-slate-500">
                      {new Date(lot.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default OfficerDashboardPage;
