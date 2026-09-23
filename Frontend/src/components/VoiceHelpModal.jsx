import React, { useState, useEffect } from "react";
import {
  Volume2,
  Mic,
  X,
  Play,
  Square,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { useLang } from "../context/LanguageContext";

const VOICE_GUIDES = {
  en: {
    title: "MandiTrack Voice Assistant",
    subtitle: "Listen to audio guidance on the mandi process in English",
    topics: [
      {
        id: "overview",
        icon: "🌾",
        title: "MandiTrack Overview",
        desc: "Introduction to digital APMC mandi operations",
        speech:
          "Welcome to MandiTrack. MandiTrack brings complete transparency to your agricultural market journey. From the moment your vehicle arrives at the APMC gate, through grading, trading, weighing, payment, and final exit, every step is recorded digitally with a unique Lot ID.",
      },
      {
        id: "add_produce",
        icon: "📝",
        title: "Gate Entry & Adding Produce",
        desc: "Submitting produce and receiving your Lot ID",
        speech:
          "To begin, click on Add Produce. Enter your crop name, total quantity, unit, selected APMC Mandi, and your expected price. Once submitted, the system instantly generates your unique Lot ID and Token Number for gate entry.",
      },
      {
        id: "queue_tracking",
        icon: "⏱️",
        title: "Live Queue & Stage Tracking",
        desc: "How to check your live queue position",
        speech:
          "Check the My Lots dashboard to view your live queue position and current stage. You will see which checkpoint your produce is currently at, from the waiting queue to quality inspection and live trading.",
      },
      {
        id: "quality_trading",
        icon: "⚖️",
        title: "Quality Check & Trading",
        desc: "Certified grading and merchant bidding",
        speech:
          "At the Quality Check checkpoint, the APMC officer inspects your crop and records an official grade like Grade A, Grade B, or Grade C. Next, during Trading, registered merchants bid for your lot, and the final agreed price per quintal is locked into the system.",
      },
      {
        id: "payment_exit",
        icon: "💰",
        title: "Weighing, Payment & Gate Exit",
        desc: "Certified weighbridge, direct payment, and gate pass",
        speech:
          "Your lot is weighed at the electronic weighbridge for certified net weight. The settlement bill is calculated automatically. Payment is transferred directly to your account. Once payment is confirmed, an official Gate Pass is issued for your vehicle exit.",
      },
    ],
  },

  mr: {
    title: "मंडीट्रॅक व्हॉईस असिस्टंट",
    subtitle: "मंडी प्रक्रियेचे संपूर्ण मार्गदर्शन मराठीत ऐका",
    topics: [
      {
        id: "overview",
        icon: "🌾",
        title: "मंडीट्रॅक विहंगावलोकन",
        desc: "डिजिटल कृषी उत्पन्न बाजार समितीची माहिती",
        speech:
          "नमस्कार शेतकरी बंधूंनो, मंडीट्रॅक पोर्टलमध्ये आपले सहर्ष स्वागत आहे. मंडीट्रॅक आपल्या शेतमालाच्या विक्रीमध्ये १०० टक्के पारदर्शकता आणते. मार्केट गेटवरील प्रवेशापासून ते गुणवत्ता तपासणी, लिलाव, वजन, थेट पेमेंट आणि गेट पासपर्यंत सर्व टप्पे डिजिटल पद्धतीने नोंदवले जातात.",
      },
      {
        id: "add_produce",
        icon: "📝",
        title: "गेट प्रवेश व माल नोंदणी",
        desc: "शेतमालाची नोंदणी आणि लॉट आयडी मिळवणे",
        speech:
          "शेतमाल नोंदवण्यासाठी उत्पादन नोंदवा या बटणावर क्लिक करा. पिकाचे नाव, वजन, मंडी आणि अपेक्षित भाव भरा. सबमिट करताच तुम्हाला अधिकृत लॉट आयडी आणि टोकन क्रमांक दिला जाईल.",
      },
      {
        id: "queue_tracking",
        icon: "⏱️",
        title: "थेट रांग आणि टप्पा ट्रॅकिंग",
        desc: "आपला शेतमाल कोणत्या टप्प्यावर आहे ते तपासा",
        speech:
          "माझे उत्पादन लॉट या पर्यायामध्ये जाऊन तुम्ही तुमच्या शेतमालाची रांगेतील स्थिती पाहू शकता. आपला माल सध्या कोणत्या चेकपॉईंटवर आहे, जसे की तपासणी, लिलाव किंवा वजन, हे तुम्हाला थेट दिसेल.",
      },
      {
        id: "quality_trading",
        icon: "⚖️",
        title: "गुणवत्ता तपासणी आणि लिलाव",
        desc: "प्रमाणित प्रतवारी आणि व्यापारी बोली",
        speech:
          "गुणवत्ता तपासणी केंद्रावर मंडी अधिकारी तुमच्या शेतमालाची पाहणी करून ग्रेड ए, बी किंवा सी अशी प्रतवारी नोंदवतात. त्यानंतर अधिकृत व्यापाऱ्यांच्या उपस्थितीत पारदर्शक लिलाव होऊन अंतिम विक्री दर निश्चित केला जातो.",
      },
      {
        id: "payment_exit",
        icon: "💰",
        title: "वजन, थेट पेमेंट आणि निर्गमन",
        desc: "काटा पावती, थेट बँक जमा आणि गेट पास",
        speech:
          "इलेक्ट्रॉनिक वजन काट्यावर शेतमालाचे अचूक वजन केले जाते. एकूण हिशोबाची पावती बनते आणि पेमेंट थेट शेतकऱ्याच्या खात्यात जमा केले जाते. पेमेंट पूर्ण झाल्यावर बाहेर जाण्यासाठी गेट पास दिला जातो.",
      },
    ],
  },
};

export default function VoiceHelpModal({ isOpen, onClose }) {
  const { locale } = useLang();

  const [selectedLang, setSelectedLang] = useState(
    locale === "mr" ? "mr" : "en"
  );

  const [activeTopicId, setActiveTopicId] = useState("overview");
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    setSelectedLang(locale === "mr" ? "mr" : "en");
  }, [locale]);

  // Stop speech synthesis on unmount or modal close
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentContent =
    VOICE_GUIDES[selectedLang] || VOICE_GUIDES.en;

  const activeTopic =
    currentContent.topics.find(
      (topic) => topic.id === activeTopicId
    ) || currentContent.topics[0];

  // --------------------------------------------------
  // SPEAK
  // --------------------------------------------------

  const handleSpeak = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("Text to Speech is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    if (selectedLang === "mr") {
      utterance.lang = "mr-IN";

      const voices = window.speechSynthesis.getVoices();

      const marathiVoice =
        voices.find(
          (voice) =>
            voice.lang.includes("mr") ||
            voice.name.toLowerCase().includes("marathi")
        ) || voices.find((voice) => voice.lang.includes("hi"));

      if (marathiVoice) {
        utterance.voice = marathiVoice;
      }
    } else {
      utterance.lang = "en-IN";

      const voices = window.speechSynthesis.getVoices();

      const indianVoice = voices.find((voice) =>
        voice.lang.includes("en-IN")
      );

      if (indianVoice) {
        utterance.voice = indianVoice;
      }
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // --------------------------------------------------
  // STOP
  // --------------------------------------------------

  const handleStop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  };

  // --------------------------------------------------
  // CLOSE
  // --------------------------------------------------

  const handleClose = () => {
    handleStop();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#19343A]/60 p-4 backdrop-blur-sm animate-fadeIn">
      {/* =================================================
          MODAL
      ================================================== */}

      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#DCE3DB] bg-[#F8F7F2] shadow-2xl animate-scaleUp">
        {/* =================================================
            HEADER
        ================================================== */}

        <div className="border-b border-white/10 bg-[#214D31] px-5 py-4 text-white sm:px-6 sm:py-5">
          <div className="flex items-start justify-between gap-4">
            {/* Title */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B58A35] text-white shadow-sm">
                <Volume2 size={20} />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-base font-bold sm:text-lg">
                  {currentContent.title}
                </h2>

                <p className="mt-0.5 line-clamp-2 text-[11px] text-[#D6E4D2] sm:text-xs">
                  {currentContent.subtitle}
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  handleStop();

                  setSelectedLang((prev) =>
                    prev === "en" ? "mr" : "en"
                  );
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2.5 py-2 text-[10px] font-semibold text-white transition hover:bg-white/15 sm:px-3 sm:text-xs"
              >
                <Globe size={13} />

                <span className="hidden sm:inline">
                  {selectedLang === "en"
                    ? "मराठीत ऐका"
                    : "Listen in EN"}
                </span>

                <span className="sm:hidden">
                  {selectedLang === "en" ? "MR" : "EN"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white/70 transition hover:bg-white/15 hover:text-white"
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            BODY
        ================================================== */}

        <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
          {/* =================================================
              ACTIVE AUDIO CARD
          ================================================== */}

          <div className="rounded-xl border border-[#DCE3DB] bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5EFDE] text-2xl">
                  {activeTopic.icon}
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#19343A] sm:text-base">
                    {activeTopic.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#687779]">
                    {activeTopic.desc}
                  </p>
                </div>
              </div>

              {/* Audio Button */}
              {isSpeaking ? (
                <button
                  type="button"
                  onClick={handleStop}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#A64B4B] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#913F3F] active:scale-[0.98]"
                >
                  <Square size={13} fill="currentColor" />

                  {selectedLang === "mr"
                    ? "थांबवा"
                    : "Stop Audio"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    handleSpeak(activeTopic.speech)
                  }
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#285C3A] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#214D31] active:scale-[0.98]"
                >
                  <Play size={13} fill="currentColor" />

                  {selectedLang === "mr"
                    ? "मराठीत ऐका"
                    : "Listen Now"}
                </button>
              )}
            </div>

            {/* Speaking Indicator */}
            {isSpeaking && (
              <div className="mt-5 flex items-center gap-2 rounded-lg border border-[#E8DDBF] bg-[#F5EFDE] px-3 py-2.5 text-xs font-medium text-[#80672C]">
                <Mic
                  size={15}
                  className="shrink-0 text-[#B58A35] animate-bounce"
                />

                <span>
                  {selectedLang === "mr"
                    ? "आवाज सुरू आहे... कृपया काळजीपूर्वक ऐका."
                    : "Speaking audio guidance... Please listen."}
                </span>
              </div>
            )}

            {/* Speech Text */}
            <div className="mt-5 rounded-lg border border-[#E1E4DE] bg-[#F8F7F2] px-4 py-4 text-sm leading-6 text-[#526260]">
              "{activeTopic.speech}"
            </div>
          </div>

          {/* =================================================
              TOPIC SELECTOR
          ================================================== */}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#687779]">
                  {selectedLang === "mr"
                    ? "विषय निवडा"
                    : "Select Topic"}
                </p>

                <h4 className="mt-1 text-sm font-bold text-[#19343A]">
                  {selectedLang === "mr"
                    ? "मार्गदर्शन विषय"
                    : "Guidance Topics"}
                </h4>
              </div>

              <span className="rounded-full bg-[#EAF2E9] px-2.5 py-1 text-[10px] font-semibold text-[#285C3A]">
                {currentContent.topics.length} Topics
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {currentContent.topics.map((topic) => {
                const isActive = topic.id === activeTopicId;

                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => {
                      setActiveTopicId(topic.id);

                      if (isSpeaking) {
                        handleStop();
                      }
                    }}
                    className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
                      isActive
                        ? "border-[#285C3A] bg-[#EAF2E9] shadow-sm"
                        : "border-[#DCE3DB] bg-white hover:border-[#B8CDB8] hover:bg-[#FAFAF7]"
                    }`}
                  >
                    {/* Topic Icon */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl ${
                        isActive
                          ? "bg-white"
                          : "bg-[#F8F7F2]"
                      }`}
                    >
                      {topic.icon}
                    </div>

                    {/* Topic Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={`truncate text-xs font-bold ${
                            isActive
                              ? "text-[#285C3A]"
                              : "text-[#19343A]"
                          }`}
                        >
                          {topic.title}
                        </div>

                        {isActive && (
                          <CheckCircle2
                            size={13}
                            className="shrink-0 text-[#285C3A]"
                          />
                        )}
                      </div>

                      <div className="mt-1 truncate text-[11px] text-[#687779]">
                        {topic.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================================
            FOOTER
        ================================================== */}

        <div className="flex flex-col gap-3 border-t border-[#DCE3DB] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2 text-[10px] font-medium text-[#687779]">
            <Volume2 size={13} className="text-[#285C3A]" />
            <span>Web Speech API Voice Guidance</span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-[#DCE3DB] bg-white px-4 py-2 text-xs font-semibold text-[#687779] transition hover:bg-[#F8F7F2] hover:text-[#19343A]"
          >
            {selectedLang === "mr" ? "बंद करा" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}