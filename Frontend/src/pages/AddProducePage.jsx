import React, { useState } from "react";
import {
  Wheat,
  Package,
  MapPin,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
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
  "Mumbai Vashi",
  "Kalyan",
  "Bhiwandi",
  "Ulhasnagar",
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

  const inputClass =
    "w-full rounded-lg border border-[#DCE3DB] bg-white px-4 py-3 text-sm font-medium text-[#19343A] outline-none transition placeholder:text-[#9AA5A4] focus:border-[#285C3A] focus:ring-2 focus:ring-[#EAF2E9]";

  const selectClass =
    "w-full appearance-none rounded-lg border border-[#DCE3DB] bg-white px-4 py-3 pr-10 text-sm font-medium text-[#19343A] outline-none transition focus:border-[#285C3A] focus:ring-2 focus:ring-[#EAF2E9]";

  return (
    <div className="mx-auto max-w-3xl space-y-6 bg-[#F8F7F2] pb-8 animate-fadeIn">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2E9] text-[#285C3A]">
            <Wheat size={21} />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#19343A] sm:text-2xl">
              Add New Produce
            </h2>

            <p className="mt-1 text-xs font-medium text-[#687779] sm:text-sm">
              Enter the details of your produce to create a new mandi lot.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          ALERTS
      ====================================================== */}

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-[#E8CCCC] bg-[#FAEEEE] p-4 text-[#A64B4B]">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />

          <div>
            <p className="text-xs font-bold">Submission Error</p>
            <p className="mt-0.5 text-xs font-medium">
              {error}
            </p>
          </div>
        </div>
      )}

      {success && (
        <div className="flex items-start gap-3 rounded-xl border border-[#CFE2D4] bg-[#EAF2E9] p-4 text-[#285C3A]">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />

          <div>
            <p className="text-xs font-bold">Submission Successful</p>
            <p className="mt-0.5 text-xs font-medium">
              {success}
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          FORM
      ====================================================== */}

      <div className="rounded-xl border border-[#DCE3DB] bg-white shadow-sm">
        {/* Form Header */}
        <div className="border-b border-[#E5E9E3] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-[#285C3A]" />

            <h3 className="text-sm font-bold text-[#19343A]">
              Produce Details
            </h3>
          </div>

          <p className="mt-1 pl-6 text-[10px] font-medium text-[#8A9695]">
            Provide accurate information for your mandi lot.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">
          {/* =====================================================
              CROP
          ====================================================== */}

          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#687779]">
              Crop <span className="text-[#A64B4B]">*</span>
            </label>

            <div className="relative">
              <select
                required
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className={selectClass}
              >
                <option value="">Select crop</option>

                {CROP_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#687779]"
              />
            </div>
          </div>

          {/* =====================================================
              QUANTITY + UNIT
          ====================================================== */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#687779]">
                Quantity <span className="text-[#A64B4B]">*</span>
              </label>

              <input
                type="number"
                min="1"
                required
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#687779]">
                Unit
              </label>

              <div className="relative">
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className={selectClass}
                >
                  <option value="quintal">quintal</option>
                  <option value="kg">kg</option>
                  <option value="ton">ton</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#687779]"
                />
              </div>
            </div>
          </div>

          {/* =====================================================
              MANDI + EXPECTED PRICE
          ====================================================== */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#687779]">
                Mandi <span className="text-[#A64B4B]">*</span>
              </label>

              <div className="relative">
                <select
                  required
                  value={mandi}
                  onChange={(e) => setMandi(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select mandi</option>

                  {MANDI_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#687779]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#687779]">
                Expected Price (₹){" "}
                <span className="text-[#A64B4B]">*</span>
              </label>

              <div className="relative">
                <IndianRupee
                  size={15}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9695]"
                />

                <input
                  type="number"
                  min="0"
                  required
                  placeholder="Enter expected price"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>
          </div>

          {/* =====================================================
              SUBMISSION NOTE
          ====================================================== */}

          <div className="flex items-start gap-3 rounded-lg border border-[#E8DDBF] bg-[#F5EFDE] p-3.5">
            <MapPin
              size={16}
              className="mt-0.5 shrink-0 text-[#B58A35]"
            />

            <div>
              <p className="text-[11px] font-bold text-[#80672C]">
                Mandi Lot Submission
              </p>

              <p className="mt-0.5 text-[10px] leading-4 text-[#80672C]">
                Your produce will be submitted to the selected mandi
                for processing and tracking.
              </p>
            </div>
          </div>

          {/* =====================================================
              SUBMIT
          ====================================================== */}

          <div className="border-t border-[#E5E9E3] pt-5">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#285C3A] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#214D31] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle2 size={17} />
                  Submit Produce Lot
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProducePage;