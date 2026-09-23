import React, { useState, useEffect } from "react";
import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
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
  const pendingCount = lots.filter(
    (l) => l.status === "pending"
  ).length;
  const approvedCount = lots.filter(
    (l) => l.status === "approved"
  ).length;
  const rejectedCount = lots.filter(
    (l) => l.status === "rejected"
  ).length;

  const recentLots = lots.slice(0, 5);

  return (
    <div className="space-y-6 bg-[#F8F7F2] pb-8 animate-fadeIn">
      {/* =====================================================
          OVERVIEW STAT CARDS
      ====================================================== */}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {/* Total Lots */}
        <div className="rounded-xl border border-[#DCE3DB] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-2xl font-bold text-[#285C3A] sm:text-3xl">
                {loading ? "..." : totalLots}
              </div>

              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#687779]">
                Total Lots
              </div>
            </div>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A]">
              <ClipboardList size={16} />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-xl border border-[#E8DDBF] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-2xl font-bold text-[#B58A35] sm:text-3xl">
                {loading ? "..." : pendingCount}
              </div>

              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#80672C]">
                Pending
              </div>
            </div>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F5EFDE] text-[#B58A35]">
              <Clock3 size={16} />
            </div>
          </div>
        </div>

        {/* Approved */}
        <div className="rounded-xl border border-[#CFE2D4] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-2xl font-bold text-[#285C3A] sm:text-3xl">
                {loading ? "..." : approvedCount}
              </div>

              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#285C3A]">
                Approved
              </div>
            </div>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A]">
              <CheckCircle2 size={16} />
            </div>
          </div>
        </div>

        {/* Rejected */}
        <div className="rounded-xl border border-[#E8CCCC] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-2xl font-bold text-[#A64B4B] sm:text-3xl">
                {loading ? "..." : rejectedCount}
              </div>

              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#A64B4B]">
                Rejected
              </div>
            </div>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FAEEEE] text-[#A64B4B]">
              <XCircle size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          RECENT SUBMISSIONS
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-[#DCE3DB] bg-white shadow-sm">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#E5E9E3] bg-white px-5 py-4 sm:px-6">
          <div>
            <h3 className="text-sm font-bold text-[#19343A] sm:text-base">
              Recent Submissions
            </h3>

            <p className="mt-0.5 text-[10px] font-medium text-[#8A9695]">
              Latest produce lots submitted by farmers
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToReviewLots}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#CFE2D4] bg-[#EAF2E9] px-3 py-2 text-[10px] font-bold text-[#285C3A] transition hover:bg-[#DCEBDD]"
          >
            <span className="hidden sm:inline">
              View All
            </span>

            <ArrowRight size={13} />
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center p-8 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2E9]">
              <RefreshCw
                size={18}
                className="animate-spin text-[#285C3A]"
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-[#19343A]">
              Loading recent submissions...
            </p>

            <p className="mt-1 text-xs text-[#8A9695]">
              Fetching the latest farmer lots.
            </p>
          </div>
        ) : recentLots.length === 0 ? (
          /* Empty */
          <div className="flex min-h-[260px] flex-col items-center justify-center p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8F7F2] text-[#8A9695]">
              <ClipboardList size={21} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-[#19343A]">
              No produce submissions found
            </h3>

            <p className="mt-1 text-xs text-[#8A9695]">
              New farmer submissions will appear here.
            </p>
          </div>
        ) : (
          /* Table */
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#DCE3DB] bg-[#F8F7F2] text-[10px] font-bold uppercase tracking-[0.08em] text-[#687779]">
                  <th className="w-12 px-6 py-3.5">
                    #
                  </th>

                  <th className="px-4 py-3.5">
                    Farmer
                  </th>

                  <th className="px-4 py-3.5">
                    Crop
                  </th>

                  <th className="px-4 py-3.5">
                    Quantity
                  </th>

                  <th className="px-4 py-3.5">
                    Mandi
                  </th>

                  <th className="px-4 py-3.5">
                    Status
                  </th>

                  <th className="px-6 py-3.5 text-right">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E5E9E3]">
                {recentLots.map((lot, index) => (
                  <tr
                    key={lot._id}
                    className="transition-colors hover:bg-[#F8F7F2]"
                  >
                    {/* Number */}
                    <td className="px-6 py-4 text-xs font-semibold text-[#9AA5A4]">
                      {index + 1}
                    </td>

                    {/* Farmer */}
                    <td className="px-4 py-4">
                      <span className="font-bold text-[#19343A]">
                        {lot.farmer?.name || "Unknown Farmer"}
                      </span>
                    </td>

                    {/* Crop */}
                    <td className="px-4 py-4">
                      <span className="font-semibold text-[#19343A]">
                        {lot.crop}
                      </span>
                    </td>

                    {/* Quantity */}
                    <td className="px-4 py-4">
                      <span className="text-xs font-medium text-[#687779]">
                        {lot.quantity} {lot.unit}
                      </span>
                    </td>

                    {/* Mandi */}
                    <td className="px-4 py-4">
                      <span className="text-xs font-semibold text-[#19343A]">
                        {lot.mandi}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <StatusBadge status={lot.status} />
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs font-medium text-[#687779]">
                        {new Date(
                          lot.createdAt
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =====================================================
          FOOTER INFO
      ====================================================== */}

      {!loading && recentLots.length > 0 && (
        <div className="flex items-center justify-between px-1 text-[10px] font-medium text-[#8A9695]">
          <span>
            Showing latest {recentLots.length} submissions
          </span>

          <span>
            {user?.mandi || "APMC Mandi"}
          </span>
        </div>
      )}
    </div>
  );
}

export default OfficerDashboardPage;