import React from "react";
import { Sun, CloudSun, MapPin } from "lucide-react";

export default function GreetingBanner({
  user,
  greeting = "Namaskar",
  subtitle = "Let's keep the mandi moving.",
}) {
  const userName = user?.name || "Kisan";
  const userMandi = user?.mandi || "Pune APMC";
  const district = userMandi.replace(/APMC|Market/gi, "").trim() || "Pune";

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-5 sm:p-6">
        {/* Left: Greeting & Subtitle */}
        <div className="z-10 shrink-0 max-w-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0C192C] tracking-tight">
            {greeting},{" "}
            <span className="text-[#0C192C] underline decoration-amber-400 decoration-3 underline-offset-4">
              {userName}
            </span>{" "}
            !
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1.5 flex items-center gap-1.5">
            <span>{subtitle}</span>
          </p>
        </div>

        {/* Center: Beautiful Agricultural Banner Illustration with Marathi Quote */}
        <div className="relative flex-1 flex items-center justify-center min-h-[95px] px-4 py-2 my-1 rounded-xl overflow-hidden bg-gradient-to-r from-emerald-50/70 via-amber-50/50 to-emerald-50/80 border border-emerald-100/70">
          {/* Subtle background image of the painted field */}
          <div
            className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-multiply pointer-events-none"
            style={{ backgroundImage: "url('/banner_art.jpg')" }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
            <span className="text-2xl select-none">🌱</span>
            <div className="flex flex-col">
              <span className="text-emerald-900 font-extrabold text-base sm:text-lg tracking-wide font-serif italic">
                "चांगला दर, चांगली शेती, समृद्ध शेतकरी"
              </span>
              <span className="text-[11px] font-semibold text-emerald-700/80 tracking-normal">
                Fair Rates &bull; Better Farming &bull; Prosperous Producers
              </span>
            </div>
          </div>
        </div>

        {/* Right: Weather Widget matching reference */}
        <div className="z-10 shrink-0 flex items-center gap-3 bg-slate-50/90 rounded-2xl px-4 py-2.5 border border-slate-200/80">
          <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-500 flex items-center justify-center shrink-0 shadow-xs">
            <Sun size={22} className="animate-spin-slow" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <MapPin size={11} className="text-emerald-600" />
              {district}, Maharashtra
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-black text-slate-900 leading-none">
                28°C
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                Partly Cloudy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
