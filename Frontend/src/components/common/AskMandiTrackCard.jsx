import React, { useState } from "react";
import { Mic, MicOff, ArrowRight, Volume2, Sparkles } from "lucide-react";

export default function AskMandiTrackCard({
  onOpenFullVoiceModal,
  className = "",
}) {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      if (onOpenFullVoiceModal) {
        onOpenFullVoiceModal();
        return;
      }
      alert("Speech recognition is not supported in this browser. Please type your question.");
      return;
    }

    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "mr-IN"; // Marathi or English
      recognition.continuous = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleAnswerQuery(transcript);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleAnswerQuery = (text) => {
    const lower = text.toLowerCase();
    let reply = "";

    if (lower.includes("कांदा") || lower.includes("onion")) {
      reply = "आज पुणे एपीएमसी मध्ये कांद्याचा सरासरी दर ₹१,६५० - ₹२,१०० प्रति क्विंटल आहे.";
    } else if (lower.includes("टोमॅटो") || lower.includes("tomato")) {
      reply = "टोमॅटोचा दर ₹१,२०० - ₹१,८०० प्रति क्विंटल चालू आहे.";
    } else if (lower.includes("गहू") || lower.includes("wheat")) {
      reply = "गव्हाचा दर ₹२,४०० - ₹२,८५० प्रति क्विंटल आहे.";
    } else if (lower.includes("लॉट") || lower.includes("status") || lower.includes("stage")) {
      reply = "तुमचा लॉट सध्या क्वालिटी चेक टप्प्यावर आहे. प्रतीक्षा वेळ अंदाजे २५ मिनिटे आहे.";
    } else {
      reply = "मंडीत सर्व मालाचे लिलाव सुरळीत चालू आहेत. आणखी माहितीसाठी व्हॉइस असिस्टंट उघडा.";
    }

    setResponseMsg(reply);

    // Text to Speech
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(reply);
      utterance.lang = "mr-IN";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleAnswerQuery(query);
  };

  const handleChipClick = (suggestion) => {
    setQuery(suggestion);
    handleAnswerQuery(suggestion);
  };

  return (
    <div
      className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles size={14} className="text-amber-500" />
          Need Help?
        </h3>
        {onOpenFullVoiceModal && (
          <button
            onClick={onOpenFullVoiceModal}
            className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800"
          >
            Open Assistant &rarr;
          </button>
        )}
      </div>

      {/* Avatar + Speech Bubble */}
      <div className="flex items-start gap-3 mb-4">
        <div className="relative shrink-0">
          <img
            src="/farmer_avatar.jpg"
            alt="Mandi Saathi"
            className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60";
            }}
          />
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>

        {/* Speech Bubble */}
        <div className="flex-1 bg-slate-50 border border-slate-200/80 rounded-2xl rounded-tl-none p-3 shadow-2xs">
          <div className="text-xs font-bold text-slate-900 leading-tight">
            Ask MandiTrack
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
            Use voice or type your question in Marathi or English
          </div>
        </div>
      </div>

      {/* Dynamic Voice Answer if answered */}
      {responseMsg && (
        <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2 animate-fadeIn">
          <Volume2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
          <span className="font-semibold">{responseMsg}</span>
        </div>
      )}

      {/* Mic button + Input pill matching reference */}
      <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleMicClick}
          title={isListening ? "Listening..." : "Click to Speak (Marathi / English)"}
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-xs transition-all active:scale-95 ${
            isListening
              ? "bg-rose-600 text-white animate-pulse"
              : "bg-emerald-700 hover:bg-emerald-800 text-white"
          }`}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        <div className="flex-1 relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="आज कांद्याचा दर किती आहे?"
            className="w-full bg-slate-50 border border-slate-200/90 rounded-full py-2 pl-3.5 pr-9 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all font-medium"
          />
          <button
            type="submit"
            aria-label="Send inquiry"
            className="absolute right-1.5 w-7 h-7 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition active:scale-90"
          >
            <ArrowRight size={13} strokeWidth={2.5} />
          </button>
        </div>
      </form>

      {/* Suggestion Chip */}
      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-500">
        <span className="font-semibold text-slate-400">Try:</span>
        <button
          type="button"
          onClick={() => handleChipClick("आजचा कांद्याचा दर")}
          className="text-emerald-700 hover:underline font-semibold truncate"
        >
          "आजचा कांद्याचा दर"
        </button>
      </div>
    </div>
  );
}
