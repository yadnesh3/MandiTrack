import React from "react";

function Sidebar({ activeTab, onSelectTab, onLogout, user }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "add-produce", label: "Add Produce", icon: "➕" },
    { id: "my-lots", label: "My Lots", icon: "📦" },
    { id: "mandi-prices", label: "Mandi Prices", icon: "📊" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col bg-[#214D31] text-white shadow-lg">
      {/* =====================================================
          BRAND
      ====================================================== */}
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl shadow-sm">
            🌱
          </div>

          <div className="leading-tight">
            <div className="text-xl font-bold tracking-tight text-white">
              Mandi<span className="text-[#B8CFAE]">Track</span>
            </div>

            <div className="mt-0.5 text-[10px] font-medium tracking-wide text-[#C9DCC2]">
              Apala Mandi Saathi
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}
      <nav className="flex-1 px-3 py-5">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B8C9B3]">
          Main Menu
        </p>

        <div className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`group flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-left text-sm transition-all ${
                  isActive
                    ? "bg-[#B58A35] font-semibold text-white shadow-sm"
                    : "font-medium text-[#D9E5D5] hover:bg-white/10 hover:text-white"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition ${
                    isActive
                      ? "bg-white/15"
                      : "bg-white/5 group-hover:bg-white/10"
                  }`}
                >
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* =====================================================
          USER / LOGOUT
      ====================================================== */}
      <div className="border-t border-white/10 p-3">
        {user && (
          <div className="mb-3 rounded-lg border border-white/10 bg-white/5 px-3 py-3">
            <div className="truncate text-sm font-semibold text-white">
              {user.name}
            </div>

            <div className="mt-1 text-[11px] font-medium text-[#C9DCC2]">
              {user.role === "farmer"
                ? "Farmer"
                : "Market Officer"}
            </div>

            {user.mandi && (
              <div className="mt-2 truncate text-[10px] text-[#AFC3A9]">
                {user.mandi}
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-left text-sm font-medium text-[#D9E5D5] transition hover:bg-[#8F4141]/30 hover:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-sm">
            🚪
          </span>

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;