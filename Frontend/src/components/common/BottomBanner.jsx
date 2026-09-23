import React from "react";
import MandiTrackLogo from "../MandiTrackLogo";

export default function BottomBanner({ className = "" }) {
  return (
    <footer
      className={`relative overflow-hidden rounded-xl bg-[#214D31] text-white px-5 sm:px-6 py-4 border border-[#285C3A] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 select-none ${className}`}
    >
      {/* Subtle decorative element */}
      <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-[#285C3A]/40 pointer-events-none" />
      <div className="absolute -left-8 -bottom-12 w-28 h-28 rounded-full bg-[#B58A35]/10 pointer-events-none" />

      {/* Left: MandiTrack Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <MandiTrackLogo
          variant="light"
          subtitle="Govt. of Maharashtra Initiative"
          size="sm"
        />
      </div>

      {/* Center: Motto */}
      <div className="relative z-10 flex items-center gap-2 text-center">
        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
          <span className="text-[#B58A35] text-sm">✦</span>
        </div>

        <span className="font-semibold text-sm sm:text-base tracking-wide text-white">
          Better Mandis. Brighter Tomorrows.
        </span>
      </div>

      {/* Right: Department & Copyright */}
      <div className="relative z-10 text-center md:text-right text-[10px] sm:text-xs text-white/70 font-medium">
        <div className="font-semibold text-white">
          Department of Agricultural Marketing
        </div>

        <div className="mt-0.5">
          Maharashtra State Agricultural Marketing Board (MSAMB)
        </div>
      </div>
    </footer>
  );
}