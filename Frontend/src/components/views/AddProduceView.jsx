import React, { useState } from "react";
import { createLotApi } from "../../services/api";
import { MANDI_LIST } from "../layout/MasterShell";
import { useLang } from "../../context/LanguageContext";
import {
  PlusCircle,
  Package,
  Scale,
  IndianRupee,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const POPULAR_CROPS = [
  { id: "Onion", labelEn: "Onion", labelMr: "कांदा", icon: "🧅" },
  { id: "Tomato", labelEn: "Tomato", labelMr: "टोमॅटो", icon: "🍅" },
  { id: "Soybean", labelEn: "Soybean", labelMr: "सोयाबीन", icon: "🌱" },
  { id: "Wheat", labelEn: "Wheat", labelMr: "गहू", icon: "🌾" },
  { id: "Chilli", labelEn: "Green Chilli", labelMr: "मिरची", icon: "🌶️" },
  { id: "Cotton", labelEn: "Cotton", labelMr: "कापूस", icon: "☁️" },
  { id: "Potato", labelEn: "Potato", labelMr: "बटाटा", icon: "🥔" },
  {
    id: "Pomegranate",
    labelEn: "Pomegranate",
    labelMr: "डाळिंब",
    icon: "🍎",
  },
];

export default function AddProduceView({
  user,
  onLotCreated,
  onNavigateToTracking,
}) {
  const { lang, t } = useLang();
  const [crop, setCrop] = useState("Onion");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Quintal");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [mandi, setMandi] = useState(
    user?.mandi || "Pune APMC"
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdLot, setCreatedLot] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const numQty = parseFloat(quantity);
    const numPrice = parseFloat(expectedPrice);

    if (!crop || isNaN(numQty) || numQty <= 0) {
      setError("Please enter a valid crop and quantity.");
      return;
    }

    if (isNaN(numPrice) || numPrice < 0) {
      setError("Please specify your expected price per unit.");
      return;
    }

    setLoading(true);

    try {
      const res = await createLotApi({
        crop,
        quantity: numQty,
        unit,
        expectedPrice: numPrice,
        mandi,
      });

      setCreatedLot(res.lot);

      if (onLotCreated) {
        onLotCreated(res.lot);
      }
    } catch (err) {
      setError(
        err.message ||
          "Failed to register produce lot. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 bg-[#F8F7F2] pb-8 animate-fadeIn">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#CFE2D4] bg-[#EAF2E9] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#285C3A]">
              <PlusCircle size={13} />
              {t("produceRegBadge")}
            </div>

            <h1 className="text-xl font-bold tracking-tight text-[#19343A] sm:text-2xl">
              {t("addProduceHeading")}
            </h1>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-[#687779] sm:text-sm">
              {t("addProduceSub")}
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-lg border border-[#E8DDBF] bg-[#F5EFDE] px-3.5 py-2.5 text-xs font-semibold text-[#80672C] sm:flex">
            <Sparkles
              size={15}
              className="text-[#B58A35]"
            />
            {t("realtimeTokenGen")}
          </div>
        </div>
      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-[#E8CCCC] bg-[#FAEEEE] px-4 py-3.5 text-sm text-[#A64B4B]">
          <AlertCircle
            size={17}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-semibold">
              {lang === "mr" ? "शेतमाल नोंदणी अयशस्वी" : "Unable to register produce"}
            </p>

            <p className="mt-0.5 text-xs">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          SUCCESS CARD
      ====================================================== */}

      {createdLot ? (
        <div className="rounded-xl border border-[#CFE2D4] bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF2E9] text-[#285C3A] ring-8 ring-[#F4F8F3]">
            <CheckCircle2 size={34} />
          </div>

          <div className="mt-6">
            <span className="inline-flex rounded-full border border-[#CFE2D4] bg-[#EAF2E9] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#285C3A]">
              {t("lotRegSuccessBadge")}
            </span>

            <h2 className="mt-3 text-2xl font-bold text-[#19343A] sm:text-3xl">
              {t("tokenNoLabel")}{" "}
              <span className="text-[#B58A35]">
                {createdLot.tokenNumber}
              </span>
            </h2>

            <p className="mt-2 text-xs font-medium text-[#687779]">
              {t("colLotId")}: {createdLot.lotId}
              <span className="mx-1.5 text-[#A3AEAC]">
                •
              </span>
              {t("assignedToLabel")} {createdLot.mandi}
            </p>
          </div>

          {/* Lot Summary */}
          <div className="mx-auto mt-7 grid max-w-md grid-cols-3 gap-3 rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] p-4 text-left">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-[#687779]">
                {t("colCrop")}
              </span>

              <div className="mt-1 text-sm font-bold text-[#19343A]">
                {createdLot.crop}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-[#687779]">
                {t("colQuantity")}
              </span>

              <div className="mt-1 text-sm font-bold text-[#19343A]">
                {createdLot.quantity} {createdLot.unit}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-[#687779]">
                {t("queuePosLabel")}
              </span>

              <div className="mt-1 text-sm font-bold text-[#B58A35]">
                #{createdLot.queueNumber || 1}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setCreatedLot(null)}
              className="rounded-lg border border-[#DCE3DB] bg-white px-5 py-2.5 text-xs font-semibold text-[#687779] transition hover:bg-[#F8F7F2] hover:text-[#19343A]"
            >
              {t("addAnotherLotBtn")}
            </button>

            {onNavigateToTracking && (
              <button
                type="button"
                onClick={() =>
                  onNavigateToTracking(createdLot._id)
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#285C3A] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#214D31] active:scale-[0.98]"
              >
                {t("trackLiveProgressBtn")}
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* ===================================================
           FORM
        ==================================================== */

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-7"
        >
          {/* =================================================
              CROP
          ================================================== */}

          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#19343A]">
                {t("selectCropTitle")}
              </label>

              <span className="text-[10px] font-medium text-[#687779]">
                {t("chooseCropHint")}
              </span>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {POPULAR_CROPS.map((c) => {
                const isSelected = crop === c.id;

                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCrop(c.id)}
                    className={`flex items-center gap-2.5 rounded-lg border p-3 text-left transition ${
                      isSelected
                        ? "border-[#285C3A] bg-[#EAF2E9] shadow-sm"
                        : "border-[#DCE3DB] bg-white hover:bg-[#F8F7F2]"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg ${
                        isSelected
                          ? "bg-white"
                          : "bg-[#F8F7F2]"
                      }`}
                    >
                      {c.icon}
                    </span>

                    <div className="min-w-0">
                      <div
                        className={`truncate text-xs font-semibold ${
                          isSelected
                            ? "text-[#285C3A]"
                            : "text-[#19343A]"
                        }`}
                      >
                        {c.labelEn}
                      </div>

                      <div className="mt-0.5 text-[10px] font-medium text-[#687779]">
                        {c.labelMr}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder={t("cropTypePlaceholder")}
              className="w-full rounded-lg border border-[#DCE3DB] bg-white px-4 py-2.5 text-xs font-medium text-[#19343A] outline-none transition placeholder:text-[#9AA5A3] focus:border-[#285C3A] focus:ring-2 focus:ring-[#285C3A]/10"
              required
            />
          </div>

          {/* =================================================
              QUANTITY + PRICE
          ================================================== */}

          <div className="my-6 border-t border-[#E5E9E3]" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Quantity */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#19343A]">
                <Scale
                  size={14}
                  className="text-[#285C3A]"
                />
                {t("quantity")} *
              </label>

              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value)
                  }
                  placeholder="e.g. 50"
                  className="min-w-0 flex-1 rounded-lg border border-[#DCE3DB] bg-white px-4 py-2.5 text-sm font-semibold text-[#19343A] outline-none transition placeholder:text-[#9AA5A3] focus:border-[#285C3A] focus:ring-2 focus:ring-[#285C3A]/10"
                  required
                />

                <select
                  value={unit}
                  onChange={(e) =>
                    setUnit(e.target.value)
                  }
                  className="rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] px-3 py-2.5 text-xs font-semibold text-[#19343A] outline-none focus:border-[#285C3A]"
                >
                  <option value="Quintal">
                    {lang === "mr" ? "क्विंटल (Quintal)" : "Quintal"}
                  </option>
                  <option value="kg">
                    {lang === "mr" ? "किलो (kg)" : "kg"}
                  </option>
                  <option value="Ton">
                    {lang === "mr" ? "टन (Ton)" : "Ton"}
                  </option>
                </select>
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#19343A]">
                <IndianRupee
                  size={14}
                  className="text-[#B58A35]"
                />
                {t("expectedPriceLabel")}
              </label>

              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-bold text-[#687779]">
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={expectedPrice}
                  onChange={(e) =>
                    setExpectedPrice(e.target.value)
                  }
                  placeholder="e.g. 2100"
                  className="w-full rounded-lg border border-[#DCE3DB] bg-white py-2.5 pl-8 pr-16 text-sm font-semibold text-[#19343A] outline-none transition placeholder:text-[#9AA5A3] focus:border-[#285C3A] focus:ring-2 focus:ring-[#285C3A]/10"
                  required
                />

                <span className="absolute right-3.5 top-3 text-[10px] font-medium text-[#687779]">
                  per {unit}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              MANDI
          ================================================== */}

          <div className="mt-6">
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#19343A]">
              <MapPin
                size={14}
                className="text-[#285C3A]"
              />
              {t("targetMandiLabel")}
            </label>

            <select
              value={mandi}
              onChange={(e) => setMandi(e.target.value)}
              className="w-full rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] px-4 py-2.5 text-xs font-semibold text-[#19343A] outline-none transition focus:border-[#285C3A] focus:bg-white"
              required
            >
              {MANDI_LIST.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <p className="mt-1.5 text-[11px] font-medium text-[#687779]">
              {t("targetMandiHint")}
            </p>
          </div>

          {/* =================================================
              SUBMIT
          ================================================== */}

          <div className="mt-6 flex flex-col gap-4 border-t border-[#E5E9E3] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-center text-[11px] font-medium text-[#687779] sm:text-left">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAF2E9] text-[#285C3A]">
                ✓
              </span>

              <span>
                {t("tokenVerifiedGateNotice")}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#285C3A] px-8 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#214D31] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  {lang === "mr" ? "टोकन तयार होत आहे..." : "Generating Token..."}
                </>
              ) : (
                <>
                  {t("generateMandiTokenBtn")}
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}