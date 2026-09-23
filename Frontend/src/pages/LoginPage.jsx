import React, { useState } from "react";
import { loginApi } from "../services/api";
import { useLang } from "../context/LanguageContext";

import {
  User,
  Lock,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  Sprout,
  Globe2,
  CheckCircle2,
} from "lucide-react";

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

  const isMarathi = lang === "mr";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password) {
      setError(
        isMarathi
          ? "कृपया मोबाईल / अधिकारी ID आणि पासवर्ड भरा."
          : "Please fill in your Mobile / Officer ID and password."
      );
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
      localStorage.setItem(
        "manditrack_user",
        JSON.stringify(response.user)
      );

      if (onLoginSuccess) {
        onLoginSuccess(response.user, response.token);
      }
    } catch (err) {
      setError(
        err.message ||
          (isMarathi
            ? "लॉगिन माहिती तपासा आणि पुन्हा प्रयत्न करा."
            : "Invalid credentials. Please verify your details.")
      );
    } finally {
      setLoading(false);
    }
  };

  const roleInfo = {
    farmer: {
      title: isMarathi ? "शेतकरी पोर्टल" : "Farmer Portal",
      description: isMarathi
        ? "तुमचे उत्पादन जमा करा आणि लॉटचा मागोवा घ्या."
        : "Submit produce and track your lots.",
      icon: <Sprout size={19} />,
    },

    officer: {
      title: isMarathi ? "अधिकारी पोर्टल" : "Officer Portal",
      description: isMarathi
        ? "लॉट तपासा आणि त्यांची स्थिती अपडेट करा."
        : "Review lots and update their status.",
      icon: <ShieldCheck size={19} />,
    },

    admin: {
      title: isMarathi ? "अॅडमिन पोर्टल" : "Admin Portal",
      description: isMarathi
        ? "सिस्टम आणि वापरकर्त्यांचे व्यवस्थापन करा."
        : "Manage the system and users.",
      icon: <ShieldCheck size={19} />,
    },
  };

  const currentRole = roleInfo[role];

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

      <main className="flex min-h-[calc(100vh-76px)] items-center justify-center px-5 py-12 sm:px-8">
        <div className="grid w-full max-w-[1000px] overflow-hidden rounded-2xl border border-[#DCE3DB] bg-white shadow-[0_12px_40px_rgba(39,72,52,0.08)] lg:grid-cols-[0.85fr_1.15fr]">
          {/* =================================================
              LEFT INFORMATION PANEL
          ================================================= */}

          <div className="hidden bg-[#285C3A] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                {currentRole.icon}
              </div>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[1.8px] text-[#D9E8D9]">
                MandiTrack
              </p>

              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.8px]">
                {isMarathi
                  ? "मंडी व्यवहार एका सोप्या प्लॅटफॉर्मवर."
                  : "Mandi operations in one simple platform."}
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#D5E3D7]">
                {isMarathi
                  ? "उत्पादन जमा करणे, लॉट ट्रॅकिंग आणि मंडी माहिती एका ठिकाणी."
                  : "Produce submission, lot tracking and mandi information in one place."}
              </p>
            </div>

            <div className="mt-12 space-y-4">
              <LoginBenefit
                text={
                  isMarathi
                    ? "शेतकरी-अनुकूल प्रक्रिया"
                    : "Farmer-friendly workflow"
                }
              />

              <LoginBenefit
                text={
                  isMarathi
                    ? "लॉट स्थितीचा मागोवा"
                    : "Lot status tracking"
                }
              />

              <LoginBenefit
                text={
                  isMarathi
                    ? "इंग्रजी आणि मराठी"
                    : "English and Marathi"
                }
              />
            </div>
          </div>

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <div className="p-6 sm:p-9 lg:p-10">
            {/* Heading */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E1D8] bg-[#EEF3EC] px-3 py-1.5 text-[11px] font-semibold text-[#386044]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4C8658]" />

                {isMarathi
                  ? "सुरक्षित पोर्टल प्रवेश"
                  : "Secure portal access"}
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-[-1px] text-[#19343A]">
                {isMarathi
                  ? "तुमच्या खात्यात लॉगिन करा"
                  : "Sign in to your account"}
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#687779]">
                {currentRole.description}
              </p>
            </div>

            {/* Role selector */}

            <div className="mt-7">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[1.2px] text-[#7A8585]">
                {isMarathi ? "पोर्टल निवडा" : "Select portal"}
              </p>

              <div className="grid grid-cols-3 gap-1 rounded-xl border border-[#DCE3DB] bg-[#F3F5F1] p-1">
                <RoleButton
                  active={role === "farmer"}
                  onClick={() => setRole("farmer")}
                  icon={<Sprout size={15} />}
                  label={isMarathi ? "शेतकरी" : "Farmer"}
                />

                <RoleButton
                  active={role === "officer"}
                  onClick={() => setRole("officer")}
                  icon={<ShieldCheck size={15} />}
                  label={isMarathi ? "अधिकारी" : "Officer"}
                />

                <RoleButton
                  active={role === "admin"}
                  onClick={() => setRole("admin")}
                  icon={<ShieldCheck size={15} />}
                  label={isMarathi ? "अॅडमिन" : "Admin"}
                />
              </div>
            </div>

            {/* Error */}

            {error && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#EBCBC7] bg-[#FFF5F3] p-3.5 text-xs font-medium text-[#9B3C32]">
                <AlertCircle
                  size={16}
                  className="mt-0.5 shrink-0"
                />

                <span>{error}</span>
              </div>
            )}

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              {/* Identifier */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#465557]">
                  {role === "officer"
                    ? isMarathi
                      ? "अधिकारी ID किंवा मोबाईल नंबर"
                      : "Officer ID or Mobile Number"
                    : role === "admin"
                      ? isMarathi
                        ? "अॅडमिन मोबाईल नंबर"
                        : "Admin Mobile Number"
                      : isMarathi
                        ? "नोंदणीकृत मोबाईल नंबर"
                        : "Registered Mobile Number"}

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
                    value={identifier}
                    onChange={(e) =>
                      setIdentifier(e.target.value)
                    }
                    placeholder={
                      role === "officer"
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
                  {isMarathi ? "पासवर्ड" : "Password"}

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
                    : "Authenticating..."
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
            </form>

            {/* Register */}

            <div className="mt-7 border-t border-[#E7EAE5] pt-5 text-center">
              <p className="text-xs text-[#718080]">
                {isMarathi
                  ? "MandiTrack वर नवीन शेतकरी आहात?"
                  : "New farmer to MandiTrack?"}
              </p>

              <button
                type="button"
                onClick={onNavigateToRegister}
                className="mt-1 text-xs font-semibold text-[#285C3A] transition hover:text-[#214D31] hover:underline"
              >
                {isMarathi
                  ? "तुमचे शेतकरी खाते नोंदणी करा"
                  : "Register your farmer account"}
                <span className="ml-1">→</span>
              </button>
            </div>

            {/* Security note */}

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-[#899493]">
              <ShieldCheck size={13} />

              {isMarathi
                ? "तुमची लॉगिन माहिती सुरक्षितपणे हाताळली जाते."
                : "Your login information is handled securely."}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function RoleButton({
  active,
  onClick,
  icon,
  label,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold transition ${
        active
          ? "bg-white text-[#285C3A] shadow-[0_1px_4px_rgba(39,72,52,0.08)]"
          : "text-[#718080] hover:text-[#285C3A]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function LoginBenefit({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
        <CheckCircle2 size={14} className="text-[#D9E8D9]" />
      </div>

      <span className="text-xs font-medium text-[#D5E3D7]">
        {text}
      </span>
    </div>
  );
}