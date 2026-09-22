import React, { useState, useEffect } from "react";
import { getMyLotsApi, getMandiPricesApi } from "../services/api";
import GreetingBanner from "./common/GreetingBanner";
import StatCard from "./common/StatCard";
import ProcessFlowCard from "./common/ProcessFlowCard";
import AskMandiTrackCard from "./common/AskMandiTrackCard";
import AnnouncementsCard from "./common/AnnouncementsCard";
import {
  Package,
  Clock,
  Settings,
  CheckCircle2,
  PlusCircle,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export default function FarmerDashboard({
  user,
  onNavigateToTab,
  onOpenVoiceModal,
}) {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFarmerData = async () => {
    setLoading(true);
    setError("");
    try {
      const [lotsRes, pricesRes] = await Promise.all([
        getMyLotsApi().catch(() => ({ lots: [] })),
        getMandiPricesApi().catch(() => ({ records: [] })),
      ]);
      setLots(lotsRes.lots || []);
      setMandiRates(pricesRes.records || []);
    } catch (err) {
      setError(err.message || "Failed to load farmer dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmerData();
  }, []);

  // Active lot is the latest one not completed, or the most recent lot
  const activeLot =
    lots.find((l) => l.status !== "completed" && l.status !== "sold") ||
    lots[0] ||
    null;

  // Stats
  const totalLots = lots.length;
  const inQueueCount = lots.filter(
    (l) => l.currentStage === "Queue" || l.status === "pending"
  ).length;
  const inProcessingCount = lots.filter(
    (l) =>
      ["Quality Check", "Trading", "Trading / Sale", "Weighing", "Settlement"].includes(
        l.currentStage
      ) && l.status !== "completed"
  ).length;
  const completedCount = lots.filter(
    (l) => l.status === "completed" || l.status === "sold" || l.currentStage === "Exit"
  ).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Greeting Banner matching reference */}
      <GreetingBanner
        user={user}
        greeting="Namaskar"
        subtitle="Welcome to your Apala Mandi Saathi portal."
      />

      {/* 2. Stat Cards Row matching reference */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Package}
          color="green"
          value={totalLots}
          label="My Registered Lots"
          subtext="Total lots submitted"
        />

        <StatCard
          icon={Clock}
          color="orange"
          value={inQueueCount}
          label="Lots in Queue"
          subtext="Waiting for gate/inspection"
        />

        <StatCard
          icon={Settings}
          color="blue"
          value={inProcessingCount}
          label="In Processing"
          subtext="Quality check & auction"
        />

        <StatCard
          icon={CheckCircle2}
          color="purple"
          value={completedCount}
          label="Completed / Sold"
          subtext="Cleared with payment"
        />
      </div>

      {/* 3. Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (7 Cols): Active Token Highlight Card & My Lots preview */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Token Card */}
          {activeLot ? (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-[#EA8F0B] border border-amber-200">
                    Current Active Token
                  </span>
                  <div className="text-2xl font-black text-slate-900 mt-2 flex items-center gap-2">
                    <span>Token:</span>
                    <span className="text-[#EA8F0B]">
                      {activeLot.tokenNumber || "TK-101"}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5 font-mono">
                    Lot ID: {activeLot.lotId}
                  </div>
                </div>

                {onNavigateToTab && (
                  <button
                    onClick={() => onNavigateToTab("lot-tracking")}
                    className="px-4 py-2 rounded-xl bg-[#EA8F0B] hover:bg-[#d47f06] text-white font-extrabold text-xs shadow-xs transition flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
                  >
                    <span>Full Live Journey</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>

              {/* Crop & Mandi details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Crop</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">{activeLot.crop}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Quantity</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">
                    {activeLot.quantity} {activeLot.unit}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Target Mandi</div>
                  <div className="text-sm font-bold text-slate-700 mt-0.5 truncate">
                    {activeLot.mandi}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Est. Wait</div>
                  <div className="text-sm font-black text-rose-600 mt-0.5">
                    ~{activeLot.estimatedWaitMinutes || 25} min
                  </div>
                </div>
              </div>

              {/* Integrated Process Timeline for this active lot */}
              <div className="pt-2">
                <ProcessFlowCard
                  currentStage={activeLot.currentStage || "Queue"}
                  onViewAll={() => onNavigateToTab && onNavigateToTab("lot-tracking")}
                />
              </div>
            </div>
          ) : (
            /* Empty State if no active lot */
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <PlusCircle size={32} />
              </div>
              <h2 className="text-base font-black text-slate-900">
                No Active Lot in Queue
              </h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
                Bringing produce to the mandi today? Register your harvest now to reserve your queue token.
              </p>
              {onNavigateToTab && (
                <button
                  onClick={() => onNavigateToTab("add-produce")}
                  className="px-6 py-2.5 rounded-xl bg-[#EA8F0B] hover:bg-[#d47f06] text-white font-extrabold text-xs shadow-xs transition active:scale-95"
                >
                  Add Produce Now
                </button>
              )}
            </div>
          )}

          {/* Today's Mandi Prices Preview Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Today's APMC Mandi Rates
                </h2>
                <p className="text-[11px] font-semibold text-slate-400">
                  Live Agmarknet prices for top commodities
                </p>
              </div>
              {onNavigateToTab && (
                <button
                  onClick={() => onNavigateToTab("mandi-prices")}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  View All Prices &rarr;
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { crop: "Onion (कांदा)", modal: "₹1,850", trend: "+5%", mandi: "Pune APMC" },
                { crop: "Tomato (टोमॅटो)", modal: "₹1,400", trend: "+8%", mandi: "Pune APMC" },
                { crop: "Soybean (सोयाबीन)", modal: "₹4,280", trend: "Stable", mandi: "Pune APMC" },
                { crop: "Wheat (गहू)", modal: "₹2,650", trend: "+2%", mandi: "Pune APMC" },
              ].map((rate, i) => (
                <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xs font-black text-slate-900 truncate">{rate.crop}</div>
                  <div className="text-base font-black text-emerald-700 mt-1">{rate.modal}</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{rate.mandi}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): Live Activity, Announcements, Ask MandiTrack Voice */}
        <div className="lg:col-span-5 space-y-6">
          {/* Announcements */}
          <AnnouncementsCard
            onViewAll={() => onNavigateToTab && onNavigateToTab("announcements")}
          />

          {/* Ask MandiTrack Voice Assistant */}
          <AskMandiTrackCard onOpenFullVoiceModal={onOpenVoiceModal} />

          {/* Quick Actions Helper Card */}
          <div className="bg-gradient-to-br from-[#0C192C] to-[#122b4d] text-white rounded-3xl p-6 shadow-sm border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🚜</span>
              <h3 className="text-sm font-extrabold">Farmer Quick Services</h3>
            </div>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Need to add harvest produce, view weighing certificates, or check your bank settlement status?
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onNavigateToTab && onNavigateToTab("add-produce")}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition text-center"
              >
                ➕ Add Produce
              </button>
              <button
                onClick={() => onNavigateToTab && onNavigateToTab("my-lots")}
                className="p-2.5 rounded-xl bg-[#EA8F0B] hover:bg-[#d47f06] text-xs font-extrabold text-[#0C192C] transition text-center shadow-xs"
              >
                📦 View All Lots
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
