import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getTranslation, getUnitLabel } from "../utils/translations";

const STORAGE_KEY = "manditrack_lang";
const SUPPORTED = ["en", "mr"];

const LanguageContext = createContext(null);

const readStoredLang = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(saved) ? saved : "en";
  } catch {
    // Private browsing can make localStorage throw. English is a fine default.
    return "en";
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang);

  const setLang = (next) => {
    if (!SUPPORTED.includes(next)) return;

    setLangState(next);

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not being able to remember the choice is not worth breaking the UI.
    }
  };

  // Keep the document language in sync for accessibility and screen readers.
  useEffect(() => {
    document.documentElement.lang =
      lang === "mr" ? "mr-IN" : "en-IN";
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,

      setLang,

      toggleLang: () => {
        setLang(lang === "en" ? "mr" : "en");
      },

      t: (key) => getTranslation(lang, key),

      // Lots store their unit in English; this is display only.
      tUnit: (unit) => getUnitLabel(lang, unit),

      // Marathi keeps Latin digits intentionally.
      locale:
        lang === "mr"
          ? "mr-IN-u-nu-latn"
          : "en-IN",
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Reads the active language.
 *
 * Falls back to English rather than throwing when used outside
 * the provider, so isolated components remain readable.
 */
export function useLang() {
  const context = useContext(LanguageContext);

  if (!context) {
    return {
      lang: "en",
      setLang: () => {},
      toggleLang: () => {},
      t: (key) => getTranslation("en", key),
      tUnit: (unit) => getUnitLabel("en", unit),
      locale: "en-IN",
    };
  }

  return context;
}

export default LanguageContext;