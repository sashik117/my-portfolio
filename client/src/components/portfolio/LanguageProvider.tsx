"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "uk" | "en";

const dictionary = {
  uk: {
    nav: {
      brand: "Oleksandra",
      about: "Про мене",
      skills: "Стек",
      projects: "Проєкти",
      contact: "Контакти",
      switchLabel: "Перемкнути мову",
      menuLabel: "Відкрити навігацію"
    },
    loader: {
      label: "Готую портфоліо",
      name: "Oleksandra",
      note: "mobile-first UI, projects, CMS, contacts"
    },
    hero: {
      eyebrow: "Україна · Europe/Kyiv · beginner fullstack developer",
      titleName: "Oleksandra",
      titleRole: "web, mobile",
      titlePlace: "& backend builder",
      intro:
        "Я початківець, але будую не порожні демки, а застосунки з логікою: музичний плеєр, fitness tracker, AI nutrition, language learning, ПДР-платформу, PDF parser, Laravel menu-portal і CMS-портфоліо.",
      note:
        "Люблю, коли інтерфейс виглядає дорого, але під капотом є нормальні API, база даних, auth, uploads, mobile-first UX і зрозуміла структура проєкту.",
      projectsCta: "Дивитись проєкти",
      contactCta: "Написати",
      stats: [
        ["7+", "проєктів у портфоліо"],
        ["5", "напрямів розробки"],
        ["CMS", "контент без коду"]
      ],
      identity: [
        ["Країна", "Україна"],
        ["Часовий пояс", "Europe/Kyiv"],
        ["Діапазон", "web · mobile · backend · AI · data"]
      ],
      stackLabel: "Що зараз в роботі",
      stackCards: [
        ["APIs", "Express, FastAPI, Laravel"],
        ["Databases", "PostgreSQL, SQLite, MongoDB"],
        ["Mobile", "Flutter, Compose, Capacitor"],
        ["Frontend", "React, Vite, motion UI"]
      ],
      deploy: "Ship path",
      performance: "polished, product-style interactions"
    },
    about: {
      eyebrow: "Про мене",
      title:
        "Я Олександра. Збираю fullstack-проєкти так, щоб вони виглядали як маленькі продукти, а не як випадкові лабораторні.",
      copy:
        "Я з України, працюю в Europe/Kyiv і зараз росту як junior/fullstack developer. Мій фокус - красиві інтерфейси, практичний backend, мобільні сценарії, AI-фічі, парсинг даних і системи, які можна реально розвивати.",
      profileLabel: "Профіль",
      profileTitle:
        "Початківець, який уже торкається різних частин продукту: UI, API, auth, databases, mobile, AI і content tools.",
      profileCopy:
        "Мені цікаво не просто зверстати сторінку, а довести ідею до стану, де є користувацький сценарій, зрозуміла структура, красиві стани, адмінка або хоча б нормальний шлях до масштабування. Десь я ще вчуся, десь уже впевнено збираю фічі, але загальний напрям один: робити живі застосунки, які не соромно відкрити на телефоні.",
      principlesTitle: "Як я думаю про розробку",
      principles: [
        "Спочатку сценарій користувача, потім красиві карточки.",
        "Mobile-first не як галочка, а як реальний спосіб перевірити UX.",
        "Backend має бути зрозумілим: auth, validation, storage, API contracts.",
        "Краще невеликий, але завершений продукт, ніж величезна недороблена ідея."
      ],
      interests: [
        ["Fullstack web", "React, Laravel, APIs, databases"],
        ["Mobile apps", "Flutter, Compose, Capacitor flows"],
        ["AI products", "Gemini, enrichment logic, smart helpers"],
        ["Fitness tools", "workouts, progress, analytics"],
        ["Language learning", "SRS, speaking, context"],
        ["Exam platforms", "tests, progress, content systems"]
      ]
    },
    skills: {
      eyebrow: "Навички",
      title: "Мій стек ширший за одну технологію: frontend, backend, mobile, AI, data і трохи PHP/Laravel.",
      copy:
        "Це не декоративний список для краси. Він зібраний з реальних задач: плеєр, тренування, харчування, мовна практика, ПДР, PDF parsing, Laravel menu-portal і власна CMS для цього портфоліо.",
      groups: [
        ["Frontend", "React, Vite, Tailwind, Framer Motion, responsive UI"],
        ["Backend", "Node.js, Express, FastAPI, Laravel, JWT, REST APIs"],
        ["Mobile", "Flutter, Dart, Kotlin Compose, Capacitor Android"],
        ["Data & AI", "PostgreSQL, SQLite, MongoDB, PDF parsing, Gemini AI"]
      ]
    },
    projects: {
      eyebrow: "Проєкти",
      title: "Не один шаблон, а цілий діапазон: музика, фітнес, nutrition AI, ПДР, мови, меню-портал і data tools.",
      copy:
        "Я спеціально тримаю проєкти різними: так видно, що я можу думати не тільки про UI, а й про дані, авторизацію, mobile UX, API, імпорт контенту, AI-фічі та адмінські сценарії.",
      all: "Всі",
      featured: "Featured",
      details: "Деталі",
      live: "Live Demo"
    },
    terminal: {
      eyebrow: "Fullstack Signal",
      title: "Мені подобається, коли портфоліо саме поводиться як продукт.",
      copy:
        "Тут є CMS, contact API, upload pipeline, auth, реальні проєкти, живі preview assets і структура, яку можна деплоїти, а не просто показати скрін.",
      lines: [
        ["web", "React, Vite, Tailwind, Framer Motion, Laravel"],
        ["api", "Node/Express, FastAPI, JWT, uploads, email flows"],
        ["mobile", "Flutter/Dart, Kotlin Compose, Capacitor Android"],
        ["data", "PostgreSQL, SQLite, MongoDB, PDF parsing, Gemini AI"]
      ]
    },
    contact: {
      eyebrow: "Контакти",
      title: "Якщо треба junior/fullstack developer з хорошим смаком до UI - я тут.",
      copy:
        "Я з України, працюю в Europe/Kyiv. Відкрита до практики, junior/fullstack opportunities, pet-проєктів, стажування і задач, де треба не тільки кодити, а й думати про продукт.",
      name: "Ім'я",
      email: "Email",
      message: "Повідомлення",
      namePlaceholder: "Ваше ім'я",
      emailPlaceholder: "you@email.com",
      messagePlaceholder: "Напишіть ідею, питання або просто привіт",
      send: "Надіслати",
      sending: "Надсилаю",
      success: "Повідомлення відправлено.",
      error: "Не вийшло відправити повідомлення.",
      timezone: "Україна · Europe/Kyiv · UTC+02/UTC+03",
      footerNote: "Built by Oleksandra with React, Node, motion, caffeine and stubborn curiosity."
    },
    footer: {
      status: "Open to junior/fullstack opportunities",
      location: "Країна: Україна",
      timezone: "Часовий пояс: Europe/Kyiv",
      stack: "React · Node · FastAPI · Laravel · Flutter",
      note:
        "Портфоліо зроблене як живий продукт: проєкти можна розвивати, контент керується через CMS, а інтерфейс підлаштований під desktop і телефон."
    }
  },
  en: {
    nav: {
      brand: "Oleksandra",
      about: "About",
      skills: "Stack",
      projects: "Projects",
      contact: "Contact",
      switchLabel: "Switch language",
      menuLabel: "Open navigation"
    },
    loader: {
      label: "Preparing portfolio",
      name: "Oleksandra",
      note: "mobile-first UI, projects, CMS, contacts"
    },
    hero: {
      eyebrow: "Ukraine · Europe/Kyiv · beginner fullstack developer",
      titleName: "Oleksandra",
      titleRole: "web, mobile",
      titlePlace: "& backend builder",
      intro:
        "I am a beginner, but I build more than empty demos: a music player, fitness tracker, AI nutrition app, language learning app, driving exam platform, PDF parser, menu portal, and this CMS-powered portfolio.",
      note:
        "I like interfaces that feel premium, but I also care about the backend underneath: APIs, databases, auth, uploads, mobile-first UX, and project structure that can grow.",
      projectsCta: "View Projects",
      contactCta: "Contact Me",
      stats: [
        ["7+", "portfolio projects"],
        ["5", "development directions"],
        ["CMS", "content without code"]
      ],
      identity: [
        ["Country", "Ukraine"],
        ["Timezone", "Europe/Kyiv"],
        ["Range", "web · mobile · backend · AI · data"]
      ],
      stackLabel: "Currently building with",
      stackCards: [
        ["APIs", "Express, FastAPI, Laravel"],
        ["Databases", "PostgreSQL, SQLite, MongoDB"],
        ["Mobile", "Flutter, Compose, Capacitor"],
        ["Frontend", "React, Vite, motion UI"]
      ],
      deploy: "Ship path",
      performance: "polished, product-style interactions"
    },
    about: {
      eyebrow: "About Me",
      title:
        "I am Oleksandra. I build fullstack projects that feel like small products, not random classroom exercises.",
      copy:
        "I am from Ukraine, work in the Europe/Kyiv timezone, and I am growing as a junior/fullstack developer. My focus is polished interfaces, practical backend logic, mobile scenarios, AI features, data parsing, and systems that can actually evolve.",
      profileLabel: "Profile",
      profileTitle:
        "A beginner who already touches different product layers: UI, API, auth, databases, mobile, AI, and content tools.",
      profileCopy:
        "I am interested in taking an idea further than a static page: user flows, clean structure, polished states, admin surfaces, and a path to scaling. I am still learning in some areas and already confident in others, but the direction is clear: build living apps that look good on a phone.",
      principlesTitle: "How I think about building",
      principles: [
        "User flow first, pretty cards second.",
        "Mobile-first as a real UX test, not a checkbox.",
        "Backend should be readable: auth, validation, storage, API contracts.",
        "A small finished product beats a huge unfinished idea."
      ],
      interests: [
        ["Fullstack web", "React, Laravel, APIs, databases"],
        ["Mobile apps", "Flutter, Compose, Capacitor flows"],
        ["AI products", "Gemini, enrichment logic, smart helpers"],
        ["Fitness tools", "workouts, progress, analytics"],
        ["Language learning", "SRS, speaking, context"],
        ["Exam platforms", "tests, progress, content systems"]
      ]
    },
    skills: {
      eyebrow: "Skills",
      title: "My stack goes beyond one technology: frontend, backend, mobile, AI, data, and some PHP/Laravel.",
      copy:
        "This is not decorative. It comes from real projects: DreamTune, GymEngine, NutriAI, PajamaTalk, PDRPrep, a PDF parser, menu-portal, and this portfolio.",
      groups: [
        ["Frontend", "React, Vite, Tailwind, Framer Motion, responsive UI"],
        ["Backend", "Node.js, Express, FastAPI, Laravel, JWT, REST APIs"],
        ["Mobile", "Flutter, Dart, Kotlin Compose, Capacitor Android"],
        ["Data & AI", "PostgreSQL, SQLite, MongoDB, PDF parsing, Gemini AI"]
      ]
    },
    projects: {
      eyebrow: "Projects",
      title: "Not one template, but a real range: music, fitness, AI nutrition, driving prep, language learning, menu portal, and data tools.",
      copy:
        "I keep the projects deliberately different, so the portfolio shows more than UI: data, authorization, mobile UX, APIs, content import, AI features, and admin-style workflows.",
      all: "All",
      featured: "Featured",
      details: "Details",
      live: "Live Demo"
    },
    terminal: {
      eyebrow: "Fullstack Signal",
      title: "I like when a portfolio behaves like a product itself.",
      copy:
        "It has a CMS, contact API, upload pipeline, auth, real projects, live preview assets, and a deployable structure instead of just a screenshot.",
      lines: [
        ["web", "React, Vite, Tailwind, Framer Motion, Laravel"],
        ["api", "Node/Express, FastAPI, JWT, uploads, email flows"],
        ["mobile", "Flutter/Dart, Kotlin Compose, Capacitor Android"],
        ["data", "PostgreSQL, SQLite, MongoDB, PDF parsing, Gemini AI"]
      ]
    },
    contact: {
      eyebrow: "Contact",
      title: "If you need a junior/fullstack developer with UI taste, I am here.",
      copy:
        "I am from Ukraine, working in Europe/Kyiv. Open to practice, junior/fullstack opportunities, internships, pet projects, and tasks where product thinking matters too.",
      name: "Name",
      email: "Email",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@email.com",
      messagePlaceholder: "Tell me about your idea, question, or just say hi",
      send: "Send Message",
      sending: "Sending",
      success: "Message sent.",
      error: "Could not send message.",
      timezone: "Ukraine · Europe/Kyiv · UTC+02/UTC+03",
      footerNote: "Built by Oleksandra with React, Node, motion, caffeine and stubborn curiosity."
    },
    footer: {
      status: "Open to junior/fullstack opportunities",
      location: "Country: Ukraine",
      timezone: "Timezone: Europe/Kyiv",
      stack: "React · Node · FastAPI · Laravel · Flutter",
      note:
        "Portfolio is designed as a living product: projects can grow, CMS can manage content, and the UI is tuned for desktop and phone."
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
