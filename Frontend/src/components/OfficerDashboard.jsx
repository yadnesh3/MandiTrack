import React, { useState, useEffect } from "react";
import { getAllLotsApi, updateLotStatusApi } from "../services/api";
import MandiPriceInfo from "./MandiPriceInfo";
import { useLang } from "../context/LanguageContext";

// The filter value doubles as a lot status, except for "all".
const FILTER_LABEL_KEYS = {
  all: "allLots",
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
};

function OfficerDashboard({ user }) {
  const { t, tUnit, locale } = useLang();

  const [activeTab, setActiveTab] = useState("lots");
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [filter, setFilter] = useState("pending");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchLots = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getAllLotsApi();
      setLots(response.lots || []);
    } catch (err) {
      setError(err.message || t("officerLoadFailed"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  const handleStatusUpdate = async (lotId, newStatus) => {
    setUpdatingId(lotId);
    setError("");
    setSuccessMsg("");

    try {
      await updateLotStatusApi(lotId, newStatus);

      setLots((prevLots) =>
        prevLots.map((lot) =>
          lot._id === lotId ? { ...lot, status: newStatus } : lot
        )
      );

      setSuccessMsg(`${t("statusUpdatedTo")} "${t(newStatus)}".`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError(err.message || t("statusUpdateFailed"));
    } finally {
      setUpdatingId(null);
    }
  };

  // Status badge renderer
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

  // Filter lots based on selected tab
  const filteredLots = lots.filter((lot) => {
    if (filter === "all") return true;
    return lot.status === filter;
  });

  // Stats
  const pendingCount = lots.filter((l) => l.status === "pending").length;
  const approvedCount = lots.filter((l) => l.status === "approved").length;
  const rejectedCount = lots.filter((l) => l.status === "rejected").length;

  const formatDate = (value, opts) =>
    new Date(value).toLocaleDateString(locale, opts);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Officer Welcome Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-blue-200 font-bold bg-blue-950/50 px-3 py-1 rounded-full border border-blue-400/30">
            🏛️ {t("officerPortal")}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
            {t("officerTitle")} — {user.name}
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            {t("officerSubtext")}
          </p>
        </div>

        <button
          onClick={fetchLots}
          className="w-full sm:w-auto px-4 py-2.5 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-xs shrink-0 active:scale-95"
        >
          🔄 {t("refresh")}
        </button>
      </div>

      {/* Dashboard Sub Navigation Tabs */}
      <div className="flex border-b border-gray-200 gap-6">
        <button
          onClick={() => setActiveTab("lots")}
          className={`pb-3 text-sm font-bold transition-colors ${
            activeTab === "lots"
              ? "border-b-2 border-blue-800 text-blue-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          📋 {t("allLots")} ({lots.length})
        </button>
        <button
          onClick={() => setActiveTab("prices")}
          className={`pb-3 text-sm font-bold transition-colors ${
            activeTab === "prices"
              ? "border-b-2 border-blue-800 text-blue-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          📊 {t("mandiPricesTitle")}
        </button>
      </div>

      {activeTab === "prices" ? (
        <MandiPriceInfo />
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div
              onClick={() => setFilter("all")}
              className={`p-5 rounded-xl border transition-all cursor-pointer ${
                filter === "all"
                  ? "border-blue-700 bg-blue-50/60 ring-2 ring-blue-700/20"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="text-xs font-semibold uppercase text-gray-500">
                {t("totalSubmitted")}
              </div>
              <div className="text-3xl font-extrabold text-gray-900 mt-1">
                {lots.length}
              </div>
            </div>

            <div
              onClick={() => setFilter("pending")}
              className={`p-5 rounded-xl border transition-all cursor-pointer ${
                filter === "pending"
                  ? "border-yellow-600 bg-yellow-100/50 ring-2 ring-yellow-600/20"
                  : "border-yellow-200 bg-yellow-50/30 hover:bg-yellow-50/80"
              }`}
            >
              <div className="text-xs font-semibold uppercase text-yellow-800">
                {t("pendingReview")}
              </div>
              <div className="text-3xl font-extrabold text-yellow-800 mt-1">
                {pendingCount}
              </div>
            </div>

            <div
              onClick={() => setFilter("approved")}
              className={`p-5 rounded-xl border transition-all cursor-pointer ${
                filter === "approved"
                  ? "border-green-600 bg-green-100/50 ring-2 ring-green-600/20"
                  : "border-green-200 bg-green-50/30 hover:bg-green-50/80"
              }`}
            >
              <div className="text-xs font-semibold uppercase text-green-800">
                {t("approvedLots")}
              </div>
              <div className="text-3xl font-extrabold text-green-800 mt-1">
                {approvedCount}
              </div>
            </div>

            <div
              onClick={() => setFilter("rejected")}
              className={`p-5 rounded-xl border transition-all cursor-pointer ${
                filter === "rejected"
                  ? "border-red-600 bg-red-100/50 ring-2 ring-red-600/20"
                  : "border-red-200 bg-red-50/30 hover:bg-red-50/80"
              }`}
            >
              <div className="text-xs font-semibold uppercase text-red-800">
                {t("rejectedLots")}
              </div>
              <div className="text-3xl font-extrabold text-red-800 mt-1">
                {rejectedCount}
              </div>
            </div>
          </div>

          {/* Alert Messages */}
          {successMsg && (
            <div role="status" className="p-3 bg-green-50 border border-green-200 text-green-800 text-sm rounded-xl font-medium animate-fadeIn">
              ✅ {successMsg}
            </div>
          )}

          {error && (
            <div role="alert" className="p-3 bg-red-50 border border-red-200 text-red-800 text-sm rounded-xl font-medium animate-fadeIn">
              ❌ {error}
            </div>
          )}

          {/* Lots Table Container */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Filter Navigation Tabs */}
            <div className="px-6 py-3 border-b bg-gray-50 flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-base font-bold text-gray-900">
                {t("allLots")}
              </h2>

              <div className="flex gap-2 text-xs font-medium overflow-x-auto pb-1 w-full sm:w-auto">
                <button
                  onClick={() => setFilter("pending")}
                  className={`px-3 py-1.5 rounded-lg shrink-0 transition-colors ${
                    filter === "pending"
                      ? "bg-yellow-600 text-white font-bold"
                      : "bg-white border text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t("pending")} ({pendingCount})
                </button>

                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1.5 rounded-lg shrink-0 transition-colors ${
                    filter === "all"
                      ? "bg-blue-800 text-white font-bold"
                      : "bg-white border text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t("allLots")} ({lots.length})
                </button>

                <button
                  onClick={() => setFilter("approved")}
                  className={`px-3 py-1.5 rounded-lg shrink-0 transition-colors ${
                    filter === "approved"
                      ? "bg-green-700 text-white font-bold"
                      : "bg-white border text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t("approved")} ({approvedCount})
                </button>

                <button
                  onClick={() => setFilter("rejected")}
                  className={`px-3 py-1.5 rounded-lg shrink-0 transition-colors ${
                    filter === "rejected"
                      ? "bg-red-700 text-white font-bold"
                      : "bg-white border text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t("rejected")} ({rejectedCount})
                </button>
              </div>
            </div>

            {/* Content Section */}
            {loading ? (
              <div className="p-12 text-center text-gray-500 text-sm">
                {t("loading")}
              </div>
            ) : filteredLots.length === 0 ? (
              <div className="p-12 text-center max-w-sm mx-auto space-y-2">
                <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-2xl mx-auto">
                  📋
                </div>
                <h3 className="font-bold text-gray-800">
                  {t("noOfficerLotsTitle")}
                </h3>
                <p className="text-xs text-gray-500">
                  {t("noOfficerLotsSubtext")}
                </p>
                <span className="inline-block px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                  {t(FILTER_LABEL_KEYS[filter] || "allLots")}
                </span>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100/70 border-b text-xs uppercase font-semibold text-gray-600">
                        <th className="py-3.5 px-6">{t("farmerInfo")}</th>
                        <th className="py-3.5 px-4">{t("cropName")}</th>
                        <th className="py-3.5 px-4">{t("quantity")}</th>
                        <th className="py-3.5 px-4">{t("mandi")}</th>
                        <th className="py-3.5 px-4">{t("expectedPrice")}</th>
                        <th className="py-3.5 px-4">{t("date")}</th>
                        <th className="py-3.5 px-4">{t("status")}</th>
                        <th className="py-3.5 px-6 text-right">{t("actions")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredLots.map((lot) => (
                        <tr
                          key={lot._id}
                          className="hover:bg-gray-50/80 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="font-bold text-gray-900">
                              {lot.farmer?.name || t("unknownFarmer")}
                            </div>
                            <div className="text-xs text-gray-500">
                              📱 {lot.farmer?.mobile || t("notAvailable")}
                            </div>
                          </td>

                          <td className="py-4 px-4 font-semibold text-gray-800">
                            {lot.crop}
                          </td>

                          <td className="py-4 px-4 text-gray-700 font-medium">
                            {lot.quantity} <span className="text-xs text-gray-500">{tUnit(lot.unit)}</span>
                          </td>

                          <td className="py-4 px-4 text-gray-700">
                            {lot.mandi}
                          </td>

                          <td className="py-4 px-4 font-bold text-green-800">
                            ₹{Number(lot.expectedPrice).toLocaleString(locale)} <span className="text-xs font-normal text-gray-500">/ {tUnit(lot.unit)}</span>
                          </td>

                          <td className="py-4 px-4 text-gray-500 text-xs">
                            {formatDate(lot.createdAt, {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>

                          <td className="py-4 px-4">
                            {renderStatusBadge(lot.status)}
                          </td>

                          <td className="py-4 px-6 text-right">
                            <div className="flex justify-end gap-2">
                              {lot.status !== "approved" && (
                                <button
                                  disabled={updatingId === lot._id}
                                  onClick={() => handleStatusUpdate(lot._id, "approved")}
                                  className="px-3 py-1.5 bg-green-700 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-colors shadow-xs active:scale-95"
                                >
                                  {t("approveBtn")}
                                </button>
                              )}

                              {lot.status !== "rejected" && (
                                <button
                                  disabled={updatingId === lot._id}
                                  onClick={() => handleStatusUpdate(lot._id, "rejected")}
                                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-colors shadow-xs active:scale-95"
                                >
                                  {t("rejectBtn")}
                                </button>
                              )}

                              {lot.status === "approved" && (
                                <button
                                  disabled={updatingId === lot._id}
                                  onClick={() => handleStatusUpdate(lot._id, "sold")}
                                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-colors shadow-xs active:scale-95"
                                >
                                  {t("markSoldBtn")}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Responsive Cards View */}
                <div className="block md:hidden divide-y divide-gray-100">
                  {filteredLots.map((lot) => (
                    <div key={lot._id} className="p-4 space-y-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-gray-900 text-sm">
                            {lot.farmer?.name || t("unknownFarmer")}
                          </div>
                          <div className="text-xs text-gray-500">
                            📱 {lot.farmer?.mobile || t("notAvailable")}
                          </div>
                        </div>
                        {renderStatusBadge(lot.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border">
                        <div>
                          <span className="text-gray-400 block">{t("cropName")}</span>
                          <span className="font-semibold text-gray-800">{lot.crop}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">{t("quantity")}</span>
                          <span className="font-semibold text-gray-800">{lot.quantity} {tUnit(lot.unit)}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">{t("mandi")}</span>
                          <span className="font-semibold text-gray-800">{lot.mandi}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">{t("expectedPrice")}</span>
                          <span className="font-bold text-green-800">₹{Number(lot.expectedPrice).toLocaleString(locale)}</span>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        {lot.status !== "approved" && (
                          <button
                            disabled={updatingId === lot._id}
                            onClick={() => handleStatusUpdate(lot._id, "approved")}
                            className="flex-1 py-2 bg-green-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-xs active:scale-95"
                          >
                            {t("approveBtn")}
                          </button>
                        )}

                        {lot.status !== "rejected" && (
                          <button
                            disabled={updatingId === lot._id}
                            onClick={() => handleStatusUpdate(lot._id, "rejected")}
                            className="flex-1 py-2 bg-red-600 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-xs active:scale-95"
                          >
                            {t("rejectBtn")}
                          </button>
                        )}

                        {lot.status === "approved" && (
                          <button
                            disabled={updatingId === lot._id}
                            onClick={() => handleStatusUpdate(lot._id, "sold")}
                            className="flex-1 py-2 bg-blue-600 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-xs active:scale-95"
                          >
                            {t("markSoldBtn")}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default OfficerDashboard;
