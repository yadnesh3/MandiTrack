import React from "react";
import logoLight from "../assets/manditrack-logo.png";
import logoDark from "../assets/manditrack-logo-dark.png";

export default function MandiTrackLogo({
  variant = "dark",
  subtitle = "",
  size = "md",
  className = "",
  imgClassName = "",
  style = {},
  showSubtitleText = false,
}) {
  const heights = {
    xs: 32,
    sm: 40,
    md: 48,
    lg: 56,
    xl: 68,
  };

  const h = typeof size === "number" ? size : (heights[size] || heights.md);
  const src = variant === "light" ? logoLight : logoDark;

  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
      style={style}
    >
      <img
        src={src}
        alt="MandiTrack - Smart Mandi, Better Market"
        style={{
          height: `${h}px`,
          width: "auto",
          maxWidth: "100%",
          objectFit: "contain",
        }}
        className={`shrink-0 block ${imgClassName}`}
        loading="eager"
      />
      {subtitle && showSubtitleText && (
        <span
          className={`ml-2 text-[10px] font-medium ${
            variant === "light" ? "text-white/70" : "text-[#687779]"
          }`}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
}