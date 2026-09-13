import React, { useState } from "react";
import { getTranslation } from "../utils/translations";

function LanguageSelection({ currentLang, onConfirmLanguage }) {
  const [selected, setSelected] = useState(currentLang || "en");
  const t = (key) => getTranslation(selected, key);

  const handleContinue = () => {
    localStorage.setItem("manditrack_language", selected);
    onConfirmLanguage(selected);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden animate-fadeIn">
        {/* Header Branding */}
        <div className="bg-gradient-to-b from-green-800 to-green-700 p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xs rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 border border-white/20 shadow-xs">
            🌱
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            MandiTrack
          </h1>
          <p className="text-xs text-green-100 mt-1 font-medium">
            {t("portalSubtitle")}
          </p>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              {t("chooseLanguage")}
            </h2>
            <p className="text-xs text-slate-500">
              {t("chooseLanguageSub")}
            </p>
          </div>

          {/* Language Options Cards */}
          <div className="space-y-3">
            {/* English Card */}
            <button
              type="button"
              onClick={() => setSelected("en")}
              className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                selected === "en"
                  ? "border-green-600 bg-green-50/60 ring-4 ring-green-600/15"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  selected === "en" ? "bg-green-700 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  EN
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-base">English</div>
                  <div className="text-xs text-slate-500">Continue in English</div>
                </div>
              </div>
              {selected === "en" && (
                <div className="w-6 h-6 rounded-full bg-green-700 text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
              )}
            </button>

            {/* Marathi Card */}
            <button
              type="button"
              onClick={() => setSelected("mr")}
              className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                selected === "mr"
                  ? "border-green-600 bg-green-50/60 ring-4 ring-green-600/15"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  selected === "mr" ? "bg-green-700 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  मरा
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-base">मराठी</div>
                  <div className="text-xs text-slate-500">मराठी भाषेत पुढे जा</div>
                </div>
              </div>
              {selected === "mr" && (
                <div className="w-6 h-6 rounded-full bg-green-700 text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
              )}
            </button>
          </div>

          {/* Action Button */}
          <button
            onClick={handleContinue}
            className="w-full py-3.5 bg-green-700 hover:bg-green-800 active:scale-98 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
          >
            {t("continueBtn")} &rarr;
          </button>
        </div>

        {/* Footer info */}
        <div className="px-6 py-4 bg-slate-50 border-t text-center text-xs text-slate-400">
          {t("prototypeBadge")}
        </div>
      </div>
    </div>
  );
}

export default LanguageSelection;
