import React from "react";

function TopBar({ user, title, onToggleMobileSidebar }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#DCE3DB] bg-white px-4 py-3.5 shadow-sm sm:px-6">
      {/* =====================================================
          LEFT SIDE
      ====================================================== */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        {/* Mobile Menu */}
        {onToggleMobileSidebar && (
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] text-[#285C3A] transition hover:bg-[#EAF2E9] md:hidden"
            aria-label="Open navigation menu"
          >
            <span className="text-lg leading-none">☰</span>
          </button>
        )}

        {/* User Greeting */}
        {user ? (
          <div className="flex min-w-0 items-center gap-3">
            {/* Avatar */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#CFE2D4] bg-[#EAF2E9] text-sm font-bold text-[#285C3A]">
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            {/* User Details */}
            <div className="min-w-0">
              <div className="truncate text-sm font-bold leading-tight text-[#19343A]">
                Welcome, {user.name}
              </div>

              <div className="mt-0.5 text-[11px] font-medium capitalize text-[#687779]">
                {user.role === "farmer"
                  ? "Farmer"
                  : "Market Officer"}
              </div>
            </div>
          </div>
        ) : (
          <h2 className="truncate text-lg font-bold text-[#19343A] sm:text-xl">
            {title || "Dashboard"}
          </h2>
        )}
      </div>

      {/* =====================================================
          RIGHT SIDE — LANGUAGE
      ====================================================== */}
      <div className="ml-3 flex shrink-0 items-center">
        <div className="flex items-center rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] p-1 text-[11px] font-semibold">
          <span className="rounded-md bg-[#285C3A] px-2.5 py-1.5 text-white shadow-sm">
            EN
          </span>

          <span className="cursor-not-allowed rounded-md px-2.5 py-1.5 text-[#8A9695]">
            मराठी
          </span>
        </div>
      </div>
    </header>
  );
}

export default TopBar;