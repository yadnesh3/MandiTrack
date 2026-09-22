import React from "react";
import MandiTrackLogo from "../MandiTrackLogo";

export default function BottomBanner({ className = "" }) {
  return (
    <footer
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0C3B24] via-[#104D30] to-[#0A2E1C] text-white px-6 py-4 shadow-sm border border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-4 select-none ${className}`}
    >
      {/* Background agriculture field silhouette */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url('/banner_art.jpg')" }}
      />

      {/* Left: MandiTrack Logo mark & Govt of Maharashtra */}
      <div className="relative z-10 flex items-center gap-3">
        <MandiTrackLogo
          variant="light"
          subtitle="Govt. of Maharashtra Initiative"
          size="sm"
        />
      </div>

      {/* Center: Inspiring Motto */}
      <div className="relative z-10 flex items-center gap-2 text-center">
        <span className="text-xl">🍃</span>
        <span className="font-extrabold text-sm sm:text-base tracking-wide text-emerald-100 font-serif italic">
          Better Mandis. Brighter Tomorrows.
        </span>
      </div>

      {/* Right: Dept & Copyright */}
      <div className="relative z-10 text-right text-xs text-emerald-200/80 font-medium">
        <div className="font-bold text-white">Department of Agricultural Marketing</div>
        <div>Maharashtra State Agricultural Marketing Board (MSAMB)</div>
      </div>
    </footer>
  );
}
