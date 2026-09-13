import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import FarmerDashboard from "./components/FarmerDashboard";
import OfficerDashboard from "./components/OfficerDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // App opens directly on the Landing Page
  const [view, setView] = useState("landing"); // "landing" | "login" | "register"

  // Auth modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authDefaultRole, setAuthDefaultRole] = useState("farmer");

  // Load stored auth on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("manditrack_token");
    const savedUser = localStorage.getItem("manditrack_user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem("manditrack_token");
        localStorage.removeItem("manditrack_user");
      }
    }
  }, []);

  const handleOpenAuth = (mode = "login", defaultRole = "farmer") => {
    setAuthMode(mode);
    setAuthDefaultRole(defaultRole);
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (loggedInUser, authToken) => {
    setUser(loggedInUser);
    setToken(authToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("manditrack_token");
    localStorage.removeItem("manditrack_user");
    setUser(null);
    setToken(null);
    setView("landing");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      {/* Navigation Bar */}
      <Navbar
        user={user}
        onOpenAuth={(mode) => handleOpenAuth(mode, "farmer")}
        onLogout={handleLogout}
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {!user ? (
          /* Landing Hero view for logged-out users (Direct Landing Page) */
          <div className="py-8 md:py-16 flex flex-col md:flex-row items-center justify-between gap-12 animate-fadeIn">
            <div className="max-w-xl space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider border border-green-200">
                🌱 Mandi Process Management Platform
              </span>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
                Track your produce from{" "}
                <span className="text-green-700 underline decoration-green-300 decoration-wavy">
                  entry to payment.
                </span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed">
                MandiTrack provides a simple and transparent platform connecting farmers with market officers for lot submission, approval queue tracking, and live mandi pricing.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => handleOpenAuth("login", "farmer")}
                  className="px-6 py-3.5 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 text-sm"
                >
                  👨‍🌾 Farmer Login
                </button>

                <button
                  onClick={() => handleOpenAuth("register", "farmer")}
                  className="px-6 py-3.5 bg-white border-2 border-green-700 text-green-800 hover:bg-green-50 font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 active:scale-95 text-sm"
                >
                  📝 Farmer Register
                </button>

                <button
                  onClick={() => handleOpenAuth("login", "officer")}
                  className="px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 text-sm"
                >
                  🏛️ Officer Login
                </button>
              </div>

              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-800">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Transparent</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-800">JWT</div>
                  <div className="text-xs text-slate-500 font-medium">Secure Auth</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-800">Live</div>
                  <div className="text-xs text-slate-500 font-medium">Status Tracking</div>
                </div>
              </div>
            </div>

            {/* Visual Preview Card */}
            <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-lg border border-slate-100 space-y-4 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="font-semibold text-slate-800 text-sm">Produce Lot #1042</div>
                <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold border border-yellow-200">
                  Pending Review
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-slate-500 text-xs block">Crop</span>
                  <span className="font-medium text-slate-800">Wheat (गहू)</span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Quantity</span>
                  <span className="font-medium text-slate-800">50 Quintals</span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Mandi</span>
                  <span className="font-medium text-slate-800">Pune APMC</span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Expected Price</span>
                  <span className="font-medium text-slate-800">₹2,400 / Quintal</span>
                </div>
              </div>
              <div className="pt-2 text-xs text-center text-slate-400 border-t">
                Login as Farmer or Officer to view active data
              </div>
            </div>
          </div>
        ) : user.role === "farmer" ? (
          /* Render Farmer Dashboard for Logged-In Farmers */
          <FarmerDashboard user={user} />
        ) : (
          /* Render Officer Dashboard for Logged-In Officers */
          <OfficerDashboard user={user} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>MandiTrack Prototype</div>
          <div>Designed & Developed by the MandiTrack Team</div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        defaultRole={authDefaultRole}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;