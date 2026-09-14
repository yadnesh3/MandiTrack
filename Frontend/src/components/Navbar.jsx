import React from "react";
import { useLang } from "../context/LanguageContext";

// Short labels for the role badge; the *Role keys are the long forms used
// on the signup form.
const ROLE_LABEL_KEYS = {
  farmer: "roleFarmer",
  officer: "roleOfficer",
  admin: "roleAdmin",
};

/** Two-state English/Marathi switch. Each label is written in its own script. */
function LanguageToggle() {
  const { lang, setLang, t } = useLang();

  const options = [
    { code: "en", label: "EN" },
    { code: "mr", label: "मराठी" },
  ];

  return (
    <div
      role="group"
      aria-label={t("changeLang")}
      className="flex items-center rounded-lg border border-slate-300 p-0.5 bg-slate-50"
    >
      {options.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLang(option.code)}
          aria-pressed={lang === option.code}
          className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors ${
            lang === option.code
              ? "bg-green-700 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function Navbar({ user, onOpenAuth, onLogout }) {
  const { t } = useLang();

  return (
    <header className="bg-white border-b sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
        {/* MandiTrack Logo & Name */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center text-white text-xl font-extrabold shadow-xs shrink-0">
            🌱
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-green-800 leading-none truncate">
              {t("brandName")}
            </h1>
            <span className="text-xs text-slate-500 font-medium hidden sm:block truncate">
              {t("navTagline")}
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <LanguageToggle />

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-semibold text-slate-800">
                  {user.name}
                </span>
                <span className="text-xs uppercase tracking-wide px-2 py-0.5 rounded bg-green-100 text-green-800 font-bold self-end">
                  {t(ROLE_LABEL_KEYS[user.role] || "roleFarmer")}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors border border-red-200"
              >
                {t("logout")}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth("login", "farmer")}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {t("loginBtn")}
              </button>
              <button
                onClick={() => onOpenAuth("register", "farmer")}
                className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg text-sm font-medium transition-colors shadow-xs"
              >
                {t("registerBtn")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
