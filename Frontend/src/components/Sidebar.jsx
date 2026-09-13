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
    <aside className="w-64 bg-[#064e3b] text-white min-h-screen flex flex-col shadow-xl shrink-0">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3 border-b border-green-800/60">
        <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl font-extrabold shadow-sm">
          🌱
        </div>
        <span className="text-2xl font-extrabold tracking-tight text-white">
          MandiTrack
        </span>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all text-left ${
                isActive
                  ? "bg-white text-[#064e3b] shadow-md font-bold"
                  : "text-emerald-100/90 hover:bg-emerald-800/50 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Info & Logout at Bottom */}
      <div className="p-4 border-t border-green-800/60 space-y-3">
        {user && (
          <div className="px-3 py-2 bg-emerald-900/40 rounded-xl text-xs">
            <div className="font-bold text-white truncate">{user.name}</div>
            <div className="text-emerald-300 capitalize font-medium">
              {user.role === "farmer" ? "Farmer" : "Market Officer"}
            </div>
          </div>
        )}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm text-emerald-200 hover:bg-red-900/40 hover:text-red-200 transition-colors text-left"
        >
          <span className="text-base">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
