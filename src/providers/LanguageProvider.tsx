"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import esData from "@/data/portfolio.es.json";
import enData from "@/data/portfolio.en.json";
import type { PortfolioData } from "@/data/portfolio.json";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // Type is explicitly casted from module to avoid missing property ID errors
  portfolioData: PortfolioData;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-language", lang);
    }
  };

  useEffect(() => {
    // Check localStorage first
    const savedLang = localStorage.getItem(
      "portfolio-language",
    ) as Language | null;

    if (savedLang === "es" || savedLang === "en") {
      setLanguageState(savedLang);
    } else {
      // Fallback to system language
      const sysLang = navigator.language.split("-")[0];
      if (sysLang === "en") {
        setLanguageState("en");
      }
    }
    setMounted(true);
  }, []);

  // Use esData during SSR to avoid hydration mismatch as much as possible,
  // then switch to the correct language on client
  const currentData = (!mounted || language === "es"
    ? esData
    : enData) as unknown as PortfolioData;

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, portfolioData: currentData }}
    >
      {/* Suppress hydration warnings because text content might change after first render */}
      <div suppressHydrationWarning>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
