import React from "react";
import { Check, ArrowRight } from "lucide-react";

const STEPS = [
  {
    id: 1,
    label: "Registered",
    state: "done",
  },
  {
    id: 2,
    label: "Waiting",
    state: "done",
  },
  {
    id: 3,
    label: "Weighing",
    state: "active",
  },
  {
    id: 4,
    label: "Approved",
    state: "pending",
  },
  {
    id: 5,
    label: "Sold",
    state: "pending",
  },
];

function StatusCircle({ step }) {
  if (step.state === "done") {
    return (
      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
        <Check size={16} strokeWidth={3} />
      </div>
    );
  }

  if (step.state === "active") {
    return (
      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white text-sm font-bold shadow-sm">
        3
      </div>
    );
  }

  return (
    <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500 text-sm font-semibold border border-slate-300">
      {step.id}
    </div>
  );
}

export default function LotStatusPreview({
  onViewLots,
}) {
  return (
    <div className="w-full rounded-2xl border border-white/70 bg-white p-5 shadow-2xl sm:p-7">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Sample lot
          </p>

          <h2 className="mt-1 text-xl font-bold text-[#0E2A3F] sm:text-2xl">
            Lot Status
          </h2>
        </div>

        <button
          type="button"
          onClick={onViewLots}
          className="hidden items-center gap-1 text-sm font-semibold text-[#0E2A3F] hover:underline sm:flex"
        >
          View My Lots
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Desktop Stepper */}
      <div className="mt-8 hidden md:block">

        <div className="relative">

          {/* Base line */}
          <div className="absolute left-[10%] right-[10%] top-[18px] h-[3px] rounded-full bg-slate-200" />

          {/* Completed line */}
          <div className="absolute left-[10%] top-[18px] h-[3px] w-[42%] rounded-full bg-emerald-600" />

          <div className="relative flex items-start justify-between">

            {STEPS.map((step) => (
              <div
                key={step.id}
                className="flex w-1/5 flex-col items-center text-center"
              >

                <StatusCircle step={step} />

                <p
                  className={`mt-3 text-xs font-semibold sm:text-sm ${
                    step.state === "active"
                      ? "text-amber-600"
                      : step.state === "done"
                      ? "text-[#23394D]"
                      : "text-slate-500"
                  }`}
                >
                  {step.label}
                </p>

                {step.state === "active" && (
                  <span className="mt-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                    Current stage
                  </span>
                )}

              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Mobile Stepper */}
      <div className="mt-6 space-y-2 md:hidden">

        {STEPS.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-3 rounded-xl border px-3 py-3 ${
              step.state === "active"
                ? "border-amber-200 bg-amber-50"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <StatusCircle step={step} />

            <div className="flex-1">
              <p
                className={`text-sm font-semibold ${
                  step.state === "active"
                    ? "text-amber-700"
                    : "text-[#23394D]"
                }`}
              >
                {step.label}
              </p>

              {step.state === "active" && (
                <p className="mt-0.5 text-xs text-amber-600">
                  Current stage
                </p>
              )}
            </div>

            {step.state === "done" && (
              <span className="text-xs font-medium text-emerald-600">
                Done
              </span>
            )}

            {step.state === "pending" && (
              <span className="text-xs text-slate-400">
                Pending
              </span>
            )}

          </div>
        ))}

      </div>

      {/* Lot Details */}
      <div className="mt-7 rounded-xl bg-[#F1F1EC] px-4 py-4">

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

          <div>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">
              Lot
            </p>
            <p className="mt-1 text-sm font-semibold text-[#30485C]">
              MTK1042
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">
              Crop
            </p>
            <p className="mt-1 text-sm font-semibold text-[#30485C]">
              Wheat
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">
              Quantity
            </p>
            <p className="mt-1 text-sm font-semibold text-[#30485C]">
              50 Quintals
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">
              Mandi
            </p>
            <p className="mt-1 text-sm font-semibold text-[#30485C]">
              Pune APMC
            </p>
          </div>

        </div>
      </div>

      {/* Mobile button */}
      <button
        type="button"
        onClick={onViewLots}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0E2A3F] px-4 py-3 text-sm font-semibold text-white sm:hidden"
      >
        View My Lots
        <ArrowRight size={15} />
      </button>

      <p className="mt-4 text-center text-[11px] leading-5 text-slate-500">
        Preview only. Actual lot status is available after farmer login.
      </p>

    </div>
  );
}