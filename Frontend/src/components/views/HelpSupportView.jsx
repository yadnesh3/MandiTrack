import React, { useState } from "react";
import AskMandiTrackCard from "../common/AskMandiTrackCard";
import { useLang } from "../../context/LanguageContext";
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

const FAQ_LIST_EN = [
  {
    q: "How do I register and add my produce lot?",
    a: "Click on 'Add Produce' from the sidebar menu, select your crop (Onion, Tomato, Soybean, etc.), enter the quantity and your expected rate, select your APMC market, and generate your Mandi Token. Show this token upon arrival at the Gate Entry.",
  },
  {
    q: "How do I track my lot progress in real-time?",
    a: "Navigate to 'Lot Tracking' or 'My Lots' and click 'Track' on your lot. The 9-stage interactive stepper shows completed checkpoints, real-time weighing results, auction outcomes, and payment receipt status.",
  },
  {
    q: "What are the stages of the Mandi Process?",
    a: "The standard APMC workflow consists of 9 verified checkpoints: Gate Entry -> Token / Lot ID -> Queue -> Quality Check -> Trading / Sale -> Weighing -> Settlement -> Payment -> Exit Gate Pass.",
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

const FAQ_LIST_MR = [
  {
    q: "मी शेतमाल कसा नोंदवावा आणि लॉट कसा तयार करावा?",
    a: "'शेतमाल नोंदवा' वर क्लिक करा, आपले पीक (कांदा, टोमॅटो, सोयाबीन इ.) निवडा, प्रमाण आणि अपेक्षित दर टाका, बाजार समिती निवडा आणि टोकन तयार करा. गेटवर पोहोचल्यावर हे टोकन दाखवा.",
  },
  {
    q: "मी माझ्या लॉटची प्रगती थेट कशी पाहू शकतो?",
    a: "'लॉट ट्रॅकिंग' किंवा 'माझे शेतमाल लॉट' वर जाऊन 'ट्रॅक' वर क्लिक करा. ९-टप्प्यांचा इंटरॅक्टिव्ह स्टेपर पूर्ण झालेले चेकपॉईंट, प्रमाणित वजन, लिलाव आणि पेमेंट पावती दर्शवतो.",
  },
  {
    q: "मंडी प्रक्रियेचे मुख्य टप्पे कोणते आहेत?",
    a: "मानक बाजार समिती कार्यप्रवाहात ९ सत्यापित चेकपॉईंट आहेत: गेट प्रवेश -> टोकन / लॉट आयडी -> प्रतीक्षा रांग -> गुणवत्ता तपासणी -> लिलाव व विक्री -> वजन मापन -> हिशोब व पावती -> पेमेंट -> निर्गमन गेट पास.",
  },
  {
    q: "माझे पेमेंट कसे जमा होते?",
    a: "लिलाव आणि इलेक्ट्रॉनिक वजन पूर्ण झाल्यावर हिशोब पावती तयार केली जाते. परवानाधारक खरेदीदार किंवा बाजार समिती थेट आपल्या बँक खात्यात किंवा UPI द्वारे रक्कम हस्तांतरित करते.",
  },
  {
    q: "मी मराठीत व्हॉईस कमांड वापरू शकतो का?",
    a: "होय! मंडीट्रॅक व्हॉईस असिस्टंट मराठी आणि इंग्रजी दोन्ही भाषांना समर्थन देतो. माइक आयकॉनवर क्लिक करा आणि 'आजचा कांद्याचा दर' किंवा 'माझा लॉट कुठे आहे' असे विचारू शकता.",
  },
];

const WORKFLOW_STAGES_EN = [
  {
    step: "01",
    title: "1. Gate Entry & Token",
    desc: "Arrive at APMC, scan your digital lot token, and enter the assigned unloading lane.",
    bg: "bg-[#EAF2E9]",
    border: "border-[#CFE2D4]",
    text: "text-[#285C3A]",
  },
  {
    step: "02",
    title: "2. Quality Check & Assaying",
    desc: "Mandi quality inspectors inspect size, moisture, and assign official Grade A/B/C.",
    bg: "bg-[#EEF2F3]",
    border: "border-[#D5DDE0]",
    text: "text-[#477A7A]",
  },
  {
    step: "03",
    title: "3. Auction & Weighing",
    desc: "Licensed commission agents and traders bid competitively. Exact weight recorded electronically.",
    bg: "bg-[#F1EEF5]",
    border: "border-[#DDD6E7]",
    text: "text-[#75658F]",
  },
  {
    step: "04",
    title: "4. Direct Settlement & Exit",
    desc: "Amount credited via UPI/NEFT within hours, and an electronic Gate Pass is issued for clearance.",
    bg: "bg-[#F5EFDE]",
    border: "border-[#E8DDBF]",
    text: "text-[#80672C]",
  },
];

const WORKFLOW_STAGES_MR = [
  {
    step: "01",
    title: "१. गेट प्रवेश व टोकन",
    desc: "बाजार समितीत या, डिजिटल लॉट टोकन दाखवा आणि नियुक्त अनलोडिंग रांगेत प्रवेश करा.",
    bg: "bg-[#EAF2E9]",
    border: "border-[#CFE2D4]",
    text: "text-[#285C3A]",
  },
  {
    step: "02",
    title: "२. गुणवत्ता तपासणी",
    desc: "गुणवत्ता निरीक्षक मालाचा आकार, ओलावा तपासून अधिकृत A/B/C प्रतवारी निश्चित करतात.",
    bg: "bg-[#EEF2F3]",
    border: "border-[#D5DDE0]",
    text: "text-[#477A7A]",
  },
  {
    step: "03",
    title: "३. लिलाव आणि वजन मापन",
    desc: "परवानाधारक अडते आणि खरेदीदार स्पर्धात्मक बोली लावतात. इलेक्ट्रॉनिक काट्यावर अचूक वजन नोंदवले जाते.",
    bg: "bg-[#F1EEF5]",
    border: "border-[#DDD6E7]",
    text: "text-[#75658F]",
  },
  {
    step: "04",
    title: "४. थेट हिशोब व गेट पास",
    desc: "रक्कम काही तासांत थेट बँक खात्यात/UPI द्वारे जमा होते आणि निर्गमनासाठी इलेक्ट्रॉनिक गेट पास मिळतो.",
    bg: "bg-[#F5EFDE]",
    border: "border-[#E8DDBF]",
    text: "text-[#80672C]",
  },
];

export default function HelpSupportView({ onOpenVoiceHelp }) {
  const { lang, t } = useLang();
  const [openFaq, setOpenFaq] = useState(0);

  const faqList = lang === "mr" ? FAQ_LIST_MR : FAQ_LIST_EN;
  const workflowStages = lang === "mr" ? WORKFLOW_STAGES_MR : WORKFLOW_STAGES_EN;

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
              {t("helpBadge")}
            </div>

            <h1 className="text-xl font-bold tracking-tight text-[#19343A] sm:text-2xl">
              {t("helpHeading")}
            </h1>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-[#687779] sm:text-sm">
              {t("helpSubtext")}
            </p>
          </div>

          {onOpenVoiceHelp && (
            <button
              type="button"
              onClick={onOpenVoiceHelp}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#285C3A] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#214D31] active:scale-[0.98]"
            >
              <Mic size={15} />
              {t("openVoiceBtn")}
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
                  {t("faqHeading")}
                </h2>

                <p className="mt-0.5 text-[10px] font-medium text-[#8A9695]">
                  {t("faqMarathiSub")}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {faqList.map((faq, idx) => {
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
                  {t("workflowHeading")}
                </h2>

                <p className="mt-0.5 text-[10px] font-medium text-[#8A9695]">
                  {t("workflowSub")}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {workflowStages.map((stage, sIdx) => (
                <div key={sIdx} className={`rounded-lg border ${stage.border} ${stage.bg} p-4`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${stage.text}`}>
                      {stage.title}
                    </span>

                    <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold ${stage.text}`}>
                      {stage.step}
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] font-medium leading-5 text-[#687779]">
                    {stage.desc}
                  </p>
                </div>
              ))}
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
                  {t("directHelplineTitle")}
                </h3>

                <p className="mt-0.5 text-[10px] font-medium text-[#8A9695]">
                  {t("directHelplineSub")}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs font-medium leading-5 text-[#687779]">
              {lang === "mr"
                ? "टोकन, वजन किंवा पेमेंटबाबत काही प्रश्न आहेत का? आमच्या समर्पित बाजार समिती मदत कक्षाशी संपर्क साधा."
                : "Have questions regarding lot tokens, weighing, or payments? Contact our dedicated mandi facilitation desk."}
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
                    {t("tollFreeLabel")}
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
                    {t("apmcMobileLabel")}
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
                    {t("officialEmailLabel")}
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
              {t("govtSupportFooter")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}