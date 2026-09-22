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
  Scale,
  CreditCard,
  Mic,
  ShieldCheck,
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
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
            <HelpCircle size={14} />
            Farmer & Officer Assistance Portal
          </div>
          <h1 className="text-2xl font-black text-[#0C192C] tracking-tight">
            MandiTrack Help & Support
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Official guidelines, workflow walkthroughs, and direct APMC assistance channels.
          </p>
        </div>

        {onOpenVoiceHelp && (
          <button
            onClick={onOpenVoiceHelp}
            className="px-5 py-2.5 rounded-xl bg-[#0C192C] hover:bg-[#162f52] text-white font-extrabold text-xs shadow-xs transition flex items-center justify-center gap-2 active:scale-95 shrink-0"
          >
            <Mic size={15} className="text-amber-400" />
            <span>Open Voice Assistant</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: FAQs & Workflow Guide */}
        <div className="lg:col-span-2 space-y-6">
          {/* FAQ Accordion Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileQuestion size={18} className="text-[#EA8F0B]" />
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Frequently Asked Questions (वारंवार विचारले जाणारे प्रश्न)
              </h2>
            </div>

            <div className="space-y-2.5">
              {FAQ_LIST.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-4 bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between gap-3 text-xs font-bold text-slate-800 transition"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp size={16} className="text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Workflow Guide Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <BookOpen size={18} className="text-emerald-600" />
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Mandi Stages Step-by-Step Explanation
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <span className="font-extrabold text-emerald-900">1. Gate Entry & Queue</span>
                <p className="text-[11px] text-emerald-800/80 mt-1">
                  Arrive at APMC, scan your digital lot token, and enter the assigned unloading lane.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-sky-50/60 border border-sky-100">
                <span className="font-extrabold text-sky-900">2. Quality Check & Assaying</span>
                <p className="text-[11px] text-sky-800/80 mt-1">
                  Mandi quality inspectors inspect size, moisture, and assign official Grade A/B/C.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100">
                <span className="font-extrabold text-purple-900">3. Auction & Weighing</span>
                <p className="text-[11px] text-purple-800/80 mt-1">
                  Licensed commission agents and traders bid competitively. Exact weight recorded electronically.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-100">
                <span className="font-extrabold text-amber-900">4. Direct Settlement & Exit</span>
                <p className="text-[11px] text-amber-800/80 mt-1">
                  Amount credited via UPI/NEFT within hours, and an electronic Gate Pass is issued for clearance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Ask MandiTrack + Clickable Contact Details */}
        <div className="space-y-6">
          <AskMandiTrackCard onOpenFullVoiceModal={onOpenVoiceHelp} />

          {/* Contact Support Card with Clickable Links */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Phone size={15} className="text-emerald-600" />
              Direct APMC Helpline
            </h3>

            <p className="text-xs text-slate-500 font-medium">
              Have questions regarding lot tokens, weighing, or payments? Contact our dedicated mandi facilitation desk.
            </p>

            <div className="space-y-2.5">
              <a
                href="tel:18002330244"
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-bold text-slate-800 hover:text-emerald-900 transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Toll-Free Helpline</div>
                  <div className="text-xs font-black">1800-233-0244</div>
                </div>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-bold text-slate-800 hover:text-emerald-900 transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">APMC Desk Mobile</div>
                  <div className="text-xs font-black">+91 98765 43210</div>
                </div>
              </a>

              <a
                href="mailto:support@manditrack.gov.in"
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 text-xs font-bold text-slate-800 hover:text-amber-900 transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-[#EA8F0B] flex items-center justify-center shrink-0 group-hover:bg-[#EA8F0B] group-hover:text-white transition-colors">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Official Email</div>
                  <div className="text-xs font-black">support@manditrack.gov.in</div>
                </div>
              </a>
            </div>

            <div className="pt-2 text-[10px] text-slate-400 font-semibold text-center border-t border-slate-100">
              Government of Maharashtra &bull; MSAMB APMC Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
