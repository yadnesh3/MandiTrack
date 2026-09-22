import React from "react";

export default function MandiTrackLogo({
  variant = "light", // "light" (for dark navy background) | "dark" (for white background)
  subtitle = "Apala Mandi Saathi",
  size = "md", // "sm" | "md" | "lg"
  className = "",
}) {
  const isLight = variant === "light";

  const leafSizes = {
    sm: { w: 26, h: 26, text: "text-lg", sub: "text-[10px]" },
    md: { w: 34, h: 34, text: "text-xl", sub: "text-[11px]" },
    lg: { w: 42, h: 42, text: "text-2xl", sub: "text-xs" },
  }[size] || { w: 34, h: 34, text: "text-xl", sub: "text-[11px]" };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Two-leaf MandiTrack stylized logo mark matching reference */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={leafSizes.w}
          height={leafSizes.h}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Left Leaf - Vibrant Green */}
          <path
            d="M24 44C24 44 10 36 8 22C6 8 20 4 20 4C20 4 24 16 24 26C24 34 24 44 24 44Z"
            fill="url(#greenLeafGrad)"
          />
          {/* Right Leaf - Sky Cyan / Teal */}
          <path
            d="M24 44C24 44 38 36 40 22C42 8 28 4 28 4C28 4 24 16 24 26C24 34 24 44 24 44Z"
            fill="url(#cyanLeafGrad)"
          />
          {/* Subtle Central Vein Accent */}
          <path
            d="M24 14V42"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
          <defs>
            <linearGradient
              id="greenLeafGrad"
              x1="8"
              y1="4"
              x2="24"
              y2="44"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#22C55E" />
              <stop offset="1" stopColor="#15803D" />
            </linearGradient>
            <linearGradient
              id="cyanLeafGrad"
              x1="40"
              y1="4"
              x2="24"
              y2="44"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-tight text-left">
        <div className="flex items-center gap-1">
          <span
            className={`font-black tracking-tight ${leafSizes.text} ${
              isLight ? "text-white" : "text-[#0C192C]"
            }`}
          >
            Mandi<span className="text-emerald-400">Track</span>
          </span>
        </div>
        {subtitle && (
          <span
            className={`font-medium tracking-normal ${leafSizes.sub} ${
              isLight ? "text-emerald-200/80" : "text-slate-500"
            }`}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
