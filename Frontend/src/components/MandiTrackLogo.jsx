import React from "react";

export default function MandiTrackLogo({
  variant = "dark",
  subtitle = "",
  size = "md",
  className = "",
}) {
  const sizes = {
    sm: {
      icon: 30,
      text: "text-[18px]",
      subtitle: "text-[9px]",
      gap: "gap-2",
    },

    md: {
      icon: 36,
      text: "text-[21px]",
      subtitle: "text-[10px]",
      gap: "gap-2.5",
    },

    lg: {
      icon: 44,
      text: "text-[25px]",
      subtitle: "text-[11px]",
      gap: "gap-3",
    },
  };

  const config = sizes[size] || sizes.md;

  const isLight = variant === "light";

  return (
    <div
      className={`flex items-center ${config.gap} select-none ${className}`}
    >
      {/* =========================================================
          LOGO ICON
      ========================================================= */}
      <div
        className="shrink-0 rounded-[7px] bg-[#285C3A] flex items-center justify-center"
        style={{
          width: config.icon,
          height: config.icon,
        }}
      >
        <svg
          width={config.icon * 0.62}
          height={config.icon * 0.66}
          viewBox="0 0 24 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Left Leaf */}
          <path
            d="M12 24C12 24 4.2 20.2 3.2 12.5C2.3 5.8 8.5 2.4 12 2C12 2 13.1 9.1 12.4 15.1C12 18.8 12 24 12 24Z"
            fill="white"
          />

          {/* Right Leaf */}
          <path
            d="M12 24C12 24 19.8 20.2 20.8 12.5C21.7 5.8 15.5 2.4 12 2C12 2 10.9 9.1 11.6 15.1C12 18.8 12 24 12 24Z"
            fill="white"
            fillOpacity="0.82"
          />

          {/* Center Stem */}
          <path
            d="M12 7V23"
            stroke="#285C3A"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* =========================================================
          BRAND TEXT
      ========================================================= */}
      <div className="flex flex-col leading-none">
        <div
          className={`font-bold tracking-tight ${config.text} ${
            isLight ? "text-white" : "text-[#285C3A]"
          }`}
        >
          <span>Mandi</span>
          <span className="text-[#B58A35]">Track</span>
        </div>

        {/* Optional Subtitle */}
        {subtitle && (
          <span
            className={`mt-1 font-medium tracking-normal ${config.subtitle} ${
              isLight ? "text-white/70" : "text-[#687779]"
            }`}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}