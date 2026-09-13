import React, { useState, useEffect } from "react";
import { getPendingLotsApi, getAllLotsApi, updateLotStatusApi } from "../services/api";

function ReviewLotsPage() {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [filterMode, setFilterMode] = useState("pending"); // "pending" | "all"

  const fetchLots = async () => {
    setLoading(true);
    setError("");
    try {
      const response = filterMode === "pending" ? await getPendingLotsApi() : await getAllLotsApi();
      setLots(response.lots || []);
    } catch (err) {
      setError(err.message || "Failed to load lots for review.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLots();
  }, [filterMode]);

  const handleAction = async (lotId, newStatus) => {
    setUpdatingId(lotId);
    setError("");
    setSuccessMsg("");

    try {
      await updateLotStatusApi(lotId, newStatus);
      setSuccessMsg(`Lot status updated to "${newStatus.toUpperCase()}" successfully.`);

      // Update state locally
      if (filterMode === "pending") {
        setLots((prev) => prev.filter((l) => l._id !== lotId));
      } else {
        setLots((prev) =>
          prev.map((l) => (l._id === lotId ? { ...l, status: newStatus } : l))
        );
      }

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update lot status.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Container Matching Panel 8 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {filterMode === "pending" ? "Pending Lots" : "All Produce Submissions"}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Review and take action on submitted produce
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setFilterMode("pending")}
            className={`px-4 py-2 rounded-xl transition-all ${
              filterMode === "pending"
                ? "bg-[#064e3b] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Pending Only
          </button>
          <button
            onClick={() => setFilterMode("all")}
            className={`px-4 py-2 rounded-xl transition-all ${
              filterMode === "all"
                ? "bg-[#064e3b] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Submissions
          </button>
        </div>
      </div>

      {/* Alert Messages */}
      {successMsg && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs font-bold rounded-2xl">
          ✅ {successMsg}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-2xl">
          ⚠️ {error}
        </div>
      )}

      {/* Table Card Container Matching Panel 8 */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            Loading lots for review...
          </div>
        ) : lots.length === 0 ? (
          <div className="p-12 text-center max-w-sm mx-auto space-y-2">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center text-2xl mx-auto">
              📋
            </div>
            <h3 className="font-bold text-slate-800 text-base">No pending lots</h3>
            <p className="text-xs text-slate-500">
              There are currently no produce lots requiring officer review.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-xs font-bold text-slate-600">
                  <th className="py-4 px-6 w-12">#</th>
                  <th className="py-4 px-4 font-extrabold">Farmer</th>
                  <th className="py-4 px-4 font-extrabold">Crop</th>
                  <th className="py-4 px-4 font-extrabold">Qty</th>
                  <th className="py-4 px-4 font-extrabold">Mandi</th>
                  <th className="py-4 px-4 font-extrabold">Expected Price</th>
                  <th className="py-4 px-6 text-right font-extrabold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lots.map((lot, index) => (
                  <tr key={lot._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-400 text-xs">
                      {index + 1}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">
                      <div>{lot.farmer?.name || "Farmer"}</div>
                      <div className="text-[11px] font-mono text-slate-400 font-normal">
                        📱 {lot.farmer?.mobile || "N/A"}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-800">
                      {lot.crop}
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {lot.quantity} {lot.unit}
                    </td>
                    <td className="py-4 px-4 text-slate-800 font-medium">
                      {lot.mandi}
                    </td>
                    <td className="py-4 px-4 font-extrabold text-green-800">
                      ₹{lot.expectedPrice.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        {lot.status !== "approved" && (
                          <button
                            disabled={updatingId === lot._id}
                            onClick={() => handleAction(lot._id, "approved")}
                            className="px-4 py-2 bg-green-700 hover:bg-green-800 active:scale-95 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                          >
                            Approve
                          </button>
                        )}

                        {lot.status !== "rejected" && (
                          <button
                            disabled={updatingId === lot._id}
                            onClick={() => handleAction(lot._id, "rejected")}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 active:scale-95 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                          >
                            Reject
                          </button>
                        )}
                      </div>
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

export default ReviewLotsPage;
