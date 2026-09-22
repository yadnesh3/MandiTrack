import React from "react";
import { useLang } from "../../context/LanguageContext";
import {
  User,
  Phone,
  MapPin,
  ShieldCheck,
  Calendar,
  Globe,
  Award,
  LogOut,
} from "lucide-react";

export default function ProfileView({ user, onLogout }) {
  const { lang, setLang } = useLang();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "MT";

  const roleTitle =
    user?.role === "officer"
      ? "Licensed APMC Market Officer"
      : user?.role === "admin"
      ? "System Administrator"
      : "Verified Agricultural Producer (Farmer)";

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        {/* Large Avatar */}
        <div className="w-20 h-20 rounded-full bg-[#0C192C] text-white font-black text-2xl flex items-center justify-center shrink-0 shadow-md ring-4 ring-emerald-500/30">
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0C192C] tracking-tight">
              {user?.name || "Kisan User"}
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-[#EA8F0B] border border-amber-200 capitalize">
              {user?.role || "Farmer"}
            </span>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
            <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
            <span>{roleTitle}</span>
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 pt-4 border-t border-slate-100 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-1.5">
              <Phone size={14} className="text-slate-400" />
              <span>{user?.mobile || "Not specified"}</span>
            </div>

            {user?.officerId && (
              <div className="flex items-center gap-1.5 font-mono text-emerald-700">
                <span>ID: {user.officerId}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#EA8F0B]" />
              <span>{user?.mandi || "Pune APMC"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details & Settings Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mandi Access & Permissions */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Award size={16} className="text-emerald-600" />
            Mandi Assignment & Access
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[10px] font-bold text-slate-400 uppercase">
                Designated APMC Mandi
              </div>
              <div className="text-sm font-black text-slate-900 mt-0.5">
                {user?.mandi || "Pune APMC"}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {user?.role === "officer"
                  ? "Your operational checkpoints and lot management are restricted to this mandi."
                  : "Your produce lots default to this APMC location."}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[10px] font-bold text-slate-400 uppercase">
                Account Status
              </div>
              <div className="text-xs font-black text-emerald-700 mt-0.5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                Active & Verified by Mandi Administration
              </div>
            </div>
          </div>
        </div>

        {/* Preferences & Language */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Globe size={16} className="text-amber-500" />
            Language & Interface
          </h2>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                Preferred Language
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                    lang === "en"
                      ? "bg-[#0C192C] text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang("mr")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                    lang === "mr"
                      ? "bg-[#0C192C] text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  मराठी
                </button>
              </div>
            </div>

            {onLogout && (
              <div className="pt-2">
                <button
                  onClick={onLogout}
                  className="w-full py-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs transition flex items-center justify-center gap-2 border border-rose-200"
                >
                  <LogOut size={16} />
                  <span>Log Out of MandiTrack</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
