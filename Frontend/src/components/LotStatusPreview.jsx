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
      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#285C3A] text-white shadow-sm">
        <Check size={16} strokeWidth={3} />
      </div>
    );
  }

  if (step.state === "active") {
    return (
      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#B58A35] text-white text-sm font-bold shadow-sm">
        3
      </div>
    );
  }

  return (
    <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E7EBE5] text-[#687779] text-sm font-semibold border border-[#DCE3DB]">
      {step.id}
    </div>
  );
}

export default function LotStatusPreview({ onViewLots }) {
  return (
    <div className="w-full rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-7">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#687779]">
            Sample lot
          </p>

          <h2 className="mt-1 text-xl font-bold text-[#19343A] sm:text-2xl">
            Lot Status
          </h2>
        </div>

        <button
          type="button"
          onClick={onViewLots}
          className="hidden items-center gap-1 text-sm font-semibold text-[#285C3A] transition hover:text-[#214D31] hover:underline sm:flex"
        >
          View My Lots
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Desktop Stepper */}
      <div className="mt-8 hidden md:block">
        <div className="relative">
          {/* Base line */}
          <div className="absolute left-[10%] right-[10%] top-[18px] h-[3px] rounded-full bg-[#E7EBE5]" />

          {/* Completed line */}
          <div className="absolute left-[10%] top-[18px] h-[3px] w-[42%] rounded-full bg-[#285C3A]" />

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
                      ? "text-[#B58A35]"
                      : step.state === "done"
                      ? "text-[#19343A]"
                      : "text-[#687779]"
                  }`}
                >
                  {step.label}
                </p>

                {step.state === "active" && (
                  <span className="mt-1 rounded-full bg-[#F5EFDE] px-2.5 py-1 text-[10px] font-semibold text-[#80672C]">
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
            className={`flex items-center gap-3 rounded-lg border px-3 py-3 ${
              step.state === "active"
                ? "border-[#E8DDBF] bg-[#F5EFDE]"
                : "border-[#DCE3DB] bg-[#F8F7F2]"
            }`}
          >
            <StatusCircle step={step} />

            <div className="flex-1">
              <p
                className={`text-sm font-semibold ${
                  step.state === "active"
                    ? "text-[#80672C]"
                    : "text-[#19343A]"
                }`}
              >
                {step.label}
              </p>

              {step.state === "active" && (
                <p className="mt-0.5 text-xs text-[#B58A35]">
                  Current stage
                </p>
              )}
            </div>

            {step.state === "done" && (
              <span className="text-xs font-medium text-[#285C3A]">
                Done
              </span>
            )}

            {step.state === "pending" && (
              <span className="text-xs text-[#8A9695]">
                Pending
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Lot Details */}
      <div className="mt-7 rounded-lg border border-[#E1E4DE] bg-[#F8F7F2] px-4 py-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-[#687779]">
              Lot
            </p>
            <p className="mt-1 text-sm font-semibold text-[#19343A]">
              MTK1042
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wide text-[#687779]">
              Crop
            </p>
            <p className="mt-1 text-sm font-semibold text-[#19343A]">
              Wheat
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wide text-[#687779]">
              Quantity
            </p>
            <p className="mt-1 text-sm font-semibold text-[#19343A]">
              50 Quintals
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wide text-[#687779]">
              Mandi
            </p>
            <p className="mt-1 text-sm font-semibold text-[#19343A]">
              Pune APMC
            </p>
          </div>
        </div>
      </div>

      {/* Mobile button */}
      <button
        type="button"
        onClick={onViewLots}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#214D31] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#285C3A] sm:hidden"
      >
        View My Lots
        <ArrowRight size={15} />
      </button>

      <p className="mt-4 text-center text-[11px] leading-5 text-[#687779]">
        Preview only. Actual lot status is available after farmer login.
      </p>
    </div>
  );
}