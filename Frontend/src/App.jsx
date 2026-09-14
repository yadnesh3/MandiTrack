import { useEffect, useState } from "react";

// Page components (proper, well-structured components)
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FarmerDashboardPage from "./pages/FarmerDashboardPage";
import AddProducePage from "./pages/AddProducePage";
import MyLotsPage from "./pages/MyLotsPage";
import OfficerDashboardPage from "./pages/OfficerDashboardPage";
import ReviewLotsPage from "./pages/ReviewLotsPage";

// Rich component dashboards (full-featured with modals, filters etc.)
import FarmerDashboard from "./components/FarmerDashboard";
import OfficerDashboard from "./components/OfficerDashboard";
import MandiPriceInfo from "./components/MandiPriceInfo";

// Shared API
import { getMandiPricesApi } from "./services/api";

// ============================================================
// CONSTANTS
// ============================================================

const FARMER_NAV = [
  { key: "farmer-dashboard", label: "Dashboard" },
  { key: "add-produce", label: "Add Produce" },
  { key: "my-lots", label: "My Lots" },
  { key: "prices", label: "Mandi Prices" },
  { key: "voice", label: "Voice Help" },
];

const OFFICER_NAV = [
  { key: "officer-dashboard", label: "Dashboard" },
  { key: "review-lots", label: "Review Lots" },
];

const ADMIN_NAV = [{ key: "admin-dashboard", label: "System Overview" }];

// ============================================================
// HELPERS — local storage
// ============================================================

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem("manditrack_user")) || null;
  } catch {
    return null;
  }
}

function saveSession(user, token) {
  localStorage.setItem("manditrack_token", token);
  localStorage.setItem("manditrack_user", JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem("manditrack_token");
  localStorage.removeItem("manditrack_user");
}

// ============================================================
// TOP-LEVEL HEADER (authenticated users)
// ============================================================

function AppHeader({ user, lang, onToggleLang, onLogout }) {
  const roleLabel = {
    farmer: "🌾 Farmer",
    officer: "🏛️ Officer",
    admin: "🔒 Admin",
  }[user.role] || user.role;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center text-white text-base font-extrabold shadow-xs">
            🌱
          </div>
          <div>
            <span className="text-xl font-extrabold text-green-800 tracking-tight">
              MandiTrack
            </span>
            <span className="hidden sm:inline ml-2 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              {roleLabel} Portal
            </span>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleLang}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
          >
            {lang === "en" ? "🇮🇳 मराठी" : "🇬🇧 English"}
          </button>
          <span className="hidden sm:inline text-sm font-semibold text-slate-700">
            {user.name}
          </span>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-100 transition-colors"
          >
            ← Logout
          </button>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// SIDEBAR NAV (authenticated users)
// ============================================================

function AppSidebar({ navItems, activeScreen, onNavigate }) {
  return (
    <aside className="w-52 shrink-0 hidden lg:flex flex-col bg-white border-r border-slate-200 min-h-screen pt-6 pb-8 px-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 mb-3">
        Menu
      </p>
      <nav className="space-y-1">
        {navItems.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeScreen === key
                ? "bg-green-700 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

// ============================================================
// MOBILE BOTTOM NAV (authenticated users)
// ============================================================

function MobileNav({ navItems, activeScreen, onNavigate }) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex items-center justify-around px-2 py-2 shadow-xl">
      {navItems.slice(0, 5).map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onNavigate(key)}
          className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 px-1 text-[10px] font-bold rounded-lg transition-all ${
            activeScreen === key
              ? "text-green-700 bg-green-50"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <span className="text-base leading-none">
            {key === "farmer-dashboard" || key === "officer-dashboard" || key === "admin-dashboard"
              ? "🏠"
              : key === "add-produce"
              ? "➕"
              : key === "my-lots"
              ? "📦"
              : key === "prices"
              ? "📊"
              : key === "voice"
              ? "🎤"
              : key === "review-lots"
              ? "📋"
              : "📌"}
          </span>
          <span className="truncate max-w-full">{label}</span>
        </button>
      ))}
    </nav>
  );
}

// ============================================================
// VOICE HELP SCREEN
// ============================================================

