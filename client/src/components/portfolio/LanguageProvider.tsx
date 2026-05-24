"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "uk" | "en";

const dictionary = {
  uk: {
    nav: {
      brand: "Oleksandra Portfolio",
      about: "Про мене",
      skills: "Навички",
      projects: "Проєкти",
      contact: "Контакти",
      switchLabel: "Перемкнути мову",
      menuLabel: "Відкрити навігацію"
    },
    hero: {
      eyebrow: "Початківець fullstack developer з України",
      titleName: "Oleksandra",
      titleRole: "Beginner fullstack developer",
      titlePlace: "з України.",
      intro:
        "Я створюю мобільні та веб-досвіди з красивим UI, практичним backend, базами даних, AI-фічами та реальними продуктами у портфоліо.",
      projectsCta: "Дивитись проєкти",
      contactCta: "Зв'язатись",
      stats: [
        ["6+", "реальних проєктів"],
        ["Ukraine", "Europe/Kyiv"],
        ["Beginner", "fullstack path"]
      ],
      stackLabel: "Поточний стек",
      stackCards: [
        ["APIs", "Express + FastAPI"],
        ["Databases", "Postgres + SQLite"],
        ["Mobile", "Flutter + Compose"],
        ["Frontend", "React + motion"]
      ],
      deploy: "Deploy flow",
      performance: "product-style interactions"
    },
    about: {
      eyebrow: "Про мене",
      title:
        "Я Олександра, початківець fullstack developer, який збирає реальні web, mobile, AI та backend-проєкти.",
      copy:
        "Я з України, працюю в часовому поясі Europe/Kyiv і роблю проєкти, які виглядають як справжні продукти: музика, фітнес, nutrition AI, language learning, exam prep і PDF parsing.",
      profileLabel: "Профіль",
      profileTitle: "Початківець, але з проєктами, які вже показують смак і технічний діапазон.",
      profileCopy:
        "Моя ціль зараз - рости як fullstack developer: робити чистий frontend, продумані API, нормальну структуру даних, mobile-first інтерфейси і фічі, які не соромно показати.",
      interests: [
        ["Fullstack web", "React, APIs, databases"],
        ["Mobile apps", "Flutter and Compose flows"],
        ["AI products", "Gemini and enrichment logic"],
        ["Fitness tools", "workouts and analytics"],
        ["Language learning", "SRS, speaking, context"],
        ["Exam platforms", "tests, progress, content"]
      ]
    },
    skills: {
      eyebrow: "Навички",
      title: "Frontend polish, mobile apps, APIs, AI features і data-heavy tooling.",
      copy:
        "Це не вигаданий список: стек підтягнутий з моїх реальних проєктів у папці Apps."
    },
    projects: {
      eyebrow: "Проєкти",
      title: "Реальні застосунки: від музики й фітнесу до AI nutrition та підготовки до ПДР.",
      copy:
        "Ці проєкти зібрані з моєї Apps-папки: fullstack web, mobile-first apps, backend APIs, AI features і Python data tools. Нові проєкти потім можна додавати через CMS.",
      all: "Всі",
      featured: "Featured",
      details: "Деталі",
      live: "Live Demo"
    },
    terminal: {
      eyebrow: "Fullstack Signal",
      title: "Портфоліо, яке показує не тільки UI, а й мислення продуктом.",
      copy:
        "Тут є реальні проєкти, CMS, contact API, image uploads, auth і зрозумілий шлях до деплою.",
      lines: [
        ["web", "React, Vite, Tailwind, Framer Motion"],
        ["api", "Node/Express, FastAPI, auth, uploads, email flows"],
        ["mobile", "Flutter/Dart, Kotlin Compose, Capacitor Android"],
        ["data", "PostgreSQL, SQLite, PDF parsing, Gemini AI"]
      ]
    },
    contact: {
      eyebrow: "Контакти",
      title: "Можна написати мені напряму або через форму.",
      copy:
        "Я з України, timezone Europe/Kyiv. Відкрита до junior/fullstack opportunities, практики, pet-проєктів і нормальних складних задач.",
      name: "Ім'я",
      email: "Email",
      message: "Повідомлення",
      namePlaceholder: "Ваше ім'я",
      emailPlaceholder: "you@email.com",
      messagePlaceholder: "Напишіть ідею або питання",
      send: "Надіслати",
      sending: "Надсилаю",
      success: "Повідомлення відправлено.",
      error: "Не вийшло відправити повідомлення.",
      timezone: "Ukraine / Europe/Kyiv (UTC+02/UTC+03)"
    }
  },
  en: {
    nav: {
      brand: "Oleksandra Portfolio",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      switchLabel: "Switch language",
      menuLabel: "Open navigation"
    },
    hero: {
      eyebrow: "Beginner fullstack developer from Ukraine",
      titleName: "Oleksandra",
      titleRole: "Beginner fullstack developer",
      titlePlace: "from Ukraine.",
      intro:
        "I build mobile and web experiences with polished UI, practical backend logic, databases, AI features, and real product-style portfolio projects.",
      projectsCta: "View Projects",
      contactCta: "Contact Me",
      stats: [
        ["6+", "real projects"],
        ["Ukraine", "Europe/Kyiv"],
        ["Beginner", "fullstack path"]
      ],
      stackLabel: "Current stack",
      stackCards: [
        ["APIs", "Express + FastAPI"],
        ["Databases", "Postgres + SQLite"],
        ["Mobile", "Flutter + Compose"],
        ["Frontend", "React + motion"]
      ],
      deploy: "Deploy flow",
      performance: "product-style interactions"
    },
    about: {
      eyebrow: "About Me",
      title:
        "I am Oleksandra, a beginner fullstack developer building real web, mobile, AI, and backend projects.",
      copy:
        "I am from Ukraine, working in the Europe/Kyiv timezone, and I build projects that feel like real products: music, fitness, nutrition AI, language learning, exam prep, and PDF parsing.",
      profileLabel: "Profile",
      profileTitle: "Beginner, but already building projects that show taste and technical range.",
      profileCopy:
        "My current goal is to grow as a fullstack developer: clean frontend, thoughtful APIs, solid data structure, mobile-first interfaces, and features I can proudly show.",
      interests: [
        ["Fullstack web", "React, APIs, databases"],
        ["Mobile apps", "Flutter and Compose flows"],
        ["AI products", "Gemini and enrichment logic"],
        ["Fitness tools", "workouts and analytics"],
        ["Language learning", "SRS, speaking, context"],
        ["Exam platforms", "tests, progress, content"]
      ]
    },
    skills: {
      eyebrow: "Skills",
      title: "Frontend polish, mobile apps, APIs, AI features, and data-heavy tooling.",
      copy:
        "This is not a made-up list: the stack comes from real projects in my Apps folder."
    },
    projects: {
      eyebrow: "Projects",
      title: "Real apps from music and fitness to AI nutrition and exam prep.",
      copy:
        "These projects come from my Apps folder: fullstack web products, mobile-first apps, backend APIs, AI features, and Python data tools. New projects can still be managed through the CMS later.",
      all: "All",
      featured: "Featured",
      details: "Details",
      live: "Live Demo"
    },
    terminal: {
      eyebrow: "Fullstack Signal",
      title: "A portfolio that shows product thinking, not just UI.",
      copy:
        "It includes real projects, a CMS, contact API, image uploads, auth, and a clear deployment path.",
      lines: [
        ["web", "React, Vite, Tailwind, Framer Motion"],
        ["api", "Node/Express, FastAPI, auth, uploads, email flows"],
        ["mobile", "Flutter/Dart, Kotlin Compose, Capacitor Android"],
        ["data", "PostgreSQL, SQLite, PDF parsing, Gemini AI"]
      ]
    },
    contact: {
      eyebrow: "Contact",
      title: "You can reach me directly or through the form.",
      copy:
        "I am from Ukraine, timezone Europe/Kyiv. Open to junior/fullstack opportunities, practice, pet projects, and genuinely challenging tasks.",
      name: "Name",
      email: "Email",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@email.com",
      messagePlaceholder: "Tell me about your idea",
      send: "Send Message",
      sending: "Sending",
      success: "Message sent.",
      error: "Could not send message.",
      timezone: "Ukraine / Europe/Kyiv (UTC+02/UTC+03)"
    }
  }
} as const;

type Translation = (typeof dictionary)[Locale];

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
