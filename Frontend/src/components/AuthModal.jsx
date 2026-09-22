import React, { useState, useEffect } from "react";
import { loginApi, registerApi } from "../services/api";
import { useLang } from "../context/LanguageContext";
import MandiTrackLogo from "./MandiTrackLogo";
import {
  X,
  Lock,
  Phone,
  User,
  ShieldCheck,
  MapPin,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const MOBILE_PATTERN = /^[6-9]\d{9}$/;
const MIN_PASSWORD_LENGTH = 6;

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login", // "login" | "register"
  defaultRole = "farmer", // "farmer" | "officer" | "admin"
  onLoginSuccess,
}) {
  const { t, lang } = useLang();

  const [mode, setMode] = useState(initialMode);
  const [loginRole, setLoginRole] = useState(defaultRole);

  // Login inputs
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // Register inputs (Farmer only)
  const [regName, setRegName] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regMandi, setRegMandi] = useState("Pune APMC");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setMode(initialMode);
    setLoginRole(defaultRole);
    setError("");
    setSuccessMsg("");
    setLoginIdentifier("");
    setPassword("");
  }, [initialMode, defaultRole, isOpen]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const cleanId = loginIdentifier.trim();
    if (!cleanId || !password) {
      setError("Please enter your Mobile / Officer ID and Password.");
      return;
    }

    setLoading(true);
    try {
      // Backend supports either mobile or officerId
      const res = await loginApi({
        mobile: cleanId,
        officerId: cleanId,
        password,
      });

      localStorage.setItem("manditrack_token", res.token);
      localStorage.setItem("manditrack_user", JSON.stringify(res.user));

      if (onLoginSuccess) {
        onLoginSuccess(res.user, res.token);
      }
      onClose();
    } catch (err) {
      setError(
        err.message || "Invalid credentials. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!regName.trim() || !regMobile.trim() || !regPassword) {
      setError("Please fill in your full name, mobile number and password.");
      return;
    }

    if (!MOBILE_PATTERN.test(regMobile.trim())) {
      setError("Please enter a valid 10-digit mobile number starting with 6, 7, 8 or 9.");
      return;
    }

    if (regPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      return;
    }

    setLoading(true);
    try {
      // Public signup is strictly farmer only
      await registerApi({
        name: regName.trim(),
        mobile: regMobile.trim(),
        password: regPassword,
        role: "farmer",
        mandi: regMandi,
      });

      setSuccessMsg("Account registered successfully! Logging you in...");

      // Automatically log in
      const loginRes = await loginApi({
        mobile: regMobile.trim(),
        password: regPassword,
      });

      localStorage.setItem("manditrack_token", loginRes.token);
      localStorage.setItem("manditrack_user", JSON.stringify(loginRes.user));

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(loginRes.user, loginRes.token);
        }
        onClose();
      }, 800);
    } catch (err) {
      setError(err.message || "Registration failed. Please check your information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0C192C]/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-scaleUp">
        {/* Top Dark Header */}
        <div className="bg-[#0C192C] px-6 py-5 flex items-center justify-between text-white">
          <MandiTrackLogo variant="light" subtitle="Apala Mandi Saathi" size="sm" />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Mode Switcher: Login | Register */}
        <div className="flex border-b border-slate-100 bg-slate-50 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`flex-1 py-3 text-center transition ${
              mode === "login"
                ? "bg-white text-[#0C192C] font-black border-b-2 border-[#EA8F0B]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Sign In (लॉगिन)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError("");
            }}
            className={`flex-1 py-3 text-center transition ${
              mode === "register"
                ? "bg-white text-[#0C192C] font-black border-b-2 border-[#EA8F0B]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Farmer Registration (नोंदणी)
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-7 space-y-4">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
              {successMsg}
            </div>
          )}

          {mode === "login" ? (
            /* LOGIN VIEW */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Role Toggle Pills for Login convenience */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setLoginRole("farmer")}
                  className={`flex-1 py-1.5 rounded-lg transition ${
                    loginRole === "farmer"
                      ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  🌾 Farmer
                </button>
                <button
                  type="button"
                  onClick={() => setLoginRole("officer")}
                  className={`flex-1 py-1.5 rounded-lg transition ${
                    loginRole === "officer"
                      ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  👮 Officer
                </button>
                <button
                  type="button"
                  onClick={() => setLoginRole("admin")}
                  className={`flex-1 py-1.5 rounded-lg transition ${
                    loginRole === "admin"
                      ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  🛡️ Admin
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {loginRole === "officer"
                    ? "Officer ID or Registered Mobile *"
                    : loginRole === "admin"
                    ? "Admin Mobile Number *"
                    : "Mobile Number (मोबाईल क्रमांक) *"}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder={
                      loginRole === "officer"
                        ? "e.g. OFF-PUN-01 or 9876543210"
                        : "e.g. 9876543210"
                    }
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white transition"
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#EA8F0B] hover:bg-[#d47f06] text-white font-extrabold text-xs shadow-md transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                <span>{loading ? "Verifying..." : "Sign In to MandiTrack"}</span>
                <ArrowRight size={14} />
              </button>

              {loginRole === "officer" && (
                <p className="text-[11px] text-slate-400 text-center">
                  Officer accounts are provisioned directly by the Mandi Administrator.
                </p>
              )}
            </form>
          ) : (
            /* REGISTER VIEW (Farmer Only - Requirement 16 enforced) */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 font-semibold flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#EA8F0B] shrink-0" />
                <span>
                  Official registration for farmers & agricultural producers. Officer accounts are issued exclusively by system administrators.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (पूर्ण नाव) *
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Ramesh Patil"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  10-Digit Mobile Number (मोबाईल) *
                </label>
                <input
                  type="tel"
                  value={regMobile}
                  onChange={(e) => setRegMobile(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password (पासवर्ड) *
                </label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Mandi Market (बाजार समिती) *
                </label>
                <select
                  value={regMandi}
                  onChange={(e) => setRegMandi(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600"
                >
                  <option value="Pune APMC">Pune APMC (पुणे)</option>
                  <option value="Navi Mumbai APMC">Navi Mumbai APMC (नवी मुंबई)</option>
                  <option value="Nashik APMC">Nashik APMC (नाशिक)</option>
                  <option value="Thane APMC">Thane APMC (ठाणे)</option>
                  <option value="Nagpur APMC">Nagpur APMC (नागपूर)</option>
                  <option value="Kolhapur APMC">Kolhapur APMC (कोल्हापूर)</option>
                  <option value="Latur APMC">Latur APMC (लातूर)</option>
                </select>
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
          )}
        </div>
      </div>
    </div>
  );
}
