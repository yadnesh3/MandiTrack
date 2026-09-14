import React, { useState } from "react";
import { createLotApi } from "../services/api";
import { useLang } from "../context/LanguageContext";

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
  "Amravati APMC (अमरावती मंडी)",
  "Solapur APMC (सोलापूर मंडी)",
  "Kolhapur APMC (कोल्हापूर मंडी)",
  "Mumbai Vashi APMC (वाशी मंडी)",
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

    if (!selectedCrop || !quantity || !selectedMandi || expectedPrice === "") {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 animate-fadeIn max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-green-700 text-white px-6 py-4 flex items-center justify-between sticky top-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌾</span>
            <h2 className="text-lg font-bold">{t("addLotTitle")}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label={t("close")}
            className="text-white/80 hover:text-white text-2xl font-bold leading-none px-2"
          >
            &times;
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div role="alert" className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div role="status" className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Crop Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("cropLabel")} *
              </label>
              <select
                required
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm bg-white"
              >
                <option value="">{t("selectCrop")}</option>
                {CROP_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                <option value="Other">{t("otherSpecify")}</option>
              </select>

              {crop === "Other" && (
                <input
                  type="text"
                  required
                  placeholder={t("enterCropName")}
                  value={customCrop}
                  onChange={(e) => setCustomCrop(e.target.value)}
                  className="mt-2 w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm"
                />
              )}
            </div>

            {/* Quantity and Unit */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("quantityLabel")} *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  placeholder={t("quantityExample")}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("unitLabel")}
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm bg-white font-medium text-gray-700"
                >
                  <option value="quintal">{tUnit("quintal")}</option>
                  <option value="kg">{tUnit("kg")}</option>
                  <option value="ton">{tUnit("ton")}</option>
                </select>
              </div>
            </div>

            {/* Mandi Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("targetMandi")} *
              </label>
              <select
                required
                value={mandi}
                onChange={(e) => setMandi(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm bg-white"
              >
                <option value="">{t("selectMandi")}</option>
                {MANDI_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
                <option value="Other">{t("otherSpecify")}</option>
              </select>

              {mandi === "Other" && (
                <input
                  type="text"
                  required
                  placeholder={t("enterMandiName")}
                  value={customMandi}
                  onChange={(e) => setCustomMandi(e.target.value)}
                  className="mt-2 w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm"
                />
              )}
            </div>

            {/* Expected Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("expectedPriceLabel")} (₹ {t("perUnit")} {tUnit(unit)}) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500 font-bold">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  required
                  placeholder={t("priceExample")}
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-sm font-medium shadow-xs transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? t("submitting") : t("submitLot")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLotModal;
