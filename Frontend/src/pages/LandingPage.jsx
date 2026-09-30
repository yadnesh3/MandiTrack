import React, { useState, useEffect } from "react";
import { useLang } from "../context/LanguageContext";
import MandiTrackLogo from "../components/MandiTrackLogo";

import {
  Menu,
  X,
  ArrowRight,
  Sprout,
  ClipboardList,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  Mic,
  Scale,
  Clock3,
  CreditCard,
  HelpCircle,
  UserRound,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function LandingPage({
  onNavigateToLogin,
  onNavigateToRegister,
  onOpenVoiceModal,
}) {
  const { lang, setLang } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  const isMarathi = lang === "mr";

  // Track scroll position to update active navbar item dynamically
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["support", "prices", "features", "workflow", "home"];
      const scrollY = window.scrollY + 160;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          setActiveNav(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Scroll-reveal via IntersectionObserver ──────────────────
  useEffect(() => {
    const classes = [".reveal", ".reveal-left", ".reveal-right", ".reveal-zoom"];
    const targets = document.querySelectorAll(classes.join(","));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleLogin = (role = "farmer") => {
    if (onNavigateToLogin) {
      onNavigateToLogin(role);
    }
  };

  const handleRegister = () => {
    if (onNavigateToRegister) {
      onNavigateToRegister("farmer");
    }
  };

  const handleVoice = () => {
    if (onOpenVoiceModal) {
      onOpenVoiceModal();
    }
  };

  const scrollTo = (id) => {
    setActiveNav(id);
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMobileMenuOpen(false);
  };

  const t = {
    home: isMarathi ? "मुख्यपृष्ठ" : "Home",
    workflow: isMarathi ? "कसे कार्य करते" : "How It Works",
    features: isMarathi ? "वैशिष्ट्ये" : "Features",
    prices: isMarathi ? "मंडी भाव" : "Mandi Prices",
    about: isMarathi ? "आमच्याबद्दल" : "About",
    support: isMarathi ? "मदत व सहाय्य" : "Help & Support",

    login: isMarathi ? "लॉगिन" : "Login",
    register: isMarathi ? "नोंदणी करा" : "Register",
    farmerLogin: isMarathi ? "शेतकरी लॉगिन" : "Farmer Login",
    registerFarmer: isMarathi
      ? "शेतकरी म्हणून नोंदणी"
      : "Register as Farmer",

    heroBadge: isMarathi
      ? "कृषी बाजारासाठी डिजिटल प्लॅटफॉर्म"
      : "Digital platform for agricultural markets",

    heroTitle1: isMarathi
      ? "मंडी व्यवहार"
      : "Mandi operations",

    heroTitle2: isMarathi
      ? "सोपे बनवा."
      : "made simple.",

    heroDescription: isMarathi
      ? "शेतकऱ्यांना पीक जमा करणे, लॉटचा मागोवा घेणे आणि मंडी बाजाराची माहिती मिळवण्यासाठी एक सोपा डिजिटल प्लॅटफॉर्म."
      : "A simple digital platform for farmers to submit produce, track lots and access mandi market information in one place.",

    trustLine: isMarathi
      ? "शेतकरी आणि मंडी अधिकाऱ्यांसाठी सोपी कार्यपद्धती."
      : "Simple workflow designed for farmers and mandi officers.",

    dashboard: isMarathi ? "शेतकरी डॅशबोर्ड" : "Farmer Dashboard",
    overview: isMarathi ? "तुमच्या लॉटचा आढावा" : "Your Lot Overview",
    active: isMarathi ? "सक्रिय" : "Active",
    totalLots: isMarathi ? "एकूण लॉट" : "Total Lots",
    pending: isMarathi ? "प्रलंबित" : "Pending",
    sold: isMarathi ? "विकलेले" : "Sold",
    produce: isMarathi ? "पीक" : "Produce",
    quantity: isMarathi ? "प्रमाण" : "Quantity",
    status: isMarathi ? "स्थिती" : "Status",
    wheat: isMarathi ? "गहू" : "Wheat",
    onion: isMarathi ? "कांदा" : "Onion",
    puneMandi: isMarathi ? "पुणे मंडी" : "Pune Mandi",
    nashikMandi: isMarathi ? "नाशिक मंडी" : "Nashik Mandi",
    approved: isMarathi ? "मंजूर" : "Approved",
    trackSubmitted: isMarathi
      ? "तुमच्या जमा केलेल्या उत्पादनाचा प्रत्येक स्थिती बदल पाहा."
      : "Track your submitted produce through every status update.",

    workflowLabel: isMarathi ? "सोपी कार्यपद्धती" : "Simple workflow",
    workflowTitle: isMarathi
      ? "उत्पादनापासून स्थितीपर्यंत"
      : "From produce to status",
    workflowDescription: isMarathi
      ? "MandiTrack शेतकरी आणि अधिकाऱ्यांसाठी प्रक्रिया सोपी ठेवते."
      : "MandiTrack keeps the process straightforward for farmers and officers.",

    submitProduce: isMarathi ? "उत्पादन जमा करा" : "Submit Produce",
    submitDescription: isMarathi
      ? "पीक, प्रमाण, मंडी आणि अपेक्षित किंमत भरा."
      : "Enter your crop, quantity, mandi and expected price.",

    officerReview: isMarathi ? "अधिकारी तपासणी" : "Officer Review",
    officerDescription: isMarathi
      ? "तुमच्या लॉटची तपासणी करून त्याची स्थिती अपडेट केली जाते."
      : "Your lot is reviewed and its status is updated.",

    trackStatus: isMarathi ? "स्थितीचा मागोवा" : "Track Status",
    trackDescription: isMarathi
      ? "तुमच्या डॅशबोर्डवर लॉटची स्थिती कधीही पाहा."
      : "View your lot status anytime from your dashboard.",

    platformFeatures: isMarathi
      ? "प्लॅटफॉर्म वैशिष्ट्ये"
      : "Platform features",

    featureTitle: isMarathi
      ? "आवश्यक सुविधा एका ठिकाणी"
      : "Everything you need in one place",

    featureDescription: isMarathi
      ? "शेतकरी आणि मंडी अधिकाऱ्यांच्या दैनंदिन गरजा लक्षात घेऊन तयार केलेले."
      : "Designed around the everyday needs of farmers and mandi officers.",

    addProduce: isMarathi ? "उत्पादन जमा करा" : "Add Produce",
    addProduceText: isMarathi
      ? "पीक आणि लॉटची माहिती डिजिटल पद्धतीने जमा करा."
      : "Submit crop and lot details digitally.",

    lotTracking: isMarathi ? "लॉट ट्रॅकिंग" : "Lot Tracking",
    lotTrackingText: isMarathi
      ? "जमा केल्यापासून लॉटची स्थिती पाहा."
      : "Follow your lot status from submission onward.",

    mandiPrices: isMarathi ? "मंडी भाव" : "Mandi Prices",
    mandiPricesText: isMarathi
      ? "उपलब्ध कृषी बाजारभावाची माहिती मिळवा."
      : "Access available agricultural market prices.",

    languages: isMarathi ? "मराठी आणि इंग्रजी" : "English & Marathi",
    languagesText: isMarathi
      ? "तुमच्या पसंतीच्या भाषेत प्लॅटफॉर्म वापरा."
      : "Access the platform in your preferred language.",

    officerPortal: isMarathi ? "अधिकारी पोर्टल" : "Officer Portal",
    officerPortalText: isMarathi
      ? "लॉट तपासा आणि त्याची स्थिती अपडेट करा."
      : "Review lots and update their status.",

    voiceAssistant: isMarathi ? "व्हॉइस असिस्टंट" : "Voice Assistant",
    voiceAssistantText: isMarathi
      ? "आवाजाद्वारे समर्थित MandiTrack सुविधा वापरा."
      : "Use supported MandiTrack actions through voice.",

    marketLabel: isMarathi
      ? "मंडी बाजार माहिती"
      : "Mandi market information",

    marketTitle: isMarathi
      ? "मंडीच्या उपलब्ध बाजारभावाची माहिती मिळवा."
      : "Stay informed about mandi prices.",

    marketDescription: isMarathi
      ? "उपलब्ध बाजार माहितीच्या आधारे शेतकऱ्यांना त्यांच्या उत्पादनाबद्दल अधिक माहितीपूर्ण निर्णय घेण्यास मदत होते."
      : "A simple market-information section helps farmers understand available commodity rates before making decisions.",

    commodity: isMarathi ? "शेतमाल" : "Commodity",
    mandi: isMarathi ? "मंडी" : "Mandi",
    availability: isMarathi ? "उपलब्धता" : "Availability",
    available: isMarathi ? "उपलब्ध" : "Available",
    marketNote: isMarathi
      ? "बाजारभाव तुमच्या कॉन्फिगर केलेल्या डेटा स्रोतावरून प्रदर्शित केले जातील."
      : "Market rates are displayed through the configured market data source.",

    viewPrices: isMarathi ? "मंडी भाव पहा" : "View Mandi Prices",

    voiceLabel: isMarathi ? "व्हॉइस असिस्टंट" : "Voice Assistant",

    voiceTitle: isMarathi
      ? "मराठी किंवा इंग्रजीमध्ये MandiTrack ला विचारा."
      : "Ask MandiTrack in English or Marathi.",

    voiceDescription: isMarathi
      ? "आवाजाच्या आदेशांचा वापर करून समर्थित MandiTrack सुविधा आणि माहिती पटकन मिळवा."
      : "Quickly access supported MandiTrack actions and information using voice commands.",

    voiceOpen: isMarathi
      ? "व्हॉइस असिस्टंट उघडा"
      : "Open Voice Assistant",

    aboutLabel: "MandiTrack",

    aboutTitle: isMarathi
      ? "मंडी व्यवहार व्यवस्थापित करण्याचा सोपा मार्ग."
      : "A simpler way to manage mandi operations.",

    aboutText: isMarathi
      ? "उत्पादन जमा करणे, लॉट ट्रॅकिंग आणि कृषी बाजार माहिती एका प्लॅटफॉर्मवर."
      : "One platform for produce submission, lot tracking and agricultural market information.",

    getStarted: isMarathi ? "सुरुवात करा" : "Get Started",

    supportTitle: isMarathi
      ? "मदत आणि सहाय्य"
      : "Help & Support",

    supportText: isMarathi
      ? "MandiTrack वापरताना मदत हवी असल्यास संबंधित पोर्टल निवडा."
      : "Need help using MandiTrack? Choose the portal relevant to you.",

    farmerSupport: isMarathi ? "शेतकरी सहाय्य" : "Farmer Support",
    officerSupport: isMarathi ? "अधिकारी सहाय्य" : "Officer Support",

    footerTagline: isMarathi
      ? "सोपे. पारदर्शक. डिजिटल."
      : "Simple. Transparent. Digital.",
  };

  return (
    <div
      className="min-h-screen bg-[#F8F7F2] text-[#19343A]"
      style={{
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 bg-[#285C3A] border-b border-[#214D31] shadow-[0_2px_12px_rgba(0,0,0,0.18)]">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex items-center shrink-0"
            aria-label="MandiTrack Home"
          >
            <MandiTrackLogo variant="light" size={62} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <NavButton active={activeNav === "home"} onClick={() => scrollTo("home")}>{t.home}</NavButton>
            <NavButton active={activeNav === "workflow"} onClick={() => scrollTo("workflow")}>{t.workflow}</NavButton>
            <NavButton active={activeNav === "features"} onClick={() => scrollTo("features")}>{t.features}</NavButton>
            <NavButton active={activeNav === "prices"} onClick={() => scrollTo("prices")}>{t.prices}</NavButton>
            <NavButton active={activeNav === "support"} onClick={() => scrollTo("support")}>{t.support}</NavButton>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "mr" : "en")}
              className="mr-1 flex items-center gap-1.5 border-r border-white/20 px-4 text-[13px] font-medium text-white/80 hover:text-white transition"
            >
              <Globe2 size={15} />
              {lang === "en" ? "English" : "मराठी"}
            </button>

            <button
              type="button"
              onClick={() => handleLogin("officer")}
              className="text-[13px] font-medium text-white/80 transition hover:text-white"
            >
              {t.officerPortal}
            </button>

            <button
              type="button"
              onClick={() => handleLogin("farmer")}
              className="rounded-lg border border-white/60 px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-white/10 hover:border-white"
            >
              {t.login}
            </button>

            <button
              type="button"
              onClick={handleRegister}
              className="rounded-lg bg-white px-5 py-2.5 text-[13px] font-semibold text-[#285C3A] transition hover:bg-[#F0F7F0] shadow-sm"
            >
              {t.register}
            </button>
          </div>

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="rounded-lg border border-white/30 p-2 lg:hidden hover:bg-white/10 transition text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-white/15 bg-[#214D31] px-5 py-5 lg:hidden">
            <div className="mx-auto flex max-w-[1280px] flex-col gap-1">
              <MobileNavButton active={activeNav === "home"} onClick={() => scrollTo("home")}>{t.home}</MobileNavButton>
              <MobileNavButton active={activeNav === "workflow"} onClick={() => scrollTo("workflow")}>{t.workflow}</MobileNavButton>
              <MobileNavButton active={activeNav === "features"} onClick={() => scrollTo("features")}>{t.features}</MobileNavButton>
              <MobileNavButton active={activeNav === "prices"} onClick={() => scrollTo("prices")}>{t.prices}</MobileNavButton>
              <MobileNavButton active={activeNav === "support"} onClick={() => scrollTo("support")}>{t.support}</MobileNavButton>

              <div className="mt-3 flex gap-3 border-t border-white/15 pt-4">
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); handleLogin("farmer"); }}
                  className="flex-1 rounded-lg border border-white/50 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  {t.login}
                </button>
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); handleRegister(); }}
                  className="flex-1 rounded-lg bg-white py-2.5 text-sm font-semibold text-[#285C3A]"
                >
                  {t.register}
                </button>
              </div>

              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); handleLogin("officer"); }}
                className="mt-2 rounded-lg px-3 py-3 text-left text-sm font-medium text-white/70 hover:bg-white/10"
              >
                {t.officerPortal}
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* =====================================================
            HERO
        ====================================================== */}

        <section
          id="home"
          className="border-b border-[#E3E5DF] overflow-hidden"
        >
          {/* Ambient background particles */}
          <div aria-hidden="true" className="pointer-events-none select-none">
            <div
              className="hero-particle animate-driftA"
              style={{
                width: 340, height: 340,
                background: "radial-gradient(circle, rgba(40,92,58,0.07) 0%, transparent 70%)",
                top: -80, right: "5%",
              }}
            />
            <div
              className="hero-particle animate-driftB"
              style={{
                width: 220, height: 220,
                background: "radial-gradient(circle, rgba(138,112,43,0.06) 0%, transparent 70%)",
                top: 120, right: "22%",
              }}
            />
            <div
              className="hero-particle animate-driftA"
              style={{
                width: 160, height: 160,
                background: "radial-gradient(circle, rgba(76,134,88,0.08) 0%, transparent 70%)",
                bottom: 20, left: "8%",
                animationDelay: "3s",
              }}
            />
          </div>

          <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div className="max-w-[650px]">
              <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-[#D8E1D8] bg-[#EEF3EC] px-4 py-2 text-[13px] font-medium text-[#386044] shadow-sm transition hover:bg-[#E3EBE1] cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="ripple-dot"></span>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4C8658] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4C8658]"></span>
                </span>

                {t.heroBadge}
              </div>

              <h1 className="reveal delay-100 text-[48px] font-semibold leading-[1.08] tracking-[-2px] text-[#19343A] sm:text-[58px] lg:text-[64px]">
                {t.heroTitle1}

                <br />

                <span className="animate-gradient-text">
                  {t.heroTitle2}
                </span>
              </h1>

              <p className="reveal delay-200 mt-6 max-w-[590px] text-[18px] leading-8 text-[#657477]">
                {t.heroDescription}
              </p>

              <div className="reveal delay-300 mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleLogin("farmer")}
                  className="group relative overflow-hidden flex items-center justify-center gap-3 rounded-lg bg-[#285C3A] px-7 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#214D31] active:translate-y-0"
                >
                  <span className="shimmer-btn absolute inset-0 pointer-events-none" />
                  {t.farmerLogin}

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>

                <button
                  type="button"
                  onClick={handleRegister}
                  className="rounded-lg border border-[#BFCBC0] bg-white px-7 py-3.5 text-[15px] font-semibold text-[#285C3A] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#285C3A] hover:shadow-md hover:bg-[#F1F5F0] active:translate-y-0"
                >
                  {t.registerFarmer}
                </button>
              </div>

              <div className="reveal delay-400 mt-8 flex items-center gap-3 text-sm text-[#687678]">
                <CheckCircle2
                  size={18}
                  className="text-[#4C8658]"
                />

                <span>{t.trustLine}</span>
              </div>
            </div>

            {/* Hero Dashboard Preview */}

            <div className="reveal-zoom delay-300 relative animate-floatSlow">
              {/* Glow orbs behind the card */}
              <div aria-hidden="true" className="pointer-events-none">
                <div style={{
                  position: "absolute", width: 180, height: 180,
                  background: "radial-gradient(circle, rgba(40,92,58,0.12) 0%, transparent 70%)",
                  top: -40, right: -40, borderRadius: "50%",
                }} />
                <div style={{
                  position: "absolute", width: 120, height: 120,
                  background: "radial-gradient(circle, rgba(138,112,43,0.10) 0%, transparent 70%)",
                  bottom: -30, left: -30, borderRadius: "50%",
                }} />
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-[#DCE3DB] bg-white p-6 shadow-[0_16px_40px_rgba(39,72,52,0.08)] transition-all duration-500 hover:shadow-[0_28px_64px_rgba(39,72,52,0.15)]">
                <div className="flex items-center justify-between border-b border-[#E7EAE5] pb-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[1.5px] text-[#7A8585]">
                      {t.dashboard}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-[#19343A]">
                      {t.overview}
                    </h3>
                  </div>

                  <span className="rounded-full bg-[#EEF4EC] px-3 py-1 text-xs font-medium text-[#386044]">
                    {t.active}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 py-5">
                  <MiniStat
                    label={t.totalLots}
                    value="12"
                    valueClass="text-[#19343A]"
                  />

                  <MiniStat
                    label={t.pending}
                    value="03"
                    valueClass="text-[#A47A28]"
                  />

                  <MiniStat
                    label={t.sold}
                    value="06"
                    valueClass="text-[#386044]"
                  />
                </div>

                <div className="rounded-lg border border-[#E3E7E2]">
                  <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] border-b border-[#E5E8E4] px-4 py-3 text-xs font-medium text-[#7A8585]">
                    <span>{t.produce}</span>
                    <span>{t.quantity}</span>
                    <span>{t.status}</span>
                  </div>

                  <PreviewLot
                    crop={t.wheat}
                    mandi={t.puneMandi}
                    quantity="50 kg"
                    status={t.pending}
                    pending
                  />

                  <div className="border-t border-[#E5E8E4]" />

                  <PreviewLot
                    crop={t.onion}
                    mandi={t.nashikMandi}
                    quantity="30 kg"
                    status={t.approved}
                  />
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-lg bg-[#F1F5F0] px-4 py-3">
                  <ShieldCheck
                    size={19}
                    className="shrink-0 text-[#386044]"
                  />

                  <p className="text-xs leading-5 text-[#566567]">
                    {t.trackSubmitted}
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 -z-10 h-20 w-20 rounded-xl bg-[#DCE8DC]" />
            </div>
          </div>
        </section>

        {/* =====================================================
            WORKFLOW
        ====================================================== */}

        <section
          id="workflow"
          className="border-b border-[#E3E5DF] bg-white"
        >
          <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
            <div className="text-center reveal">
              <p className="text-xs font-semibold uppercase tracking-[2px] text-[#8A702B]">
                {t.workflowLabel}
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.8px] text-[#19343A] sm:text-4xl">
                {t.workflowTitle}
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#687779]">
                {t.workflowDescription}
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="reveal delay-100">
                <WorkflowStep
                  number="01"
                  icon={<Sprout size={23} strokeWidth={1.8} />}
                  title={t.submitProduce}
                  text={t.submitDescription}
                />
              </div>

              <div className="reveal delay-300">
                <WorkflowStep
                  number="02"
                  icon={<ClipboardList size={23} strokeWidth={1.8} />}
                  title={t.officerReview}
                  text={t.officerDescription}
                  gold
                />
              </div>

              <div className="reveal delay-500">
                <WorkflowStep
                  number="03"
                  icon={<BarChart3 size={23} strokeWidth={1.8} />}
                  title={t.trackStatus}
                  text={t.trackDescription}
                  blue
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FEATURES
        ====================================================== */}

        <section
          id="features"
          className="border-b border-[#E3E5DF] bg-[#F8F7F2]"
        >
          <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
            <div className="reveal flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[2px] text-[#8A702B]">
                  {t.platformFeatures}
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.8px] text-[#19343A] sm:text-4xl">
                  {t.featureTitle}
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-6 text-[#687779]">
                {t.featureDescription}
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="reveal delay-100">
                <FeatureCard
                  icon={<Sprout size={21} />}
                  title={t.addProduce}
                  text={t.addProduceText}
                  green
                  onClick={() => handleLogin("farmer")}
                />
              </div>

              <div className="reveal delay-200">
                <FeatureCard
                  icon={<ClipboardList size={21} />}
                  title={t.lotTracking}
                  text={t.lotTrackingText}
                  gold
                  onClick={() => handleLogin("farmer")}
                />
              </div>

              <div className="reveal delay-300">
                <FeatureCard
                  icon={<BarChart3 size={21} />}
                  title={t.mandiPrices}
                  text={t.mandiPricesText}
                  blue
                  onClick={() => scrollTo("prices")}
                />
              </div>

              <div className="reveal delay-400">
                <FeatureCard
                  icon={<Globe2 size={21} />}
                  title={t.languages}
                  text={t.languagesText}
                  green
                  onClick={() => setLang(lang === "en" ? "mr" : "en")}
                />
              </div>

              <div className="reveal delay-500">
                <FeatureCard
                  icon={<ShieldCheck size={21} />}
                  title={t.officerPortal}
                  text={t.officerPortalText}
                  gold
                  onClick={() => handleLogin("officer")}
                />
              </div>

              <div className="reveal delay-600">
                <FeatureCard
                  icon={<Mic size={21} />}
                  title={t.voiceAssistant}
                  text={t.voiceAssistantText}
                  blue
                  onClick={handleVoice}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            MANDI PRICES
        ====================================================== */}

        <section
          id="prices"
          className="border-b border-[#E3E5DF] bg-white"
        >
          <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="reveal-left">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[1.5px] text-[#8A702B]">
                  <BarChart3 size={15} />

                  {t.marketLabel}
                </div>

                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.8px] text-[#19343A] sm:text-4xl">
                  {t.marketTitle}
                </h2>

                <p className="mt-4 max-w-[500px] text-sm leading-7 text-[#687779]">
                  {t.marketDescription}
                </p>

                <button
                  type="button"
                  onClick={() => handleLogin("farmer")}
                  className="mt-6 group relative overflow-hidden flex items-center gap-2 rounded-lg bg-[#285C3A] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#214D31]"
                >
                  <span className="shimmer-btn absolute inset-0 pointer-events-none" />
                  {t.viewPrices}

                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>

              <div className="reveal-right overflow-hidden rounded-xl border border-[#DCE3DB] bg-[#FAFBF9]">
                <div className="grid grid-cols-[1.2fr_1fr_auto] border-b border-[#DDE3DE] px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#7A8580]">
                  <span>{t.commodity}</span>
                  <span>{t.mandi}</span>
                  <span>{t.availability}</span>
                </div>

                <MarketRow
                  crop={isMarathi ? "गहू" : "Wheat"}
                  mandi={isMarathi ? "पुणे" : "Pune"}
                />

                <MarketRow
                  crop={isMarathi ? "कांदा" : "Onion"}
                  mandi={isMarathi ? "नाशिक" : "Nashik"}
                />

                <MarketRow
                  crop={isMarathi ? "सोयाबीन" : "Soybean"}
                  mandi={isMarathi ? "लातूर" : "Latur"}
                />

                <div className="border-t border-[#DDE3DE] px-5 py-3 text-[10px] leading-5 text-[#7A8580]">
                  {t.marketNote}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            VOICE ASSISTANT
        ====================================================== */}

        <section
          id="voice"
          className="border-b border-[#214D31] bg-[#285C3A]"
        >
          <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] reveal">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[1.5px] text-[#D9E8D9]">
                  <Mic size={15} />

                  {t.voiceLabel}
                </div>

                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.8px] text-white sm:text-4xl">
                  {t.voiceTitle}
                </h2>

                <p className="mt-4 max-w-[520px] text-sm leading-7 text-[#D5E3D7]">
                  {t.voiceDescription}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <VoiceCommand>
                    {isMarathi
                      ? "माझे pending lots दाखव"
                      : "Show my pending lots"}
                  </VoiceCommand>

                  <VoiceCommand>
                    {isMarathi
                      ? "मंडीचे भाव दाखव"
                      : "Open mandi prices"}
                  </VoiceCommand>

                  <VoiceCommand>
                    {isMarathi
                      ? "माझे lots दाखव"
                      : "Show my lots"}
                  </VoiceCommand>
                </div>

                <button
                  type="button"
                  onClick={handleVoice}
                  className="mt-7 flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#285C3A] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#F3F5F0] active:translate-y-0"
                >
                  <Mic size={16} className="animate-pulse" />

                  {t.voiceOpen}
                </button>
              </div>

              <div className="rounded-xl border border-white/10 bg-white p-6 shadow-xl">
                <div className="flex items-center gap-4 border-b border-[#E4E8E3] pb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2E9] text-[#285C3A]">
                    <Mic size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[1.5px] text-[#7A8585]">
                      MandiTrack
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-[#19343A]">
                      {isMarathi
                        ? "आवाजाद्वारे मदत"
                        : "Voice Assistance"}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <VoiceFeature
                    icon={<ClipboardList size={16} />}
                    text={
                      isMarathi
                        ? "माझे pending lots दाखवा"
                        : "Show my pending lots"
                    }
                  />

                  <VoiceFeature
                    icon={<BarChart3 size={16} />}
                    text={
                      isMarathi
                        ? "मंडीचे भाव उघडा"
                        : "Open mandi prices"
                    }
                  />

                  <VoiceFeature
                    icon={<Sprout size={16} />}
                    text={
                      isMarathi
                        ? "नवीन उत्पादन जमा करा"
                        : "Add new produce"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ABOUT / CTA
        ====================================================== */}

        <section id="about" className="bg-[#285C3A]">
          <div className="mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-[#D9E8D9]">
                {t.aboutLabel}
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.8px] text-white sm:text-4xl">
                {t.aboutTitle}
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#D5E3D7]">
                {t.aboutText}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleLogin("farmer")}
              className="flex shrink-0 items-center gap-3 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-[#285C3A] transition hover:bg-[#F3F5F0]"
            >
              {t.getStarted}

              <ArrowRight size={17} />
            </button>
          </div>
        </section>

        {/* =====================================================
            HELP & SUPPORT
        ====================================================== */}

        <section
          id="support"
          className="border-b border-[#DDE3DD] bg-[#F8F7F2]"
        >
          <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
            <div className="reveal text-center">
              <p className="text-xs font-semibold uppercase tracking-[2px] text-[#8A702B]">
                {t.support}
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.8px] text-[#19343A] sm:text-4xl">
                {t.supportTitle}
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#687779]">
                {t.supportText}
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-[800px] gap-4 sm:grid-cols-2">
              <div className="reveal-left delay-100">
                <SupportCard
                  icon={<UserRound size={20} />}
                  title={t.farmerSupport}
                  text={
                    isMarathi
                      ? "लॉट, उत्पादन आणि शेतकरी पोर्टलसाठी मदत."
                      : "Help with lots, produce and the farmer portal."
                  }
                  button={t.farmerLogin}
                  onClick={() => handleLogin("farmer")}
                />
              </div>

              <div className="reveal-right delay-200">
                <SupportCard
                  icon={<ShieldCheck size={20} />}
                  title={t.officerSupport}
                  text={
                    isMarathi
                      ? "लॉट तपासणी आणि अधिकारी पोर्टलसाठी मदत."
                      : "Help with lot review and the officer portal."
                  }
                  button={t.officerPortal}
                  onClick={() => handleLogin("officer")}
                />
              </div>
            </div>

            {/* Direct Helpline & Contact */}
            <div className="reveal delay-300 mx-auto mt-8 max-w-[800px] rounded-2xl border border-[#DCE3DB] bg-white p-6 shadow-sm sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E7EBE5] pb-4">
                <div>
                  <h3 className="text-base font-bold text-[#19343A]">
                    {isMarathi ? "थेट संपर्क व मदत केंद्र" : "Direct Helpline & Contact"}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#687779]">
                    {isMarathi
                      ? "कोणत्याही प्रश्न किंवा मदतीसाठी आमच्याशी थेट संपर्क साधा."
                      : "For any assistance, lot inquiries, or support, reach us directly."}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-[#EAF2E9] px-3 py-1 text-xs font-semibold text-[#285C3A]">
                  <span className="h-2 w-2 rounded-full bg-[#285C3A] animate-pulse" />
                  {isMarathi ? "सक्रिय सहाय्य" : "24x7 Support"}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="tel:8010558094"
                  className="group flex items-center gap-3.5 rounded-xl border border-[#DCE3DB] bg-[#F8F7F2] p-4 transition-all hover:border-[#285C3A] hover:bg-[#EAF2E9]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A] transition group-hover:bg-[#285C3A] group-hover:text-white">
                    <Phone size={19} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8A9695]">
                      {isMarathi ? "हेल्पलाइन नंबर" : "Helpline Number"}
                    </div>
                    <div className="mt-0.5 text-sm font-bold text-[#19343A]">
                      +91 80105 58094
                    </div>
                  </div>
                  <ArrowRight
                    size={15}
                    className="ml-auto shrink-0 text-[#A7B1AF] transition group-hover:translate-x-1 group-hover:text-[#285C3A]"
                  />
                </a>

                <a
                  href="mailto:yadneshgharat23@gmail.com"
                  className="group flex items-center gap-3.5 rounded-xl border border-[#DCE3DB] bg-[#F8F7F2] p-4 transition-all hover:border-[#B58A35] hover:bg-[#F5EFDE]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#F5EFDE] text-[#B58A35] transition group-hover:bg-[#B58A35] group-hover:text-white">
                    <Mail size={19} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8A9695]">
                      {isMarathi ? "ईमेल संपर्क" : "Email Support"}
                    </div>
                    <div className="mt-0.5 text-xs sm:text-sm font-bold text-[#19343A] break-all">
                      yadneshgharat23@gmail.com
                    </div>
                  </div>
                  <ArrowRight
                    size={15}
                    className="ml-auto shrink-0 text-[#A7B1AF] transition group-hover:translate-x-1 group-hover:text-[#B58A35]"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer
        id="footer"
        className="border-t border-[#DDE3DD] bg-[#EFF3ED]"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-9 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <MandiTrackLogo variant="dark" size="md" />

            <p className="mt-1.5 text-sm text-[#6D797A]">
              {t.footerTagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-[#4D5D5F]">
            <button onClick={() => scrollTo("home")}>
              {t.home}
            </button>

            <button onClick={() => scrollTo("workflow")}>
              {t.workflow}
            </button>

            <button onClick={() => scrollTo("features")}>
              {t.features}
            </button>

            <button onClick={() => scrollTo("prices")}>
              {t.prices}
            </button>

            <button onClick={() => scrollTo("support")}>
              {t.support}
            </button>
          </div>

          <p className="text-sm text-[#778183]">
            © {new Date().getFullYear()} MandiTrack
          </p>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function NavButton({ children, onClick, active = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative py-6 text-[14px] font-medium transition duration-150 ${
        active
          ? "text-white font-semibold"
          : "text-white/70 hover:text-white"
      }`}
    >
      {children}

      <span
        className={`absolute bottom-[16px] left-0 h-[2.5px] w-full rounded-full bg-white transition-all duration-300 ${
          active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`}
      />
    </button>
  );
}

function MobileNavButton({ children, onClick, active = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
        active
          ? "bg-white/15 text-white font-semibold"
          : "text-white/75 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function MiniStat({ label, value, valueClass }) {
  return (
    <div className="rounded-lg bg-[#F6F8F5] p-4 transition-all duration-200 hover:bg-[#EEF3EC] hover:scale-[1.02]">
      <p className="text-xs text-[#7A8585]">{label}</p>

      <p className={`mt-2 text-2xl font-semibold ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}

function PreviewLot({
  crop,
  mandi,
  quantity,
  status,
  pending = false,
}) {
  return (
    <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] items-center px-4 py-4 text-sm transition-colors duration-150 hover:bg-[#F8FAF7]">
      <div>
        <p className="font-medium text-[#19343A]">{crop}</p>

        <p className="mt-1 text-xs text-[#879091]">{mandi}</p>
      </div>

      <span className="text-[#526164]">{quantity}</span>

      <span
        className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium transition-transform duration-200 hover:scale-105 ${
          pending
            ? "bg-[#FFF5DC] text-[#967025]"
            : "bg-[#EAF4EB] text-[#386044]"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

function WorkflowStep({
  number,
  icon,
  title,
  text,
  gold = false,
  blue = false,
}) {
  const iconStyle = gold
    ? "bg-[#F5EFDE] text-[#A47A28]"
    : blue
      ? "bg-[#E8F0F0] text-[#315B60]"
      : "bg-[#EAF2E9] text-[#285C3A]";

  return (
    <div className="group relative rounded-2xl border border-[#DCE3DB] bg-[#FDFCF9] p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-[#285C3A]/30 hover:bg-white hover:shadow-[0_14px_35px_rgba(39,72,52,0.08)]">
      <div
        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${iconStyle}`}
      >
        {icon}
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-[1.5px] text-[#8A702B]">
        {number}
      </p>

      <h3 className="mt-2 text-lg font-semibold text-[#19343A] transition-colors group-hover:text-[#285C3A]">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#687779]">
        {text}
      </p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
  green,
  gold,
  blue,
  onClick,
}) {
  const iconStyle = green
    ? "bg-[#EAF2E9] text-[#285C3A]"
    : gold
      ? "bg-[#F5EFDE] text-[#A47A28]"
      : blue
        ? "bg-[#E8F0F0] text-[#315B60]"
        : "bg-[#EEF1EB] text-[#49634C]";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-xl border border-[#DCE3DB] bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-[#285C3A]/40 hover:shadow-[0_14px_35px_rgba(39,72,52,0.08)]"
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110 ${iconStyle}`}
      >
        {icon}
      </div>

      <h3 className="mt-5 font-semibold text-[#19343A] transition-colors group-hover:text-[#285C3A]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#687779]">
        {text}
      </p>

      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#285C3A] transition-transform duration-200 group-hover:translate-x-1">
        Explore
        <ArrowRight size={13} />
      </div>
    </button>
  );
}

function MarketRow({ crop, mandi }) {
  return (
    <div className="grid grid-cols-[1.2fr_1fr_auto] items-center border-b border-[#DDE3DE] px-5 py-4 last:border-b-0 transition-colors duration-150 hover:bg-[#F3F6F1]">
      <p className="text-xs font-semibold text-[#19343A]">
        {crop}
      </p>

      <p className="text-xs text-[#66736D]">{mandi}</p>

      <span className="text-[10px] font-semibold text-[#285C3A] flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#285C3A] animate-pulse" />
        Available
      </span>
    </div>
  );
}

function VoiceCommand({ children }) {
  return (
    <span className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[10px] text-white/85 transition-all duration-200 hover:bg-white/20 hover:scale-105 cursor-pointer">
      “{children}”
    </span>
  );
}

function VoiceFeature({ icon, text }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#E0E5DF] bg-[#FAFBF9] px-4 py-3 transition-all duration-200 hover:bg-white hover:shadow-sm">
      <div className="text-[#285C3A] transition-transform duration-200 hover:scale-110">{icon}</div>

      <span className="text-xs font-medium text-[#4E5E60]">
        {text}
      </span>
    </div>
  );
}

function SupportCard({
  icon,
  title,
  text,
  button,
  onClick,
}) {
  return (
    <div className="group rounded-2xl border border-[#DCE3DB] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#285C3A]/30 hover:shadow-[0_12px_30px_rgba(39,72,52,0.06)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2E9] text-[#285C3A] transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      <h3 className="mt-5 font-semibold text-[#19343A] transition-colors group-hover:text-[#285C3A]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#687779]">
        {text}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#285C3A] transition-transform duration-200 group-hover:translate-x-1"
      >
        {button}

        <ArrowRight size={13} />
      </button>
    </div>
  );
}