import React, { useState, useEffect } from "react";
import { getMyLotsApi } from "../services/api";
import StatusBadge from "../components/StatusBadge";

function MyLotsPage({ onNavigateToAddProduce }) {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLots = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getMyLotsApi();
      setLots(response.lots || []);
    } catch (err) {
      setError(err.message || "Failed to load lots.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Container Matching Panel 6 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            My Lots
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            View all your submitted produce
          </p>
        </div>

        <button
          onClick={fetchLots}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors border border-slate-200"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Table Card Container Matching Panel 6 */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            Loading your produce lots...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 text-sm bg-red-50">
            ⚠️ {error}
          </div>
        ) : lots.length === 0 ? (
          <div className="p-12 text-center max-w-sm mx-auto space-y-3">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center text-2xl mx-auto">
              🌾
            </div>
            <h3 className="font-bold text-slate-800 text-base">No produce lots found</h3>
            <p className="text-xs text-slate-500">
              You haven't submitted any produce lot yet. Click below to submit your crop!
            </p>
            {onNavigateToAddProduce && (
              <button
                onClick={onNavigateToAddProduce}
                className="mt-2 px-4 py-2 bg-green-700 text-white rounded-xl text-xs font-bold hover:bg-green-800 transition-colors shadow-xs"
              >
                + Add New Produce
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-xs font-bold text-slate-600">
                  <th className="py-4 px-6 w-12">#</th>
                  <th className="py-4 px-4 font-extrabold">Crop</th>
                  <th className="py-4 px-4 font-extrabold">Quantity</th>
                  <th className="py-4 px-4 font-extrabold">Unit</th>
                  <th className="py-4 px-4 font-extrabold">Mandi</th>
                  <th className="py-4 px-4 font-extrabold">Expected Price</th>
                  <th className="py-4 px-4 font-extrabold">Status</th>
                  <th className="py-4 px-6 font-extrabold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lots.map((lot, index) => (
                  <tr key={lot._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-400 text-xs">
                      {index + 1}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">
                      {lot.crop}
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-800">
                      {lot.quantity}
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {lot.unit}
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-800">
                      {lot.mandi}
                    </td>
                    <td className="py-4 px-4 font-extrabold text-green-800">
                      ₹{lot.expectedPrice.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={lot.status} />
                    </td>
                    <td className="py-4 px-6 text-right text-xs font-semibold text-slate-500">
                      {new Date(lot.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyLotsPage;
