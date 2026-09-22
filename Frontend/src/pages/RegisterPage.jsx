import React, { useState } from "react";
import { registerApi, loginApi } from "../services/api";
import MandiTrackLogo from "../components/MandiTrackLogo";
import { useLang } from "../context/LanguageContext";
import { MANDI_LIST } from "../components/layout/MasterShell";
import { User, Lock, Phone, MapPin, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";

const MOBILE_PATTERN = /^[6-9]\d{9}$/;
const MIN_PASSWORD_LENGTH = 6;

export default function RegisterPage({
  onLoginSuccess,
  onNavigateToLogin,
  onNavigateToHome,
}) {
  const { lang, setLang } = useLang();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [mandi, setMandi] = useState("Pune APMC");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !mobile.trim() || !password) {
      setError("Please fill in your name, mobile number and password.");
      return;
    }

    if (!MOBILE_PATTERN.test(mobile.trim())) {
      setError("Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9.");
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      return;
    }

    setLoading(true);

    try {
      // Farmer only registration enforced
      await registerApi({
        name: name.trim(),
        mobile: mobile.trim(),
        password,
        role: "farmer",
        mandi,
      });

      // Auto-login
      const loginRes = await loginApi({
        mobile: mobile.trim(),
        password,
      });

      localStorage.setItem("manditrack_token", loginRes.token);
      localStorage.setItem("manditrack_user", JSON.stringify(loginRes.user));

      if (onLoginSuccess) {
        onLoginSuccess(loginRes.user, loginRes.token);
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please verify your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col font-sans antialiased text-slate-900 selection:bg-amber-200">
      {/* Top Header */}
      <header className="bg-[#0C192C] text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div onClick={onNavigateToHome} className="cursor-pointer">
            <MandiTrackLogo variant="light" subtitle="Apala Mandi Saathi" size="sm" />
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800 p-0.5 rounded-xl flex items-center border border-slate-700 text-xs font-bold">
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-lg ${
                  lang === "en" ? "bg-[#EA8F0B] text-[#0C192C] font-black" : "text-slate-300"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("mr")}
                className={`px-2.5 py-1 rounded-lg ${
                  lang === "mr" ? "bg-[#EA8F0B] text-[#0C192C] font-black" : "text-slate-300"
                }`}
              >
                मराठी
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Registration Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
          <div className="text-center space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-800 border border-emerald-200">
              Farmer Enrollment
            </span>
            <h1 className="text-2xl font-black text-[#0C192C] tracking-tight mt-2">
              Create Producer Account
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Join MandiTrack to register crops, receive queue tokens and transparent payments.
            </p>
          </div>

          {/* Notice: Officer IDs issued by admin */}
          <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-[11px] font-semibold text-amber-900 flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#EA8F0B] shrink-0" />
            <span>
              Officer accounts are issued solely by Mandi Administrators. This portal is for agricultural producers.
            </span>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name (पूर्ण नाव) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Patil"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                10-Digit Mobile Number (मोबाईल) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400">
                  <Phone size={16} />
                </span>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password (पासवर्ड) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary APMC Market (बाजार समिती) *
              </label>
              <div className="relative">
                <select
                  value={mandi}
                  onChange={(e) => setRegMandi ? setRegMandi(e.target.value) : setMandi(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600"
                >
                  {MANDI_LIST.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#EA8F0B] hover:bg-[#d47f06] text-white font-extrabold text-xs shadow-md transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? "Registering..." : "Create Farmer Account"}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
            Already registered?{" "}
            <button
              onClick={onNavigateToLogin}
              className="font-bold text-emerald-700 hover:underline"
            >
              Sign In here &rarr;
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
