import React, { useState, useEffect } from "react";
import { Package, RefreshCw, Plus, AlertCircle } from "lucide-react";
import { getMyLotsApi } from "../services/api";
import StatusBadge from "../components/StatusBadge";

function MyLotsPage({ onNavigateToAddProduce }) {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLots = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getMyLotsApi();
      setLots(response.lots || []);
    } catch (err) {
      setError(err.message || "Failed to load lots.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  return (
    <div className="space-y-6 bg-[#F8F7F2] pb-8 animate-fadeIn">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A]">
              <Package size={19} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#19343A] sm:text-2xl">
                My Lots
              </h2>

              <p className="mt-0.5 text-xs font-medium text-[#687779]">
                View all your submitted produce
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchLots}
            disabled={loading}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] px-3.5 py-2 text-xs font-semibold text-[#285C3A] transition hover:border-[#B9C8BC] hover:bg-[#EAF2E9] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              className={loading ? "animate-spin" : ""}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* =====================================================
          TABLE / STATES
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-[#DCE3DB] bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center p-8 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2E9]">
              <RefreshCw
                size={18}
                className="animate-spin text-[#285C3A]"
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-[#19343A]">
              Loading your produce lots...
            </p>

            <p className="mt-1 text-xs text-[#8A9695]">
              Please wait while we fetch your submissions.
            </p>
          </div>
        ) : error ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center bg-[#FAEEEE] p-8 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#A64B4B]">
              <AlertCircle size={19} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-[#A64B4B]">
              Unable to load lots
            </h3>

            <p className="mt-1 max-w-md text-xs font-medium text-[#A64B4B]/80">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchLots}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#285C3A] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#214D31]"
            >
              <RefreshCw size={13} />
              Try Again
            </button>
          </div>
        ) : lots.length === 0 ? (
          <div className="mx-auto flex min-h-[320px] max-w-md flex-col items-center justify-center p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF2E9] text-[#285C3A]">
              <Package size={24} />
            </div>

            <h3 className="mt-4 text-base font-bold text-[#19343A]">
              No produce lots found
            </h3>

            <p className="mt-1.5 text-xs leading-5 text-[#687779]">
              You haven't submitted any produce lot yet. Click below
              to submit your crop.
            </p>

            {onNavigateToAddProduce && (
              <button
                type="button"
                onClick={onNavigateToAddProduce}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#285C3A] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#214D31] active:scale-[0.98]"
              >
                <Plus size={15} />
                Add New Produce
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#DCE3DB] bg-[#F8F7F2] text-[10px] font-bold uppercase tracking-[0.08em] text-[#687779]">
                  <th className="w-12 px-6 py-3.5">
                    #
                  </th>

                  <th className="px-4 py-3.5">
                    Crop
                  </th>

                  <th className="px-4 py-3.5">
                    Quantity
                  </th>

                  <th className="px-4 py-3.5">
                    Unit
                  </th>

                  <th className="px-4 py-3.5">
                    Mandi
                  </th>

                  <th className="px-4 py-3.5">
                    Expected Price
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
                {lots.map((lot, index) => (
                  <tr
                    key={lot._id}
                    className="transition-colors hover:bg-[#F8F7F2]"
                  >
                    {/* Number */}
                    <td className="px-6 py-4 text-xs font-semibold text-[#9AA5A4]">
                      {index + 1}
                    </td>

                    {/* Crop */}
                    <td className="px-4 py-4">
                      <span className="font-bold text-[#19343A]">
                        {lot.crop}
                      </span>
                    </td>

                    {/* Quantity */}
                    <td className="px-4 py-4">
                      <span className="font-semibold text-[#19343A]">
                        {lot.quantity}
                      </span>
                    </td>

                    {/* Unit */}
                    <td className="px-4 py-4">
                      <span className="text-xs font-medium text-[#687779]">
                        {lot.unit}
                      </span>
                    </td>

                    {/* Mandi */}
                    <td className="px-4 py-4">
                      <span className="text-xs font-semibold text-[#19343A]">
                        {lot.mandi}
                      </span>
                    </td>

                    {/* Expected Price */}
                    <td className="px-4 py-4">
                      <span className="font-mono text-xs font-bold text-[#285C3A]">
                        ₹{lot.expectedPrice.toLocaleString()}
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
                          year: "numeric",
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
          TABLE FOOTER
      ====================================================== */}

      {!loading && !error && lots.length > 0 && (
        <div className="flex items-center justify-between px-1 text-[10px] font-medium text-[#8A9695]">
          <span>
            Showing {lots.length}{" "}
            {lots.length === 1 ? "lot" : "lots"}
          </span>

          <span>
            MandiTrack Produce Records
          </span>
        </div>
      )}
    </div>
  );
}

export default MyLotsPage;