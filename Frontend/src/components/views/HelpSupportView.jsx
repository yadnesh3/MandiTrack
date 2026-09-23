import React, { useState } from "react";
import AskMandiTrackCard from "../common/AskMandiTrackCard";
import {
  HelpCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  BookOpen,
  Mic,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const FAQ_LIST = [
  {
    q: "How do I register and add my produce lot?",
    a: "Click on 'Add Produce' from the sidebar menu, select your crop (Onion, Tomato, Soybean, etc.), enter the quantity and your expected rate, select your APMC market, and generate your Mandi Token. Show this token upon arrival at the Gate Entry.",
  },
  {
    q: "How do I track my lot progress in real-time?",
    a: "Navigate to 'Lot Tracking' or 'My Lots' and click 'Track' on your lot. The 8-stage interactive stepper shows completed checkpoints, real-time weighing results, auction outcomes, and payment receipt status.",
  },
  {
    q: "What are the stages of the Mandi Process?",
    a: "The standard APMC workflow consists of 8 verified checkpoints: Gate Entry -> Queue -> Quality Check -> Trading/Auction -> Weighing -> Settlement -> Payment -> Exit Gate Pass.",
  },
  {
    q: "How is my payment processed?",
    a: "Once trading and electronic weighing are completed, the settlement bill is prepared. The licensed buyer or APMC transfers payment directly to your bank account or UPI, and the transaction reference is recorded on your tracking slip.",
  },
  {
    q: "Can I use voice commands in Marathi?",
    a: "Yes! The MandiTrack Voice Assistant supports both Marathi (मराठी) and English. Simply click the microphone icon and speak your question, such as 'आजचा कांद्याचा दर' or 'माझा लॉट कुठे आहे'.",
  },
];

export default function HelpSupportView({ onOpenVoiceHelp }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="mx-auto max-w-5xl space-y-6 bg-[#F8F7F2] pb-8 animate-fadeIn">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#CFE2D4] bg-[#EAF2E9] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#285C3A]">
              <HelpCircle size={13} />
              Farmer & Officer Assistance Portal
            </div>

            <h1 className="text-xl font-bold tracking-tight text-[#19343A] sm:text-2xl">
              MandiTrack Help & Support
            </h1>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-[#687779] sm:text-sm">
              Official guidelines, workflow walkthroughs, and direct APMC
              assistance channels.
            </p>
          </div>

          {onOpenVoiceHelp && (
            <button
              type="button"
              onClick={onOpenVoiceHelp}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#285C3A] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#214D31] active:scale-[0.98]"
            >
              <Mic size={15} />
              Open Voice Assistant
            </button>
          )}
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ===================================================
            LEFT — FAQ + WORKFLOW
        ==================================================== */}

        <div className="space-y-6 lg:col-span-2">
          {/* FAQ */}
          <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2 border-b border-[#E5E9E3] pb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5EFDE] text-[#B58A35]">
                <FileQuestion size={17} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-[#19343A]">
                  Frequently Asked Questions
                </h2>

                <p className="mt-0.5 text-[10px] font-medium text-[#8A9695]">
                  वारंवार विचारले जाणारे प्रश्न
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {FAQ_LIST.map((faq, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <div
                    key={idx}
                    className={`overflow-hidden rounded-lg border transition-colors ${
                      isOpen
                        ? "border-[#CFE2D4]"
                        : "border-[#DCE3DB]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-xs font-semibold transition ${
                        isOpen
                          ? "bg-[#EAF2E9] text-[#285C3A]"
                          : "bg-[#F8F7F2] text-[#19343A] hover:bg-[#F3F5F0]"
                      }`}
                    >
                      <span>{faq.q}</span>

                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                          isOpen
                            ? "bg-white text-[#285C3A]"
                            : "bg-[#E5E9E3] text-[#687779]"
                        }`}
                      >
                        {isOpen ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-[#DCE3DB] bg-white px-4 py-4 text-xs font-medium leading-6 text-[#687779]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* =================================================
              WORKFLOW GUIDE
          ================================================== */}

          <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2 border-b border-[#E5E9E3] pb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A]">
                <BookOpen size={17} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-[#19343A]">
                  Mandi Stages Step-by-Step Explanation
                </h2>

                <p className="mt-0.5 text-[10px] font-medium text-[#8A9695]">
                  Understand the journey of your produce
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Stage 1 */}
              <div className="rounded-lg border border-[#CFE2D4] bg-[#EAF2E9] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#285C3A]">
                    1. Gate Entry & Queue
                  </span>

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#285C3A]">
                    01
                  </span>
                </div>

                <p className="mt-2 text-[11px] font-medium leading-5 text-[#477A7A]">
                  Arrive at APMC, scan your digital lot token, and enter the
                  assigned unloading lane.
                </p>
              </div>

              {/* Stage 2 */}
              <div className="rounded-lg border border-[#D5DDE0] bg-[#EEF2F3] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#477A7A]">
                    2. Quality Check & Assaying
                  </span>

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#477A7A]">
                    02
                  </span>
                </div>

                <p className="mt-2 text-[11px] font-medium leading-5 text-[#687779]">
                  Mandi quality inspectors inspect size, moisture, and assign
                  official Grade A/B/C.
                </p>
              </div>

              {/* Stage 3 */}
              <div className="rounded-lg border border-[#DDD6E7] bg-[#F1EEF5] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#75658F]">
                    3. Auction & Weighing
                  </span>

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#75658F]">
                    03
                  </span>
                </div>

                <p className="mt-2 text-[11px] font-medium leading-5 text-[#75658F]">
                  Licensed commission agents and traders bid competitively.
                  Exact weight recorded electronically.
                </p>
              </div>

              {/* Stage 4 */}
              <div className="rounded-lg border border-[#E8DDBF] bg-[#F5EFDE] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#80672C]">
                    4. Direct Settlement & Exit
                  </span>

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#80672C]">
                    04
                  </span>
                </div>

                <p className="mt-2 text-[11px] font-medium leading-5 text-[#80672C]">
                  Amount credited via UPI/NEFT within hours, and an electronic
                  Gate Pass is issued for clearance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            RIGHT — VOICE + CONTACT
        ==================================================== */}

        <div className="space-y-6">
          {/* Ask MandiTrack */}
          <AskMandiTrackCard
            onOpenFullVoiceModal={onOpenVoiceHelp}
          />

          {/* Contact Support */}
          <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2 border-b border-[#E5E9E3] pb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A]">
                <Phone size={16} />
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-[#19343A]">
                  Direct APMC Helpline
                </h3>

                <p className="mt-0.5 text-[10px] font-medium text-[#8A9695]">
                  Get assistance from the facilitation desk
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs font-medium leading-5 text-[#687779]">
              Have questions regarding lot tokens, weighing, or payments?
              Contact our dedicated mandi facilitation desk.
            </p>

            <div className="mt-4 space-y-2.5">
              {/* Toll Free */}
              <a
                href="tel:18002330244"
                className="group flex items-center gap-3 rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] p-3 transition hover:border-[#CFE2D4] hover:bg-[#EAF2E9]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A] transition group-hover:bg-[#285C3A] group-hover:text-white">
                  <Phone size={15} />
                </div>

                <div className="min-w-0">
                  <div className="text-[9px] font-semibold uppercase tracking-wider text-[#8A9695]">
                    Toll-Free Helpline
                  </div>

                  <div className="mt-0.5 text-xs font-bold text-[#19343A]">
                    1800-233-0244
                  </div>
                </div>

                <ArrowRight
                  size={14}
                  className="ml-auto shrink-0 text-[#A7B1AF] transition group-hover:translate-x-0.5 group-hover:text-[#285C3A]"
                />
              </a>

              {/* Mobile */}
              <a
                href="tel:+919876543210"
                className="group flex items-center gap-3 rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] p-3 transition hover:border-[#CFE2D4] hover:bg-[#EAF2E9]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF2E9] text-[#285C3A] transition group-hover:bg-[#285C3A] group-hover:text-white">
                  <Phone size={15} />
                </div>

                <div className="min-w-0">
                  <div className="text-[9px] font-semibold uppercase tracking-wider text-[#8A9695]">
                    APMC Desk Mobile
                  </div>

                  <div className="mt-0.5 text-xs font-bold text-[#19343A]">
                    +91 98765 43210
                  </div>
                </div>

                <ArrowRight
                  size={14}
                  className="ml-auto shrink-0 text-[#A7B1AF] transition group-hover:translate-x-0.5 group-hover:text-[#285C3A]"
                />
              </a>

              {/* Email */}
              <a
                href="mailto:support@manditrack.gov.in"
                className="group flex items-center gap-3 rounded-lg border border-[#DCE3DB] bg-[#F8F7F2] p-3 transition hover:border-[#E8DDBF] hover:bg-[#F5EFDE]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F5EFDE] text-[#B58A35] transition group-hover:bg-[#B58A35] group-hover:text-white">
                  <Mail size={15} />
                </div>

                <div className="min-w-0">
                  <div className="text-[9px] font-semibold uppercase tracking-wider text-[#8A9695]">
                    Official Email
                  </div>

                  <div className="mt-0.5 break-all text-xs font-bold text-[#19343A]">
                    support@manditrack.gov.in
                  </div>
                </div>

                <ArrowRight
                  size={14}
                  className="ml-auto shrink-0 text-[#A7B1AF] transition group-hover:translate-x-0.5 group-hover:text-[#B58A35]"
                />
              </a>
            </div>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-center gap-1.5 border-t border-[#E5E9E3] pt-4 text-center text-[10px] font-medium text-[#8A9695]">
              <ShieldCheck size={12} className="text-[#285C3A]" />
              Government of Maharashtra • MSAMB APMC Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}