import React, { useState, useEffect } from "react";
import { loginApi, registerApi } from "../services/api";
import { useLang } from "../context/LanguageContext";

const MOBILE_PATTERN = /^[6-9]\d{9}$/;
const MIN_PASSWORD_LENGTH = 6;

const MANDI_OPTIONS = [
  "Pune APMC",
  "Navi Mumbai APMC",
  "Thane APMC",
  "Kalyan APMC",
  "Bhiwandi APMC",
  "Ulhasnagar APMC",
  "Nashik APMC",
  "Nagpur APMC",
  "Latur APMC",
];

function AuthModal({ isOpen, onClose, initialMode = "login", defaultRole = "farmer", onLoginSuccess }) {
  const { t } = useLang();

  const [mode, setMode] = useState(initialMode); // "login" | "register"
  const [role, setRole] = useState(defaultRole); // "farmer" | "officer"

  // Form fields
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [mandi, setMandi] = useState("Pune APMC");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setMode(initialMode);
    setRole(defaultRole);
    setError("");
    setSuccessMsg("");
  }, [initialMode, defaultRole, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!mobile || !password) {
      setError(t("fillMobilePassword"));
      return;
    }

    if (!MOBILE_PATTERN.test(mobile.trim())) {
      setError(t("invalidMobile"));
      return;
    }

    if (mode === "register") {
      if (!name.trim()) {
        setError(t("enterYourName"));
        return;
      }

      if (password.length < MIN_PASSWORD_LENGTH) {
        setError(t("passwordTooShort"));
        return;
      }

      if (role === "officer" && !mandi) {
        setError("Please select your assigned APMC Mandi location.");
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === "login") {
        const response = await loginApi({ mobile: mobile.trim(), password });
        localStorage.setItem("manditrack_token", response.token);
        localStorage.setItem("manditrack_user", JSON.stringify(response.user));

        onLoginSuccess(response.user, response.token);
        onClose();
      } else {
        await registerApi({
          name: name.trim(),
          mobile: mobile.trim(),
          password,
          role,
          mandi: mandi ? mandi.trim() : "",
        });

        setSuccessMsg(t("registrationSuccess"));

        // Auto-login after registration
        const loginRes = await loginApi({ mobile: mobile.trim(), password });
        localStorage.setItem("manditrack_token", loginRes.token);
        localStorage.setItem("manditrack_user", JSON.stringify(loginRes.user));

        setTimeout(() => {
          onLoginSuccess(loginRes.user, loginRes.token);
          onClose();
        }, 1000);
      }
    } catch (err) {
      setError(err.message || t("genericAuthError"));
    } finally {
      setLoading(false);
    }
  };

  const submitLabel = () => {
    if (loading) return t("processing");

    if (mode === "login") {
      return role === "farmer" ? t("loginAsFarmer") : t("loginAsOfficer");
    }

    return role === "farmer" ? t("registerAsFarmer") : t("registerAsOfficer");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FBF8EF] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border-2 border-[#D9A227]/30">
        {/* Header Tabs */}
        <div className="flex border-b border-[#E3DCC8] bg-white">
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className={`flex-1 py-3.5 text-center font-bold text-xs transition-colors ${
              mode === "login"
                ? "border-b-2 border-emerald-700 text-emerald-900 bg-emerald-50/40"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t("loginBtn")}
          </button>
          <button
            onClick={() => { setMode("register"); setError(""); }}
            className={`flex-1 py-3.5 text-center font-bold text-xs transition-colors ${
              mode === "register"
                ? "border-b-2 border-emerald-700 text-emerald-900 bg-emerald-50/40"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t("registerBtn")}
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                {mode === "login" ? t("welcomeBack") : t("createAccount")}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {mode === "login" ? "Enter your mobile & password" : "Join digital APMC operations"}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label={t("close")}
              className="text-slate-400 hover:text-slate-600 text-2xl font-bold px-2"
            >
              &times;
            </button>
          </div>

          {/* Role selector */}
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">
              {t("selectRole")}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("farmer")}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  role === "farmer"
                    ? "border-emerald-700 bg-emerald-50 text-emerald-900 shadow-xs ring-2 ring-emerald-700/20"
                    : "border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
                }`}
              >
                <span>👨‍🌾</span>
                <span>{t("farmerOption")}</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("officer")}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  role === "officer"
                    ? "border-blue-700 bg-blue-50 text-blue-900 shadow-xs ring-2 ring-blue-700/20"
                    : "border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
                }`}
              >
                <span>🏛️</span>
                <span>{t("officerOption")}</span>
              </button>
            </div>
          </div>

          {/* Alert messages */}
          {error && (
            <div role="alert" className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-2xl">
              ⚠️ {error}
            </div>
          )}

          {successMsg && (
            <div role="status" className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-2xl">
              ✅ {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  {t("fullName")}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t("nameExample")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none text-xs text-slate-900"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                {t("mobileNumber")}
              </label>
              <input
                type="tel"
                required
                inputMode="numeric"
                maxLength={10}
                placeholder={t("mobileHint")}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none text-xs text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                {t("password")}
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none text-xs text-slate-900"
              />
              {mode === "register" && (
                <p className="mt-1 text-[11px] text-slate-400">{t("passwordHint")}</p>
              )}
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  {role === "officer" ? "Assigned APMC Mandi (Mandatory)" : "Preferred APMC Mandi"}
                </label>
                <select
                  value={mandi}
                  onChange={(e) => setMandi(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none text-xs font-bold text-slate-800"
                >
                  {MANDI_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                {role === "officer" && (
                  <p className="mt-1 text-[10px] text-amber-700 font-semibold">
                    🔒 Location security: Officers only process lots from this mandi.
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-bold text-xs shadow-md transition active:scale-95 mt-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                role === "farmer"
                  ? "bg-emerald-700 hover:bg-emerald-800"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {submitLabel()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
