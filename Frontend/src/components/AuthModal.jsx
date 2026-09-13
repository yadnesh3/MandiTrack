import React, { useState, useEffect } from "react";
import { loginApi, registerApi } from "../services/api";

function AuthModal({ isOpen, onClose, initialMode = "login", defaultRole = "farmer", onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode); // "login" | "register"
  const [role, setRole] = useState(defaultRole); // "farmer" | "officer"
  
  // Form fields
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

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
      setError("Please fill in mobile number and password.");
      return;
    }

    if (mode === "register" && !name) {
      setError("Please enter your name.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        const response = await loginApi({ mobile, password });
        localStorage.setItem("manditrack_token", response.token);
        localStorage.setItem("manditrack_user", JSON.stringify(response.user));
        
        onLoginSuccess(response.user, response.token);
        onClose();
      } else {
        const response = await registerApi({
          name,
          mobile,
          password,
          role,
        });

        setSuccessMsg("Registration successful! Logging you in...");
        
        // Auto-login after registration
        const loginRes = await loginApi({ mobile, password });
        localStorage.setItem("manditrack_token", loginRes.token);
        localStorage.setItem("manditrack_user", JSON.stringify(loginRes.user));
        
        setTimeout(() => {
          onLoginSuccess(loginRes.user, loginRes.token);
          onClose();
        }, 1000);
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100 animate-fadeIn">
        
        {/* Header Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${
              mode === "login"
                ? "border-b-2 border-green-700 text-green-700 font-semibold bg-gray-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setMode("register"); setError(""); }}
            className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${
              mode === "register"
                ? "border-b-2 border-green-700 text-green-700 font-semibold bg-gray-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold px-2"
            >
              &times;
            </button>
          </div>

          {/* Role selector */}
          <div className="mb-5">
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("farmer")}
                className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                  role === "farmer"
                    ? "border-green-700 bg-green-50 text-green-800 ring-2 ring-green-700/20"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                🌾 Farmer
              </button>
              <button
                type="button"
                onClick={() => setRole("officer")}
                className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                  role === "officer"
                    ? "border-blue-700 bg-blue-50 text-blue-800 ring-2 ring-blue-700/20"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                🏛️ Mandi Officer
              </button>
            </div>
          </div>

          {/* Alert messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
              {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patil"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-lg text-white font-medium shadow-xs transition-colors mt-2 ${
                role === "farmer"
                  ? "bg-green-700 hover:bg-green-800"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {loading
                ? "Processing..."
                : mode === "login"
                ? `Login as ${role === "farmer" ? "Farmer" : "Officer"}`
                : `Register as ${role === "farmer" ? "Farmer" : "Officer"}`}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default AuthModal;
