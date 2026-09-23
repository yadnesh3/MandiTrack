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
            <div className="bg-white rounded-xl p-6 border border-[#DCE3DB] shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E7EBE5] pb-4">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F5EFDE] text-[#B58A35] border border-[#E8DDBF]">
                    Current Active Token
                  </span>
                  <div className="text-2xl font-bold text-[#19343A] mt-2 flex items-center gap-2">
                    <span>Token:</span>
                    <span className="text-[#B58A35]">
                      {activeLot.tokenNumber || "TK-101"}
                    </span>
                  </div>
                  <div className="text-xs text-[#687779] font-semibold mt-0.5 font-mono">
                    Lot ID: {activeLot.lotId}
                  </div>
                </div>

                {onNavigateToTab && (
                  <button
                    onClick={() => onNavigateToTab("lot-tracking")}
                    className="px-4 py-2 rounded-xl bg-[#285C3A] hover:bg-[#214D31] text-white font-semibold text-xs shadow-sm transition flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
                  >
                    <span>Full Live Journey</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>

              {/* Crop & Mandi details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8F7F2] p-4 rounded-xl border border-[#E1E4DE]">
                <div>
                  <div className="text-[10px] font-bold text-[#8A9695] uppercase">Crop</div>
                  <div className="text-sm font-bold text-[#19343A] mt-0.5">{activeLot.crop}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#8A9695] uppercase">Quantity</div>
                  <div className="text-sm font-bold text-[#19343A] mt-0.5">
                    {activeLot.quantity} {activeLot.unit}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#8A9695] uppercase">Target Mandi</div>
                  <div className="text-sm font-bold text-[#19343A] mt-0.5 truncate">
                    {activeLot.mandi}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#8A9695] uppercase">Est. Wait</div>
                  <div className="text-sm font-bold text-[#A64B4B] mt-0.5">
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
            <div className="bg-white rounded-xl p-8 border border-[#DCE3DB] text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#EAF2E9] text-[#285C3A] flex items-center justify-center mx-auto">
                <PlusCircle size={32} />
              </div>
              <h2 className="text-base font-bold text-[#19343A]">
                No Active Lot in Queue
              </h2>
              <p className="text-xs text-[#687779] max-w-sm mx-auto font-medium">
                Bringing produce to the mandi today? Register your harvest now to reserve your queue token.
              </p>
              {onNavigateToTab && (
                <button
                  onClick={() => onNavigateToTab("add-produce")}
                  className="px-6 py-2.5 rounded-xl bg-[#285C3A] hover:bg-[#214D31] text-white font-semibold text-xs shadow-sm transition active:scale-95"
                >
                  Add Produce Now
                </button>
              )}
            </div>
          )}

          {/* Today's Mandi Prices Preview Card */}
          <div className="bg-white rounded-xl p-6 border border-[#DCE3DB] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7EBE5] pb-3">
              <div>
                <h2 className="text-base font-semibold text-[#19343A] tracking-tight">
                  Today's APMC Mandi Rates
                </h2>
                <p className="text-[11px] font-semibold text-[#8A9695]">
                  Live Agmarknet prices for top commodities
                </p>
              </div>
              {onNavigateToTab && (
                <button
                  onClick={() => onNavigateToTab("mandi-prices")}
                  className="text-xs font-bold text-[#285C3A] hover:text-[#214D31]"
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
                <div key={i} className="p-3 rounded-xl bg-[#F8F7F2] border border-[#E1E4DE]">
                  <div className="text-xs font-bold text-[#19343A] truncate">{rate.crop}</div>
                  <div className="text-base font-bold text-[#285C3A] mt-1">{rate.modal}</div>
                  <div className="text-[10px] text-[#8A9695] font-semibold mt-0.5">{rate.mandi}</div>
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
          <div className="bg-[#214D31] text-white rounded-xl p-6 shadow-sm border border-[#285C3A] space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🚜</span>
              <h3 className="text-sm font-semibold">Farmer Quick Services</h3>
            </div>
            <p className="text-xs text-[#D9E7DC] font-medium leading-relaxed">
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
                className="p-2.5 rounded-xl bg-[#B58A35] hover:bg-[#9F782D] text-xs font-semibold text-white transition text-center shadow-sm"
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
