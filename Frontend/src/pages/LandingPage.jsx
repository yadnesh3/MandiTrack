import React, { useState } from "react";
import { useLang } from "../context/LanguageContext";

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
} from "lucide-react";

export default function LandingPage({
  onNavigateToLogin,
  onNavigateToRegister,
  onOpenVoiceModal,
}) {
  const { lang, setLang } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMarathi = lang === "mr";

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

      <header className="sticky top-0 z-50 border-b border-[#E1E4DE] bg-[#F8F7F2]/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
          {/* Logo */}

          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#285C3A]">
              <Sprout
                size={21}
                strokeWidth={1.8}
                className="text-white"
              />
            </div>

            <span className="text-[25px] font-semibold tracking-[-0.7px]">
              <span className="text-[#285C3A]">Mandi</span>
              <span className="text-[#B58A35]">Track</span>
            </span>
          </button>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-8 lg:flex">
            <NavButton
              active
              onClick={() => scrollTo("home")}
            >
              {t.home}
            </NavButton>

            <NavButton onClick={() => scrollTo("workflow")}>
              {t.workflow}
            </NavButton>

            <NavButton onClick={() => scrollTo("features")}>
              {t.features}
            </NavButton>

            <NavButton onClick={() => scrollTo("prices")}>
              {t.prices}
            </NavButton>

            <NavButton onClick={() => scrollTo("support")}>
              {t.support}
            </NavButton>
          </nav>

          {/* Desktop Actions */}

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() =>
                setLang(lang === "en" ? "mr" : "en")
              }
              className="mr-2 flex items-center gap-1 border-r border-[#D2D7D1] px-4 text-[14px] font-medium text-[#596769]"
            >
              <Globe2 size={16} />

              {lang === "en" ? "English" : "मराठी"}
            </button>

            <button
              type="button"
              onClick={() => handleLogin("officer")}
              className="text-[13px] font-medium text-[#596769] transition hover:text-[#285C3A]"
            >
              {t.officerPortal}
            </button>

            <button
              type="button"
              onClick={() => handleLogin("farmer")}
              className="rounded-lg border border-[#285C3A] px-5 py-2.5 text-[14px] font-semibold text-[#285C3A] transition hover:bg-[#EDF2EB]"
            >
              {t.login}
            </button>

            <button
              type="button"
              onClick={handleRegister}
              className="rounded-lg bg-[#285C3A] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#214D31]"
            >
              {t.register}
            </button>
          </div>

          {/* Mobile Menu */}

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((value) => !value)
            }
            className="rounded-lg border border-[#D5DAD4] p-2 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}

        {mobileMenuOpen && (
          <div className="border-t border-[#E1E4DE] bg-[#F8F7F2] px-5 py-5 lg:hidden">
            <div className="mx-auto flex max-w-[1280px] flex-col gap-1">
              <MobileNavButton onClick={() => scrollTo("home")}>
                {t.home}
              </MobileNavButton>

              <MobileNavButton onClick={() => scrollTo("workflow")}>
                {t.workflow}
              </MobileNavButton>

              <MobileNavButton onClick={() => scrollTo("features")}>
                {t.features}
              </MobileNavButton>

              <MobileNavButton onClick={() => scrollTo("prices")}>
                {t.prices}
              </MobileNavButton>

              <MobileNavButton onClick={() => scrollTo("support")}>
                {t.support}
              </MobileNavButton>

              <div className="mt-3 flex gap-3 border-t border-[#E1E4DE] pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogin("farmer");
                  }}
                  className="flex-1 rounded-lg border border-[#285C3A] py-2.5 text-sm font-semibold text-[#285C3A]"
                >
                  {t.login}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleRegister();
                  }}
                  className="flex-1 rounded-lg bg-[#285C3A] py-2.5 text-sm font-semibold text-white"
                >
                  {t.register}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogin("officer");
                }}
                className="mt-2 rounded-lg px-3 py-3 text-left text-sm font-medium text-[#596769] hover:bg-[#EDF2EB]"
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
          className="border-b border-[#E3E5DF]"
        >
          <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div className="max-w-[650px]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D8E1D8] bg-[#EEF3EC] px-4 py-2 text-[13px] font-medium text-[#386044]">
                <span className="h-2 w-2 rounded-full bg-[#4C8658]" />

                {t.heroBadge}
              </div>

              <h1 className="text-[48px] font-semibold leading-[1.08] tracking-[-2px] text-[#19343A] sm:text-[58px] lg:text-[64px]">
                {t.heroTitle1}

                <br />

                <span className="text-[#285C3A]">
                  {t.heroTitle2}
                </span>
              </h1>

              <p className="mt-6 max-w-[590px] text-[18px] leading-8 text-[#657477]">
                {t.heroDescription}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleLogin("farmer")}
                  className="group flex items-center justify-center gap-3 rounded-lg bg-[#285C3A] px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#214D31]"
                >
                  {t.farmerLogin}

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <button
                  type="button"
                  onClick={handleRegister}
                  className="rounded-lg border border-[#BFCBC0] bg-white px-7 py-3.5 text-[15px] font-semibold text-[#285C3A] transition hover:border-[#285C3A] hover:bg-[#F1F5F0]"
                >
                  {t.registerFarmer}
                </button>
              </div>

              <div className="mt-8 flex items-center gap-3 text-sm text-[#687678]">
                <CheckCircle2
                  size={18}
                  className="text-[#4C8658]"
                />

                <span>{t.trustLine}</span>
              </div>
            </div>

            {/* Hero Dashboard Preview */}

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-[#DCE3DB] bg-white p-6 shadow-[0_12px_35px_rgba(39,72,52,0.08)]">
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
            <div className="text-center">
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
              <WorkflowStep
                number="01"
                icon={<Sprout size={23} strokeWidth={1.8} />}
                title={t.submitProduce}
                text={t.submitDescription}
              />

              <WorkflowStep
                number="02"
                icon={<ClipboardList size={23} strokeWidth={1.8} />}
                title={t.officerReview}
                text={t.officerDescription}
                gold
              />

              <WorkflowStep
                number="03"
                icon={<BarChart3 size={23} strokeWidth={1.8} />}
                title={t.trackStatus}
                text={t.trackDescription}
                blue
              />
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
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
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
              <FeatureCard
                icon={<Sprout size={21} />}
                title={t.addProduce}
                text={t.addProduceText}
                green
                onClick={() => handleLogin("farmer")}
              />

              <FeatureCard
                icon={<ClipboardList size={21} />}
                title={t.lotTracking}
                text={t.lotTrackingText}
                gold
                onClick={() => handleLogin("farmer")}
              />

              <FeatureCard
                icon={<BarChart3 size={21} />}
                title={t.mandiPrices}
                text={t.mandiPricesText}
                blue
                onClick={() => scrollTo("prices")}
              />

              <FeatureCard
                icon={<Globe2 size={21} />}
                title={t.languages}
                text={t.languagesText}
                green
                onClick={() => setLang(lang === "en" ? "mr" : "en")}
              />

              <FeatureCard
                icon={<ShieldCheck size={21} />}
                title={t.officerPortal}
                text={t.officerPortalText}
                gold
                onClick={() => handleLogin("officer")}
              />

              <FeatureCard
                icon={<Mic size={21} />}
                title={t.voiceAssistant}
                text={t.voiceAssistantText}
                blue
                onClick={handleVoice}
              />
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
              <div>
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
                  className="mt-6 flex items-center gap-2 rounded-lg bg-[#285C3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#214D31]"
                >
                  {t.viewPrices}

                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#DCE3DB] bg-[#FAFBF9]">
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
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
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
                  className="mt-7 flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#285C3A] transition hover:bg-[#F3F5F0]"
                >
                  <Mic size={16} />

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
            <div className="text-center">
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
            <div className="text-[24px] font-semibold">
              <span className="text-[#285C3A]">Mandi</span>
              <span className="text-[#B58A35]">Track</span>
            </div>

            <p className="mt-1 text-sm text-[#6D797A]">
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
      className={`relative py-6 text-[14px] font-medium transition ${
        active
          ? "text-[#285C3A]"
          : "text-[#586668] hover:text-[#285C3A]"
      }`}
    >
      {children}

      {active && (
        <span className="absolute bottom-[18px] left-0 h-[2px] w-full bg-[#285C3A]" />
      )}
    </button>
  );
}

function MobileNavButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-3 py-3 text-left text-sm text-[#344548] hover:bg-[#EDF2EB]"
    >
      {children}
    </button>
  );
}

function MiniStat({ label, value, valueClass }) {
  return (
    <div className="rounded-lg bg-[#F6F8F5] p-4">
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
    <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] items-center px-4 py-4 text-sm">
      <div>
        <p className="font-medium text-[#19343A]">{crop}</p>

        <p className="mt-1 text-xs text-[#879091]">{mandi}</p>
      </div>

      <span className="text-[#526164]">{quantity}</span>

      <span
        className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
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
    <div className="relative text-center">
      <div
        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${iconStyle}`}
      >
        {icon}
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[1.5px] text-[#8A702B]">
        {number}
      </p>

      <h3 className="mt-2 text-lg font-semibold text-[#19343A]">
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
      className="rounded-xl border border-[#DCE3DB] bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-[#BFCDBF] hover:shadow-[0_8px_25px_rgba(39,72,52,0.06)]"
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconStyle}`}
      >
        {icon}
      </div>

      <h3 className="mt-5 font-semibold text-[#19343A]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#687779]">
        {text}
      </p>

      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#285C3A]">
        Explore
        <ArrowRight size={13} />
      </div>
    </button>
  );
}

function MarketRow({ crop, mandi }) {
  return (
    <div className="grid grid-cols-[1.2fr_1fr_auto] items-center border-b border-[#DDE3DE] px-5 py-4 last:border-b-0">
      <p className="text-xs font-semibold text-[#19343A]">
        {crop}
      </p>

      <p className="text-xs text-[#66736D]">{mandi}</p>

      <span className="text-[10px] font-semibold text-[#285C3A]">
        Available
      </span>
    </div>
  );
}

function VoiceCommand({ children }) {
  return (
    <span className="border border-white/15 bg-white/10 px-3 py-2 text-[10px] text-white/75">
      “{children}”
    </span>
  );
}

function VoiceFeature({ icon, text }) {
  return (
    <div className="flex items-center gap-3 border border-[#E0E5DF] bg-[#FAFBF9] px-4 py-3">
      <div className="text-[#285C3A]">{icon}</div>

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
    <div className="rounded-xl border border-[#DCE3DB] bg-white p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A]">
        {icon}
      </div>

      <h3 className="mt-5 font-semibold text-[#19343A]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#687779]">
        {text}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#285C3A]"
      >
        {button}

        <ArrowRight size={13} />
      </button>
    </div>
  );
}