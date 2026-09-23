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
  Sprout,
  Globe2,
  CheckCircle2,
} from "lucide-react";

const MOBILE_PATTERN = /^[6-9]\d{9}$/;
const MIN_PASSWORD_LENGTH = 6;

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
  defaultRole = "farmer",
  onLoginSuccess,
}) {
  const { lang, setLang } = useLang();

  const [mode, setMode] = useState(initialMode);
  const [loginRole, setLoginRole] = useState(defaultRole);

  // Login
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // Registration
  const [regName, setRegName] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regMandi, setRegMandi] = useState("Pune APMC");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const isMarathi = lang === "mr";

  useEffect(() => {
    setMode(initialMode);
    setLoginRole(defaultRole);
    setError("");
    setSuccessMsg("");
    setLoginIdentifier("");
    setPassword("");
  }, [initialMode, defaultRole, isOpen]);

  if (!isOpen) return null;

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMsg("");

    const cleanId = loginIdentifier.trim();

    if (!cleanId || !password) {
      setError(
        isMarathi
          ? "कृपया मोबाईल / अधिकारी ID आणि पासवर्ड भरा."
          : "Please enter your Mobile / Officer ID and Password."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await loginApi({
        mobile: cleanId,
        officerId: cleanId,
        password,
      });

      localStorage.setItem("manditrack_token", res.token);

      localStorage.setItem(
        "manditrack_user",
        JSON.stringify(res.user)
      );

      if (onLoginSuccess) {
        onLoginSuccess(res.user, res.token);
      }

      onClose();
    } catch (err) {
      setError(
        err.message ||
          (isMarathi
            ? "लॉगिन माहिती तपासा आणि पुन्हा प्रयत्न करा."
            : "Invalid credentials. Please check your details and try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     REGISTRATION
  ========================================================= */

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMsg("");

    if (!regName.trim() || !regMobile.trim() || !regPassword) {
      setError(
        isMarathi
          ? "कृपया तुमचे पूर्ण नाव, मोबाईल नंबर आणि पासवर्ड भरा."
          : "Please fill in your full name, mobile number and password."
      );
      return;
    }

    if (!MOBILE_PATTERN.test(regMobile.trim())) {
      setError(
        isMarathi
          ? "6, 7, 8 किंवा 9 ने सुरू होणारा वैध 10 अंकी मोबाईल नंबर टाका."
          : "Please enter a valid 10-digit mobile number starting with 6, 7, 8 or 9."
      );
      return;
    }

    if (regPassword.length < MIN_PASSWORD_LENGTH) {
      setError(
        isMarathi
          ? `पासवर्ड किमान ${MIN_PASSWORD_LENGTH} अक्षरांचा असावा.`
          : `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      );
      return;
    }

    setLoading(true);

    try {
      // Farmer-only public registration
      await registerApi({
        name: regName.trim(),
        mobile: regMobile.trim(),
        password: regPassword,
        role: "farmer",
        mandi: regMandi,
      });

      setSuccessMsg(
        isMarathi
          ? "खाते यशस्वीपणे तयार झाले! लॉगिन करत आहे..."
          : "Account registered successfully! Logging you in..."
      );

      // Auto-login
      const loginRes = await loginApi({
        mobile: regMobile.trim(),
        password: regPassword,
      });

      localStorage.setItem(
        "manditrack_token",
        loginRes.token
      );

      localStorage.setItem(
        "manditrack_user",
        JSON.stringify(loginRes.user)
      );

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(
            loginRes.user,
            loginRes.token
          );
        }

        onClose();
      }, 800);
    } catch (err) {
      setError(
        err.message ||
          (isMarathi
            ? "नोंदणी अयशस्वी झाली. कृपया तुमची माहिती तपासा."
            : "Registration failed. Please check your information.")
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     ROLE INFORMATION
  ========================================================= */

  const roleData = {
    farmer: {
      label: isMarathi ? "शेतकरी" : "Farmer",
      icon: <Sprout size={15} />,
    },

    officer: {
      label: isMarathi ? "अधिकारी" : "Officer",
      icon: <ShieldCheck size={15} />,
    },

    admin: {
      label: isMarathi ? "अॅडमिन" : "Admin",
      icon: <ShieldCheck size={15} />,
    },
  };

  /* =========================================================
     MODAL
  ========================================================= */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}

      <div
        className="absolute inset-0 bg-[#19343A]/65 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-[900px] overflow-hidden rounded-2xl border border-[#DCE3DB] bg-white shadow-[0_24px_80px_rgba(25,52,58,0.22)] animate-scaleUp">
        {/* =====================================================
            LEFT PANEL
        ====================================================== */}

        <div className="hidden w-[38%] flex-col justify-between bg-[#285C3A] p-8 text-white md:flex">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Sprout size={20} />
            </div>

            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[2px] text-[#D9E8D9]">
              MandiTrack
            </p>

            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.6px]">
              {mode === "register"
                ? isMarathi
                  ? "मंडी प्रवासाची सुरुवात करा."
                  : "Start your mandi journey."
                : isMarathi
                  ? "तुमच्या मंडी खात्यात प्रवेश करा."
                  : "Access your mandi account."}
            </h2>

            <p className="mt-4 text-xs leading-6 text-[#D5E3D7]">
              {mode === "register"
                ? isMarathi
                  ? "उत्पादन जमा करा, लॉट ट्रॅक करा आणि मंडी माहिती मिळवा."
                  : "Submit produce, track lots and access mandi information."
                : isMarathi
                  ? "MandiTrack वर तुमच्या उत्पादनाशी संबंधित माहिती एका ठिकाणी व्यवस्थापित करा."
                  : "Manage your produce-related information through one simple platform."}
            </p>
          </div>

          <div className="space-y-3">
            <ModalBenefit
              text={
                isMarathi
                  ? "शेतकरी-अनुकूल प्रक्रिया"
                  : "Farmer-friendly workflow"
              }
            />

            <ModalBenefit
              text={
                isMarathi
                  ? "डिजिटल लॉट ट्रॅकिंग"
                  : "Digital lot tracking"
              }
            />

            <ModalBenefit
              text={
                isMarathi
                  ? "इंग्रजी आणि मराठी"
                  : "English and Marathi"
              }
            />
          </div>
        </div>

        {/* =====================================================
            RIGHT CONTENT
        ====================================================== */}

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}

          <div className="flex items-center justify-between border-b border-[#E1E4DE] bg-[#F8F7F2] px-5 py-4 sm:px-7">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#285C3A] md:hidden">
                <Sprout
                  size={17}
                  className="text-white"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#19343A]">
                  <span className="text-[#285C3A]">
                    Mandi
                  </span>
                  <span className="text-[#B58A35]">
                    Track
                  </span>
                </p>

                <p className="text-[9px] text-[#758181]">
                  Apala Mandi Saathi
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Language */}

              <button
                type="button"
                onClick={() =>
                  setLang(lang === "en" ? "mr" : "en")
                }
                className="flex items-center gap-1.5 rounded-lg border border-[#D5DAD4] bg-white px-2.5 py-1.5 text-[10px] font-semibold text-[#596769] transition hover:border-[#285C3A] hover:text-[#285C3A]"
              >
                <Globe2 size={13} />

                {lang === "en"
                  ? "मराठी"
                  : "English"}
              </button>

              {/* Close */}

              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D5DAD4] bg-white text-[#718080] transition hover:border-[#BFC8C0] hover:bg-[#F1F3EF] hover:text-[#19343A]"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Mode Switcher */}

          <div className="grid grid-cols-2 border-b border-[#E1E4DE] bg-white">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
                setSuccessMsg("");
              }}
              className={`relative py-3.5 text-xs font-semibold transition ${
                mode === "login"
                  ? "text-[#285C3A]"
                  : "text-[#7A8585] hover:text-[#285C3A]"
              }`}
            >
              {isMarathi
                ? "लॉगिन"
                : "Sign In"}

              {mode === "login" && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-16 -translate-x-1/2 rounded-full bg-[#285C3A]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError("");
                setSuccessMsg("");
              }}
              className={`relative py-3.5 text-xs font-semibold transition ${
                mode === "register"
                  ? "text-[#285C3A]"
                  : "text-[#7A8585] hover:text-[#285C3A]"
              }`}
            >
              {isMarathi
                ? "शेतकरी नोंदणी"
                : "Farmer Registration"}

              {mode === "register" && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-24 -translate-x-1/2 rounded-full bg-[#285C3A]" />
              )}
            </button>
          </div>

          {/* Scrollable content */}

          <div className="overflow-y-auto p-5 sm:p-7">
            {/* Heading */}

            <div className="mb-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E1D8] bg-[#EEF3EC] px-3 py-1.5 text-[10px] font-semibold text-[#386044]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4C8658]" />

                {mode === "register"
                  ? isMarathi
                    ? "शेतकरी नोंदणी"
                    : "Farmer registration"
                  : isMarathi
                    ? "सुरक्षित पोर्टल प्रवेश"
                    : "Secure portal access"}
              </div>

              <h1 className="mt-3 text-2xl font-semibold tracking-[-0.7px] text-[#19343A]">
                {mode === "register"
                  ? isMarathi
                    ? "तुमचे खाते तयार करा"
                    : "Create your account"
                  : isMarathi
                    ? "तुमच्या खात्यात लॉगिन करा"
                    : "Sign in to your account"}
              </h1>

              <p className="mt-1.5 text-xs leading-5 text-[#687779]">
                {mode === "register"
                  ? isMarathi
                    ? "MandiTrack वापरण्यासाठी तुमची मूलभूत माहिती नोंदवा."
                    : "Enter your details to get started with MandiTrack."
                  : isMarathi
                    ? "तुमच्या MandiTrack खात्यात सुरक्षितपणे प्रवेश करा."
                    : "Access your MandiTrack account securely."}
              </p>
            </div>

            {/* Error */}

            {error && (
              <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-[#EBCBC7] bg-[#FFF5F3] p-3 text-xs font-medium text-[#9B3C32]">
                <AlertCircle
                  size={15}
                  className="mt-0.5 shrink-0"
                />

                <span>{error}</span>
              </div>
            )}

            {/* Success */}

            {successMsg && (
              <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-[#CFE0D1] bg-[#EEF6EE] p-3 text-xs font-medium text-[#386044]">
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0"
                />

                <span>{successMsg}</span>
              </div>
            )}

            {/* =================================================
                LOGIN
            ================================================= */}

            {mode === "login" ? (
              <form
                onSubmit={handleLoginSubmit}
                className="space-y-4"
              >
                {/* Role */}

                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[1px] text-[#7A8585]">
                    {isMarathi
                      ? "पोर्टल निवडा"
                      : "Select portal"}
                  </p>

                  <div className="grid grid-cols-3 gap-1 rounded-xl border border-[#DCE3DB] bg-[#F3F5F1] p-1">
                    {Object.entries(roleData).map(
                      ([role, data]) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() =>
                            setLoginRole(role)
                          }
                          className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-[11px] font-semibold transition ${
                            loginRole === role
                              ? "bg-white text-[#285C3A] shadow-[0_1px_4px_rgba(39,72,52,0.08)]"
                              : "text-[#718080] hover:text-[#285C3A]"
                          }`}
                        >
                          {data.icon}
                          {data.label}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Identifier */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#465557]">
                    {loginRole === "officer"
                      ? isMarathi
                        ? "अधिकारी ID किंवा मोबाईल नंबर"
                        : "Officer ID or Registered Mobile"
                      : loginRole === "admin"
                        ? isMarathi
                          ? "अॅडमिन मोबाईल नंबर"
                          : "Admin Mobile Number"
                        : isMarathi
                          ? "मोबाईल नंबर"
                          : "Mobile Number"}

                    <span className="ml-1 text-[#B44D42]">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9695]"
                    />

                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) =>
                        setLoginIdentifier(
                          e.target.value
                        )
                      }
                      placeholder={
                        loginRole === "officer"
                          ? "OFF-PUN-01 / 9876543210"
                          : "9876543210"
                      }
                      className="w-full rounded-lg border border-[#D6DED7] bg-[#FAFBF9] py-3 pl-10 pr-4 text-sm text-[#19343A] outline-none transition placeholder:text-[#9AA4A3] focus:border-[#285C3A] focus:bg-white focus:ring-2 focus:ring-[#285C3A]/10"
                      required
                    />
                  </div>
                </div>

                {/* Password */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#465557]">
                    {isMarathi
                      ? "पासवर्ड"
                      : "Password"}

                    <span className="ml-1 text-[#B44D42]">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9695]"
                    />

                    <input
                      type="password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder={
                        isMarathi
                          ? "तुमचा पासवर्ड टाका"
                          : "Enter your password"
                      }
                      className="w-full rounded-lg border border-[#D6DED7] bg-[#FAFBF9] py-3 pl-10 pr-4 text-sm text-[#19343A] outline-none transition placeholder:text-[#9AA4A3] focus:border-[#285C3A] focus:bg-white focus:ring-2 focus:ring-[#285C3A]/10"
                      required
                    />
                  </div>
                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#285C3A] py-3.5 text-sm font-semibold text-white transition hover:bg-[#214D31] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? isMarathi
                      ? "प्रमाणीकरण सुरू आहे..."
                      : "Verifying..."
                    : isMarathi
                      ? "MandiTrack मध्ये लॉगिन करा"
                      : "Sign In to MandiTrack"}

                  {!loading && (
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}
                </button>

                {loginRole === "officer" && (
                  <div className="flex items-start gap-2 rounded-lg bg-[#F5F7F3] p-3 text-[10px] leading-4 text-[#718080]">
                    <ShieldCheck
                      size={14}
                      className="mt-0.5 shrink-0 text-[#285C3A]"
                    />

                    <span>
                      {isMarathi
                        ? "अधिकारी खाती MandiTrack प्रशासकांकडून दिली जातात."
                        : "Officer accounts are provisioned directly by the Mandi Administrator."}
                    </span>
                  </div>
                )}
              </form>
            ) : (
              /* =================================================
                 REGISTER
              ================================================= */

              <form
                onSubmit={handleRegisterSubmit}
                className="space-y-4"
              >
                {/* Notice */}

                <div className="flex items-start gap-3 rounded-xl border border-[#E4D8B9] bg-[#F8F3E5] p-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#B58A35]/10">
                    <ShieldCheck
                      size={15}
                      className="text-[#9A742A]"
                    />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-[#72571F]">
                      {isMarathi
                        ? "शेतकरी नोंदणीसाठी"
                        : "Official farmer registration"}
                    </p>

                    <p className="mt-0.5 text-[10px] leading-4 text-[#806A3B]">
                      {isMarathi
                        ? "अधिकारी खाती फक्त सिस्टम प्रशासकांकडून दिली जातात."
                        : "Officer accounts are issued exclusively by system administrators."}
                    </p>
                  </div>
                </div>

                {/* Name */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#465557]">
                    {isMarathi
                      ? "पूर्ण नाव"
                      : "Full Name"}

                    <span className="ml-1 text-[#B44D42]">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9695]"
                    />

                    <input
                      type="text"
                      value={regName}
                      onChange={(e) =>
                        setRegName(e.target.value)
                      }
                      placeholder={
                        isMarathi
                          ? "उदा. रमेश पाटील"
                          : "e.g. Ramesh Patil"
                      }
                      className="w-full rounded-lg border border-[#D6DED7] bg-[#FAFBF9] py-3 pl-10 pr-4 text-sm text-[#19343A] outline-none transition placeholder:text-[#9AA4A3] focus:border-[#285C3A] focus:bg-white focus:ring-2 focus:ring-[#285C3A]/10"
                      required
                    />
                  </div>
                </div>

                {/* Mobile */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#465557]">
                    {isMarathi
                      ? "10 अंकी मोबाईल नंबर"
                      : "10-Digit Mobile Number"}

                    <span className="ml-1 text-[#B44D42]">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9695]"
                    />

                    <input
                      type="tel"
                      value={regMobile}
                      onChange={(e) =>
                        setRegMobile(e.target.value)
                      }
                      placeholder="9876543210"
                      maxLength={10}
                      inputMode="numeric"
                      className="w-full rounded-lg border border-[#D6DED7] bg-[#FAFBF9] py-3 pl-10 pr-4 text-sm text-[#19343A] outline-none transition placeholder:text-[#9AA4A3] focus:border-[#285C3A] focus:bg-white focus:ring-2 focus:ring-[#285C3A]/10"
                      required
                    />
                  </div>
                </div>

                {/* Password */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#465557]">
                    {isMarathi
                      ? "पासवर्ड"
                      : "Password"}

                    <span className="ml-1 text-[#B44D42]">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9695]"
                    />

                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) =>
                        setRegPassword(e.target.value)
                      }
                      placeholder={
                        isMarathi
                          ? "किमान 6 अक्षरे"
                          : "Minimum 6 characters"
                      }
                      className="w-full rounded-lg border border-[#D6DED7] bg-[#FAFBF9] py-3 pl-10 pr-4 text-sm text-[#19343A] outline-none transition placeholder:text-[#9AA4A3] focus:border-[#285C3A] focus:bg-white focus:ring-2 focus:ring-[#285C3A]/10"
                      required
                    />
                  </div>
                </div>

                {/* Mandi */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#465557]">
                    {isMarathi
                      ? "प्राथमिक मंडी बाजार"
                      : "Primary Mandi Market"}

                    <span className="ml-1 text-[#B44D42]">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <MapPin
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-[#8A9695]"
                    />

                    <select
                      value={regMandi}
                      onChange={(e) =>
                        setRegMandi(e.target.value)
                      }
                      className="w-full appearance-none rounded-lg border border-[#D6DED7] bg-[#FAFBF9] py-3 pl-10 pr-10 text-sm font-medium text-[#19343A] outline-none transition focus:border-[#285C3A] focus:bg-white focus:ring-2 focus:ring-[#285C3A]/10"
                    >
                      <option value="Pune APMC">
                        Pune APMC (पुणे)
                      </option>

                      <option value="Navi Mumbai APMC">
                        Navi Mumbai APMC (नवी मुंबई)
                      </option>

                      <option value="Nashik APMC">
                        Nashik APMC (नाशिक)
                      </option>

                      <option value="Thane APMC">
                        Thane APMC (ठाणे)
                      </option>

                      <option value="Nagpur APMC">
                        Nagpur APMC (नागपूर)
                      </option>

                      <option value="Kolhapur APMC">
                        Kolhapur APMC (कोल्हापूर)
                      </option>

                      <option value="Latur APMC">
                        Latur APMC (लातूर)
                      </option>
                    </select>

                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A9695]">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Register */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-[#285C3A] py-3.5 text-sm font-semibold text-white transition hover:bg-[#214D31] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? isMarathi
                      ? "नोंदणी सुरू आहे..."
                      : "Registering..."
                    : isMarathi
                      ? "शेतकरी खाते तयार करा"
                      : "Create Farmer Account"}

                  {!loading && (
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}
                </button>
              </form>
            )}

            {/* Bottom note */}

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-[#899493]">
              <ShieldCheck size={13} />

              {isMarathi
                ? "तुमची माहिती सुरक्षितपणे हाताळली जाते."
                : "Your information is handled securely."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   BENEFIT
========================================================= */

function ModalBenefit({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
        <CheckCircle2
          size={14}
          className="text-[#D9E8D9]"
        />
      </div>

      <span className="text-xs font-medium text-[#D5E3D7]">
        {text}
      </span>
    </div>
  );
}