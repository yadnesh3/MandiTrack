import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import FarmerDashboard from "./components/FarmerDashboard";
import OfficerDashboard from "./components/OfficerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import VoiceHelpModal from "./components/VoiceHelpModal";
import LandingPage from "./pages/LandingPage";
import { useLang } from "./context/LanguageContext";
import { Volume2 } from "lucide-react";

function App() {
  const { t } = useLang();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Auth modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authDefaultRole, setAuthDefaultRole] = useState("farmer");

  // Voice help modal state
  const [isVoiceHelpOpen, setIsVoiceHelpOpen] = useState(false);

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
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900 selection:bg-amber-200 selection:text-slate-900">
      {/* Navigation Bar */}
      <Navbar
        user={user}
        onOpenAuth={(mode, role) => handleOpenAuth(mode, role || "farmer")}
        onOpenVoiceHelp={() => setIsVoiceHelpOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content View */}
      <main className="flex-1 w-full">
        {!user ? (
          /* Rich Landing Page for non-logged-in visitors */
          <LandingPage
            onNavigateToLogin={(role = "farmer") => handleOpenAuth("login", role)}
            onNavigateToRegister={(role = "farmer") => handleOpenAuth("register", role)}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {user.role === "farmer" ? (
              /* Farmer Dashboard */
              <FarmerDashboard user={user} />
            ) : user.role === "admin" ? (
              /* Dedicated Admin Dashboard (Do NOT send admin to OfficerDashboard) */
              <AdminDashboard user={user} />
            ) : (
              /* Officer Dashboard (Strict location restricted) */
              <OfficerDashboard user={user} />
            )}
          </div>
        )}
      </main>

      {/* Floating Voice Help Button for quick farmer access */}
      <button
        onClick={() => setIsVoiceHelpOpen(true)}
        title="Open Voice Assistance (आवाज मदत)"
        className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-[#0E2A3F] hover:bg-[#163c5a] text-white rounded-full shadow-2xl border-2 border-amber-400 flex items-center gap-2 text-xs font-bold transition active:scale-95 group"
      >
        <Volume2 size={18} className="text-amber-400 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Voice Help (मदत)</span>
      </button>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        defaultRole={authDefaultRole}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Voice Help Modal */}
      <VoiceHelpModal
        isOpen={isVoiceHelpOpen}
        onClose={() => setIsVoiceHelpOpen(false)}
      />
    </div>
  );
}

export default App;