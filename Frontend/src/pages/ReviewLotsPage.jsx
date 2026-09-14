import React, { useState, useEffect } from "react";
import { getPendingLotsApi, getAllLotsApi, updateLotStatusApi } from "../services/api";
import StatusBadge from "../components/StatusBadge";

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
      const response =
        filterMode === "pending"
          ? await getPendingLotsApi()
          : await getAllLotsApi();
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
      setSuccessMsg(
        `Lot status updated to "${newStatus.toUpperCase()}" successfully.`
      );

      if (filterMode === "pending") {
        // Remove from pending list since status changed
        setLots((prev) => prev.filter((l) => l._id !== lotId));
      } else {
        // Update status in-place for "all" view
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
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {filterMode === "pending"
              ? "Pending Lots"
              : "All Produce Submissions"}
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

      {/* Success */}
      {successMsg && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs font-bold rounded-2xl">
          ✅ {successMsg}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-2xl">
          ⚠️ {error}
        </div>
      )}

      {/* Table Card */}
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
            <h3 className="font-bold text-slate-800 text-base">
              {filterMode === "pending"
                ? "No pending lots"
                : "No lots found"}
            </h3>
            <p className="text-xs text-slate-500">
              There are currently no produce lots{" "}
              {filterMode === "pending"
                ? "requiring officer review"
                : "in the system"}
              .
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-xs font-bold text-slate-600">
                    <th className="py-4 px-6 w-10">#</th>
                    <th className="py-4 px-4">Farmer</th>
                    <th className="py-4 px-4">Crop</th>
                    <th className="py-4 px-4">Qty</th>
                    <th className="py-4 px-4">Mandi</th>
                    <th className="py-4 px-4">Expected Price</th>
                    <th className="py-4 px-4">Date</th>
                    {filterMode === "all" && (
                      <th className="py-4 px-4">Status</th>
                    )}
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lots.map((lot, index) => (
                    <tr
                      key={lot._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
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
                      <td className="py-4 px-4 text-slate-500 text-xs">
                        {new Date(lot.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      {filterMode === "all" && (
                        <td className="py-4 px-4">
                          <StatusBadge status={lot.status} />
                        </td>
                      )}
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2 flex-wrap">
                          {/* Approve — only if not already approved or sold */}
                          {lot.status !== "approved" &&
                            lot.status !== "sold" && (
                              <button
                                disabled={updatingId === lot._id}
                                onClick={() =>
                                  handleAction(lot._id, "approved")
                                }
                                className="px-3 py-1.5 bg-green-700 hover:bg-green-800 active:scale-95 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                              >
                                Approve
                              </button>
                            )}

                          {/* Reject — only if not already rejected or sold */}
                          {lot.status !== "rejected" &&
                            lot.status !== "sold" && (
                              <button
                                disabled={updatingId === lot._id}
                                onClick={() =>
                                  handleAction(lot._id, "rejected")
                                }
                                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 active:scale-95 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                              >
                                Reject
                              </button>
                            )}

                          {/* Mark Sold — only if approved */}
                          {lot.status === "approved" && (
                            <button
                              disabled={updatingId === lot._id}
                              onClick={() => handleAction(lot._id, "sold")}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                            >
                              Mark Sold
                            </button>
                          )}

                          {/* Sold badge — final state */}
                          {lot.status === "sold" && (
                            <span className="px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-bold rounded-xl border border-slate-200">
                              ✅ Sold
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden divide-y divide-slate-100">
              {lots.map((lot) => (
                <div key={lot._id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        {lot.farmer?.name || "Farmer"}
                      </div>
                      <div className="text-xs text-slate-400">
                        📱 {lot.farmer?.mobile || "N/A"}
                      </div>
                    </div>
                    {filterMode === "all" && (
                      <StatusBadge status={lot.status} />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border">
                    <div>
                      <span className="text-slate-400 block">Crop</span>
                      <span className="font-semibold text-slate-800">
                        {lot.crop}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Quantity</span>
                      <span className="font-semibold text-slate-800">
                        {lot.quantity} {lot.unit}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Mandi</span>
                      <span className="font-semibold text-slate-800">
                        {lot.mandi}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">
                        Expected Price
                      </span>
                      <span className="font-bold text-green-800">
                        ₹{lot.expectedPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1 flex-wrap">
                    {lot.status !== "approved" && lot.status !== "sold" && (
                      <button
                        disabled={updatingId === lot._id}
                        onClick={() => handleAction(lot._id, "approved")}
                        className="flex-1 py-2 bg-green-700 text-white text-xs font-bold rounded-xl shadow-xs active:scale-95 disabled:opacity-50"
                      >
                        Approve
                      </button>
                    )}

                    {lot.status !== "rejected" && lot.status !== "sold" && (
                      <button
                        disabled={updatingId === lot._id}
                        onClick={() => handleAction(lot._id, "rejected")}
                        className="flex-1 py-2 bg-red-600 text-white text-xs font-bold rounded-xl shadow-xs active:scale-95 disabled:opacity-50"
                      >
                        Reject
                      </button>
                    )}

                    {lot.status === "approved" && (
                      <button
                        disabled={updatingId === lot._id}
                        onClick={() => handleAction(lot._id, "sold")}
                        className="flex-1 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-xs active:scale-95 disabled:opacity-50"
                      >
                        Mark Sold
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ReviewLotsPage;
