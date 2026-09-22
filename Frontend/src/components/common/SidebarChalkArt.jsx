import React from "react";

export default function SidebarChalkArt() {
  return (
    <div className="px-4 py-3 select-none text-center">
      {/* Marathi Slogan */}
      <div className="text-right text-emerald-200/90 text-[13px] font-semibold tracking-wide pr-2 mb-2 italic">
        "शेतकऱ्यांचा विश्वास,<br />
        <span className="text-amber-300/90 pl-3">मंडीचा विकास"</span>
      </div>

      {/* Chalk-style line illustration of farmer with oxen plowing */}
      <div className="relative w-full h-32 flex items-center justify-center opacity-75 hover:opacity-90 transition-opacity">
        <svg
          viewBox="0 0 280 140"
          className="w-full h-full text-slate-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ground soil furrow lines */}
          <path
            d="M10 120 C 60 116, 120 122, 180 118 C 220 116, 260 121, 275 120"
            stroke="#94A3B8"
            strokeWidth="1.6"
            strokeDasharray="3 3"
            strokeLinecap="round"
          />
          <path
            d="M20 128 C 80 125, 140 129, 210 126 C 240 125, 265 127, 275 128"
            stroke="#64748B"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            strokeLinecap="round"
          />

          {/* Farmer Silhouette (walking behind plow) */}
          <g transform="translate(45, 30)">
            {/* Turban / Pheta */}
            <ellipse cx="18" cy="12" rx="7" ry="5.5" fill="#E2E8F0" />
            <path d="M12 12 C14 8, 22 8, 24 12" stroke="#CBD5E1" strokeWidth="1.2" />
            {/* Head & Neck */}
            <circle cx="18" cy="19" r="4.5" fill="#E2E8F0" />
            {/* Torso / Kurta */}
            <path
              d="M12 25 L24 25 L26 52 L10 52 Z"
              fill="#CBD5E1"
              stroke="#94A3B8"
              strokeWidth="1"
            />
            {/* Arms holding the plow handle */}
            <path
              d="M13 28 L28 42 L42 46"
              stroke="#E2E8F0"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M23 28 L35 44 L44 48"
              stroke="#E2E8F0"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Dhoti / Legs in walking stride */}
            <path
              d="M13 52 L9 78 L5 79"
              stroke="#E2E8F0"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M23 52 L27 75 L33 77"
              stroke="#E2E8F0"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {/* Wooden Plow (Hal) connecting farmer to oxen */}
          <g transform="translate(85, 70)">
            <path
              d="M0 8 L32 20 L40 50 L34 52"
              stroke="#FCD34D"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Plow share entering soil */}
            <path
              d="M32 20 L80 10 L120 8"
              stroke="#FCD34D"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* Pair of Indian Bullocks / Oxen with Hump & Horns */}
          <g transform="translate(140, 20)">
            {/* Near Bullock Body */}
            {/* Hump */}
            <path
              d="M38 42 C40 32, 50 32, 54 44"
              stroke="#E2E8F0"
              strokeWidth="2.2"
              fill="#CBD5E1"
            />
            {/* Back & Tail */}
            <path
              d="M15 54 C25 48, 42 45, 54 45 C75 45, 88 40, 95 35"
              stroke="#E2E8F0"
              strokeWidth="2.2"
              fill="none"
            />
            <path
              d="M15 54 L12 78 L14 84"
              stroke="#CBD5E1"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Head and Horns */}
            <path
              d="M95 35 C100 32, 105 35, 108 42 L112 48 C110 52, 104 53, 98 48 Z"
              fill="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            {/* Majestic curved horns */}
            <path
              d="M97 34 C94 22, 90 14, 86 10 C88 12, 98 24, 100 32"
              stroke="#F8FAFC"
              strokeWidth="2"
              fill="#CBD5E1"
            />
            <path
              d="M103 35 C106 20, 110 12, 115 8 C113 14, 108 24, 106 33"
              stroke="#F8FAFC"
              strokeWidth="2"
              fill="#CBD5E1"
            />
            {/* Yoke (Jua) across shoulders */}
            <rect x="52" y="38" width="12" height="4" rx="2" fill="#FBBF24" />
            <path d="M58 42 L58 60" stroke="#FBBF24" strokeWidth="1.5" />
            {/* Front and Back Legs */}
            <path
              d="M25 65 L22 96 L18 98"
              stroke="#E2E8F0"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M36 64 L39 94 L44 96"
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M80 62 L78 96 L74 98"
              stroke="#E2E8F0"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M90 62 L94 94 L99 96"
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Distant Second Bullock Silhouette */}
            <path
              d="M70 28 C74 18, 77 12, 80 8"
              stroke="#94A3B8"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M85 30 C90 18, 95 12, 100 8"
              stroke="#94A3B8"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M85 45 C100 42, 112 36, 120 34"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
