import React from "react";
import { useLang } from "../../context/LanguageContext";
import {
  User,
  Phone,
  MapPin,
  ShieldCheck,
  Globe,
  Award,
  LogOut,
  CheckCircle2,
} from "lucide-react";

export default function ProfileView({ user, onLogout }) {
  const { lang, setLang, t } = useLang();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "MT";

  const roleTitle =
    user?.role === "officer"
      ? t("profileOfficerRoleTitle")
      : user?.role === "admin"
      ? t("profileAdminRoleTitle")
      : t("profileFarmerRoleTitle");

  const localizedRole =
    user?.role === "officer"
      ? t("roleOfficer")
      : user?.role === "admin"
      ? t("roleAdmin")
      : t("roleFarmer");

  return (
    <div className="mx-auto max-w-4xl space-y-6 bg-[#F8F7F2] pb-8 animate-fadeIn">
      {/* =====================================================
          PROFILE HEADER
      ====================================================== */}

      <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#285C3A] text-2xl font-bold text-white shadow-sm ring-4 ring-[#EAF2E9]">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <h1 className="text-xl font-bold tracking-tight text-[#19343A] sm:text-2xl">
                {user?.name || "Kisan User"}
              </h1>

              <span className="rounded-full border border-[#E8DDBF] bg-[#F5EFDE] px-3 py-1 text-[10px] font-bold capitalize text-[#80672C]">
                {localizedRole}
              </span>
            </div>

            <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#687779] sm:justify-start sm:text-sm">
              <ShieldCheck
                size={15}
                className="shrink-0 text-[#285C3A]"
              />
              {roleTitle}
            </p>

            {/* User Details */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-[#E5E9E3] pt-4 text-xs font-medium text-[#687779] sm:justify-start">
              <div className="flex items-center gap-1.5">
                <Phone
                  size={13}
                  className="text-[#8A9695]"
                />
                <span>
                  {user?.mobile || "Not specified"}
                </span>
              </div>

              {user?.officerId && (
                <div className="flex items-center gap-1.5 font-mono text-[#285C3A]">
                  <ShieldCheck size={13} />
                  <span>ID: {user.officerId}</span>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <MapPin
                  size={13}
                  className="text-[#B58A35]"
                />
                <span>
                  {user?.mandi || "Pune APMC"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ACCOUNT + PREFERENCES
      ====================================================== */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* ===================================================
            MANDI ASSIGNMENT
        ==================================================== */}

        <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2 border-b border-[#E5E9E3] pb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A]">
              <Award size={16} />
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.08em] text-[#19343A]">
                {t("mandiAssignmentTitle")}
              </h2>

              <p className="mt-0.5 text-[10px] font-medium text-[#8A9695]">
                {t("mandiAssignmentSub")}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {/* Designated Mandi */}
            <div className="rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] p-4">
              <div className="flex items-center gap-2">
                <MapPin
                  size={14}
                  className="text-[#B58A35]"
                />

                <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#8A9695]">
                  {t("designatedMandi")}
                </div>
              </div>

              <div className="mt-2 text-sm font-bold text-[#19343A]">
                {user?.mandi || "Pune APMC"}
              </div>

              <p className="mt-1 text-[11px] font-medium leading-5 text-[#687779]">
                {user?.role === "officer"
                  ? t("officerMandiNotice")
                  : t("farmerMandiNotice")}
              </p>
            </div>

            {/* Account Status */}
            <div className="rounded-lg border border-[#CFE2D4] bg-[#EAF2E9] p-4">
              <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#687779]">
                {t("accountStatusLabel")}
              </div>

              <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#285C3A]">
                <CheckCircle2 size={14} />
                {t("activeVerifiedStatus")}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            LANGUAGE + LOGOUT
        ==================================================== */}

        <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2 border-b border-[#E5E9E3] pb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5EFDE] text-[#B58A35]">
              <Globe size={16} />
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.08em] text-[#19343A]">
                {t("languageInterfaceTitle")}
              </h2>

              <p className="mt-0.5 text-[10px] font-medium text-[#8A9695]">
                {t("languageInterfaceSub")}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] p-4">
              <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.08em] text-[#8A9695]">
                {t("preferredLanguageLabel")}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* English */}
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
                    lang === "en"
                      ? "border border-[#285C3A] bg-[#285C3A] text-white shadow-sm"
                      : "border border-[#DCE3DB] bg-white text-[#687779] hover:bg-[#EAF2E9] hover:text-[#285C3A]"
                  }`}
                >
                  English
                </button>

                {/* Marathi */}
                <button
                  type="button"
                  onClick={() => setLang("mr")}
                  className={`rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
                    lang === "mr"
                      ? "border border-[#285C3A] bg-[#285C3A] text-white shadow-sm"
                      : "border border-[#DCE3DB] bg-white text-[#687779] hover:bg-[#EAF2E9] hover:text-[#285C3A]"
                  }`}
                >
                  मराठी
                </button>
              </div>
            </div>

            {/* Logout */}
            {onLogout && (
              <div className="mt-4 border-t border-[#E5E9E3] pt-4">
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#E8CCCC] bg-[#FAEEEE] py-2.5 text-xs font-semibold text-[#A64B4B] transition hover:bg-[#F7E4E4] active:scale-[0.98]"
                >
                  <LogOut size={15} />
                  {t("logoutMandiTrackBtn")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          ACCOUNT INFORMATION STRIP
      ====================================================== */}

      <div className="flex flex-col gap-3 rounded-xl border border-[#DCE3DB] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A]">
            <User size={16} />
          </div>

          <div>
            <div className="text-xs font-bold text-[#19343A]">
              {t("accountStripTitle")}
            </div>

            <div className="mt-0.5 text-[10px] font-medium text-[#8A9695]">
              {t("accountStripSub")}
            </div>
          </div>
        </div>

        <div className="text-left text-[10px] font-medium text-[#8A9695] sm:text-right">
          <div>{t("accountRoleLabel")}</div>

          <div className="mt-0.5 font-semibold capitalize text-[#285C3A]">
            {localizedRole}
          </div>
        </div>
      </div>
    </div>
  );
}