import React, { useState } from "react";
import {
  Globe,
  Menu,
  X,
  UserRound,
  ArrowRight,
  FileText,
  ListChecks,
  BarChart3,
  Mic,
} from "lucide-react";

import mandiHero from "../assets/mandi-hero.jpg";
import LotStatusPreview from "../components/LotStatusPreview";

const NAV_LINKS = ["Home", "About", "Mandi Prices", "Help"];

const QUICK_ACTIONS = [
  {
    icon: FileText,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-700",
    title: "Add Produce",
    subtitle: "Submit your crop details",
  },
  {
    icon: ListChecks,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-700",
    title: "Track Lots",
    subtitle: "Check your lot status",
  },
  {
    icon: BarChart3,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-700",
    title: "Mandi Prices",
    subtitle: "View market rates",
  },
  {
    icon: Mic,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-700",
    title: "Voice Help",
    subtitle: "Marathi & English assistance",
  },
];

const STATS = [
  {
    value: "10,000+",
    label: "Farmers Registered",
  },
  {
    value: "50+",
    label: "Mandis Connected",
  },
  {
    value: "100%",
    label: "Transparent Process",
  },
  {
    value: "2",
    label: "Languages",
  },
];

export default function LandingPage({
  onNavigateToLogin,
  onNavigateToRegister,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = (role = "farmer") => {
    if (typeof onNavigateToLogin === "function") {
      onNavigateToLogin(role);
    }
  };

  const handleRegister = () => {
    if (typeof onNavigateToRegister === "function") {
      onNavigateToRegister("farmer");
    }
  };

  const scrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F4EFDF] text-[#16283A]">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0E2A3F] text-white">
        <div className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-7 lg:px-10">

          {/* Brand */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D9A227]/10">
              <svg
                width="32"
                height="32"
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="47"
                  y="20"
                  width="6"
                  height="66"
                  rx="3"
                  fill="#D9A227"
                />

                <path
                  d="M50 10 C58 16 62 26 50 34 C38 26 42 16 50 10 Z"
                  fill="#D9A227"
                />

                <path
                  d="M50 32 C40 30 30 34 25 44 C37 46 46 42 50 32 Z"
                  fill="#D9A227"
                />

                <path
                  d="M50 32 C60 30 70 34 75 44 C63 46 54 42 50 32 Z"
                  fill="#D9A227"
                />

                <path
                  d="M50 50 C40 48 29 52 23 63 C36 65 46 60 50 50 Z"
                  fill="#D9A227"
                />

                <path
                  d="M50 50 C60 48 71 52 77 63 C64 65 54 60 50 50 Z"
                  fill="#D9A227"
                />

                <path
                  d="M50 68 C41 66 31 70 26 79 C37 81 46 77 50 68 Z"
                  fill="#D9A227"
                />

                <path
                  d="M50 68 C59 66 69 70 74 79 C63 81 54 77 50 68 Z"
                  fill="#D9A227"
                />
              </svg>
            </div>

            <div className="text-left">
              <div className="text-lg font-bold leading-none sm:text-xl">
                MandiTrack
              </div>

              <div className="mt-1 text-[10px] text-white/55 sm:text-[11px]">
                Apala Mandi Saathi
              </div>
            </div>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                type="button"
                onClick={() => {
                  if (link === "Home") {
                    scrollTo("home");
                  } else if (link === "About") {
                    scrollTo("about");
                  } else if (link === "Mandi Prices") {
                    handleLogin("farmer");
                  } else {
                    scrollTo("help");
                  }
                }}
                className={`border-b-2 pb-1.5 text-sm font-medium transition ${
                  link === "Home"
                    ? "border-amber-500 text-white"
                    : "border-transparent text-white/70 hover:text-white"
                }`}
              >
                {link}
              </button>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-4 sm:flex">
            <button
              type="button"
              onClick={() => scrollTo("language")}
              className="flex items-center gap-2 text-sm text-white/75 transition hover:text-white"
            >
              <Globe size={16} />

              <span>
                <strong className="text-white">English</strong> | मराठी
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleLogin("farmer")}
              className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-[#2B1E04] transition hover:bg-amber-400"
            >
              Login
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => handleLogin("farmer")}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-[#2B1E04]"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#0B263A] px-5 py-4 lg:hidden">
            <div className="mx-auto max-w-[1440px] space-y-1">

              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  type="button"
                  onClick={() => {
                    if (link === "Home") {
                      scrollTo("home");
                    } else if (link === "About") {
                      scrollTo("about");
                    } else if (link === "Mandi Prices") {
                      handleLogin("farmer");
                    } else {
                      scrollTo("help");
                    }
                  }}
                  className="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {link}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollTo("language");
                }}
                className="mt-2 flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
              >
                <Globe size={16} />
                English | मराठी
              </button>

            </div>
          </div>
        )}
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section
        id="home"
        className="relative isolate min-h-[650px] overflow-hidden"
      >
        {/* Hero background */}
        <img
          src={mandiHero}
          alt="Agricultural mandi market"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#F4EFDF]/100 via-[#F4EFDF]/92 to-[#F4EFDF]/10" />

        <div className="mx-auto flex min-h-[650px] max-w-[1440px] items-center px-5 py-12 sm:px-7 lg:px-10 lg:py-16">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] xl:gap-16">

            {/* Hero text */}
            <div className="max-w-[590px]">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#637565] sm:text-sm">
                Digital Mandi Operations
              </p>

              <h1 className="mt-5 text-[42px] font-bold leading-[1.03] tracking-[-0.04em] text-[#0A2131] sm:text-[54px] lg:text-[64px]">
                Mandi operations
                <br />

                <span className="relative inline-block">
                  made simple.

                  <span className="absolute -bottom-2 left-0 h-1 w-24 rounded-full bg-amber-500 sm:w-32" />
                </span>
              </h1>

              <p className="mt-8 max-w-[500px] text-lg leading-7 text-[#43596A] sm:text-xl sm:leading-8">
                Track your produce from registration to final status.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={() => handleLogin("farmer")}
                  className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#0E2A3F] px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#092235]"
                >
                  <UserRound size={18} />
                  Farmer Login
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  onClick={handleRegister}
                  className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-[#0E2A3F] bg-white/95 px-6 py-3.5 font-semibold text-[#0E2A3F] shadow-sm transition hover:bg-white"
                >
                  <UserRound size={18} />
                  Register
                  <ArrowRight size={17} />
                </button>

              </div>

              <p className="mt-5 text-sm text-[#586978]">
                For farmers, mandi officers and administration
              </p>
            </div>

            {/* Lot status preview */}
            <div className="flex w-full justify-center lg:justify-end">
              <LotStatusPreview
                onViewLots={() => handleLogin("farmer")}
              />
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}
      <section
        id="about"
        className="border-y border-[#E3DCC8] bg-[#FBF8EF]"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {QUICK_ACTIONS.map(
            ({
              icon: Icon,
              iconBg,
              iconColor,
              title,
              subtitle,
            }) => (
              <button
                key={title}
                type="button"
                onClick={() => handleLogin("farmer")}
                className="group flex min-h-[118px] items-center gap-4 border-b border-[#E3DCC8] px-6 py-6 text-left transition hover:bg-white sm:border-r lg:border-b-0 last:border-r-0"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
                >
                  <Icon size={20} className={iconColor} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-bold text-[#1A3145]">
                    {title}
                  </p>

                  <p className="mt-1 text-sm leading-5 text-[#637386]">
                    {subtitle}
                  </p>
                </div>

                <ArrowRight
                  size={18}
                  className="shrink-0 text-[#6D7B88] transition group-hover:translate-x-1"
                />
              </button>
            )
          )}

        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}
      <section className="bg-[#EFE8D6]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 lg:grid-cols-4">

          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-4 py-8 text-center sm:px-6 ${
                index > 0
                  ? "border-l border-[#D6CAB0]"
                  : ""
              }`}
            >
              <p className="text-2xl font-bold text-[#0A2131] sm:text-3xl">
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-[#627282] sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* Language anchor */}
      <section id="language" className="h-0 overflow-hidden" />

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer
        id="help"
        className="bg-[#0A2131] text-slate-300"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-base font-bold text-white">
              MandiTrack
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Apala Mandi Saathi
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
            <button
              type="button"
              className="hover:text-white"
            >
              Privacy
            </button>

            <span className="text-slate-700">|</span>

            <button
              type="button"
              className="hover:text-white"
            >
              Terms
            </button>

            <span className="text-slate-700">|</span>

            <button
              type="button"
              onClick={() => scrollTo("help")}
              className="hover:text-white"
            >
              Help
            </button>
          </div>

          <div className="border-l-0 border-slate-700 text-left text-sm font-semibold leading-6 text-white md:border-l md:pl-6 md:text-right">
            <p>Better Markets.</p>
            <p>Stronger Farmers.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}