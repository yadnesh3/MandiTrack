import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Mic, X, Play, Square, Globe } from "lucide-react";
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
  const { locale, t } = useLang();
  const [selectedLang, setSelectedLang] = useState(locale === "mr" ? "mr" : "en");
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

  const currentContent = VOICE_GUIDES[selectedLang] || VOICE_GUIDES.en;
  const activeTopic =
    currentContent.topics.find((t) => t.id === activeTopicId) || currentContent.topics[0];

  const handleSpeak = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("Text to Speech is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    // Prefer Marathi or Hindi voices for Marathi; English Indian or standard for English
    if (selectedLang === "mr") {
      utterance.lang = "mr-IN";
      const voices = window.speechSynthesis.getVoices();
      const marathiVoice =
        voices.find((v) => v.lang.includes("mr") || v.name.toLowerCase().includes("marathi")) ||
        voices.find((v) => v.lang.includes("hi"));
      if (marathiVoice) utterance.voice = marathiVoice;
    } else {
      utterance.lang = "en-IN";
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find((v) => v.lang.includes("en-IN"));
      if (indianVoice) utterance.voice = indianVoice;
    }

    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FBF8EF] border-2 border-[#D9A227]/40 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0E2A3F] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
              <Volume2 size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-snug">{currentContent.title}</h2>
              <p className="text-xs text-white/60">{currentContent.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language switch button */}
            <button
              onClick={() => {
                handleStop();
                setSelectedLang((prev) => (prev === "en" ? "mr" : "en"));
              }}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5 transition text-amber-300 border border-white/10"
            >
              <Globe size={14} />
              {selectedLang === "en" ? "मराठीत ऐका" : "Listen in EN"}
            </button>

            <button
              onClick={() => {
                handleStop();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Active Audio Player Card */}
          <div className="bg-white rounded-2xl border-2 border-[#E3DCC8] p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeTopic.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{activeTopic.title}</h3>
                  <p className="text-xs text-slate-500">{activeTopic.desc}</p>
                </div>
              </div>

              {isSpeaking ? (
                <button
                  onClick={handleStop}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition active:scale-95 shrink-0"
                >
                  <Square size={14} fill="white" />
                  {selectedLang === "mr" ? "थांबवा" : "Stop Audio"}
                </button>
              ) : (
                <button
                  onClick={() => handleSpeak(activeTopic.speech)}
                  className="px-4 py-2 bg-[#0E2A3F] hover:bg-[#163b57] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition active:scale-95 shrink-0 border border-[#D9A227]/40"
                >
                  <Play size={14} fill="currentColor" />
                  {selectedLang === "mr" ? "मराठीत ऐका" : "Listen Now"}
                </button>
              )}
            </div>

            {/* Speaking animation indicator */}
            {isSpeaking && (
              <div className="flex items-center gap-2 p-2.5 bg-amber-50 rounded-xl border border-amber-200/70 text-amber-900 text-xs font-medium animate-pulse">
                <Mic size={16} className="text-amber-600 animate-bounce" />
                <span>
                  {selectedLang === "mr"
                    ? "आवाज सुरू आहे... कृपया काळजीपूर्वक ऐका."
                    : "Speaking audio guidance... Please listen."}
                </span>
              </div>
            )}

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-700 leading-relaxed italic">
              "{activeTopic.speech}"
            </div>
          </div>

          {/* Topic Select List */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-3">
              {selectedLang === "mr" ? "विषय निवडा" : "Select Topic"}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentContent.topics.map((topic) => {
                const isActive = topic.id === activeTopicId;
                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setActiveTopicId(topic.id);
                      if (isSpeaking) {
                        handleStop();
                      }
                    }}
                    className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition ${
                      isActive
                        ? "bg-white border-[#0E2A3F] shadow-sm ring-1 ring-[#0E2A3F]"
                        : "bg-white/60 border-[#E3DCC8] hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <span className="text-2xl shrink-0">{topic.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs text-slate-900 truncate">
                        {topic.title}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {topic.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-[#E3DCC8] flex items-center justify-between text-xs text-slate-500">
          <span>🌾 Web Speech API Voice Guidance</span>
          <button
            onClick={() => {
              handleStop();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold transition"
          >
            {selectedLang === "mr" ? "बंद करा" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
