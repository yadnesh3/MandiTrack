import React, { useState } from "react";
import { createLotApi } from "../services/api";

const CROP_OPTIONS = [
  "Wheat",
  "Rice",
  "Soybean",
  "Onion",
  "Cotton",
  "Gram / Chana",
  "Sugarcane",
  "Maize",
  "Turmeric",
  "Pigeon Pea / Tur",
];

const MANDI_OPTIONS = [
  "Pune",
  "Nashik",
  "Nagpur",
  "Solapur",
  "Amravati",
  "Kolhapur",
  "Mumbai Vashi",
  "Latur",
  "Akola",
];

function AddProducePage({ onLotCreatedSuccess }) {
  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("quintal");
  const [mandi, setMandi] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!crop || !quantity || !mandi || expectedPrice === "") {
      setError("Please fill in all required fields.");
      return;
    }

    if (Number(quantity) <= 0) {
      setError("Quantity must be greater than 0.");
      return;
    }

    if (Number(expectedPrice) < 0) {
      setError("Expected price cannot be negative.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        crop,
        quantity: Number(quantity),
        unit,
        mandi,
        expectedPrice: Number(expectedPrice),
      };

      await createLotApi(payload);
      setSuccess("Produce lot submitted successfully!");

      // Reset form
      setCrop("");
      setQuantity("");
      setUnit("quintal");
      setMandi("");
      setExpectedPrice("");

      setTimeout(() => {
        if (onLotCreatedSuccess) onLotCreatedSuccess();
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to submit produce lot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header Container Matching Panel 5 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Add New Produce
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Enter the details of your produce
        </p>
      </div>

      {/* Alert Banners */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-2xl">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-2xl">
          ✅ {success}
        </div>
      )}

      {/* Form Container Matching Panel 5 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Crop Field */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">
              Crop
            </label>
            <div className="relative">
              <select
                required
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm bg-white font-medium text-slate-800 appearance-none"
              >
                <option value="">Select crop</option>
                {CROP_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-3.5 pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Quantity & Unit Row Matching Panel 5 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                required
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm text-slate-800 placeholder-slate-400 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">
                Unit
              </label>
              <div className="relative">
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm bg-white font-medium text-slate-800 appearance-none"
                >
                  <option value="quintal">quintal</option>
                  <option value="kg">kg</option>
                  <option value="ton">ton</option>
                </select>
                <div className="absolute right-3.5 top-3.5 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Mandi & Expected Price Row Matching Panel 5 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">
                Mandi
              </label>
              <div className="relative">
                <select
                  required
                  value={mandi}
                  onChange={(e) => setMandi(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm bg-white font-medium text-slate-800 appearance-none"
                >
                  <option value="">Select mandi</option>
                  {MANDI_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-3.5 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">
                Expected Price (₹)
              </label>
              <input
                type="number"
                min="0"
                required
                placeholder="Enter expected price"
                value={expectedPrice}
                onChange={(e) => setExpectedPrice(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm text-slate-800 placeholder-slate-400 font-medium"
              />
            </div>
          </div>

          {/* Submit Button Matching Panel 5 */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-green-700 hover:bg-green-800 active:scale-98 text-white font-extrabold rounded-2xl shadow-md transition-all text-sm disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProducePage;
