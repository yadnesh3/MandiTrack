import React, { useState } from "react";
import { loginApi } from "../services/api";
import MandiTrackLogo from "../components/MandiTrackLogo";
import { useLang } from "../context/LanguageContext";
import { User, Lock, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";

export default function LoginPage({
  initialRole = "farmer",
  onLoginSuccess,
  onNavigateToRegister,
  onNavigateToHome,
}) {
  const { lang, setLang } = useLang();
  const [role, setRole] = useState(initialRole);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password) {
      setError("Please fill in your Mobile / Officer ID and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginApi({
        mobile: identifier.trim(),
        officerId: identifier.trim(),
        password,
      });

      localStorage.setItem("manditrack_token", response.token);
      localStorage.setItem("manditrack_user", JSON.stringify(response.user));

      if (onLoginSuccess) {
        onLoginSuccess(response.user, response.token);
      }
    } catch (err) {
      setError(
        err.message || "Invalid credentials. Please verify your details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col font-sans antialiased text-slate-900 selection:bg-amber-200">
      {/* Top Dark Header matching master theme */}
      <header className="bg-[#0C192C] text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div
            onClick={onNavigateToHome}
            className="cursor-pointer"
          >
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

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
          <div className="text-center space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-[#EA8F0B] border border-amber-200">
              MandiTrack Official Portal
            </span>
            <h1 className="text-2xl font-black text-[#0C192C] tracking-tight mt-2">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Access produce tracking, mandi checkpoints, and live prices.
            </p>
          </div>

          {/* Role selector pill */}
          <div className="flex p-1 rounded-xl bg-slate-100 text-xs font-bold">
            <button
              type="button"
              onClick={() => setRole("farmer")}
              className={`flex-1 py-1.5 rounded-lg transition ${
                role === "farmer"
                  ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              🌾 Farmer
            </button>
            <button
              type="button"
              onClick={() => setRole("officer")}
              className={`flex-1 py-1.5 rounded-lg transition ${
                role === "officer"
                  ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              👮 Officer
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 py-1.5 rounded-lg transition ${
                role === "admin"
                  ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              🛡️ Admin
            </button>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {role === "officer"
                  ? "Officer ID or Mobile Number *"
                  : role === "admin"
                  ? "Admin Mobile Number *"
                  : "Registered Mobile Number (मोबाईल) *"}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    role === "officer"
                      ? "e.g. OFF-PUN-01 or 9876543210"
                      : "e.g. 9876543210"
                  }
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
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#EA8F0B] hover:bg-[#d47f06] text-white font-extrabold text-xs shadow-md transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? "Authenticating..." : "Sign In to MandiTrack"}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Registration link */}
          <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
            New farmer to MandiTrack?{" "}
            <button
              onClick={onNavigateToRegister}
              className="font-bold text-emerald-700 hover:underline"
            >
              Register your farm account &rarr;
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
