import React, { useState } from "react";
import { loginApi } from "../services/api";

function LoginPage({ initialRole = "farmer", onLoginSuccess, onNavigateToRegister, onNavigateToHome }) {
  const [role, setRole] = useState(initialRole);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!mobile || !password) {
      setError("Please fill in mobile number and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginApi({ mobile, password });
      
      // Save JWT token and user profile
      localStorage.setItem("manditrack_token", response.token);
      localStorage.setItem("manditrack_user", JSON.stringify(response.user));

      onLoginSuccess(response.user, response.token);
    } catch (err) {
      setError(err.message || "Invalid mobile number or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      {/* Header Matching Panel 2 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div onClick={onNavigateToHome} className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 bg-green-700 rounded-xl flex items-center justify-center text-white text-lg font-extrabold shadow-xs">
              🌱
            </div>
            <span className="text-2xl font-extrabold text-green-800 tracking-tight">
              MandiTrack
            </span>
          </div>

          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs font-bold">
            <span className="px-3 py-1 rounded-lg bg-green-700 text-white shadow-xs">EN</span>
            <span className="px-3 py-1 rounded-lg text-slate-500 cursor-not-allowed">मराठी</span>
          </div>
        </div>
      </header>

      {/* Main Login Card Matching Panel 2 */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 bg-green-100 text-green-800 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2 font-bold shadow-xs">
              🔑
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Login to MandiTrack
            </h2>
            <p className="text-xs text-slate-500">
              Enter your credentials to continue
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Select Role */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">
                Select Role
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm bg-white font-medium text-slate-800 appearance-none"
                >
                  <option value="farmer">👨‍🌾 Farmer</option>
                  <option value="officer">🏛️ Officer</option>
                </select>
                <div className="absolute right-3.5 top-3.5 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 text-base">
                  📱
                </span>
                <input
                  type="tel"
                  required
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 text-base">
                  🔒
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none text-sm text-slate-800 placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 text-sm"
                  title="Show/Hide Password"
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-green-700 hover:bg-green-800 active:scale-98 text-white font-bold rounded-xl shadow-md transition-all text-sm mt-2 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Link to Register */}
            <div className="pt-2 text-center text-xs text-slate-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onNavigateToRegister}
                className="text-green-800 font-bold hover:underline"
              >
                Register here
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 text-center text-xs text-slate-500">
        MandiTrack Prototype
      </footer>
    </div>
  );
}

export default LoginPage;
