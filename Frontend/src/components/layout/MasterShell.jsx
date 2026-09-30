import React, { useState, useEffect } from "react";
import MandiTrackLogo from "../MandiTrackLogo";
import BottomBanner from "../common/BottomBanner";
import AnimatedPage from "../AnimatedPage";
import { useLang } from "../../context/LanguageContext";

import {
  Home,
  Clock,
  Settings,
  Package,
  PlusCircle,
  BarChart3,
  FileText,
  Megaphone,
  Mic,
  User,
  HelpCircle,
  MapPin,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const MANDI_LIST = [
  "Pune APMC",
  "Navi Mumbai APMC",
  "Thane APMC",
  "Nashik APMC",
  "Nagpur APMC",
  "Latur APMC",
  "Kalyan APMC",
];

export const getMandiDisplay = (mandiName, lang) => {
  if (lang !== "mr") return mandiName;
  const map = {
    "Pune APMC": "पुणे बाजार समिती",
    "Navi Mumbai APMC": "नवी मुंबई बाजार समिती",
    "Thane APMC": "ठाणे बाजार समिती",
    "Nashik APMC": "नाशिक बाजार समिती",
    "Nagpur APMC": "नागपूर बाजार समिती",
    "Latur APMC": "लातूर बाजार समिती",
    "Kalyan APMC": "कल्याण बाजार समिती",
  };
  return map[mandiName] || mandiName;
};

export default function MasterShell({
  user,
  activeTab = "dashboard",
  onSelectTab,
  onLogout,
  onOpenVoiceHelp,
  children,
}) {
  // ============================================================
  // LANGUAGE
  // ============================================================

  const { lang, setLang, t } = useLang();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [selectedMandi, setSelectedMandi] = useState(
    user?.mandi || "Navi Mumbai APMC"
  );

  const [mandiDropdownOpen, setMandiDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // ============================================================
  // LIVE CLOCK
  // ============================================================

  const [currentTimeStr, setCurrentTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const options = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      const formatted = now.toLocaleString(
        lang === "mr" ? "mr-IN" : "en-IN",
        options
      );

      setCurrentTimeStr(formatted);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [lang]);

  // ============================================================
  // UPDATE SELECTED MANDI
  // ============================================================

  useEffect(() => {
    if (user?.mandi) {
      setSelectedMandi(user.mandi);
    }
  }, [user?.mandi]);

  // ============================================================
  // USER ROLE
  // ============================================================

  const role = user?.role || "farmer";

  // ============================================================
  // ROLE BASED NAVIGATION
  // ============================================================

  const getNavItems = () => {
    // ----------------------------------------------------------
    // ADMIN
    // ----------------------------------------------------------

    if (role === "admin") {
      return [
        {
          id: "dashboard",
          label: t("home"),
          icon: Home,
        },
        {
          id: "manage-officers",
          label: t("adminTotalOfficers"),
          icon: ShieldCheck,
        },
        {
          id: "all-lots",
          label: t("allLots"),
          icon: Package,
        },
        {
          id: "mandi-prices",
          label: t("mandiPricesTitle"),
          icon: BarChart3,
        },
        {
          id: "reports",
          label: t("reports"),
          icon: FileText,
        },
        {
          id: "announcements",
          label: t("announcements"),
          icon: Megaphone,
        },
        {
          id: "voice-assistant",
          label: t("voiceAssistant"),
          icon: Mic,
        },
        {
          id: "profile",
          label: t("profile"),
          icon: User,
        },
        {
          id: "help",
          label: t("helpSupport"),
          icon: HelpCircle,
        },
      ];
    }

    // ----------------------------------------------------------
    // OFFICER
    // ----------------------------------------------------------

    if (role === "officer") {
      return [
        {
          id: "dashboard",
          label: t("home"),
          icon: Home,
        },
        {
          id: "waiting-queue",
          label: t("queueStatus"),
          icon: Clock,
        },
        {
          id: "process-lot",
          label: t("reviewProcessLots"),
          icon: Settings,
        },
        {
          id: "mandi-prices",
          label: t("mandiPricesTitle"),
          icon: BarChart3,
        },
        {
          id: "reports",
          label: t("reports"),
          icon: FileText,
        },
        {
          id: "announcements",
          label: t("announcements"),
          icon: Megaphone,
        },
        {
          id: "voice-assistant",
          label: t("voiceAssistant"),
          icon: Mic,
        },
        {
          id: "profile",
          label: t("profile"),
          icon: User,
        },
        {
          id: "help",
          label: t("helpSupport"),
          icon: HelpCircle,
        },
      ];
    }

    // ----------------------------------------------------------
    // FARMER
    // ----------------------------------------------------------

    return [
      {
        id: "dashboard",
        label: t("home"),
        icon: Home,
      },
      {
        id: "add-produce",
        label: t("addProduceBtn"),
        icon: PlusCircle,
      },
      {
        id: "my-lots",
        label: t("myProduceLots"),
        icon: Package,
      },
      {
        id: "lot-tracking",
        label: t("lotTracking"),
        icon: Clock,
      },
      {
        id: "mandi-prices",
        label: t("mandiPricesTitle"),
        icon: BarChart3,
      },
      {
        id: "announcements",
        label: t("announcements"),
        icon: Megaphone,
      },
      {
        id: "voice-assistant",
        label: t("voiceAssistant"),
        icon: Mic,
      },
      {
        id: "profile",
        label: t("profile"),
        icon: User,
      },
      {
        id: "help",
        label: t("helpSupport"),
        icon: HelpCircle,
      },
    ];
  };

  const navItems = getNavItems();

  // ============================================================
  // NAVIGATION HANDLER
  // ============================================================

  const handleNavClick = (id) => {
    if (id === "voice-assistant" && onOpenVoiceHelp) {
      onOpenVoiceHelp();
    } else if (onSelectTab) {
      onSelectTab(id);
    }

    setMobileSidebarOpen(false);
  };

  // ============================================================
  // USER INITIALS
  // ============================================================

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "MT";

  // ============================================================
  // ROLE LABEL
  // ============================================================

  const roleLabel =
    role === "officer"
      ? `${t("roleOfficer")} (${getMandiDisplay(selectedMandi, lang)})`
      : role === "admin"
      ? t("roleAdmin")
      : `${t("roleFarmer")} (${getMandiDisplay(selectedMandi, lang)})`;

  return (
    <div className="min-h-screen bg-[#F8F7F2] flex flex-col font-sans text-[#19343A] antialiased selection:bg-[#F5EFDE]">
      <div className="flex flex-1 relative">

        {/* ======================================================
            DESKTOP SIDEBAR
        ====================================================== */}

        <aside className="hidden lg:flex w-64 xl:w-72 bg-[#285C3A] text-white flex-col shrink-0 shadow-[2px_0_16px_rgba(0,0,0,0.15)] sticky top-0 h-screen z-30 overflow-y-auto">

          {/* BRAND */}
          <div className="px-5 py-4 bg-[#285C3A] border-b border-white/10 flex items-center min-h-[72px]">
            <MandiTrackLogo
              variant="light"
              size="lg"
            />
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 px-3.5 py-5 space-y-1 overflow-y-auto">

            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">
              {t("mainMenu")}
            </div>

            {navItems.map((item, idx) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{ animationDelay: `${idx * 40}ms` }}
                  className={`animate-fadeIn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-semibold text-[13px] transition-all text-left group border ${
                    isActive
                      ? "bg-white/15 border-white/20 text-white shadow-sm"
                      : "border-transparent text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? "bg-[#E8A835] text-white"
                        : "bg-white/10 text-white/70 group-hover:bg-white/20 group-hover:text-white"
                    }`}
                  >
                    <Icon size={17} strokeWidth={isActive ? 2.4 : 2} />
                  </span>

                  <span className="truncate flex-1">{item.label}</span>

                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* SIDEBAR FOOTER */}
          <div className="border-t border-white/10 px-5 py-4">
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span>
                MandiTrack &bull;{" "}
                {lang === "mr"
                  ? "महाराष्ट्र शासनाचा उपक्रम"
                  : "Govt. of Maharashtra Initiative"}
              </span>
            </div>
          </div>
        </aside>

        {/* ======================================================
            MOBILE SIDEBAR
        ====================================================== */}

        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">

            {/* BACKDROP */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileSidebarOpen(false)}
            />

            {/* DRAWER */}
            <aside className="relative w-72 bg-[#285C3A] text-white flex flex-col h-full shadow-2xl z-10 overflow-y-auto animate-slideInLeft">

              {/* MOBILE HEADER */}
              <div className="px-5 py-4 flex items-center justify-between bg-[#285C3A] border-b border-white/10 min-h-[72px]">
                <MandiTrackLogo variant="light" size="md" />

                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition"
                  aria-label="Close Menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* MOBILE NAVIGATION */}
              <nav className="flex-1 px-3.5 py-5 space-y-1">

                <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">
                  {t("mainMenu")}
                </div>

                {navItems.map((item, idx) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      style={{ animationDelay: `${idx * 35}ms` }}
                      className={`animate-fadeIn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-semibold text-xs transition-all text-left border ${
                        isActive
                          ? "bg-white/15 border-white/20 text-white"
                          : "border-transparent text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive
                            ? "bg-[#E8A835] text-white"
                            : "bg-white/10 text-white/70"
                        }`}
                      >
                        <Icon size={17} strokeWidth={isActive ? 2.4 : 2} />
                      </span>

                      <span className="flex-1">{item.label}</span>

                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* MOBILE LOGOUT */}
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 text-xs font-semibold transition"
                >
                  <LogOut size={16} />
                  <span>{t("logout")}</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* ======================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="flex-1 flex flex-col min-w-0">

          {/* ====================================================
              TOP BAR (Harmonious with page background)
          ==================================================== */}

          <header className="bg-[#F8F7F2]/95 backdrop-blur-sm border-b border-[#E1E4DE] shadow-sm px-4 sm:px-6 py-0 sticky top-0 z-20">

            <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3 h-[64px]">

              {/* MOBILE BRAND */}
              <div className="flex items-center gap-2 lg:hidden">

                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="p-2 rounded-lg bg-[#EEF3EC] text-[#285C3A] hover:bg-[#E1EBDD] transition"
                  aria-label="Open Menu"
                >
                  <Menu size={20} />
                </button>

                <MandiTrackLogo variant="dark" size="md" />
              </div>

              {/* MANDI SELECTOR + CLOCK */}
              <div className="hidden sm:flex items-center gap-3">

                <div className="relative">

                  <button
                    onClick={() => setMandiDropdownOpen(!mandiDropdownOpen)}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#F5EFDE] border border-[#E8DDBF] text-[#19343A] text-xs font-semibold hover:bg-[#F1E8D2] transition"
                  >
                    <MapPin size={14} className="text-[#B58A35]" />
                    <span>{getMandiDisplay(selectedMandi, lang)}</span>
                    <ChevronDown size={14} className="text-[#687779]" />
                  </button>

                  {/* MANDI DROPDOWN */}

                  {mandiDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-56 bg-white border border-[#DCE3DB] rounded-xl shadow-lg p-2 z-40 animate-fadeIn">

                      <div className="px-3 py-1.5 text-[10px] font-bold text-[#8A9695] uppercase tracking-wider">
                        {lang === "mr"
                          ? "बाजार समिती निवडा"
                          : "Select APMC Market"}
                      </div>

                      {MANDI_LIST.map((m) => (
                        <button
                          key={m}
                          onClick={() => {
                            setSelectedMandi(m);
                            setMandiDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                            selectedMandi === m
                              ? "bg-[#EAF2E9] text-[#285C3A]"
                              : "text-[#19343A] hover:bg-[#F8F7F2]"
                          }`}
                        >
                          <span>{getMandiDisplay(m, lang)}</span>

                          {selectedMandi === m && (
                            <CheckCircle2
                              size={13}
                              className="text-[#285C3A]"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* CLOCK */}
                <div className="text-xs font-medium text-[#687779] pl-3 border-l border-[#DCE3DB]">
                  {currentTimeStr}
                </div>
              </div>

              {/* RIGHT CONTROLS */}
              <div className="flex items-center gap-2 sm:gap-3">

                {/* LANGUAGE */}
                <div className="bg-[#F8F7F2] p-0.5 rounded-lg flex items-center border border-[#DCE3DB] text-xs font-semibold select-none">

                  <button
                    onClick={() => setLang("en")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      lang === "en"
                        ? "bg-[#285C3A] text-white shadow-sm"
                        : "text-[#687779] hover:text-[#19343A]"
                    }`}
                  >
                    EN
                  </button>

                  <button
                    onClick={() => setLang("mr")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      lang === "mr"
                        ? "bg-[#285C3A] text-white shadow-sm"
                        : "text-[#687779] hover:text-[#19343A]"
                    }`}
                  >
                    मराठी
                  </button>
                </div>

                {/* NOTIFICATIONS */}
                <div className="relative">

                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="w-9 h-9 rounded-lg bg-[#F8F7F2] border border-[#DCE3DB] hover:bg-[#EEF3EC] text-[#285C3A] flex items-center justify-center transition relative"
                    aria-label={lang === "mr" ? "सूचना" : "Notifications"}
                  >
                    <Bell size={17} />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#B94A48] ring-2 ring-white" />
                  </button>

                  {/* NOTIFICATION POPOVER */}

                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-[#DCE3DB] rounded-xl shadow-lg p-4 z-40 animate-fadeIn">

                      <div className="flex items-center justify-between border-b border-[#E7EBE5] pb-2 mb-3">

                        <span className="font-bold text-xs text-[#19343A]">
                          {lang === "mr"
                            ? "मंडी सूचना"
                            : "Mandi Notifications"}
                        </span>

                        <span className="text-[10px] font-semibold bg-[#F5EFDE] text-[#80672C] px-2 py-1 rounded-full">
                          {lang === "mr"
                            ? "३ नवीन"
                            : "3 New"}
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs">

                        <div className="p-2.5 rounded-lg bg-[#EAF2E9] text-[#214D31]">
                          <span className="font-bold">
                            Lot F-2846
                          </span>{" "}
                          {lang === "mr"
                            ? "वजन मापन टप्प्यावर गेला आहे."
                            : "moved to Weighing checkpoint."}

                          <div className="text-[10px] text-[#5F8068] mt-1">
                            {lang === "mr"
                              ? "१० मिनिटांपूर्वी"
                              : "10 min ago"}
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-[#F5EFDE] text-[#6F531D]">
                          <span className="font-bold">
                            Gate No. 2
                          </span>{" "}
                          {lang === "mr"
                            ? "नियोजित देखभालीसाठी बंद आहे."
                            : "under scheduled maintenance."}

                          <div className="text-[10px] text-[#80672C] mt-1">
                            {lang === "mr"
                              ? "२ तासांपूर्वी"
                              : "2 hours ago"}
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-[#F8F7F2] text-[#19343A]">
                          <span className="font-bold">
                            {lang === "mr"
                              ? "दैनिक APMC भाव"
                              : "Daily APMC Rates"}
                          </span>{" "}
                          {lang === "mr"
                            ? "१८ पिकांसाठी अद्ययावत झाले आहेत."
                            : "updated for 18 crops."}

                          <div className="text-[10px] text-[#687779] mt-1">
                            {lang === "mr"
                              ? "आज सकाळी"
                              : "Today morning"}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>

                {/* PROFILE */}

                <div className="relative">

                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full hover:bg-[#EEF3EC] transition border border-transparent hover:border-[#DCE3DB]"
                  >
                    {/* AVATAR */}
                    <div className="w-8 h-8 rounded-full bg-[#285C3A] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm ring-2 ring-[#EAF2E9]">
                      {initials}
                    </div>

                    {/* USER INFO */}
                    <div className="hidden md:flex flex-col text-left leading-tight">
                      <span className="text-xs font-bold text-[#19343A] truncate max-w-[120px]">
                        {user?.name || "User"}
                      </span>
                      <span className="text-[10px] font-semibold text-[#687779] truncate max-w-[130px]">
                        {roleLabel}
                      </span>
                    </div>

                    <ChevronDown size={14} className="text-[#8A9695] hidden md:block" />
                  </button>

                  {/* PROFILE DROPDOWN */}

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white border border-[#DCE3DB] rounded-xl shadow-lg p-2 z-40 animate-fadeIn">

                      <div className="px-3 py-2 border-b border-[#E7EBE5] mb-1">

                        <div className="text-xs font-bold text-[#19343A] truncate">
                          {user?.name}
                        </div>

                        <div className="text-[10px] font-semibold text-[#687779]">
                          {user?.mobile || user?.officerId}
                        </div>

                      </div>

                      {/* VIEW PROFILE */}

                      <button
                        onClick={() => {
                          handleNavClick("profile");
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#19343A] hover:bg-[#F8F7F2] flex items-center gap-2 transition"
                      >
                        <User
                          size={14}
                          className="text-[#285C3A]"
                        />

                        <span>
                          {lang === "mr"
                            ? "माझे प्रोफाइल"
                            : "View Profile"}
                        </span>
                      </button>

                      {/* HELP */}

                      <button
                        onClick={() => {
                          handleNavClick("help");
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#19343A] hover:bg-[#F8F7F2] flex items-center gap-2 transition"
                      >
                        <HelpCircle
                          size={14}
                          className="text-[#285C3A]"
                        />

                        <span>
                          {lang === "mr"
                            ? "मदत व समर्थन"
                            : "Help & Support"}
                        </span>
                      </button>

                      <div className="border-t border-[#E7EBE5] my-1" />

                      {/* SIGN OUT */}

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);

                          if (onLogout) {
                            onLogout();
                          }
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#A64B4B] hover:bg-[#FAEEEE] flex items-center gap-2 transition"
                      >
                        <LogOut size={14} />

                        <span>{t("logout")}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* ====================================================
              DYNAMIC CONTENT
          ==================================================== */}

          {/* AMBIENT BACKGROUND ORBS */}
          <div className="bg-orb w-[500px] h-[500px] bg-[#285C3A]/8 top-[-100px] right-[-100px]" style={{animationDelay:'0s'}} />
          <div className="bg-orb w-[400px] h-[400px] bg-[#B58A35]/5 bottom-[10%] left-[5%]" style={{animationDelay:'9s'}} />

          <main className="relative z-10 flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <AnimatedPage key={activeTab} className="space-y-6">
              {children}
              <BottomBanner className="mt-8" />
            </AnimatedPage>
          </main>
        </div>
      </div>
    </div>
  );
}