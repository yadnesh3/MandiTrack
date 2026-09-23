import React, { useState } from "react";
import {
  Mic,
  MicOff,
  ArrowRight,
  Volume2,
  Sparkles,
} from "lucide-react";

export default function AskMandiTrackCard({
  onOpenFullVoiceModal,
  className = "",
}) {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleMicClick = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      if (onOpenFullVoiceModal) {
        onOpenFullVoiceModal();
        return;
      }

      alert(
        "Speech recognition is not supported in this browser. Please type your question."
      );
      return;
    }

    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      const recognition = new SpeechRecognition();

      recognition.lang = "mr-IN";
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
      reply =
        "आज पुणे एपीएमसी मध्ये कांद्याचा सरासरी दर ₹१,६५० - ₹२,१०० प्रति क्विंटल आहे.";
    } else if (lower.includes("टोमॅटो") || lower.includes("tomato")) {
      reply = "टोमॅटोचा दर ₹१,२०० - ₹१,८०० प्रति क्विंटल चालू आहे.";
    } else if (lower.includes("गहू") || lower.includes("wheat")) {
      reply = "गव्हाचा दर ₹२,४०० - ₹२,८५० प्रति क्विंटल आहे.";
    } else if (
      lower.includes("लॉट") ||
      lower.includes("status") ||
      lower.includes("stage")
    ) {
      reply =
        "तुमचा लॉट सध्या क्वालिटी चेक टप्प्यावर आहे. प्रतीक्षा वेळ अंदाजे २५ मिनिटे आहे.";
    } else {
      reply =
        "मंडीत सर्व मालाचे लिलाव सुरळीत चालू आहेत. आणखी माहितीसाठी व्हॉइस असिस्टंट उघडा.";
    }

    setResponseMsg(reply);

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
      className={`bg-white rounded-xl border border-[#DCE3DB] shadow-sm p-5 flex flex-col justify-between ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#EEF3EC] text-[#285C3A] flex items-center justify-center">
            <Sparkles size={16} strokeWidth={2} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#19343A]">
              Need Help?
            </h3>

            <p className="text-[11px] text-[#687779] mt-0.5">
              Ask MandiTrack
            </p>
          </div>
        </div>

        {onOpenFullVoiceModal && (
          <button
            onClick={onOpenFullVoiceModal}
            className="group flex items-center gap-1.5 text-xs font-semibold text-[#285C3A] hover:text-[#214D31] transition-colors"
          >
            Open Assistant
            <ArrowRight
              size={13}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        )}
      </div>

      {/* Assistant Introduction */}
      <div className="flex items-start gap-3 mb-4">
        <div className="relative shrink-0">
          <img
            src="/farmer_avatar.jpg"
            alt="Mandi Saathi"
            className="w-12 h-12 rounded-full object-cover border-2 border-[#285C3A] shadow-sm"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60";
            }}
          />

          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#285C3A] ring-2 ring-white" />
        </div>

        <div className="flex-1 bg-[#F8F7F2] border border-[#E1E4DE] rounded-xl rounded-tl-none p-3">
          <div className="text-xs font-bold text-[#19343A]">
            Ask MandiTrack
          </div>

          <div className="text-[11px] text-[#687779] mt-1 leading-relaxed">
            Use voice or type your question in Marathi or English.
          </div>
        </div>
      </div>

      {/* Response */}
      {responseMsg && (
        <div className="mb-3 p-3 rounded-lg bg-[#EAF2E9] border border-[#D3E3D3] text-xs text-[#214D31] flex items-start gap-2 animate-fadeIn">
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center shrink-0">
            <Volume2 size={15} className="text-[#285C3A]" />
          </div>

          <span className="font-medium leading-relaxed pt-1">
            {responseMsg}
          </span>
        </div>
      )}

      {/* Input Area */}
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center gap-2"
      >
        {/* Microphone */}
        <button
          type="button"
          onClick={handleMicClick}
          title={
            isListening
              ? "Listening..."
              : "Click to Speak (Marathi / English)"
          }
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all active:scale-95 ${
            isListening
              ? "bg-[#B94A48] text-white animate-pulse"
              : "bg-[#285C3A] hover:bg-[#214D31] text-white"
          }`}
        >
          {isListening ? <MicOff size={17} /> : <Mic size={17} />}
        </button>

        {/* Text Input */}
        <div className="flex-1 relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="आज कांद्याचा दर किती आहे?"
            className="w-full bg-[#F8F7F2] border border-[#DCE3DB] rounded-lg py-2.5 pl-3.5 pr-10 text-xs text-[#19343A] placeholder-[#8A9695] focus:outline-none focus:border-[#285C3A] focus:bg-white transition-all font-medium"
          />

          <button
            type="submit"
            aria-label="Send inquiry"
            className="absolute right-1.5 w-7 h-7 rounded-md bg-[#285C3A] hover:bg-[#214D31] text-white flex items-center justify-center transition active:scale-90"
          >
            <ArrowRight size={13} strokeWidth={2.5} />
          </button>
        </div>
      </form>

      {/* Suggestion */}
      <div className="mt-3 flex items-center gap-1.5 text-[11px]">
        <span className="font-semibold text-[#8A9695]">
          Try:
        </span>

        <button
          type="button"
          onClick={() => handleChipClick("आजचा कांद्याचा दर")}
          className="text-[#285C3A] hover:text-[#214D31] hover:underline font-semibold truncate"
        >
          "आजचा कांद्याचा दर"
        </button>
      </div>
    </div>
  );
}