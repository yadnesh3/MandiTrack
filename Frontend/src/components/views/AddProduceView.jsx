import React, { useState } from "react";
import { createLotApi } from "../../services/api";
import { MANDI_LIST } from "../layout/MasterShell";
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
  { id: "Pomegranate", labelEn: "Pomegranate", labelMr: "डाळिंब", icon: "🍎" },
];

export default function AddProduceView({ user, onLotCreated, onNavigateToTracking }) {
  const [crop, setCrop] = useState("Onion");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Quintal");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [mandi, setMandi] = useState(user?.mandi || "Pune APMC");

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
      if (onLotCreated) onLotCreated(res.lot);
    } catch (err) {
      setError(err.message || "Failed to register produce lot. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/80 mb-2">
            <PlusCircle size={14} />
            Produce Registration Form
          </div>
          <h1 className="text-2xl font-black text-[#0C192C] tracking-tight">
            Add Produce to APMC Mandi
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Register your harvest lot before dispatching to receive an instant queue token.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200 text-xs font-bold text-amber-900">
          <Sparkles size={16} className="text-[#EA8F0B]" />
          <span>Real-time Token Generation</span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {createdLot ? (
        /* Success Card with Token */
        <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-md text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle2 size={36} />
          </div>

          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Produce Lot Registered Successfully
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">
              Token No: <span className="text-[#EA8F0B]">{createdLot.tokenNumber}</span>
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Lot ID: {createdLot.lotId} &bull; Assigned to {createdLot.mandi}
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-3 gap-3 text-left">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Crop</span>
              <div className="text-sm font-black text-slate-900">{createdLot.crop}</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Quantity</span>
              <div className="text-sm font-black text-slate-900">
                {createdLot.quantity} {createdLot.unit}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Queue Pos</span>
              <div className="text-sm font-black text-[#EA8F0B]">
                #{createdLot.queueNumber || 1}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => setCreatedLot(null)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50 transition"
            >
              Add Another Produce Lot
            </button>
            {onNavigateToTracking && (
              <button
                onClick={() => onNavigateToTracking(createdLot._id)}
                className="px-6 py-2.5 rounded-xl bg-[#EA8F0B] hover:bg-[#d47f06] font-extrabold text-xs text-white shadow-xs transition flex items-center gap-2"
              >
                <span>Track Live Progress</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* The Form */
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6"
        >
          {/* Crop Selector with quick chips */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              Select Crop (पीक निवडा) *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
              {POPULAR_CROPS.map((c) => {
                const isSelected = crop === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCrop(c.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/80 text-emerald-900 font-black shadow-xs ring-2 ring-emerald-500/20"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="text-xl">{c.icon}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-tight truncate">{c.labelEn}</div>
                      <div className="text-[10px] text-slate-500 font-semibold">{c.labelMr}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder="Or type another crop name (e.g. Garlic, Mango, Grapes)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-600"
              required
            />
          </div>

          {/* Quantity & Unit Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Scale size={14} className="text-slate-400" />
                Quantity (प्रमाण) *
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 50"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:outline-none focus:border-emerald-600"
                  required
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-emerald-600"
                >
                  <option value="Quintal">Quintal (क्विंटल)</option>
                  <option value="kg">kg (किलो)</option>
                  <option value="Crate">Crate (क्रेट)</option>
                  <option value="Bag">Bag (पोती)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <IndianRupee size={14} className="text-slate-400" />
                Expected Minimum Price (अपेक्षित दर) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  placeholder="e.g. 2100"
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:outline-none focus:border-emerald-600"
                  required
                />
                <span className="absolute right-3.5 top-3 text-[11px] font-semibold text-slate-400">
                  per {unit}
                </span>
              </div>
            </div>
          </div>

          {/* Mandi Location Selection */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <MapPin size={14} className="text-emerald-600" />
              Target APMC Mandi (बाजार समिती) *
            </label>
            <select
              value={mandi}
              onChange={(e) => setMandi(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600"
              required
            >
              {MANDI_LIST.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              Select the APMC market where you will bring your harvest for auction.
            </p>
          </div>

          {/* Submit CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
              🔒 Generated Token will be verified at APMC Gate Entry
            </span>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#EA8F0B] hover:bg-[#d47f06] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Generating Token...</span>
              ) : (
                <>
                  <span>Generate Mandi Token</span>
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
