import React, { useState } from "react";
import { ArrowRight, Globe2, Check } from "lucide-react";

function LanguageSelection({ currentLang = "en" }) {
  const [selectedLanguage, setSelectedLanguage] = useState(
    currentLang === "mr" ? "mr" : "en"
  );

  const handleContinue = () => {
    const language = selectedLanguage === "mr" ? "mr" : "en";

    console.log("MandiTrack language selected:", language);

    // Save selected language
    localStorage.setItem("manditrack_language", language);

    // Reload application.
    // App.jsx will read manditrack_language and open
    // the landing page automatically.
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F4EFDF] text-[#16283A] flex flex-col">

      {/* Header */}
      <header className="bg-[#0E2A3F] text-white">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold">
              MandiTrack
            </h1>

            <p className="text-xs text-white/55 mt-1">
              Apala Mandi Saathi
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/70">
            <Globe2 size={18} />
            <span>Language</span>
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-5 py-12">

        <div className="w-full max-w-[760px]">

          <div className="text-center">

            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#7B806D]">
              MandiTrack
            </p>

            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-[#0A2131]">
              Choose your language
            </h2>

            <p className="mt-3 text-base text-[#5B6B78]">
              आपली भाषा निवडा
            </p>

          </div>

          {/* Language cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* English */}
            <button
              type="button"
              onClick={() => setSelectedLanguage("en")}
              className={`relative text-left bg-white rounded-2xl border-2 p-7 sm:p-8 transition-all ${
                selectedLanguage === "en"
                  ? "border-[#0E2A3F] shadow-lg"
                  : "border-[#DED7C7] hover:border-[#9C998F]"
              }`}
            >
              {selectedLanguage === "en" && (
                <div className="absolute top-5 right-5 w-7 h-7 rounded-full bg-[#0E2A3F] text-white flex items-center justify-center">
                  <Check size={15} strokeWidth={3} />
                </div>
              )}

              <div className="w-14 h-14 rounded-xl bg-[#EEF3F6] flex items-center justify-center">
                <span className="text-lg font-bold text-[#0E2A3F]">
                  EN
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#0E2A3F]">
                English
              </h3>

              <p className="mt-2 text-sm text-[#687887]">
                Continue using MandiTrack in English.
              </p>
            </button>

            {/* Marathi */}
            <button
              type="button"
              onClick={() => setSelectedLanguage("mr")}
              className={`relative text-left bg-white rounded-2xl border-2 p-7 sm:p-8 transition-all ${
                selectedLanguage === "mr"
                  ? "border-[#0E2A3F] shadow-lg"
                  : "border-[#DED7C7] hover:border-[#9C998F]"
              }`}
            >
              {selectedLanguage === "mr" && (
                <div className="absolute top-5 right-5 w-7 h-7 rounded-full bg-[#0E2A3F] text-white flex items-center justify-center">
                  <Check size={15} strokeWidth={3} />
                </div>
              )}

              <div className="w-14 h-14 rounded-xl bg-[#F6EDDB] flex items-center justify-center">
                <span className="text-xl font-bold text-[#0E2A3F]">
                  अ
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#0E2A3F]">
                मराठी
              </h3>

              <p className="mt-2 text-sm text-[#687887]">
                MandiTrack मराठीमध्ये वापरा.
              </p>
            </button>

          </div>

          {/* Continue */}
          <div className="mt-8 flex justify-center">

            <button
              type="button"
              onClick={handleContinue}
              className="w-full sm:w-[260px] bg-[#0E2A3F] hover:bg-[#092235] text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition cursor-pointer"
            >
              Continue
              <ArrowRight size={18} />
            </button>

          </div>

          <p className="mt-5 text-center text-xs text-[#7B8792]">
            You can change your language later from the application.
          </p>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A2131] text-white/60 py-5">
        <div className="max-w-[1200px] mx-auto px-6 text-center text-xs">
          MandiTrack — Apala Mandi Saathi
        </div>
      </footer>

    </div>
  );
}

export default LanguageSelection;