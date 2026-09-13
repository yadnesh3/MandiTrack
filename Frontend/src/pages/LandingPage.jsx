import React from "react";

function LandingPage({ onNavigateToLogin, onNavigateToRegister }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      {/* Header Matching Panel 1 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 bg-green-700 rounded-xl flex items-center justify-center text-white text-lg font-extrabold shadow-xs">
              🌱
            </div>
            <span className="text-2xl font-extrabold text-green-800 tracking-tight">
              MandiTrack
            </span>
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#home" className="text-green-800 font-bold border-b-2 border-green-700 py-1">Home</a>
            <a href="#about" className="hover:text-green-800 transition-colors">About</a>
            <a href="#features" className="hover:text-green-800 transition-colors">Features</a>
            <a href="#contact" className="hover:text-green-800 transition-colors">Contact</a>
          </nav>

          {/* Language Toggle Pill */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs font-bold">
            <span className="px-3 py-1 rounded-lg bg-green-700 text-white shadow-xs">EN</span>
            <span className="px-3 py-1 rounded-lg text-slate-500 cursor-not-allowed">मराठी</span>
          </div>
        </div>
      </header>

      {/* Hero Section Matching Panel 1 */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 md:py-16 flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Track your produce <br className="hidden sm:inline" />
              <span className="text-green-800">from entry to payment</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-xl">
              A simple and transparent platform for farmers and market officers.
            </p>

            {/* Main Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigateToLogin("farmer")}
                className="px-7 py-4 bg-green-700 hover:bg-green-800 active:scale-98 text-white font-bold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
              >
                <span className="text-xl">👨‍🌾</span> Farmer Login
              </button>

              <button
                onClick={() => onNavigateToLogin("officer")}
                className="px-7 py-4 bg-blue-700 hover:bg-blue-800 active:scale-98 text-white font-bold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
              >
                <span className="text-xl">🏛️</span> Officer Login
              </button>
            </div>
          </div>

          {/* Hero Right Visual Graphic Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-tr from-green-800 via-green-700 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden border border-green-600/30 space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-green-100 border border-white/20">
                  🌱 APMC Mandi Portal
                </span>
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
              </div>

              <div className="py-6 text-center space-y-3">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-5xl mx-auto border-2 border-white/30 shadow-inner">
                  🌾
                </div>
                <h3 className="text-2xl font-bold text-white tracking-wide">
                  Empowering Indian Farmers
                </h3>
                <p className="text-xs text-green-100/90 leading-relaxed px-2">
                  Real-time lot submission, queue tracking, and direct mandi officer approvals.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/20 text-center">
                <div className="bg-black/10 backdrop-blur-xs p-2.5 rounded-xl">
                  <div className="text-xl font-extrabold text-white">Direct</div>
                  <div className="text-[10px] text-green-200 uppercase font-semibold">Queue Tracking</div>
                </div>
                <div className="bg-black/10 backdrop-blur-xs p-2.5 rounded-xl">
                  <div className="text-xl font-extrabold text-white">Verified</div>
                  <div className="text-[10px] text-green-200 uppercase font-semibold">APMC Rates</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Bar Matching Panel 1 */}
        <div className="mt-14 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center text-lg font-bold shrink-0">
                📈
              </div>
              <div className="font-bold text-slate-800 text-xs sm:text-sm">
                Better Market Access
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center text-lg font-bold shrink-0">
                📋
              </div>
              <div className="font-bold text-slate-800 text-xs sm:text-sm">
                Transparent Process
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center text-lg font-bold shrink-0">
                ⚖️
              </div>
              <div className="font-bold text-slate-800 text-xs sm:text-sm">
                Fair Prices
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center text-lg font-bold shrink-0">
                🤝
              </div>
              <div className="font-bold text-slate-800 text-xs sm:text-sm">
                Support for Farmers
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer Matching Panel 1 */}
      <footer className="bg-green-950 text-green-200 text-xs py-4 px-4 sm:px-6 border-t border-green-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            MandiTrack — A step towards a stronger farming community
          </div>
          <div className="text-green-400/80 font-mono">
            Prototype | Built for a Better Tomorrow
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
