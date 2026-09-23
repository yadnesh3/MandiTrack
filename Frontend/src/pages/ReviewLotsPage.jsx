import React, { useState, useEffect } from "react";
import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  XCircle,
  PackageCheck,
  RefreshCw,
  AlertCircle,
  Check,
} from "lucide-react";
import {
  getPendingLotsApi,
  getAllLotsApi,
  updateLotStatusApi,
} from "../services/api";
import StatusBadge from "../components/StatusBadge";

function ReviewLotsPage() {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [filterMode, setFilterMode] = useState("pending");

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
        setLots((prev) =>
          prev.filter((l) => l._id !== lotId)
        );
      } else {
        setLots((prev) =>
          prev.map((l) =>
            l._id === lotId
              ? { ...l, status: newStatus }
              : l
          )
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
    <div className="space-y-6 bg-[#F8F7F2] pb-8 animate-fadeIn">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A]">
              <ClipboardList size={19} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#19343A] sm:text-2xl">
                {filterMode === "pending"
                  ? "Pending Lots"
                  : "All Produce Submissions"}
              </h2>

              <p className="mt-1 text-xs font-medium text-[#687779]">
                Review and take action on submitted produce
              </p>
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="flex w-full rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] p-1 sm:w-fit">
            <button
              type="button"
              onClick={() => setFilterMode("pending")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-[11px] font-bold transition sm:flex-none ${
                filterMode === "pending"
                  ? "bg-[#285C3A] text-white shadow-sm"
                  : "text-[#687779] hover:text-[#19343A]"
              }`}
            >
              <Clock3 size={13} />
              Pending Only
            </button>

            <button
              type="button"
              onClick={() => setFilterMode("all")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-[11px] font-bold transition sm:flex-none ${
                filterMode === "all"
                  ? "bg-[#285C3A] text-white shadow-sm"
                  : "text-[#687779] hover:text-[#19343A]"
              }`}
            >
              <ClipboardList size={13} />
              All Submissions
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUCCESS
      ====================================================== */}

      {successMsg && (
        <div className="flex items-start gap-3 rounded-xl border border-[#CFE2D4] bg-[#EAF2E9] p-4 text-[#285C3A]">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
            <Check size={15} />
          </div>

          <div>
            <p className="text-xs font-bold">
              Action completed
            </p>

            <p className="mt-0.5 text-[11px] font-medium">
              {successMsg}
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-[#E8CCCC] bg-[#FAEEEE] p-4 text-[#A64B4B]">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="text-xs font-bold">
              Something went wrong
            </p>

            <p className="mt-0.5 text-[11px] font-medium">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          LOTS CARD
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-[#DCE3DB] bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF2E9]">
              <RefreshCw
                size={19}
                className="animate-spin text-[#285C3A]"
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-[#19343A]">
              Loading lots for review...
            </p>

            <p className="mt-1 text-xs text-[#8A9695]">
              Fetching the latest produce submissions.
            </p>
          </div>
        ) : lots.length === 0 ? (
          <div className="mx-auto flex min-h-[320px] max-w-sm flex-col items-center justify-center p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F8F7F2] text-[#8A9695]">
              {filterMode === "pending" ? (
                <Clock3 size={24} />
              ) : (
                <ClipboardList size={24} />
              )}
            </div>

            <h3 className="mt-4 text-base font-bold text-[#19343A]">
              {filterMode === "pending"
                ? "No pending lots"
                : "No lots found"}
            </h3>

            <p className="mt-1.5 text-xs leading-5 text-[#687779]">
              There are currently no produce lots{" "}
              {filterMode === "pending"
                ? "requiring officer review"
                : "in the system"}
              .
            </p>
          </div>
        ) : (
          <>
            {/* =================================================
                DESKTOP TABLE
            ================================================= */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[1050px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#DCE3DB] bg-[#F8F7F2] text-[10px] font-bold uppercase tracking-[0.08em] text-[#687779]">
                    <th className="w-10 px-6 py-3.5">
                      #
                    </th>

                    <th className="px-4 py-3.5">
                      Farmer
                    </th>

                    <th className="px-4 py-3.5">
                      Crop
                    </th>

                    <th className="px-4 py-3.5">
                      Qty
                    </th>

                    <th className="px-4 py-3.5">
                      Mandi
                    </th>

                    <th className="px-4 py-3.5">
                      Expected Price
                    </th>

                    <th className="px-4 py-3.5">
                      Date
                    </th>

                    {filterMode === "all" && (
                      <th className="px-4 py-3.5">
                        Status
                      </th>
                    )}

                    <th className="px-6 py-3.5 text-right">
                      Action
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

                      {/* Farmer */}
                      <td className="px-4 py-4">
                        <div className="font-bold text-[#19343A]">
                          {lot.farmer?.name || "Farmer"}
                        </div>

                        <div className="mt-0.5 font-mono text-[10px] text-[#8A9695]">
                          {lot.farmer?.mobile || "N/A"}
                        </div>
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

                      {/* Expected Price */}
                      <td className="px-4 py-4">
                        <span className="font-mono text-xs font-bold text-[#285C3A]">
                          ₹{lot.expectedPrice.toLocaleString()}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 text-xs font-medium text-[#687779]">
                        {new Date(
                          lot.createdAt
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Status */}
                      {filterMode === "all" && (
                        <td className="px-4 py-4">
                          <StatusBadge status={lot.status} />
                        </td>
                      )}

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap justify-end gap-1.5">
                          {/* Approve */}
                          {lot.status !== "approved" &&
                            lot.status !== "sold" && (
                              <button
                                type="button"
                                disabled={
                                  updatingId === lot._id
                                }
                                onClick={() =>
                                  handleAction(
                                    lot._id,
                                    "approved"
                                  )
                                }
                                className="inline-flex items-center gap-1 rounded-md bg-[#285C3A] px-2.5 py-1.5 text-[10px] font-bold text-white transition hover:bg-[#214D31] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <CheckCircle2 size={12} />
                                Approve
                              </button>
                            )}

                          {/* Reject */}
                          {lot.status !== "rejected" &&
                            lot.status !== "sold" && (
                              <button
                                type="button"
                                disabled={
                                  updatingId === lot._id
                                }
                                onClick={() =>
                                  handleAction(
                                    lot._id,
                                    "rejected"
                                  )
                                }
                                className="inline-flex items-center gap-1 rounded-md border border-[#E8CCCC] bg-[#FAEEEE] px-2.5 py-1.5 text-[10px] font-bold text-[#A64B4B] transition hover:bg-[#F6E5E5] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <XCircle size={12} />
                                Reject
                              </button>
                            )}

                          {/* Mark Sold */}
                          {lot.status === "approved" && (
                            <button
                              type="button"
                              disabled={
                                updatingId === lot._id
                              }
                              onClick={() =>
                                handleAction(
                                  lot._id,
                                  "sold"
                                )
                              }
                              className="inline-flex items-center gap-1 rounded-md bg-[#477A7A] px-2.5 py-1.5 text-[10px] font-bold text-white transition hover:opacity-90 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <PackageCheck size={12} />
                              Mark Sold
                            </button>
                          )}

                          {/* Sold */}
                          {lot.status === "sold" && (
                            <span className="inline-flex items-center gap-1 rounded-md border border-[#D5DDE0] bg-[#EEF2F3] px-2.5 py-1.5 text-[10px] font-bold text-[#477A7A]">
                              <Check size={12} />
                              Sold
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* =================================================
                MOBILE CARDS
            ================================================= */}

            <div className="divide-y divide-[#E5E9E3] md:hidden">
              {lots.map((lot) => (
                <div
                  key={lot._id}
                  className="space-y-4 p-4"
                >
                  {/* Farmer + Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold text-[#19343A]">
                        {lot.farmer?.name || "Farmer"}
                      </div>

                      <div className="mt-0.5 font-mono text-[10px] text-[#8A9695]">
                        {lot.farmer?.mobile || "N/A"}
                      </div>
                    </div>

                    {filterMode === "all" && (
                      <StatusBadge status={lot.status} />
                    )}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#DCE3DB] bg-[#DCE3DB]">
                    <div className="bg-[#F8F7F2] p-3">
                      <span className="block text-[9px] font-bold uppercase tracking-wide text-[#8A9695]">
                        Crop
                      </span>

                      <span className="mt-1 block text-xs font-bold text-[#19343A]">
                        {lot.crop}
                      </span>
                    </div>

                    <div className="bg-[#F8F7F2] p-3">
                      <span className="block text-[9px] font-bold uppercase tracking-wide text-[#8A9695]">
                        Quantity
                      </span>

                      <span className="mt-1 block text-xs font-bold text-[#19343A]">
                        {lot.quantity} {lot.unit}
                      </span>
                    </div>

                    <div className="bg-[#F8F7F2] p-3">
                      <span className="block text-[9px] font-bold uppercase tracking-wide text-[#8A9695]">
                        Mandi
                      </span>

                      <span className="mt-1 block text-xs font-bold text-[#19343A]">
                        {lot.mandi}
                      </span>
                    </div>

                    <div className="bg-[#F8F7F2] p-3">
                      <span className="block text-[9px] font-bold uppercase tracking-wide text-[#8A9695]">
                        Expected Price
                      </span>

                      <span className="mt-1 block font-mono text-xs font-bold text-[#285C3A]">
                        ₹{lot.expectedPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="text-[10px] font-medium text-[#8A9695]">
                    Submitted{" "}
                    {new Date(
                      lot.createdAt
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    {lot.status !== "approved" &&
                      lot.status !== "sold" && (
                        <button
                          type="button"
                          disabled={updatingId === lot._id}
                          onClick={() =>
                            handleAction(
                              lot._id,
                              "approved"
                            )
                          }
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#285C3A] py-2.5 text-xs font-bold text-white transition active:scale-[0.98] disabled:opacity-50"
                        >
                          <CheckCircle2 size={14} />
                          Approve
                        </button>
                      )}

                    {lot.status !== "rejected" &&
                      lot.status !== "sold" && (
                        <button
                          type="button"
                          disabled={updatingId === lot._id}
                          onClick={() =>
                            handleAction(
                              lot._id,
                              "rejected"
                            )
                          }
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#E8CCCC] bg-[#FAEEEE] py-2.5 text-xs font-bold text-[#A64B4B] transition active:scale-[0.98] disabled:opacity-50"
                        >
                          <XCircle size={14} />
                          Reject
                        </button>
                      )}

                    {lot.status === "approved" && (
                      <button
                        type="button"
                        disabled={updatingId === lot._id}
                        onClick={() =>
                          handleAction(
                            lot._id,
                            "sold"
                          )
                        }
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#477A7A] py-2.5 text-xs font-bold text-white transition active:scale-[0.98] disabled:opacity-50"
                      >
                        <PackageCheck size={14} />
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