import React, { useState } from "react";
import {
  ArrowRight,
  Globe2,
  Check,
  Languages,
} from "lucide-react";

function LanguageSelection({ currentLang = "en" }) {
  const [selectedLanguage, setSelectedLanguage] = useState(
    currentLang === "mr" ? "mr" : "en"
  );

  const handleContinue = () => {
    const language = selectedLanguage === "mr" ? "mr" : "en";

    console.log("MandiTrack language selected:", language);

    // Save selected language
    localStorage.setItem("manditrack_lang", language);

    // Reload application
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#19343A] flex flex-col">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-[#DCE3DB] bg-[#214D31] text-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <span className="text-lg font-bold text-[#B58A35]">
                M
              </span>
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                Mandi<span className="text-[#B58A35]">Track</span>
              </h1>

              <p className="mt-0.5 text-[10px] font-medium text-white/65">
                Apala Mandi Saathi
              </p>
            </div>
          </div>

          {/* Language indicator */}
          <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white/80">
            <Globe2 size={15} />
            <span>Language</span>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="flex flex-1 items-center justify-center px-5 py-12 sm:py-16">
        <div className="w-full max-w-[760px]">
          {/* Heading */}
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#DCE3DB] bg-white text-[#285C3A] shadow-sm">
              <Languages size={22} />
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#B58A35]">
              MandiTrack
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#19343A] sm:text-4xl">
              Choose your language
            </h2>

            <p className="mt-2 text-sm font-medium text-[#687779]">
              आपली भाषा निवडा
            </p>
          </div>

          {/* =====================================================
              LANGUAGE CARDS
          ====================================================== */}

          <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* English */}
            <button
              type="button"
              onClick={() => setSelectedLanguage("en")}
              className={`relative rounded-xl border bg-white p-6 text-left transition-all sm:p-7 ${
                selectedLanguage === "en"
                  ? "border-[#285C3A] shadow-md ring-1 ring-[#285C3A]/10"
                  : "border-[#DCE3DB] shadow-sm hover:border-[#B9C8BC] hover:shadow-md"
              }`}
            >
              {selectedLanguage === "en" && (
                <div className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-[#285C3A] text-white">
                  <Check size={15} strokeWidth={3} />
                </div>
              )}

              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#EAF2E9]">
                <span className="text-sm font-bold text-[#285C3A]">
                  EN
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#19343A]">
                English
              </h3>

              <p className="mt-1.5 max-w-xs text-xs leading-5 text-[#687779]">
                Continue using MandiTrack in English.
              </p>

              <div
                className={`mt-5 h-1 w-10 rounded-full transition-all ${
                  selectedLanguage === "en"
                    ? "bg-[#B58A35]"
                    : "bg-[#E1E4DE]"
                }`}
              />
            </button>

            {/* Marathi */}
            <button
              type="button"
              onClick={() => setSelectedLanguage("mr")}
              className={`relative rounded-xl border bg-white p-6 text-left transition-all sm:p-7 ${
                selectedLanguage === "mr"
                  ? "border-[#285C3A] shadow-md ring-1 ring-[#285C3A]/10"
                  : "border-[#DCE3DB] shadow-sm hover:border-[#B9C8BC] hover:shadow-md"
              }`}
            >
              {selectedLanguage === "mr" && (
                <div className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-[#285C3A] text-white">
                  <Check size={15} strokeWidth={3} />
                </div>
              )}

              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F5EFDE]">
                <span className="text-lg font-bold text-[#80672C]">
                  अ
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#19343A]">
                मराठी
              </h3>

              <p className="mt-1.5 max-w-xs text-xs leading-5 text-[#687779]">
                MandiTrack मराठीमध्ये वापरा.
              </p>

              <div
                className={`mt-5 h-1 w-10 rounded-full transition-all ${
                  selectedLanguage === "mr"
                    ? "bg-[#B58A35]"
                    : "bg-[#E1E4DE]"
                }`}
              />
            </button>
          </div>

          {/* =====================================================
              CONTINUE
          ====================================================== */}

          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={handleContinue}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#285C3A] px-8 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#214D31] active:scale-[0.99] sm:w-[260px]"
            >
              Continue
              <ArrowRight size={17} />
            </button>
          </div>

          <p className="mt-4 text-center text-[10px] font-medium text-[#8A9695]">
            You can change your language later from the application.
          </p>
        </div>
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-[#DCE3DB] bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-4 text-center text-[10px] font-medium text-[#8A9695] sm:px-6">
          MandiTrack — Apala Mandi Saathi
        </div>
      </footer>
    </div>
  );
}

export default LanguageSelection;