function VoiceHelpScreen({ onNavigate, lang }) {
  const [msg, setMsg] = useState(
    lang === "mr"
      ? "मायक्रोफोन दाबा आणि बोला — "माझे lots दाखव", "मंडी भाव दाखव", किंवा "नवीन उत्पादन नोंदवा"."
      : 'Tap the microphone and say "show my lots", "open mandi prices", or "add new produce".'
  );

  const listen = () => {
    const R = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!R) {
      setMsg(
        "Voice input is not supported in this browser. Please use Chrome or Edge."
      );
      return;
    }
    const r = new R();
    r.lang = lang === "mr" ? "mr-IN" : "en-IN";
    r.interimResults = false;
    r.onresult = (e) => {
      const q = e.results[0][0].transcript.toLowerCase();
      if (
        q.includes("price") ||
        q.includes("भाव") ||
        q.includes("prices") ||
        q.includes("market")
      ) {
        onNavigate("prices");
        setMsg("Opening mandi prices…");
      } else if (
        q.includes("add") ||
        q.includes("नवीन") ||
        q.includes("submit") ||
        q.includes("produce")
      ) {
        onNavigate("add-produce");
        setMsg("Opening add produce…");
      } else if (
        q.includes("lot") ||
        q.includes("लॉट") ||
        q.includes("my lot")
      ) {
        onNavigate("my-lots");
        setMsg("Opening your lots…");
      } else {
        setMsg(
          `I heard: "${e.results[0][0].transcript}". I can help with: lots, prices, and adding produce.`
        );
      }
    };
    r.onerror = () =>
      setMsg("Could not hear you. Please try again.");
    r.start();
    setMsg("Listening…");
  };

  return (
    <div className="max-w-md mx-auto space-y-6 py-8">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
          MandiTrack Voice Help
        </p>
        <h2 className="text-2xl font-extrabold text-slate-900">
          How can I help?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">{msg}</p>

        <button
          onClick={listen}
          className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-green-700 hover:bg-green-800 active:scale-95 text-white text-4xl shadow-lg transition-all"
        >
          🎤
        </button>

        <div className="text-left bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-500 space-y-1">
          <p className="font-bold text-slate-700 mb-2">Supported commands:</p>
          <p>• "Show my lots" / "माझे lots दाखव"</p>
          <p>• "Open mandi prices" / "मंडी भाव दाखव"</p>
          <p>• "Add new produce" / "नवीन उत्पादन नोंदवा"</p>
        </div>

        <p className="text-[10px] text-slate-400">
          Voice commands only navigate the app. They never change your data.
        </p>
      </div>
    </div>
  );
}

