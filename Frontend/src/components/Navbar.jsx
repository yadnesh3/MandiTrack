import React from "react";

function Navbar({ user, onOpenAuth, onLogout }) {
  return (
    <header className="bg-white border-b sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* MandiTrack Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center text-white text-xl font-extrabold shadow-xs">
            🌱
          </div>
          <div>
            <h1 className="text-xl font-bold text-green-800 leading-none">
              MandiTrack
            </h1>
            <span className="text-xs text-slate-500 font-medium">
              Farmer & Mandi Process Management
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-semibold text-slate-800">
                  {user.name}
                </span>
                <span className="text-xs uppercase tracking-wide px-2 py-0.5 rounded bg-green-100 text-green-800 font-bold self-end">
                  {user.role}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors border border-red-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth("login", "farmer")}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onOpenAuth("register", "farmer")}
                className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg text-sm font-medium transition-colors shadow-xs"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
