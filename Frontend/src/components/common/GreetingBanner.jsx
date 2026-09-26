import React from "react";
import { Sun, MapPin } from "lucide-react";

export default function GreetingBanner({
  user,
  greeting = "Namaskar",
  subtitle = "Let's keep the mandi moving.",
}) {
  const userName = user?.name || "Kisan";
  const userMandi = user?.mandi || "Pune APMC";
  const district =
    userMandi.replace(/APMC|Market/gi, "").trim() || "Pune";

  return (
    <div className="relative overflow-hidden rounded-xl bg-white border border-[#DCE3DB] shadow-sm">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-5 sm:p-6">

        {/* Left: Greeting */}
        <div className="z-10 shrink-0 max-w-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#19343A] tracking-tight">
            {greeting},{" "}
            <span className="text-[#285C3A]">
              {userName}
            </span>
            {" "}!
          </h1>

          <p className="text-sm font-medium text-[#687779] mt-1.5">
            {subtitle}
          </p>
        </div>

        {/* Center: Mandi Message */}
        <div className="relative flex-1 flex items-center justify-center min-h-[90px] px-5 py-4 rounded-xl bg-[#F8F7F2] border border-[#E1E4DE]">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            
            {/* Decorative mark */}
            <div className="w-10 h-10 rounded-lg bg-[#EEF3EC] text-[#285C3A] flex items-center justify-center shrink-0">
              <span className="text-lg">✦</span>
            </div>

            <div>
              <div className="text-[#285C3A] font-bold text-sm sm:text-base tracking-wide">
                "चांगला दर, चांगली शेती, समृद्ध शेतकरी"
              </div>

              <div className="text-[11px] font-medium text-[#687779] mt-1">
                Fair Rates &bull; Better Farming &bull; Prosperous Producers
              </div>
            </div>
          </div>
        </div>

        {/* Right: APMC Yard Status */}
        <div className="z-10 shrink-0 flex items-center gap-3 bg-[#F8F7F2] rounded-xl px-4 py-3 border border-[#DCE3DB]">
          <div className="w-10 h-10 rounded-lg bg-[#EAF2E9] text-[#285C3A] flex items-center justify-center shrink-0">
            <MapPin size={20} strokeWidth={2} />
          </div>

          <div className="text-left">
            <div className="text-xs font-semibold text-[#19343A] flex items-center gap-1">
              {district}, Maharashtra
            </div>

            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-[#285C3A]" />
              <span className="text-[11px] font-semibold text-[#285C3A]">
                APMC Yard Operational
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}