// ============================================================
// ADMIN DASHBOARD
// ============================================================

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("manditrack_token");
    fetch("http://localhost:5000/api/admin/overview", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.message);
        setData(j);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="p-12 text-center text-slate-500">
        Loading system overview…
      </div>
    );
  if (error)
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-3xl text-red-700 text-sm">
        ⚠️ {error}
      </div>
    );

  const stats = [
    { label: "Total Farmers", value: data.farmers, color: "text-green-700" },
    { label: "Total Officers", value: data.officers, color: "text-blue-700" },
    { label: "Total Lots", value: data.lots, color: "text-slate-700" },
    {
      label: "Pending Lots",
      value: data.lotStatus?.pending || 0,
      color: "text-amber-600",
    },
    {
      label: "Approved Lots",
      value: data.lotStatus?.approved || 0,
      color: "text-green-700",
    },
    {
      label: "Rejected Lots",
      value: data.lotStatus?.rejected || 0,
      color: "text-red-600",
    },
    {
      label: "Sold Lots",
      value: data.lotStatus?.sold || 0,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
          🔒 Private Administration
        </span>
        <h1 className="text-3xl font-extrabold mt-2">System Overview</h1>
        <p className="text-slate-300 text-sm mt-1">
          MandiTrack platform statistics and user management.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1"
          >
            <div className={`text-3xl font-extrabold ${s.color}`}>
              {s.value}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Registered Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-900 text-base">
            Registered Users
          </h3>
          <p className="text-xs text-slate-500">
            Most recently joined users (up to 100)
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b text-xs font-bold text-slate-600">
                <th className="py-3.5 px-6">#</th>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Mobile</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-6 text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.users.map((u, i) => (
                <tr key={u._id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-6 text-slate-400 text-xs">
                    {i + 1}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {u.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">
                    {u.mobile}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 text-xs font-bold rounded-full ${
                        u.role === "admin"
                          ? "bg-red-100 text-red-800"
                          : u.role === "officer"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right text-xs text-slate-500">
                    {new Date(u.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ADMIN LOGIN SCREEN (private, separate from public login)
// ============================================================

function AdminLoginScreen({ onLoginSuccess, onBack }) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      if (data.user.role !== "admin") {
        throw new Error(
          "This login is for administrators only. Please use the main login page."
        );
      }
      saveSession(data.user, data.token);
      onLoginSuccess(data.user, data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-3xl border border-slate-700 p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-red-900/50 text-red-400 rounded-2xl flex items-center justify-center text-3xl mx-auto border border-red-800/50">
            🔒
          </div>
          <h2 className="text-2xl font-bold text-white">
            Administration Login
          </h2>
          <p className="text-xs text-slate-400">
            This area is restricted to system administrators only.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-900/40 border border-red-700 text-red-300 text-xs font-medium rounded-xl">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
              Admin Mobile
            </label>
            <input
              type="tel"
              required
              placeholder="Admin mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white text-sm placeholder-slate-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white text-sm placeholder-slate-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl shadow-md transition-all text-sm disabled:opacity-50"
          >
            {loading ? "Authenticating…" : "Login as Administrator"}
          </button>
        </form>

        <button
          onClick={onBack}
          className="w-full text-center text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          ← Back to main site
        </button>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [user, setUser] = useState(() => loadUser());
  const [screen, setScreen] = useState("landing");
  const [lang, setLang] = useState(
    () => localStorage.getItem("manditrack_language") || "en"
  );
  const [adminMode, setAdminMode] = useState(false);

  // Restore session on mount
  useEffect(() => {
    const savedUser = loadUser();
    if (savedUser) {
      setUser(savedUser);
      setScreen(defaultScreen(savedUser.role));
    }
  }, []);

  function defaultScreen(role) {
    return role === "farmer"
      ? "farmer-dashboard"
      : role === "officer"
      ? "officer-dashboard"
      : "admin-dashboard";
  }

  function handleLoginSuccess(u, token) {
    saveSession(u, token);
    setUser(u);
    setScreen(defaultScreen(u.role));
    setAdminMode(false);
  }

  function handleLogout() {
    clearSession();
    setUser(null);
    setScreen("landing");
    setAdminMode(false);
  }

  function toggleLang() {
    const next = lang === "en" ? "mr" : "en";
    localStorage.setItem("manditrack_language", next);
    setLang(next);
  }

  // ── Admin login path ─────────────────────────────────────
  if (adminMode) {
    return (
      <AdminLoginScreen
        onLoginSuccess={handleLoginSuccess}
        onBack={() => setAdminMode(false)}
      />
    );
  }

  // ── Not authenticated ────────────────────────────────────
  if (!user) {
    if (screen === "login") {
      return (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onNavigateToRegister={() => setScreen("register")}
          onNavigateToHome={() => setScreen("landing")}
        />
      );
    }
    if (screen === "register") {
      return (
        <RegisterPage
          onLoginSuccess={handleLoginSuccess}
          onNavigateToLogin={() => setScreen("login")}
          onNavigateToHome={() => setScreen("landing")}
        />
      );
    }
    // Landing (default for unauthenticated)
    return (
      <div>
        <LandingPage
          onNavigateToLogin={() => setScreen("login")}
          onNavigateToRegister={() => setScreen("register")}
        />
        {/* Hidden admin link in footer — subtle, not visible to normal users */}
        <button
          onClick={() => setAdminMode(true)}
          className="fixed bottom-4 right-4 w-8 h-8 opacity-0 pointer-events-auto"
          aria-label="Admin access"
          title="Administration"
        />
      </div>
    );
  }

  // ── Authenticated — pick nav based on role ───────────────
  const navItems =
    user.role === "farmer"
      ? FARMER_NAV
      : user.role === "officer"
      ? OFFICER_NAV
      : ADMIN_NAV;

  // ── Render the main content for the active screen ────────
  function renderContent() {
    // FARMER screens
    if (user.role === "farmer") {
      if (screen === "add-produce") {
        return (
          <AddProducePage
            onLotCreatedSuccess={() => setScreen("my-lots")}
          />
        );
      }
      if (screen === "my-lots") {
        return (
          <MyLotsPage
            onNavigateToAddProduce={() => setScreen("add-produce")}
          />
        );
      }
      if (screen === "prices") {
        return <MandiPriceInfo lang={lang} />;
      }
      if (screen === "voice") {
        return <VoiceHelpScreen onNavigate={setScreen} lang={lang} />;
      }
      // Default: farmer-dashboard — use the full-featured FarmerDashboard component
      return <FarmerDashboard user={user} lang={lang} />;
    }

    // OFFICER screens
    if (user.role === "officer") {
      if (screen === "review-lots") {
        return <ReviewLotsPage />;
      }
      // Default: officer-dashboard — use the full-featured OfficerDashboard component
      return <OfficerDashboard user={user} lang={lang} />;
    }

    // ADMIN screens
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader
        user={user}
        lang={lang}
        onToggleLang={toggleLang}
        onLogout={handleLogout}
      />

      <div className="flex flex-1">
        <AppSidebar
          navItems={navItems}
          activeScreen={screen}
          onNavigate={setScreen}
        />

        {/* Main content area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-x-hidden max-w-full">
          <div className="max-w-6xl mx-auto">{renderContent()}</div>
        </main>
      </div>

      <MobileNav
        navItems={navItems}
        activeScreen={screen}
        onNavigate={setScreen}
      />
    </div>
  );
}
