import React, { useState, useEffect } from "react";
import MandiTrackLogo from "../MandiTrackLogo";
import SidebarChalkArt from "../common/SidebarChalkArt";
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
  const [selectedMandi, setSelectedMandi] = useState(user?.mandi || "Pune APMC");
  const [mandiDropdownOpen, setMandiDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Live formatted date & time clock matching reference "Tue, 12 Aug 2025 | 10:15 AM"
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
      // Transform into "Tue, 12 Aug 2025 | 10:15 AM" format
      const parts = formatted.split(", ");
      if (parts.length >= 2) {
        const datePart = parts[0] + ", " + parts[1].replace(/,/g, "");
        const timePart = parts[2] || "";
        setCurrentTimeStr(`${datePart} | ${timePart}`.replace("at ", ""));
      } else {
        setCurrentTimeStr(formatted);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update selected mandi if user's changes
  useEffect(() => {
    if (user?.mandi) setSelectedMandi(user.mandi);
  }, [user?.mandi]);

  // Define navigation items based on user role
  const role = user?.role || "farmer";

  const getNavItems = () => {
    if (role === "admin") {
      return [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "manage-officers", label: "Manage Officers", icon: ShieldCheck },
        { id: "all-lots", label: "All Lots", icon: Package },
        { id: "mandi-prices", label: "Mandi Prices", icon: BarChart3 },
        { id: "reports", label: "Reports", icon: FileText },
        { id: "announcements", label: "Announcements", icon: Megaphone },
        { id: "voice-assistant", label: "Voice Assistant", icon: Mic },
        { id: "profile", label: "Profile", icon: User },
        { id: "help", label: "Help & Support", icon: HelpCircle },
      ];
    }

    if (role === "officer") {
      return [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "waiting-queue", label: "Waiting Queue", icon: Clock },
        { id: "process-lot", label: "Process Lot", icon: Settings },
        { id: "all-lots", label: "All Lots", icon: Package },
        { id: "mandi-prices", label: "Mandi Prices", icon: BarChart3 },
        { id: "reports", label: "Reports", icon: FileText },
        { id: "announcements", label: "Announcements", icon: Megaphone },
        { id: "voice-assistant", label: "Voice Assistant", icon: Mic },
        { id: "profile", label: "Profile", icon: User },
        { id: "help", label: "Help & Support", icon: HelpCircle },
      ];
    }

    // Default: Farmer
    return [
      { id: "dashboard", label: "Dashboard", icon: Home },
      { id: "add-produce", label: "Add Produce", icon: PlusCircle },
      { id: "my-lots", label: "My Lots", icon: Package },
      { id: "lot-tracking", label: "Lot Tracking", icon: Clock },
      { id: "mandi-prices", label: "Mandi Prices", icon: BarChart3 },
      { id: "announcements", label: "Announcements", icon: Megaphone },
      { id: "voice-assistant", label: "Voice Assistant", icon: Mic },
      { id: "profile", label: "Profile", icon: User },
      { id: "help", label: "Help & Support", icon: HelpCircle },
    ];
  };

  const navItems = getNavItems();

  const handleNavClick = (id) => {
    if (id === "voice-assistant" && onOpenVoiceHelp) {
      onOpenVoiceHelp();
    } else if (onSelectTab) {
      onSelectTab(id);
    }
    setMobileSidebarOpen(false);
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "MT";

  const roleLabel =
    role === "officer"
      ? `Officer (${selectedMandi})`
      : role === "admin"
      ? "System Administrator"
      : `Farmer (${selectedMandi})`;

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col font-sans text-slate-900 antialiased selection:bg-amber-200">
      <div className="flex flex-1 relative">
        {/* =========================================================
            LEFT SIDEBAR (DESKTOP & TABLET)
        ========================================================= */}
        <aside className="hidden lg:flex w-64 xl:w-70 bg-[#0C192C] text-white flex-col justify-between shrink-0 shadow-xl border-r border-slate-800/80 sticky top-0 h-screen z-30 overflow-y-auto">
          {/* Top Brand Logo */}
          <div className="p-6 pb-4 border-b border-slate-800/80">
            <MandiTrackLogo variant="light" subtitle="Apala Mandi Saathi" size="md" />
          </div>

          {/* Navigation List matching reference */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-[13px] transition-all text-left group ${
                    isActive
                      ? "bg-[#EA8F0B] text-[#0C192C] shadow-md font-extrabold"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon
                    size={18}
                    className={`shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? "text-[#0C192C] fill-current" : "text-slate-300"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Lower Section: Chalk Art + Govt of Maharashtra Footer */}
          <div className="border-t border-slate-800/80 pt-2 pb-4 space-y-3">
            <SidebarChalkArt />

            <div className="px-5 pt-2 flex items-center gap-2 border-t border-slate-800/60 text-[10px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>MandiTrack &bull; Govt. of Maharashtra Initiative</span>
            </div>
          </div>
        </aside>

        {/* =========================================================
            MOBILE SIDEBAR DRAWER (OVERLAY)
        ========================================================= */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileSidebarOpen(false)}
            />

            {/* Sidebar drawer panel */}
            <aside className="relative w-72 bg-[#0C192C] text-white flex flex-col justify-between h-full shadow-2xl z-10 overflow-y-auto">
              <div className="p-5 flex items-center justify-between border-b border-slate-800">
                <MandiTrackLogo variant="light" subtitle="Apala Mandi Saathi" size="sm" />
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all text-left ${
                        isActive
                          ? "bg-[#EA8F0B] text-[#0C192C] shadow-md font-extrabold"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-800">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-950/40 text-red-300 hover:bg-red-900/50 text-xs font-bold transition"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* =========================================================
            MAIN CONTENT AREA
        ========================================================= */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* =======================================================
              TOP BAR MATCHING REFERENCE
          ======================================================= */}
          <header className="bg-white border-b border-slate-200/90 px-4 sm:px-6 py-3 sticky top-0 z-20 shadow-2xs">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3">
              {/* Mobile Hamburger Button */}
              <div className="flex items-center gap-2 lg:hidden">
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                  aria-label="Open Menu"
                >
                  <Menu size={20} />
                </button>
                <MandiTrackLogo variant="dark" subtitle="" size="sm" />
              </div>

              {/* Mandi Location Pill Selector matching reference */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setMandiDropdownOpen(!mandiDropdownOpen)}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50/70 border border-amber-200 text-slate-800 text-xs font-bold hover:bg-amber-100/70 transition shadow-2xs"
                  >
                    <MapPin size={14} className="text-[#EA8F0B]" />
                    <span>{selectedMandi}</span>
                    <ChevronDown size={14} className="text-slate-400" />
                  </button>

                  {/* Dropdown list */}
                  {mandiDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-40 animate-fadeIn">
                      <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Select APMC Market
                      </div>
                      {MANDI_LIST.map((m) => (
                        <button
                          key={m}
                          onClick={() => {
                            setSelectedMandi(m);
                            setMandiDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between ${
                            selectedMandi === m
                              ? "bg-amber-50 text-amber-900 font-bold"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>{m}</span>
                          {selectedMandi === m && (
                            <CheckCircle2 size={13} className="text-[#EA8F0B]" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Live Clock / Date matching reference */}
                <div className="text-xs font-semibold text-slate-500 pl-2 border-l border-slate-200">
                  {currentTimeStr || "Tue, 12 Aug 2025 | 10:15 AM"}
                </div>
              </div>

              {/* Right Side Controls: Language Switch, Notification, User Profile */}
              <div className="flex items-center gap-3">
                {/* Language Switch Pill matching reference: [EN | मराठी] */}
                <div className="bg-slate-100 p-0.5 rounded-xl flex items-center border border-slate-200 text-xs font-bold select-none">
                  <button
                    onClick={() => setLang("en")}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      lang === "en"
                        ? "bg-[#0C192C] text-white shadow-xs font-extrabold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang("mr")}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      lang === "mr"
                        ? "bg-[#0C192C] text-white shadow-xs font-extrabold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    मराठी
                  </button>
                </div>

                {/* Notification Bell with red alert dot */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition relative"
                    aria-label="Notifications"
                  >
                    <Bell size={17} />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
                  </button>

                  {/* Notification Popover */}
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-40 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                        <span className="font-extrabold text-xs text-slate-900">
                          Mandi Notifications
                        </span>
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          3 New
                        </span>
                      </div>
                      <div className="space-y-2.5 text-xs">
                        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-900">
                          <span className="font-bold">Lot F-2846</span> moved to Weighing checkpoint.
                          <div className="text-[10px] text-emerald-700 mt-0.5">10 min ago</div>
                        </div>
                        <div className="p-2 rounded-xl bg-amber-50 text-amber-900">
                          <span className="font-bold">Gate No. 2</span> under scheduled maintenance.
                          <div className="text-[10px] text-amber-700 mt-0.5">2 hours ago</div>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 text-slate-800">
                          <span className="font-bold">Daily APMC Rates</span> updated for 18 crops.
                          <div className="text-[10px] text-slate-500 mt-0.5">Today morning</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Pill matching reference */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
                  >
                    {/* Circle Avatar matching "SS" in reference */}
                    <div className="w-8 h-8 rounded-full bg-[#0C192C] text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-xs ring-2 ring-emerald-500/40">
                      {initials}
                    </div>

                    <div className="hidden md:flex flex-col text-left leading-tight">
                      <span className="text-xs font-extrabold text-slate-900 truncate max-w-[120px]">
                        {user?.name || "User"}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 truncate max-w-[130px]">
                        {roleLabel}
                      </span>
                    </div>

                    <ChevronDown size={14} className="text-slate-400 hidden md:block" />
                  </button>

                  {/* Profile & Logout Dropdown */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-40 animate-fadeIn">
                      <div className="px-3 py-2 border-b border-slate-100 mb-1">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {user?.name}
                        </div>
                        <div className="text-[10px] font-semibold text-slate-500">
                          {user?.mobile || user?.officerId}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          handleNavClick("profile");
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <User size={14} />
                        <span>View Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          handleNavClick("help");
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <HelpCircle size={14} />
                        <span>Help & Support</span>
                      </button>

                      <div className="border-t border-slate-100 my-1" />

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          if (onLogout) onLogout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 flex items-center gap-2 transition"
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

          {/* =======================================================
              DYNAMIC VIEW CONTENT (CHILDREN)
          ======================================================= */}
          <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
            {children}

            {/* Bottom Green Footer Banner matching reference */}
            <BottomBanner className="mt-8" />
          </main>
        </div>
      </div>
    </div>
  );
}
