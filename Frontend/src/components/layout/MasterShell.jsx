import React, { useState, useEffect } from "react";
import MandiTrackLogo from "../MandiTrackLogo";
import BottomBanner from "../common/BottomBanner";
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
  "Kolhapur APMC",
  "Latur APMC",
  "Solapur APMC",
  "Kalyan APMC",
];

export default function MasterShell({
  user,
  activeTab = "dashboard",
  onSelectTab,
  onLogout,
  onOpenVoiceHelp,
  children,
}) {
  const { lang, setLang } = useLang();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [selectedMandi, setSelectedMandi] = useState(
    user?.mandi || "Pune APMC"
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

      const formatted = now.toLocaleString("en-GB", options);

      const parts = formatted.split(", ");

      if (parts.length >= 2) {
        const datePart =
          parts[0] + ", " + parts[1].replace(/,/g, "");

        const timePart = parts[2] || "";

        setCurrentTimeStr(
          `${datePart} | ${timePart}`.replace("at ", "")
        );
      } else {
        setCurrentTimeStr(formatted);
      }
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

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
          label: "Dashboard",
          icon: Home,
        },
        {
          id: "manage-officers",
          label: "Manage Officers",
          icon: ShieldCheck,
        },
        {
          id: "all-lots",
          label: "All Lots",
          icon: Package,
        },
        {
          id: "mandi-prices",
          label: "Mandi Prices",
          icon: BarChart3,
        },
        {
          id: "reports",
          label: "Reports",
          icon: FileText,
        },
        {
          id: "announcements",
          label: "Announcements",
          icon: Megaphone,
        },
        {
          id: "voice-assistant",
          label: "Voice Assistant",
          icon: Mic,
        },
        {
          id: "profile",
          label: "Profile",
          icon: User,
        },
        {
          id: "help",
          label: "Help & Support",
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
          label: "Dashboard",
          icon: Home,
        },
        {
          id: "waiting-queue",
          label: "Waiting Queue",
          icon: Clock,
        },
        {
          id: "process-lot",
          label: "Process Lot",
          icon: Settings,
        },
        {
          id: "all-lots",
          label: "All Lots",
          icon: Package,
        },
        {
          id: "mandi-prices",
          label: "Mandi Prices",
          icon: BarChart3,
        },
        {
          id: "reports",
          label: "Reports",
          icon: FileText,
        },
        {
          id: "announcements",
          label: "Announcements",
          icon: Megaphone,
        },
        {
          id: "voice-assistant",
          label: "Voice Assistant",
          icon: Mic,
        },
        {
          id: "profile",
          label: "Profile",
          icon: User,
        },
        {
          id: "help",
          label: "Help & Support",
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
        label: "Dashboard",
        icon: Home,
      },
      {
        id: "add-produce",
        label: "Add Produce",
        icon: PlusCircle,
      },
      {
        id: "my-lots",
        label: "My Lots",
        icon: Package,
      },
      {
        id: "lot-tracking",
        label: "Lot Tracking",
        icon: Clock,
      },
      {
        id: "mandi-prices",
        label: "Mandi Prices",
        icon: BarChart3,
      },
      {
        id: "announcements",
        label: "Announcements",
        icon: Megaphone,
      },
      {
        id: "voice-assistant",
        label: "Voice Assistant",
        icon: Mic,
      },
      {
        id: "profile",
        label: "Profile",
        icon: User,
      },
      {
        id: "help",
        label: "Help & Support",
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
      ? `Officer (${selectedMandi})`
      : role === "admin"
      ? "System Administrator"
      : `Farmer (${selectedMandi})`;

  return (
    <div className="min-h-screen bg-[#F8F7F2] flex flex-col font-sans text-[#19343A] antialiased selection:bg-[#F5EFDE]">
      <div className="flex flex-1 relative">

        {/* ======================================================
            DESKTOP SIDEBAR
        ====================================================== */}

        <aside className="hidden lg:flex w-64 xl:w-70 bg-white text-[#19343A] flex-col shrink-0 shadow-[2px_0_12px_rgba(25,52,58,0.05)] border-r border-[#DCE3DB] sticky top-0 h-screen z-30 overflow-y-auto">

          {/* BRAND */}

          <div className="px-6 pt-6 pb-5 border-b border-[#E7EBE5]">
            <MandiTrackLogo
              variant="dark"
              subtitle=""
              size="md"
            />
          </div>

          {/* NAVIGATION */}

          <nav className="flex-1 px-3.5 py-5 space-y-1.5 overflow-y-auto">

            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A9695]">
              Main Menu
            </div>

            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-semibold text-xs sm:text-[13px] transition-all text-left group border ${
                    isActive
                      ? "bg-[#F5EFDE] border-[#E8DDBF] text-[#214D31] shadow-sm"
                      : "border-transparent text-[#526765] hover:bg-[#F8F7F2] hover:text-[#285C3A]"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? "bg-[#B58A35] text-white"
                        : "bg-[#EEF3EC] text-[#477A7A] group-hover:bg-[#EAF2E9] group-hover:text-[#285C3A]"
                    }`}
                  >
                    <Icon
                      size={17}
                      strokeWidth={isActive ? 2.4 : 2}
                    />
                  </span>

                  <span className="truncate flex-1">
                    {item.label}
                  </span>

                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B58A35] shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CLEAN SIDEBAR FOOTER */}

          <div className="border-t border-[#E7EBE5] px-5 py-4">
            <div className="flex items-center gap-2 text-[10px] text-[#7B8987]">
              <span className="w-2 h-2 rounded-full bg-[#6D9B76]" />

              <span>
                MandiTrack &bull; Govt. of Maharashtra Initiative
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
              className="fixed inset-0 bg-[#19343A]/55 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileSidebarOpen(false)}
            />

            {/* DRAWER */}

            <aside className="relative w-72 bg-white text-[#19343A] flex flex-col h-full shadow-2xl z-10 overflow-y-auto">

              {/* MOBILE HEADER */}

              <div className="px-5 py-5 flex items-center justify-between border-b border-[#E7EBE5]">

                <MandiTrackLogo
                  variant="dark"
                  subtitle=""
                  size="sm"
                />

                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg bg-[#F8F7F2] border border-[#DCE3DB] text-[#526765] hover:bg-[#EEF3EC] hover:text-[#285C3A] flex items-center justify-center transition"
                  aria-label="Close Menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* MOBILE NAVIGATION */}

              <nav className="flex-1 px-3.5 py-5 space-y-1.5">

                <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A9695]">
                  Main Menu
                </div>

                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-semibold text-xs transition-all text-left border ${
                        isActive
                          ? "bg-[#F5EFDE] border-[#E8DDBF] text-[#214D31]"
                          : "border-transparent text-[#526765] hover:bg-[#F8F7F2] hover:text-[#285C3A]"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive
                            ? "bg-[#B58A35] text-white"
                            : "bg-[#EEF3EC] text-[#477A7A]"
                        }`}
                      >
                        <Icon
                          size={17}
                          strokeWidth={isActive ? 2.4 : 2}
                        />
                      </span>

                      <span className="flex-1">
                        {item.label}
                      </span>

                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B58A35]" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* MOBILE LOGOUT */}

              <div className="p-4 border-t border-[#E7EBE5]">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#FAEEEE] border border-[#E8CCCC] text-[#A64B4B] hover:bg-[#F7E4E4] text-xs font-semibold transition"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
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
              TOP BAR
          ==================================================== */}

          <header className="bg-white border-b border-[#DCE3DB] px-4 sm:px-6 py-3 sticky top-0 z-20 shadow-sm">

            <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3">

              {/* MOBILE BRAND */}

              <div className="flex items-center gap-2 lg:hidden">

                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="p-2 rounded-lg bg-[#EEF3EC] text-[#285C3A] hover:bg-[#E1EBDD] transition"
                  aria-label="Open Menu"
                >
                  <Menu size={20} />
                </button>

                <MandiTrackLogo
                  variant="dark"
                  subtitle=""
                  size="sm"
                />
              </div>

              {/* MANDI SELECTOR + CLOCK */}

              <div className="hidden sm:flex items-center gap-3">

                <div className="relative">

                  <button
                    onClick={() =>
                      setMandiDropdownOpen(
                        !mandiDropdownOpen
                      )
                    }
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#F5EFDE] border border-[#E8DDBF] text-[#19343A] text-xs font-semibold hover:bg-[#F1E8D2] transition"
                  >
                    <MapPin
                      size={14}
                      className="text-[#B58A35]"
                    />

                    <span>{selectedMandi}</span>

                    <ChevronDown
                      size={14}
                      className="text-[#687779]"
                    />
                  </button>

                  {/* MANDI DROPDOWN */}

                  {mandiDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-56 bg-white border border-[#DCE3DB] rounded-xl shadow-lg p-2 z-40 animate-fadeIn">

                      <div className="px-3 py-1.5 text-[10px] font-bold text-[#8A9695] uppercase tracking-wider">
                        Select APMC Market
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
                          <span>{m}</span>

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
                  {currentTimeStr ||
                    "Tue, 12 Aug 2025 | 10:15 AM"}
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
                    onClick={() =>
                      setNotificationsOpen(
                        !notificationsOpen
                      )
                    }
                    className="w-9 h-9 rounded-lg bg-[#F8F7F2] border border-[#DCE3DB] hover:bg-[#EEF3EC] text-[#285C3A] flex items-center justify-center transition relative"
                    aria-label="Notifications"
                  >
                    <Bell size={17} />

                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#B94A48] ring-2 ring-white" />
                  </button>

                  {/* NOTIFICATION POPOVER */}

                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-[#DCE3DB] rounded-xl shadow-lg p-4 z-40 animate-fadeIn">

                      <div className="flex items-center justify-between border-b border-[#E7EBE5] pb-2 mb-3">

                        <span className="font-bold text-xs text-[#19343A]">
                          Mandi Notifications
                        </span>

                        <span className="text-[10px] font-semibold bg-[#F5EFDE] text-[#80672C] px-2 py-1 rounded-full">
                          3 New
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs">

                        <div className="p-2.5 rounded-lg bg-[#EAF2E9] text-[#214D31]">
                          <span className="font-bold">
                            Lot F-2846
                          </span>{" "}
                          moved to Weighing checkpoint.

                          <div className="text-[10px] text-[#5F8068] mt-1">
                            10 min ago
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-[#F5EFDE] text-[#6F531D]">
                          <span className="font-bold">
                            Gate No. 2
                          </span>{" "}
                          under scheduled maintenance.

                          <div className="text-[10px] text-[#80672C] mt-1">
                            2 hours ago
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-[#F8F7F2] text-[#19343A]">
                          <span className="font-bold">
                            Daily APMC Rates
                          </span>{" "}
                          updated for 18 crops.

                          <div className="text-[10px] text-[#687779] mt-1">
                            Today morning
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>

                {/* PROFILE */}

                <div className="relative">

                  <button
                    onClick={() =>
                      setProfileDropdownOpen(
                        !profileDropdownOpen
                      )
                    }
                    className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full hover:bg-[#F8F7F2] transition border border-transparent hover:border-[#DCE3DB]"
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

                    <ChevronDown
                      size={14}
                      className="text-[#8A9695] hidden md:block"
                    />
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

                        <span>View Profile</span>
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

                        <span>Help & Support</span>
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

                        <span>Sign Out</span>
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

          <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
            {children}

            {/* Bottom Banner */}
            <BottomBanner className="mt-8" />
          </main>
        </div>
      </div>
    </div>
  );
}