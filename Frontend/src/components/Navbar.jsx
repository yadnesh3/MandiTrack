import React from "react";
import { useLang } from "../context/LanguageContext";
import { Volume2, MapPin } from "lucide-react";
import MandiTrackLogo from "./MandiTrackLogo";

const ROLE_LABEL_KEYS = {
  farmer: "roleFarmer",
  officer: "roleOfficer",
  admin: "roleAdmin",
};

/** Two-state English/Marathi switch. */
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
      className="flex items-center rounded-lg border border-white/25 p-0.5 bg-white/10"
    >
      {options.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLang(option.code)}
          aria-pressed={lang === option.code}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            lang === option.code
              ? "bg-white text-[#285C3A] shadow-sm"
              : "text-white/70 hover:text-white"
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
    <header className="bg-[#285C3A] border-b border-[#214D31] shadow-[0_2px_10px_rgba(0,0,0,0.15)] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between gap-3">
        {/* MandiTrack Logo */}
        <div className="flex items-center gap-3 min-w-0">
          <MandiTrackLogo variant="light" size={64} />

          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/15 text-white/90 border border-white/20 hidden md:inline-block">
            APMC
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Voice Help Button */}
          {onOpenVoiceHelp && (
            <button
              onClick={onOpenVoiceHelp}
              title="Open Voice Help"
              className="px-3 py-1.5 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 transition active:scale-[0.98]"
            >
              <Volume2 size={15} className="text-white/80" />

              <span className="hidden sm:inline">
                {t("voiceHelpBtn")}
              </span>
            </button>
          )}

          <LanguageToggle />

          {user ? (
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-white">
                  {user.name}
                </span>

                <div className="flex items-center gap-1.5 justify-end mt-0.5">
                  <span
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-bold bg-white/20 text-white"
                  >
                    {user.role}
                  </span>

                  {user.mandi && (
                    <span className="text-[10px] font-semibold text-white/70 bg-white/10 border border-white/20 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                      <MapPin size={10} className="text-white/60" />
                      {user.mandi}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={onLogout}
                className="px-3.5 py-1.5 bg-white/10 text-white hover:bg-white/20 rounded-lg text-xs font-semibold transition border border-white/25 active:scale-[0.98]"
              >
                {t("logout")}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth("login", "farmer")}
                className="px-3.5 py-1.5 border border-white/50 rounded-lg text-xs font-semibold text-white hover:bg-white/10 transition"
              >
                {t("loginBtn")}
              </button>

              <button
                onClick={() => onOpenAuth("register", "farmer")}
                className="px-4 py-1.5 bg-white hover:bg-[#F0F7F0] text-[#285C3A] rounded-lg text-xs font-semibold transition shadow-sm"
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