import React, { useState } from "react";
import MandiTrackLogo from "../components/MandiTrackLogo";
import ProcessFlowCard from "../components/common/ProcessFlowCard";
import AskMandiTrackCard from "../components/common/AskMandiTrackCard";
import { useLang } from "../context/LanguageContext";
import {
  ShieldCheck,
  Package,
  Scale,
  CreditCard,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  Menu,
  X,
  Phone,
  Mail,
  Sparkles,
  BarChart3,
} from "lucide-react";

export default function LandingPage({
  onNavigateToLogin,
  onNavigateToRegister,
  onOpenVoiceModal,
}) {
  const { lang, setLang } = useLang();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLoginClick = (role = "farmer") => {
    if (onNavigateToLogin) onNavigateToLogin(role);
  };

  const handleRegisterClick = () => {
    if (onNavigateToRegister) onNavigateToRegister("farmer");
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-900 antialiased selection:bg-amber-200">
      {/* =========================================================
          TOP NAVIGATION BAR (DARK NAVY MATCHING SIDEBAR)
      ========================================================= */}
      <header className="sticky top-0 z-40 bg-[#0C192C] text-white border-b border-slate-800 shadow-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="text-left focus:outline-none"
          >
            <MandiTrackLogo variant="light" subtitle="Apala Mandi Saathi" size="md" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-300">
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-white transition py-1 text-[#EA8F0B]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="hover:text-white transition py-1"
            >
              Mandi Process Flow
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-white transition py-1"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("prices")}
              className="hover:text-white transition py-1"
            >
              APMC Rates
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-white transition py-1"
            >
              Help & Support
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switch */}
            <div className="bg-slate-800/80 p-0.5 rounded-xl flex items-center border border-slate-700 text-xs font-bold">
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-lg transition ${
                  lang === "en"
                    ? "bg-[#EA8F0B] text-[#0C192C] font-black"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("mr")}
                className={`px-2.5 py-1 rounded-lg transition ${
                  lang === "mr"
                    ? "bg-[#EA8F0B] text-[#0C192C] font-black"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                मराठी
              </button>
            </div>

            <button
              onClick={() => handleLoginClick("officer")}
              className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-xl transition"
            >
              Officer Portal
            </button>

            <button
              onClick={() => handleLoginClick("farmer")}
              className="px-4 py-2 rounded-xl bg-[#EA8F0B] hover:bg-[#d47f06] text-[#0C192C] font-black text-xs shadow-md transition active:scale-95 flex items-center gap-1.5"
            >
              <span>Sign In</span>
              <ArrowRight size={13} strokeWidth={2.5} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#0C192C] px-5 py-4 space-y-3 text-xs font-bold text-slate-200 animate-fadeIn">
            <button
              onClick={() => scrollToSection("process")}
              className="block w-full text-left py-2 hover:text-[#EA8F0B]"
            >
              Mandi Process Flow
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left py-2 hover:text-[#EA8F0B]"
            >
              Services & Benefits
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left py-2 hover:text-[#EA8F0B]"
            >
              Helpline & Contact
            </button>
            <div className="pt-3 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  handleLoginClick("farmer");
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#EA8F0B] text-[#0C192C] font-black text-center"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  handleRegisterClick();
                }}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-white font-bold text-center"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================
          HERO SECTION MATCHING DASHBOARD DESIGN
      ========================================================= */}
      <section id="hero" className="relative pt-8 pb-12 sm:pb-16 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          {/* Top Banner Tagline */}
          <div className="mb-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-800 border border-emerald-200">
                Govt. of Maharashtra Initiative
              </span>
              <span className="text-xs font-bold text-slate-500">
                Maharashtra State Agricultural Marketing Board (MSAMB)
              </span>
            </div>
            <div className="text-emerald-900 font-extrabold text-sm sm:text-base font-serif italic">
              "चांगला दर, चांगली शेती, समृद्ध शेतकरी"
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[#B86200] text-xs font-black">
                <Sparkles size={14} className="text-[#EA8F0B]" />
                Transparent Produce Flow from Entry to Settlement
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0C192C] leading-tight tracking-tight">
                Empowering Farmers with Fair, Digital & Transparent{" "}
                <span className="text-[#EA8F0B] underline decoration-emerald-500 decoration-4 underline-offset-4">
                  Mandi Operations
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl">
                Track your agricultural produce in real-time through all 8 APMC checkpoints: from gate entry and quality assaying to open auction, electronic weighing, and same-day direct bank payments.
              </p>

              {/* Action Buttons matching reference */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleLoginClick("farmer")}
                  className="px-6 py-3.5 rounded-2xl bg-[#EA8F0B] hover:bg-[#d47f06] text-[#0C192C] font-black text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center gap-2"
                >
                  <span>Farmer Portal Sign In</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>

                <button
                  onClick={handleRegisterClick}
                  className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 shadow-xs transition active:scale-95"
                >
                  New Producer Registration
                </button>
              </div>

              {/* Quick Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/80">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900">10,000+</div>
                  <div className="text-[11px] font-bold text-slate-500 mt-0.5">Farmers Enrolled</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-700">100%</div>
                  <div className="text-[11px] font-bold text-slate-500 mt-0.5">Weighing Transparency</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#EA8F0B]">50+ Mandis</div>
                  <div className="text-[11px] font-bold text-slate-500 mt-0.5">Live APMC Terminals</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card + Live Journey Card */}
            <div className="lg:col-span-6 space-y-4">
              {/* Agricultural Painted Banner Illustration */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md h-64 sm:h-80 group">
                <img
                  src="/banner_art.jpg"
                  alt="Mandi Agriculture Landscape"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C192C]/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      Live APMC Connectivity
                    </span>
                    <div className="text-lg font-black leading-tight">
                      Standardized Operations across Maharashtra Mandis
                    </div>
                    <div className="text-xs text-slate-300 font-semibold">
                      Pune &bull; Navi Mumbai &bull; Nashik &bull; Thane &bull; Nagpur
                    </div>
                  </div>
                </div>
              </div>

              {/* Process Flow Card matching master reference */}
              <ProcessFlowCard
                currentStage="Queue"
                currentStageIndex={1}
                onViewAll={() => handleLoginClick("farmer")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION: MANDI JOURNEY WALKTHROUGH
      ========================================================= */}
      <section id="process" className="py-12 bg-white border-y border-slate-200/90">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-[#EA8F0B] border border-amber-200 uppercase tracking-wider">
              Standard 8-Stage APMC Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How Your Harvest Moves Through the Mandi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Every phase is recorded electronically, preventing under-weighing, delayed payments, and unrecorded commissions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                1
              </div>
              <h3 className="text-sm font-black text-slate-900">Token & Gate Entry</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Generate your digital token from your phone. Scan upon vehicle entry for orderly queue lane allocation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black">
                2
              </div>
              <h3 className="text-sm font-black text-slate-900">Quality Assaying</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                APMC inspectors verify crop moisture, size uniformity, and issue official Grade A/B/C certification.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black">
                3
              </div>
              <h3 className="text-sm font-black text-slate-900">Transparent Auction</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Open competitive bidding by licensed commission agents. Highest bid confirmed on the spot.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
                4
              </div>
              <h3 className="text-sm font-black text-slate-900">Weigh & Direct Payout</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Electronic weighbridge slip with auto-tare calculation. Instant payment transfer via UPI or NEFT.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION: APMC SERVICES & NEED HELP CARD
      ========================================================= */}
      <section id="features" className="py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                  Mandi Saathi Core Services
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                  Built for Maharashtra's Farming Community
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Complete tools designed to make every mandi visit reliable, dignified, and fast.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#EA8F0B] flex items-center justify-center">
                    <Scale size={20} />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">Electronic Weight Slips</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Digital weight certificates saved directly to your profile, eliminating dispute and manual tampering.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <BarChart3 size={20} />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">Agmarknet Price Feeds</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Live daily modal, minimum and maximum commodity rates from official government agricultural terminals.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">Live Vehicle Queue Status</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Know your position in the vehicle unloading queue and estimated waiting time before you arrive.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <CreditCard size={20} />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">Direct Payment Receipts</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Transparent commission deductions and verifiable UPI bank reference numbers upon settlement.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Ask MandiTrack Voice Card Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎙️</span>
                  <h3 className="text-base font-black text-slate-900">
                    Bilingual Voice Assistance
                  </h3>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Ask questions in <strong>Marathi (मराठी)</strong> or <strong>English</strong> directly using speech. Perfect for quick rate inquiries while in the field.
                </p>
                <AskMandiTrackCard onOpenFullVoiceModal={onOpenVoiceModal} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER (DARK NAVY WITH MAHARASHTRA GOVERNMENT BRANDING)
      ========================================================= */}
      <footer id="contact" className="bg-[#0C192C] text-white border-t border-slate-800 pt-12 pb-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-3">
              <MandiTrackLogo variant="light" subtitle="Apala Mandi Saathi" size="md" />
              <p className="text-xs text-slate-400 max-w-md font-medium leading-relaxed">
                An initiative of the Department of Agricultural Marketing, Government of Maharashtra, and the Maharashtra State Agricultural Marketing Board (MSAMB).
              </p>
              <div className="text-emerald-300 font-serif italic text-sm pt-2">
                "शेतकऱ्यांचा विश्वास, मंडीचा विकास"
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-extrabold uppercase tracking-wider text-slate-300">
                APMC Market Links
              </h4>
              <ul className="space-y-1.5 text-slate-400 font-medium">
                <li><button onClick={() => handleLoginClick("farmer")} className="hover:text-white">Pune APMC Terminal</button></li>
                <li><button onClick={() => handleLoginClick("farmer")} className="hover:text-white">Navi Mumbai APMC</button></li>
                <li><button onClick={() => handleLoginClick("farmer")} className="hover:text-white">Nashik APMC Market</button></li>
                <li><button onClick={() => handleLoginClick("farmer")} className="hover:text-white">Thane APMC Terminal</button></li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-extrabold uppercase tracking-wider text-slate-300">
                Helpline & Desk
              </h4>
              <div className="space-y-1.5 text-slate-400 font-medium">
                <a href="tel:18002330244" className="block hover:text-amber-400">Toll-Free: 1800-233-0244</a>
                <a href="tel:+91 8010558094" className="block hover:text-amber-400">APMC Desk: +91 80105 58094</a>
                <a href="mailto:yadneshgharat23@gmail.cp" className="block hover:text-amber-400">yadneshgharat23@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-medium">
            <div>
              &copy; {new Date().getFullYear()} MandiTrack &bull; Government of Maharashtra. All Rights Reserved.
            </div>
            <div className="flex items-center gap-3">
              <span>Privacy Policy</span>
              <span>&bull;</span>
              <span>Terms of Service</span>
              <span>&bull;</span>
              <span>e-NAM Integration</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}