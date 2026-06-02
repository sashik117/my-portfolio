"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { dictionary, type Locale, type Translation } from "./dictionary";

export type { Locale, Translation };

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("uk");

  useEffect(() => {
    document.documentElement.lang = locale === "uk" ? "uk" : "en";
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale((current) => (current === "uk" ? "en" : "uk")),
      t: dictionary[locale]
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
