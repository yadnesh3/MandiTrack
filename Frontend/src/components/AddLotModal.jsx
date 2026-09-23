import React, { useState } from "react";
import { createLotApi } from "../services/api";
import { useLang } from "../context/LanguageContext";
import {
  X,
  Wheat,
  MapPin,
  Package,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// These strings are stored on the lot itself, so they stay bilingual rather
// than switching with the UI language — otherwise the same crop would be
// recorded under two different names.
const CROP_OPTIONS = [
  "Wheat (गहू)",
  "Rice (तांदूळ)",
  "Cotton (कापूस)",
  "Soybean (सोयाबीन)",
  "Onion (कांदा)",
  "Gram / Chana (हरभरा)",
  "Sugarcane (ऊस)",
  "Maize (मका)",
  "Turmeric (हळद)",
  "Pigeon Pea / Tur (तूर)",
];

const MANDI_OPTIONS = [
  "Pune APMC (पुणे मंडी)",
  "Nashik APMC (नाशिक मंडी)",
  "Nagpur APMC (नागपूर मंडी)",
  "Mumbai Vashi APMC (वाशी मंडी)",
  "Kalyan APMC (कल्याण मंडी)",
  "Bhiwandi APMC (भिवंडी मंडी)",
  "Ulhasnagar APMC (उल्हासनगर मंडी)",
  "Latur APMC (लातूर मंडी)",
];

function AddLotModal({ isOpen, onClose, onLotCreated }) {
  const { t, tUnit } = useLang();

  const [crop, setCrop] = useState("");
  const [customCrop, setCustomCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("quintal");
  const [mandi, setMandi] = useState("");
  const [customMandi, setCustomMandi] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const selectedCrop = crop === "Other" ? customCrop : crop;
    const selectedMandi = mandi === "Other" ? customMandi : mandi;

    if (
      !selectedCrop ||
      !quantity ||
      !selectedMandi ||
      expectedPrice === ""
    ) {
      setError(t("fillAllFields"));
      return;
    }

    if (Number(quantity) <= 0) {
      setError(t("quantityPositive"));
      return;
    }

    if (Number(expectedPrice) < 0) {
      setError(t("priceNotNegative"));
      return;
    }

    setLoading(true);

    try {
      const payload = {
        crop: selectedCrop,
        quantity: Number(quantity),
        unit,
        mandi: selectedMandi,
        expectedPrice: Number(expectedPrice),
      };

      const response = await createLotApi(payload);

      setSuccess(t("lotSubmitted"));

      // Reset form
      setCrop("");
      setCustomCrop("");
      setQuantity("");
      setUnit("quintal");
      setMandi("");
      setCustomMandi("");
      setExpectedPrice("");

      setTimeout(() => {
        onLotCreated(response.lot);
        onClose();
        setSuccess("");
      }, 1000);
    } catch (err) {
      setError(err.message || t("lotSubmitFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#19343A]/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#DCE3DB] animate-fadeIn max-h-[92vh] overflow-y-auto">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="bg-[#214D31] text-white px-5 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
              <Wheat size={18} className="text-[#D8C58D]" />
            </div>

            <div>
              <h2 className="text-base sm:text-lg font-bold">
                {t("addLotTitle")}
              </h2>

              <p className="text-[10px] sm:text-[11px] text-[#D9E7DC] mt-0.5">
                Submit your produce for mandi processing
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={t("close")}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* =====================================================
            FORM BODY
        ===================================================== */}
        <div className="p-5 sm:p-6">
          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mb-4 p-3 rounded-lg bg-[#FAEEEE] border border-[#EBCACA] text-[#9B4444] text-sm flex items-start gap-2"
            >
              <AlertCircle
                size={17}
                className="shrink-0 mt-0.5"
              />

              <span>{error}</span>
            </div>
          )}

          {/* Success */}
          {success && (
            <div
              role="status"
              className="mb-4 p-3 rounded-lg bg-[#EAF2E9] border border-[#D3E3D3] text-[#285C3A] text-sm flex items-start gap-2"
            >
              <CheckCircle2
                size={17}
                className="shrink-0 mt-0.5"
              />

              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* =================================================
                CROP
            ================================================= */}
            <div>
              <label className="block text-xs font-semibold text-[#19343A] mb-1.5">
                {t("cropLabel")} *
              </label>

              <div className="relative">
                <select
                  required
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#DCE3DB] rounded-lg focus:ring-2 focus:ring-[#EAF2E9] focus:border-[#285C3A] outline-none text-sm bg-white text-[#19343A] transition"
                >
                  <option value="">
                    {t("selectCrop")}
                  </option>

                  {CROP_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}

                  <option value="Other">
                    {t("otherSpecify")}
                  </option>
                </select>
              </div>

              {crop === "Other" && (
                <input
                  type="text"
                  required
                  placeholder={t("enterCropName")}
                  value={customCrop}
                  onChange={(e) =>
                    setCustomCrop(e.target.value)
                  }
                  className="mt-2 w-full px-3.5 py-2.5 border border-[#DCE3DB] rounded-lg focus:ring-2 focus:ring-[#EAF2E9] focus:border-[#285C3A] outline-none text-sm text-[#19343A] placeholder-[#8A9695] transition"
                />
              )}
            </div>

            {/* =================================================
                QUANTITY + UNIT
            ================================================= */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-[#19343A] mb-1.5">
                  {t("quantityLabel")} *
                </label>

                <div className="relative">
                  <Package
                    size={15}
                    className="absolute left-3 top-3 text-[#8A9695]"
                  />

                  <input
                    type="number"
                    min="1"
                    required
                    placeholder={t("quantityExample")}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(e.target.value)
                    }
                    className="w-full pl-9 pr-3.5 py-2.5 border border-[#DCE3DB] rounded-lg focus:ring-2 focus:ring-[#EAF2E9] focus:border-[#285C3A] outline-none text-sm text-[#19343A] placeholder-[#8A9695] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#19343A] mb-1.5">
                  {t("unitLabel")}
                </label>

                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#DCE3DB] rounded-lg focus:ring-2 focus:ring-[#EAF2E9] focus:border-[#285C3A] outline-none text-sm bg-white font-medium text-[#19343A] transition"
                >
                  <option value="quintal">
                    {tUnit("quintal")}
                  </option>

                  <option value="kg">
                    {tUnit("kg")}
                  </option>

                  <option value="ton">
                    {tUnit("ton")}
                  </option>
                </select>
              </div>
            </div>

            {/* =================================================
                MANDI
            ================================================= */}
            <div>
              <label className="block text-xs font-semibold text-[#19343A] mb-1.5">
                {t("targetMandi")} *
              </label>

              <div className="relative">
                <MapPin
                  size={15}
                  className="absolute left-3 top-3 text-[#8A9695]"
                />

                <select
                  required
                  value={mandi}
                  onChange={(e) => setMandi(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 border border-[#DCE3DB] rounded-lg focus:ring-2 focus:ring-[#EAF2E9] focus:border-[#285C3A] outline-none text-sm bg-white text-[#19343A] transition"
                >
                  <option value="">
                    {t("selectMandi")}
                  </option>

                  {MANDI_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}

                  <option value="Other">
                    {t("otherSpecify")}
                  </option>
                </select>
              </div>

              {mandi === "Other" && (
                <input
                  type="text"
                  required
                  placeholder={t("enterMandiName")}
                  value={customMandi}
                  onChange={(e) =>
                    setCustomMandi(e.target.value)
                  }
                  className="mt-2 w-full px-3.5 py-2.5 border border-[#DCE3DB] rounded-lg focus:ring-2 focus:ring-[#EAF2E9] focus:border-[#285C3A] outline-none text-sm text-[#19343A] placeholder-[#8A9695] transition"
                />
              )}
            </div>

            {/* =================================================
                EXPECTED PRICE
            ================================================= */}
            <div>
              <label className="block text-xs font-semibold text-[#19343A] mb-1.5">
                {t("expectedPriceLabel")} (₹ {t("perUnit")}{" "}
                {tUnit(unit)}) *
              </label>

              <div className="relative">
                <IndianRupee
                  size={15}
                  className="absolute left-3 top-3 text-[#8A9695]"
                />

                <input
                  type="number"
                  min="0"
                  required
                  placeholder={t("priceExample")}
                  value={expectedPrice}
                  onChange={(e) =>
                    setExpectedPrice(e.target.value)
                  }
                  className="w-full pl-9 pr-3.5 py-2.5 border border-[#DCE3DB] rounded-lg focus:ring-2 focus:ring-[#EAF2E9] focus:border-[#285C3A] outline-none text-sm text-[#19343A] placeholder-[#8A9695] transition"
                />
              </div>
            </div>

            {/* =================================================
                ACTIONS
            ================================================= */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 border border-[#DCE3DB] text-[#687779] rounded-lg text-sm font-semibold hover:bg-[#F8F7F2] hover:text-[#19343A] transition"
              >
                {t("cancel")}
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-[#285C3A] hover:bg-[#214D31] text-white rounded-lg text-sm font-semibold shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? t("submitting")
                  : t("submitLot")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLotModal;