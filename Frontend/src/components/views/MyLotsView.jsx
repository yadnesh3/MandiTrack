import React, { useState, useEffect } from "react";
import { getMyLotsApi } from "../../services/api";
import {
  Package,
  ArrowRight,
  Search,
  PlusCircle,
  MapPin,
  CreditCard,
  RefreshCw,
} from "lucide-react";

export default function MyLotsView({
  _user,
  onSelectLotToTrack,
  onNavigateToAddProduce,
}) {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchLots = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getMyLotsApi();
      setLots(res.lots || []);
    } catch (err) {
      setError(err.message || "Failed to load your lots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  const filteredLots = lots.filter((lot) => {
    const matchesSearch =
      !searchQuery ||
      lot.crop
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      lot.lotId
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      lot.tokenNumber
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      lot.mandi
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      lot.status?.toLowerCase() === statusFilter.toLowerCase() ||
      lot.currentStage
        ?.toLowerCase()
        .includes(statusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  const renderStageBadge = (stage) => {
    switch (stage) {
      case "Gate Entry":
      case "Completed":
      case "Exit":
        return (
          <span className="inline-flex items-center rounded-full border border-[#CFE2D4] bg-[#EAF2E9] px-2.5 py-1 text-[10px] font-semibold text-[#285C3A]">
            {stage}
          </span>
        );

      case "Queue":
        return (
          <span className="inline-flex items-center rounded-full border border-[#E8DDBF] bg-[#F5EFDE] px-2.5 py-1 text-[10px] font-semibold text-[#80672C]">
            In Queue
          </span>
        );

      case "Quality Check":
        return (
          <span className="inline-flex items-center rounded-full border border-[#D5DDE0] bg-[#EEF2F3] px-2.5 py-1 text-[10px] font-semibold text-[#477A7A]">
            Quality Check
          </span>
        );

      case "Trading":
      case "Trading / Sale":
        return (
          <span className="inline-flex items-center rounded-full border border-[#DDD6E7] bg-[#F1EEF5] px-2.5 py-1 text-[10px] font-semibold text-[#75658F]">
            Trading
          </span>
        );

      case "Weighing":
        return (
          <span className="inline-flex items-center rounded-full border border-[#E8DDBF] bg-[#F5EFDE] px-2.5 py-1 text-[10px] font-semibold text-[#80672C]">
            Weighing
          </span>
        );

      case "Settlement":
      case "Payment":
        return (
          <span className="inline-flex items-center rounded-full border border-[#D5DDE0] bg-[#EEF2F3] px-2.5 py-1 text-[10px] font-semibold text-[#477A7A]">
            {stage}
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center rounded-full border border-[#DCE3DB] bg-[#F8F7F2] px-2.5 py-1 text-[10px] font-semibold text-[#687779]">
            {stage || "In Process"}
          </span>
        );
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 bg-[#F8F7F2] pb-8 animate-fadeIn">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#E8DDBF] bg-[#F5EFDE] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#80672C]">
              <Package
                size={13}
                className="text-[#B58A35]"
              />
              Produce Lots Directory
            </div>

            <h1 className="text-xl font-bold tracking-tight text-[#19343A] sm:text-2xl">
              My Submitted Lots
            </h1>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-[#687779] sm:text-sm">
              Manage your harvest records, review mandi valuations,
              and track live stages.
            </p>
          </div>

          {onNavigateToAddProduce && (
            <button
              type="button"
              onClick={onNavigateToAddProduce}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#285C3A] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#214D31] active:scale-[0.98]"
            >
              <PlusCircle size={15} />
              Add New Produce
            </button>
          )}
        </div>
      </div>

      {/* =====================================================
          SEARCH + FILTERS
      ====================================================== */}

      <div className="rounded-xl border border-[#DCE3DB] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative w-full md:max-w-sm">
            <Search
              size={15}
              className="absolute left-3.5 top-3 text-[#8A9695]"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Search crop, Token (F-2847), Mandi..."
              className="w-full rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] py-2.5 pl-9 pr-4 text-xs font-medium text-[#19343A] outline-none transition placeholder:text-[#9AA5A3] focus:border-[#285C3A] focus:bg-white focus:ring-2 focus:ring-[#EAF2E9]"
            />
          </div>

          {/* Filters */}
          <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 md:w-auto md:pb-0">
            {[
              "all",
              "queue",
              "quality check",
              "trading",
              "completed",
            ].map((tab) => {
              const isActive = statusFilter === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`whitespace-nowrap rounded-lg border px-3 py-2 text-[11px] font-semibold capitalize transition ${
                    isActive
                      ? "border-[#285C3A] bg-[#285C3A] text-white shadow-sm"
                      : "border-[#DCE3DB] bg-[#F8F7F2] text-[#687779] hover:bg-white hover:text-[#19343A]"
                  }`}
                >
                  {tab === "all" ? "All Lots" : tab}
                </button>
              );
            })}

            <button
              type="button"
              onClick={fetchLots}
              className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] text-[#687779] transition hover:bg-[#EAF2E9] hover:text-[#285C3A]"
              title="Refresh lots"
            >
              <RefreshCw
                size={13}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>

        {/* Result count */}
        {!loading && !error && (
          <div className="mt-3 border-t border-[#E5E9E3] pt-3 text-[10px] font-medium text-[#8A9695]">
            Showing{" "}
            <span className="font-bold text-[#19343A]">
              {filteredLots.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#19343A]">
              {lots.length}
            </span>{" "}
            submitted lots
          </div>
        )}
      </div>

      {/* =====================================================
          LOADING
      ====================================================== */}

      {loading ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-[#DCE3DB] bg-white px-6 text-center shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2E9]">
            <Package
              size={21}
              className="text-[#285C3A]"
            />
          </div>

          <h2 className="mt-4 text-sm font-bold text-[#19343A]">
            Loading your lots
          </h2>

          <p className="mt-1 text-xs font-medium text-[#687779]">
            Fetching your latest produce records...
          </p>
        </div>
      ) : error ? (
        /* ===================================================
           ERROR
        ==================================================== */

        <div className="flex items-start gap-3 rounded-xl border border-[#E8CCCC] bg-[#FAEEEE] p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#A64B4B]">
            <Package size={15} />
          </div>

          <div>
            <p className="text-xs font-bold text-[#A64B4B]">
              Unable to load your lots
            </p>

            <p className="mt-1 text-[11px] font-medium text-[#8F5B5B]">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchLots}
              className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-[#E8CCCC] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#A64B4B] transition hover:bg-[#FAEEEE]"
            >
              <RefreshCw size={11} />
              Try Again
            </button>
          </div>
        </div>
      ) : filteredLots.length === 0 ? (
        /* ===================================================
           EMPTY STATE
        ==================================================== */

        <div className="rounded-xl border border-[#DCE3DB] bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F8F7F2] text-[#687779]">
            <Package size={27} />
          </div>

          <h2 className="mt-4 text-sm font-bold text-[#19343A]">
            No Produce Lots Found
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-xs font-medium leading-5 text-[#687779]">
            You have not registered any produce lots under this
            filter yet. Add your crop to obtain a queue token.
          </p>

          {onNavigateToAddProduce && (
            <button
              type="button"
              onClick={onNavigateToAddProduce}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#285C3A] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#214D31] active:scale-[0.98]"
            >
              <PlusCircle size={14} />
              Register First Lot
            </button>
          )}
        </div>
      ) : (
        /* ===================================================
           LOT TABLE
        ==================================================== */

        <div className="overflow-hidden rounded-xl border border-[#DCE3DB] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E5E9E3] px-4 py-3 sm:px-5">
            <div>
              <h2 className="text-sm font-bold text-[#19343A]">
                Submitted Produce Lots
              </h2>

              <p className="mt-0.5 text-[10px] font-medium text-[#8A9695]">
                Select a lot to view its live mandi journey
              </p>
            </div>

            <div className="hidden items-center gap-1.5 rounded-full border border-[#CFE2D4] bg-[#EAF2E9] px-2.5 py-1 text-[10px] font-semibold text-[#285C3A] sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#285C3A]" />
              Live Tracking
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#DCE3DB] bg-[#F8F7F2] text-[10px] font-bold uppercase tracking-[0.08em] text-[#687779]">
                  <th className="px-4 py-3.5">
                    # Token
                  </th>

                  <th className="px-4 py-3.5">
                    Lot ID
                  </th>

                  <th className="px-4 py-3.5">
                    Crop
                  </th>

                  <th className="px-4 py-3.5">
                    Quantity
                  </th>

                  <th className="px-4 py-3.5">
                    Mandi Market
                  </th>

                  <th className="px-4 py-3.5">
                    Current Stage
                  </th>

                  <th className="px-4 py-3.5">
                    Payment
                  </th>

                  <th className="px-4 py-3.5 text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E5E9E3] text-xs font-medium text-[#19343A]">
                {filteredLots.map((lot, idx) => (
                  <tr
                    key={lot._id}
                    onClick={() =>
                      onSelectLotToTrack &&
                      onSelectLotToTrack(lot._id)
                    }
                    className="group cursor-pointer transition-colors hover:bg-[#F8F7F2]"
                  >
                    {/* Token */}
                    <td className="px-4 py-3.5">
                      <span className="inline-flex rounded-md border border-[#DCE3DB] bg-[#F8F7F2] px-2 py-1 font-mono text-[10px] font-bold text-[#19343A] transition group-hover:border-[#E8DDBF] group-hover:bg-[#F5EFDE] group-hover:text-[#80672C]">
                        {lot.tokenNumber ||
                          `TK-${idx + 101}`}
                      </span>
                    </td>

                    {/* Lot ID */}
                    <td className="px-4 py-3.5 font-mono text-[10px] font-medium text-[#687779]">
                      {lot.lotId}
                    </td>

                    {/* Crop */}
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-[#19343A]">
                        {lot.crop}
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-[#19343A]">
                        {lot.quantity}
                      </span>{" "}
                      <span className="font-medium text-[#687779]">
                        {lot.unit}
                      </span>
                    </td>

                    {/* Mandi */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 font-medium text-[#687779]">
                        <MapPin
                          size={12}
                          className="shrink-0 text-[#B58A35]"
                        />
                        {lot.mandi}
                      </div>
                    </td>

                    {/* Stage */}
                    <td className="px-4 py-3.5">
                      {renderStageBadge(
                        lot.currentStage || "Queue"
                      )}
                    </td>

                    {/* Payment */}
                    <td className="px-4 py-3.5">
                      <div
                        className={`inline-flex items-center gap-1.5 text-[10px] font-semibold ${
                          lot.paymentStatus === "Paid"
                            ? "text-[#285C3A]"
                            : "text-[#80672C]"
                        }`}
                      >
                        <CreditCard size={12} />

                        {lot.paymentStatus || "Pending"}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          if (onSelectLotToTrack) {
                            onSelectLotToTrack(lot._id);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] px-3 py-1.5 text-[10px] font-semibold text-[#285C3A] transition hover:border-[#285C3A] hover:bg-[#285C3A] hover:text-white"
                      >
                        Track
                        <ArrowRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile-friendly bottom note */}
          <div className="border-t border-[#E5E9E3] bg-[#F8F7F2] px-4 py-3 text-[10px] font-medium text-[#8A9695] sm:hidden">
            Tap a lot or use the Track button to view its live
            progress.
          </div>
        </div>
      )}
    </div>
  );
}