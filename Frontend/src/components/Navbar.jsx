import React from "react";
import { useLang } from "../context/LanguageContext";
import { Volume2, MapPin } from "lucide-react";

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
      className="flex items-center rounded-xl border border-slate-300 p-0.5 bg-slate-100/80"
    >
      {options.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLang(option.code)}
          aria-pressed={lang === option.code}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
            lang === option.code
              ? "bg-[#0E2A3F] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function Navbar({ user, onOpenAuth, onOpenVoiceHelp, onLogout }) {
  const { t } = useLang();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
        {/* MandiTrack Logo & Name */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-br from-[#064e3b] to-[#0E2A3F] rounded-2xl flex items-center justify-center text-white text-xl font-extrabold shadow-xs shrink-0 border border-[#D9A227]/40">
            🌾
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-[#0E2A3F] leading-none tracking-tight truncate">
                {t("brandName")}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200 hidden md:inline-block">
                APMC
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:block truncate mt-0.5">
              Apala Mandi Saathi &bull; Transparency from gate entry to exit
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Voice Help Button */}
          {onOpenVoiceHelp && (
            <button
              onClick={onOpenVoiceHelp}
              title="Open Voice Help"
              className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition active:scale-95"
            >
              <Volume2 size={15} className="text-amber-700" />
              <span className="hidden sm:inline">{t("voiceHelpBtn")}</span>
            </button>
          )}

          <LanguageToggle />

          {user ? (
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-900">
                  {user.name}
                </span>
                <div className="flex items-center gap-1.5 justify-end mt-0.5">
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-extrabold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : user.role === "officer"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {user.role}
                  </span>

                  {user.mandi && (
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <MapPin size={10} className="text-amber-600" />
                      {user.mandi}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={onLogout}
                className="px-3.5 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl text-xs font-bold transition border border-red-200 active:scale-95"
              >
                {t("logout")}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth("login", "farmer")}
                className="px-3.5 py-1.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                {t("loginBtn")}
              </button>
              <button
                onClick={() => onOpenAuth("register", "farmer")}
                className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
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
