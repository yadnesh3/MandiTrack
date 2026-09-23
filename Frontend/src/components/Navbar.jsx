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
      className="flex items-center rounded-lg border border-[#DCE3DB] p-0.5 bg-[#F8F7F2]"
    >
      {options.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLang(option.code)}
          aria-pressed={lang === option.code}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            lang === option.code
              ? "bg-[#285C3A] text-white shadow-sm"
              : "text-[#687779] hover:text-[#19343A]"
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
    <header className="bg-white border-b border-[#DCE3DB] sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
        {/* MandiTrack Logo & Name */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-[#214D31] rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-sm shrink-0 border border-[#285C3A]">
            🌾
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#19343A] leading-none tracking-tight truncate">
                {t("brandName")}
              </h1>

              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F5EFDE] text-[#80672C] border border-[#E8DDBF] hidden md:inline-block">
                APMC
              </span>
            </div>

            <span className="text-xs text-[#687779] font-medium hidden sm:block truncate mt-0.5">
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
              className="px-3 py-1.5 rounded-lg border border-[#E8DDBF] bg-[#F5EFDE] hover:bg-[#F1E8D2] text-[#6F531D] font-semibold text-xs flex items-center gap-1.5 transition active:scale-[0.98]"
            >
              <Volume2 size={15} className="text-[#B58A35]" />

              <span className="hidden sm:inline">
                {t("voiceHelpBtn")}
              </span>
            </button>
          )}

          <LanguageToggle />

          {user ? (
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-[#19343A]">
                  {user.name}
                </span>

                <div className="flex items-center gap-1.5 justify-end mt-0.5">
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-bold ${
                      user.role === "admin"
                        ? "bg-[#F1EBF6] text-[#75658F]"
                        : user.role === "officer"
                        ? "bg-[#EAF2E9] text-[#285C3A]"
                        : "bg-[#EAF2E9] text-[#285C3A]"
                    }`}
                  >
                    {user.role}
                  </span>

                  {user.mandi && (
                    <span className="text-[10px] font-semibold text-[#687779] bg-[#F8F7F2] border border-[#E1E4DE] px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                      <MapPin
                        size={10}
                        className="text-[#B58A35]"
                      />

                      {user.mandi}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={onLogout}
                className="px-3.5 py-1.5 bg-[#FAEEEE] text-[#A64B4B] hover:bg-[#F6E3E3] rounded-lg text-xs font-semibold transition border border-[#E8C9C9] active:scale-[0.98]"
              >
                {t("logout")}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth("login", "farmer")}
                className="px-3.5 py-1.5 border border-[#DCE3DB] rounded-lg text-xs font-semibold text-[#19343A] hover:bg-[#F8F7F2] transition"
              >
                {t("loginBtn")}
              </button>

              <button
                onClick={() => onOpenAuth("register", "farmer")}
                className="px-4 py-1.5 bg-[#285C3A] hover:bg-[#214D31] text-white rounded-lg text-xs font-semibold transition shadow-sm"
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