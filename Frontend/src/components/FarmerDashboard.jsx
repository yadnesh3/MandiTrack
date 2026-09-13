import React, { useState, useEffect } from "react";
import { getMyLotsApi } from "../services/api";
import AddLotModal from "./AddLotModal";
import MandiPriceInfo from "./MandiPriceInfo";
import { getTranslation } from "../utils/translations";

function FarmerDashboard({ user, lang = "en" }) {
  const t = (key) => getTranslation(lang, key);

  const [activeTab, setActiveTab] = useState("lots"); // "lots" | "prices"
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  const handleLotCreated = (newLot) => {
    setLots((prev) => [newLot, ...prev]);
  };

  // Helper status badge renderer
  const renderStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-600"></span>
            {t("approved")}
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold border border-red-200">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            {t("rejected")}
          </span>
        );
      case "sold":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            {t("sold")}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold border border-yellow-200">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            {t("pending")}
          </span>
        );
    }
  };

  // Stats
  const pendingCount = lots.filter((l) => l.status === "pending").length;
  const approvedCount = lots.filter((l) => l.status === "approved").length;
  const soldCount = lots.filter((l) => l.status === "sold").length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-800 to-green-700 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-green-200 font-bold bg-green-900/40 px-3 py-1 rounded-full border border-green-500/30">
            {t("farmerPortal")}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
            {t("welcomeFarmer")}, {user.name}!
          </h1>
          <p className="text-green-100 text-sm mt-1">
            📱 {user.mobile} &bull; {t("farmerSubtext")}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto px-5 py-3 bg-white text-green-800 hover:bg-green-50 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm shrink-0 active:scale-95"
        >
          {t("addProduceBtn")}
        </button>
      </div>

      {/* Dashboard Sub Navigation Tabs */}
      <div className="flex border-b border-gray-200 gap-6">
        <button
          onClick={() => setActiveTab("lots")}
          className={`pb-3 text-sm font-bold transition-colors ${
            activeTab === "lots"
              ? "border-b-2 border-green-700 text-green-800"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          📦 {t("myProduceLots")} ({lots.length})
        </button>
        <button
          onClick={() => setActiveTab("prices")}
          className={`pb-3 text-sm font-bold transition-colors ${
            activeTab === "prices"
              ? "border-b-2 border-green-700 text-green-800"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          📊 {t("mandiPricesTitle")}
        </button>
      </div>

      {activeTab === "prices" ? (
        <MandiPriceInfo lang={lang} />
      ) : (
        <>
          {/* Summary Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs hover:border-green-300 transition-colors">
              <div className="text-xs font-semibold uppercase text-gray-500">
                {t("totalSubmitted")}
              </div>
              <div className="text-3xl font-extrabold text-gray-900 mt-1">
                {lots.length}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-yellow-200 shadow-xs bg-yellow-50/30 hover:bg-yellow-50/80 transition-colors">
              <div className="text-xs font-semibold uppercase text-yellow-700">
                {t("pendingReview")}
              </div>
              <div className="text-3xl font-extrabold text-yellow-800 mt-1">
                {pendingCount}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-green-200 shadow-xs bg-green-50/30 hover:bg-green-50/80 transition-colors">
              <div className="text-xs font-semibold uppercase text-green-700">
                {t("approvedLots")}
              </div>
              <div className="text-3xl font-extrabold text-green-800 mt-1">
                {approvedCount}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-xs bg-blue-50/30 hover:bg-blue-50/80 transition-colors">
              <div className="text-xs font-semibold uppercase text-blue-700">
                {t("soldCompleted")}
              </div>
              <div className="text-3xl font-extrabold text-blue-800 mt-1">
                {soldCount}
              </div>
            </div>
          </div>

          {/* Lots Container */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{t("myProduceLots")}</h2>
                <p className="text-xs text-gray-500">{t("myLotsSubtext")}</p>
              </div>
              <button
                onClick={fetchLots}
                className="px-3 py-1.5 border rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                🔄 {t("refresh")}
              </button>
            </div>

            {/* Content Section */}
            {loading ? (
              <div className="p-12 text-center text-gray-500 text-sm">
                Loading...
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-600 text-sm bg-red-50">
                {error}
              </div>
            ) : lots.length === 0 ? (
              <div className="p-12 text-center max-w-sm mx-auto space-y-3">
                <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-2xl mx-auto">
                  🌾
                </div>
                <h3 className="font-bold text-gray-800">No produce lots found</h3>
                <p className="text-xs text-gray-500">
                  Click below to submit your crop!
                </p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-2 px-4 py-2 bg-green-700 text-white rounded-lg text-xs font-medium hover:bg-green-800 transition-colors"
                >
                  {t("addProduceBtn")}
                </button>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100/70 border-b text-xs uppercase font-semibold text-gray-600">
                        <th className="py-3.5 px-6">{t("cropName")}</th>
                        <th className="py-3.5 px-4">{t("quantity")}</th>
                        <th className="py-3.5 px-4">{t("mandi")}</th>
                        <th className="py-3.5 px-4">{t("expectedPrice")}</th>
                        <th className="py-3.5 px-4">{t("date")}</th>
                        <th className="py-3.5 px-6 text-right">{t("status")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {lots.map((lot) => (
                        <tr
                          key={lot._id}
                          className="hover:bg-gray-50/80 transition-colors"
                        >
                          <td className="py-4 px-6 font-semibold text-gray-900">
                            {lot.crop}
                          </td>
                          <td className="py-4 px-4 text-gray-700 font-medium">
                            {lot.quantity} <span className="text-xs text-gray-500">{lot.unit}</span>
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {lot.mandi}
                          </td>
                          <td className="py-4 px-4 font-bold text-green-800">
                            ₹{lot.expectedPrice.toLocaleString()} <span className="text-xs font-normal text-gray-500">/ {lot.unit}</span>
                          </td>
                          <td className="py-4 px-4 text-gray-500 text-xs">
                            {new Date(lot.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="py-4 px-6 text-right">
                            {renderStatusBadge(lot.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Responsive Cards View */}
                <div className="block md:hidden divide-y divide-gray-100">
                  {lots.map((lot) => (
                    <div key={lot._id} className="p-4 space-y-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-base">
                          {lot.crop}
                        </span>
                        {renderStatusBadge(lot.status)}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>
                          <span className="text-gray-400 block">{t("quantity")}</span>
                          <span className="font-semibold text-gray-800">
                            {lot.quantity} {lot.unit}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">{t("mandi")}</span>
                          <span className="font-semibold text-gray-800">
                            {lot.mandi}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">{t("expectedPrice")}</span>
                          <span className="font-bold text-green-800">
                            ₹{lot.expectedPrice.toLocaleString()} / {lot.unit}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">{t("date")}</span>
                          <span>
                            {new Date(lot.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* Add Lot Modal */}
      <AddLotModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onLotCreated={handleLotCreated}
      />
    </div>
  );
}

export default FarmerDashboard;
