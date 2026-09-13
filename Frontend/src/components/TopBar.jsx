import React from "react";

function TopBar({ user, title, onToggleMobileSidebar }) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs sticky top-0 z-20">
      {/* Mobile Menu Button & Title */}
      <div className="flex items-center gap-4">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            ☰
          </button>
        )}

        {/* User Greeting Avatar */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-emerald-600 overflow-hidden flex items-center justify-center font-bold text-slate-700 text-sm shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900 leading-tight">
                Welcome, {user.name}
              </div>
              <div className="text-xs font-semibold text-slate-500 capitalize">
                {user.role === "farmer" ? "Farmer" : "Market Officer"}
              </div>
            </div>
          </div>
        ) : (
          <h2 className="text-xl font-bold text-slate-900">{title || "Dashboard"}</h2>
        )}
      </div>

      {/* Top Right EN / मराठी pill indicator */}
      <div className="flex items-center gap-2">
        <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs font-bold">
          <span className="px-2.5 py-1 rounded-lg bg-[#064e3b] text-white shadow-xs">
            EN
          </span>
          <span className="px-2.5 py-1 rounded-lg text-slate-500 cursor-not-allowed">
            मराठी
          </span>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
