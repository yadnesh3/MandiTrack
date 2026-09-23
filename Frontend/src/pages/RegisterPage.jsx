import React, { useState } from "react";
import { registerApi, loginApi } from "../services/api";
import { useLang } from "../context/LanguageContext";
import { MANDI_LIST } from "../components/layout/MasterShell";

import {
  User,
  Lock,
  Phone,
  MapPin,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  Sprout,
  Globe2,
  CheckCircle2,
} from "lucide-react";

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

  const isMarathi = lang === "mr";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !mobile.trim() || !password) {
      setError(
        isMarathi
          ? "कृपया तुमचे नाव, मोबाईल नंबर आणि पासवर्ड भरा."
          : "Please fill in your name, mobile number and password."
      );
      return;
    }

    if (!MOBILE_PATTERN.test(mobile.trim())) {
      setError(
        isMarathi
          ? "6, 7, 8 किंवा 9 ने सुरू होणारा वैध 10 अंकी मोबाईल नंबर टाका."
          : "Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9."
      );
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(
        isMarathi
          ? `पासवर्ड किमान ${MIN_PASSWORD_LENGTH} अक्षरांचा असावा.`
          : `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      );
      return;
    }

    setLoading(true);

    try {
      // Farmer-only registration
      await registerApi({
        name: name.trim(),
        mobile: mobile.trim(),
        password,
        role: "farmer",
        mandi,
      });

      // Auto-login after successful registration
      const loginRes = await loginApi({
        mobile: mobile.trim(),
        password,
      });

      localStorage.setItem("manditrack_token", loginRes.token);

      localStorage.setItem(
        "manditrack_user",
        JSON.stringify(loginRes.user)
      );

      if (onLoginSuccess) {
        onLoginSuccess(loginRes.user, loginRes.token);
      }
    } catch (err) {
      setError(
        err.message ||
          (isMarathi
            ? "नोंदणी अयशस्वी झाली. कृपया तुमची माहिती तपासा."
            : "Registration failed. Please verify your details.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#19343A]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-[#E1E4DE] bg-[#F8F7F2]">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
          {/* Logo */}

          <button
            type="button"
            onClick={onNavigateToHome}
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

          {/* Language */}

          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "mr" : "en")}
            className="flex items-center gap-2 rounded-lg border border-[#D5DAD4] bg-white px-3.5 py-2 text-xs font-semibold text-[#596769] transition hover:border-[#285C3A] hover:text-[#285C3A]"
          >
            <Globe2 size={15} />

            {lang === "en" ? "English" : "मराठी"}
          </button>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="flex min-h-[calc(100vh-76px)] items-center justify-center px-5 py-10 sm:px-8">
        <div className="grid w-full max-w-[1000px] overflow-hidden rounded-2xl border border-[#DCE3DB] bg-white shadow-[0_12px_40px_rgba(39,72,52,0.08)] lg:grid-cols-[0.85fr_1.15fr]">

          {/* =================================================
              LEFT INFORMATION PANEL
          ================================================= */}

          <div className="hidden bg-[#285C3A] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <Sprout
                  size={21}
                  strokeWidth={1.8}
                />
              </div>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[1.8px] text-[#D9E8D9]">
                MandiTrack
              </p>

              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.8px]">
                {isMarathi
                  ? "तुमच्या मंडी प्रवासाची सुरुवात करा."
                  : "Start your mandi journey."}
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#D5E3D7]">
                {isMarathi
                  ? "तुमचे उत्पादन डिजिटल पद्धतीने जमा करा, लॉटचा मागोवा घ्या आणि मंडीची माहिती एका ठिकाणी मिळवा."
                  : "Submit your produce digitally, track your lots and access mandi information from one place."}
              </p>
            </div>

            <div className="mt-12 space-y-4">
              <RegisterBenefit
                text={
                  isMarathi
                    ? "सोपे शेतकरी खाते"
                    : "Simple farmer account"
                }
              />

              <RegisterBenefit
                text={
                  isMarathi
                    ? "डिजिटल लॉट ट्रॅकिंग"
                    : "Digital lot tracking"
                }
              />

              <RegisterBenefit
                text={
                  isMarathi
                    ? "मंडी माहिती एका ठिकाणी"
                    : "Mandi information in one place"
                }
              />
            </div>
          </div>

          {/* =================================================
              REGISTRATION FORM
          ================================================= */}

          <div className="p-6 sm:p-9 lg:p-10">

            {/* Heading */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E1D8] bg-[#EEF3EC] px-3 py-1.5 text-[11px] font-semibold text-[#386044]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4C8658]" />

                {isMarathi
                  ? "शेतकरी नोंदणी"
                  : "Farmer registration"}
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-[-1px] text-[#19343A]">
                {isMarathi
                  ? "तुमचे खाते तयार करा"
                  : "Create your account"}
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#687779]">
                {isMarathi
                  ? "MandiTrack वापरण्यासाठी तुमची मूलभूत माहिती नोंदवा."
                  : "Enter your basic details to get started with MandiTrack."}
              </p>
            </div>

            {/* =================================================
                OFFICER NOTICE
            ================================================= */}

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#E4D8B9] bg-[#F8F3E5] p-3.5">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#B58A35]/10">
                <ShieldCheck
                  size={15}
                  className="text-[#9A742A]"
                />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#72571F]">
                  {isMarathi
                    ? "अधिकारी नोंदणीबद्दल सूचना"
                    : "Officer registration notice"}
                </p>

                <p className="mt-1 text-[11px] leading-5 text-[#806A3B]">
                  {isMarathi
                    ? "अधिकारी खाती फक्त MandiTrack प्रशासकांकडून दिली जातात. हे पोर्टल शेतकरी नोंदणीसाठी आहे."
                    : "Officer accounts are issued only by MandiTrack administrators. This portal is for farmer registration."}
                </p>
              </div>
            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#EBCBC7] bg-[#FFF5F3] p-3.5 text-xs font-medium text-[#9B3C32]">
                <AlertCircle
                  size={16}
                  className="mt-0.5 shrink-0"
                />

                <span>{error}</span>
              </div>
            )}

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
            >
              {/* Full Name */}

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
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9695]"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9695]"
                  />

                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
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
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9695]"
                  />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      isMarathi
                        ? "किमान 6 अक्षरे"
                        : "Minimum 6 characters"
                    }
                    className="w-full rounded-lg border border-[#D6DED7] bg-[#FAFBF9] py-3 pl-10 pr-4 text-sm text-[#19343A] outline-none transition placeholder:text-[#9AA4A3] focus:border-[#285C3A] focus:bg-white focus:ring-2 focus:ring-[#285C3A]/10"
                    required
                  />
                </div>

                <p className="mt-1.5 text-[10px] text-[#899493]">
                  {isMarathi
                    ? "पासवर्ड किमान 6 अक्षरांचा असावा."
                    : "Password must contain at least 6 characters."}
                </p>
              </div>

              {/* Mandi */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#465557]">
                  {isMarathi
                    ? "प्राथमिक APMC बाजार"
                    : "Primary APMC Market"}

                  <span className="ml-1 text-[#B44D42]">
                    *
                  </span>
                </label>

                <div className="relative">
                  <MapPin
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-[#8A9695]"
                  />

                  <select
                    value={mandi}
                    onChange={(e) => setMandi(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#D6DED7] bg-[#FAFBF9] py-3 pl-10 pr-10 text-sm font-medium text-[#19343A] outline-none transition focus:border-[#285C3A] focus:bg-white focus:ring-2 focus:ring-[#285C3A]/10"
                    required
                  >
                    {MANDI_LIST.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
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

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#285C3A] py-3.5 text-sm font-semibold text-white transition hover:bg-[#214D31] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
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

            {/* =================================================
                LOGIN LINK
            ================================================= */}

            <div className="mt-7 border-t border-[#E7EAE5] pt-5 text-center">
              <p className="text-xs text-[#718080]">
                {isMarathi
                  ? "तुमचे खाते आधीपासून आहे?"
                  : "Already registered?"}
              </p>

              <button
                type="button"
                onClick={onNavigateToLogin}
                className="mt-1 text-xs font-semibold text-[#285C3A] transition hover:text-[#214D31] hover:underline"
              >
                {isMarathi
                  ? "लॉगिन करा"
                  : "Sign in here"}

                <span className="ml-1">→</span>
              </button>
            </div>

            {/* Security note */}

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-[#899493]">
              <ShieldCheck size={13} />

              {isMarathi
                ? "तुमची माहिती सुरक्षितपणे हाताळली जाते."
                : "Your information is handled securely."}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   BENEFIT COMPONENT
========================================================= */

function RegisterBenefit({ text }) {
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