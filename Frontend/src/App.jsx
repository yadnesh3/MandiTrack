import React, { useState, useEffect } from "react";
import MasterShell from "./components/layout/MasterShell";
import FarmerDashboard from "./components/FarmerDashboard";
import OfficerDashboard from "./components/OfficerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AddProduceView from "./components/views/AddProduceView";
import MyLotsView from "./components/views/MyLotsView";
import LotTrackingView from "./components/views/LotTrackingView";
import MandiPricesView from "./components/views/MandiPricesView";
import ProfileView from "./components/views/ProfileView";
import HelpSupportView from "./components/views/HelpSupportView";
import AnnouncementsView from "./components/views/AnnouncementsView";
import ReportsView from "./components/views/ReportsView";
import LandingPage from "./pages/LandingPage";
import AuthModal from "./components/AuthModal";
import VoiceHelpModal from "./components/VoiceHelpModal";
import { Volume2 } from "lucide-react";

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedLotId, setSelectedLotId] = useState(null);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authDefaultRole, setAuthDefaultRole] = useState("farmer");
  const [isVoiceHelpOpen, setIsVoiceHelpOpen] = useState(false);

  // Load stored auth on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("manditrack_token");
    const savedUser = localStorage.getItem("manditrack_user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
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
    setActiveTab("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("manditrack_token");
    localStorage.removeItem("manditrack_user");
    setUser(null);
    setToken(null);
    setActiveTab("dashboard");
  };

  // Render content according to active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        if (user?.role === "farmer") {
          return (
            <FarmerDashboard
              user={user}
              onNavigateToTab={setActiveTab}
              onOpenVoiceModal={() => setIsVoiceHelpOpen(true)}
            />
          );
        } else if (user?.role === "admin") {
          return <AdminDashboard user={user} />;
        } else {
          return (
            <OfficerDashboard
              user={user}
              onNavigateToTab={setActiveTab}
              onOpenVoiceModal={() => setIsVoiceHelpOpen(true)}
            />
          );
        }

      case "add-produce":
        return (
          <AddProduceView
            user={user}
            onNavigateToTracking={(lotId) => {
              setSelectedLotId(lotId);
              setActiveTab("lot-tracking");
            }}
          />
        );

      case "my-lots":
        return (
          <MyLotsView
            user={user}
            onSelectLotToTrack={(lotId) => {
              setSelectedLotId(lotId);
              setActiveTab("lot-tracking");
            }}
            onNavigateToAddProduce={() => setActiveTab("add-produce")}
          />
        );

      case "lot-tracking":
        return (
          <LotTrackingView
            selectedLotId={selectedLotId}
            onBackToLots={() => setActiveTab("my-lots")}
            user={user}
          />
        );

      case "waiting-queue":
      case "process-lot":
        return (
          <OfficerDashboard
            user={user}
            onNavigateToTab={setActiveTab}
            onOpenVoiceModal={() => setIsVoiceHelpOpen(true)}
          />
        );

      case "manage-officers":
        return <AdminDashboard user={user} />;

      case "all-lots":
        return (
          <MyLotsView
            user={user}
            onSelectLotToTrack={(lotId) => {
              setSelectedLotId(lotId);
              setActiveTab("lot-tracking");
            }}
            onNavigateToAddProduce={() => setActiveTab("add-produce")}
          />
        );

      case "mandi-prices":
        return <MandiPricesView />;

      case "reports":
        return <ReportsView user={user} />;

      case "announcements":
        return <AnnouncementsView user={user} />;

      case "profile":
        return <ProfileView user={user} onLogout={handleLogout} />;

      case "help":
        return (
          <HelpSupportView
            onOpenVoiceHelp={() => setIsVoiceHelpOpen(true)}
          />
        );

      default:
        return (
          <FarmerDashboard
            user={user}
            onNavigateToTab={setActiveTab}
            onOpenVoiceModal={() => setIsVoiceHelpOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans antialiased text-slate-900 selection:bg-amber-200">
      {!user ? (
        /* Unauthenticated: Master Landing Page */
        <LandingPage
          onNavigateToLogin={(role = "farmer") => handleOpenAuth("login", role)}
          onNavigateToRegister={() => handleOpenAuth("register", "farmer")}
          onOpenVoiceModal={() => setIsVoiceHelpOpen(true)}
        />
      ) : (
        /* Authenticated: Master Layout Shell */
        <MasterShell
          user={user}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onLogout={handleLogout}
          onOpenVoiceHelp={() => setIsVoiceHelpOpen(true)}
        >
          {renderTabContent()}
        </MasterShell>
      )}

      {/* Floating Voice Help Button matching master branding */}
      <button
        onClick={() => setIsVoiceHelpOpen(true)}
        title="Ask MandiTrack Voice (आवाज मदत)"
        className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-[#0C192C] hover:bg-[#142947] text-white rounded-full shadow-2xl border-2 border-[#EA8F0B] flex items-center gap-2 text-xs font-bold transition active:scale-95 group"
      >
        <Volume2
          size={18}
          className="text-[#EA8F0B] group-hover:scale-110 transition-transform"
        />
        <span className="hidden sm:inline">Ask MandiTrack (मदत)</span>
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