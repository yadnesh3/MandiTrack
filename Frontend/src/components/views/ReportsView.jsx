import React from "react";
import {
  FileText,
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Layers,
  Scale,
  IndianRupee,
} from "lucide-react";

export default function ReportsView({ user }) {
  const mandiName = user?.mandi || "Pune APMC";

  return (
    <div className="mx-auto max-w-5xl space-y-6 bg-[#F8F7F2] pb-8 animate-fadeIn">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#CFE2D4] bg-[#EAF2E9] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#285C3A]">
              <FileText size={13} />
              Mandi Analytics & Records
            </div>

            <h1 className="text-xl font-bold tracking-tight text-[#19343A] sm:text-2xl">
              Operational Reports & Summaries
            </h1>

            <p className="mt-1 max-w-3xl text-xs leading-5 text-[#687779] sm:text-sm">
              Produce arrival volumes, auction settlement stats, and
              daily realization metrics for{" "}
              <span className="font-semibold text-[#285C3A]">
                {mandiName}
              </span>
              .
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#285C3A] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#214D31] active:scale-[0.98]"
          >
            <Download size={14} />
            <span>Export Summary (PDF)</span>
          </button>
        </div>
      </div>

      {/* =====================================================
          OVERVIEW STATISTICS
      ====================================================== */}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {/* Arrival Volume */}
        <div className="rounded-xl border border-[#DCE3DB] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#8A9695]">
              Monthly Arrival Volume
            </div>

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A]">
              <Layers size={14} />
            </div>
          </div>

          <div className="mt-3 text-xl font-bold text-[#19343A] sm:text-2xl">
            4,820 Q
          </div>

          <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-[#285C3A]">
            <TrendingUp size={11} />
            ↑ 14% vs last month
          </div>
        </div>

        {/* Clearance */}
        <div className="rounded-xl border border-[#DCE3DB] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#8A9695]">
              Auction Clearance Rate
            </div>

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A]">
              <BarChart3 size={14} />
            </div>
          </div>

          <div className="mt-3 text-xl font-bold text-[#285C3A] sm:text-2xl">
            98.4%
          </div>

          <div className="mt-1 text-[10px] font-medium text-[#687779]">
            Same-day settlement
          </div>
        </div>

        {/* Realization */}
        <div className="rounded-xl border border-[#DCE3DB] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#8A9695]">
              Average Realization
            </div>

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F5EFDE] text-[#B58A35]">
              <IndianRupee size={14} />
            </div>
          </div>

          <div className="mt-3 text-xl font-bold text-[#80672C] sm:text-2xl">
            ₹2,340/Q
          </div>

          <div className="mt-1 text-[10px] font-medium text-[#687779]">
            Across all top 10 crops
          </div>
        </div>

        {/* Traders */}
        <div className="rounded-xl border border-[#DCE3DB] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#8A9695]">
              Active Registered Traders
            </div>

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EEF2F3] text-[#477A7A]">
              <Scale size={14} />
            </div>
          </div>

          <div className="mt-3 text-xl font-bold text-[#19343A] sm:text-2xl">
            142
          </div>

          <div className="mt-1 text-[10px] font-semibold text-[#285C3A]">
            Active licensed buyers
          </div>
        </div>
      </div>

      {/* =====================================================
          COMMODITY BREAKDOWN
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-[#DCE3DB] bg-white shadow-sm">
        {/* Section Header */}
        <div className="flex flex-col gap-2 border-b border-[#E5E9E3] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A]">
              <BarChart3 size={16} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-[#19343A]">
                Commodity Turnover Breakdown
              </h2>

              <p className="mt-0.5 text-[10px] font-medium text-[#8A9695]">
                This month's mandi activity
              </p>
            </div>
          </div>

          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#CFE2D4] bg-[#EAF2E9] px-2.5 py-1 text-[10px] font-semibold text-[#285C3A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#285C3A]" />
            Live APMC Aggregates
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#DCE3DB] bg-[#F8F7F2] text-[10px] font-bold uppercase tracking-[0.08em] text-[#687779]">
                <th className="px-4 py-3.5">
                  Commodity
                </th>

                <th className="px-4 py-3.5">
                  Total Lots
                </th>

                <th className="px-4 py-3.5">
                  Volume (Quintals)
                </th>

                <th className="px-4 py-3.5 text-right">
                  Avg Rate (₹/Q)
                </th>

                <th className="px-4 py-3.5 text-right">
                  Gross Turnover
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E9E3] text-xs font-medium text-[#19343A]">
              {[
                {
                  name: "Onion (कांदा)",
                  lots: 124,
                  vol: "1,450 Q",
                  avg: "₹1,820",
                  turnover: "₹26,39,000",
                },
                {
                  name: "Tomato (टोमॅटो)",
                  lots: 96,
                  vol: "920 Q",
                  avg: "₹1,450",
                  turnover: "₹13,34,000",
                },
                {
                  name: "Soybean (सोयाबीन)",
                  lots: 88,
                  vol: "1,100 Q",
                  avg: "₹4,250",
                  turnover: "₹46,75,000",
                },
                {
                  name: "Wheat (गहू)",
                  lots: 64,
                  vol: "850 Q",
                  avg: "₹2,650",
                  turnover: "₹22,52,500",
                },
                {
                  name: "Green Chilli (मिरची)",
                  lots: 42,
                  vol: "310 Q",
                  avg: "₹3,400",
                  turnover: "₹10,54,000",
                },
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors hover:bg-[#F8F7F2]"
                >
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-[#19343A]">
                      {row.name}
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="font-mono font-semibold text-[#687779]">
                      {row.lots}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-[#687779]">
                    {row.vol}
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <span className="font-mono font-semibold text-[#19343A]">
                      {row.avg}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <span className="inline-flex rounded-md border border-[#CFE2D4] bg-[#EAF2E9] px-2 py-1 font-mono text-[11px] font-bold text-[#285C3A]">
                      {row.turnover}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-[#E5E9E3] bg-[#F8F7F2] px-5 py-3.5 text-[10px] font-medium text-[#8A9695] sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-1.5">
            <Calendar size={11} />
            Current reporting period
          </span>

          <span>
            Mandi:{" "}
            <strong className="font-semibold text-[#285C3A]">
              {mandiName}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}