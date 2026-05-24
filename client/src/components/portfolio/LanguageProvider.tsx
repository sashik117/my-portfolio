"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "uk" | "en";

const dictionary = {
  uk: {
    nav: {
      brand: "Oleksandra",
      about: "Про мене",
      skills: "Навички",
      projects: "Проєкти",
      contact: "Контакти",
      switchLabel: "Перемкнути мову",
      menuLabel: "Відкрити навігацію"
    },
    loader: {
      label: "Готую портфоліо",
      name: "Oleksandra",
      note: "UX, backend, mobile, CMS"
    },
    hero: {
      eyebrow: "Junior Fullstack · Mobile First · Clean UI/UX · Product Thinking",
      titleName: "Oleksandra",
      titleRole: "Web, Mobile",
      titlePlace: "& Backend Builder",
      intro:
        "Створюю цифрові продукти з фокусом на UX, логічну архітектуру та мобільну адаптивність. Не просто пишу код, а проектую інтерфейси, які відчуваються цілісно.",
      note:
        "Мій фокус — охайна візуальна система, продумані користувацькі сценарії, надійна логіка бекенду та деталі, які роблять сайт живим: стани, анімації, валідація, адмінка і плавний досвід на телефоні.",
      projectsCta: "Дивитись проєкти",
      contactCta: "Написати",
      stats: [
        ["UX", "цілісний досвід"],
        ["API", "логіка і дані"],
        ["CMS", "контент без коду"]
      ],
      identity: [
        ["Junior Fullstack", "web · backend · mobile"],
        ["Mobile First", "адаптивність з першого екрану"],
        ["Product Thinking", "інтерфейс як готовий продукт"]
      ],
      stackLabel: "Що зараз у роботі",
      stackCards: [
        ["APIs", "Express, FastAPI, Laravel"],
        ["Data", "PostgreSQL, SQLite, MongoDB"],
        ["Mobile", "Flutter, Compose, responsive web"],
        ["Frontend", "React, Tailwind, motion UI"]
      ],
      deploy: "Ship path",
      performance: "clean UI, stable states"
    },
    about: {
      eyebrow: "Про мене",
      title: "Про мене",
      copy:
        "Я розробляю веб- та мобільні застосунки, поєднуючи чисту логіку бекенду з охайним, вивіреним візуалом. Мій підхід — ставитися до кожного проекту як до готового бізнес-продукту: прораховувати користувацькі сценарії, логіку бази даних, стани помилок та кожну дрібну анімацію.",
      profileLabel: "Підхід",
      profileTitle:
        "Прагну, щоб інтерфейс на екрані телефона виглядав не як урізана версія сайту, а як повноцінний, нативний і зручний досвід.",
      profileCopy:
        "Швидко занурююсь у нові технології, ціную конструктивний фідбек і люблю доводити код та UI до ідеального балансу. Мені важливо, щоб продукт виглядав професійно, працював передбачувано і залишав відчуття, що кожен блок має сенс.",
      principlesTitle: "Як я працюю",
      principles: [
        "01 / Проектування сценарію — аналізую шлях користувача: хто відкриє сторінку, яку дію має виконати і як зробити цей процес безшовним.",
        "02 / Mobile-First адаптивність — верстаю так, щоб інтерфейс масштабувався: нічого не злипається під пальцем на смартфоні й не розмивається на десктопі.",
        "03 / Ефективний Backend — проектую надійну логіку: від авторизації та валідації форм до CRUD-операцій, запитів до БД та інтеграції AI.",
        "04 / Естетика та мікроінтеракції — мінімум візуального шуму, максимум повітря, плавні hover-ефекти, лоадери та empty-states."
      ],
      interests: [
        ["Web products", "Люблю створювати сайти, які виглядають не як шаблон, а як продуманий цифровий продукт."],
        ["Mobile experience", "Особливо уважно ставлюся до телефону: розміри, відступи, кнопки, читабельність і відчуття нативності."],
        ["Backend logic", "Цікавлять API, авторизація, валідація, база даних, завантаження файлів і стабільна структура."],
        ["UI craft", "Працюю з типографікою, контрастом, ритмом, hover-станами й акуратними мікроанімаціями."],
        ["Product thinking", "Думаю не тільки про код, а й про те, як людина реально користуватиметься продуктом."],
        ["Fast learning", "Швидко входжу в задачі, нормально приймаю фідбек і люблю рухати проєкт до завершеного вигляду."]
      ]
    },
    skills: {
      eyebrow: "Навички",
      title: "Skills & Tech Stack",
      copy:
        "Мій стек сформований навколо ідеї повного циклу розробки. Я розумію, як пов'язати інтерфейс, дані, API та деплой в єдину стабільну систему.",
      groups: [
        ["Frontend", "Компонентна архітектура, адаптивні екрани, контроль станів і акуратна дизайн-система."],
        ["Backend", "REST API, авторизація, CRUD, форми, завантаження файлів і захищені маршрути."],
        ["Mobile", "Кросплатформенні й нативні підходи з фокусом на сценарій користувача."],
        ["Data & AI", "Структура даних, запити до бази, інтелектуальні підказки й автоматизація рутини."]
      ],
      details: [
        "Проектую компонентну архітектуру, керую станами та створюю передбачувані інтерфейси.",
        "Створюю адаптивну верстку та додаю акуратну, ненав'язливу анімацію.",
        "Будую REST API, обробляю запити та забезпечую зв'язок фронтенду з базою.",
        "Використовую для швидких бекенд-сервісів, парсингу даних та інтеграції ШІ.",
        "Реалізую класичні CRUD-сценарії, роботу з формами та адмін-панелі.",
        "Проектую схеми даних, зв'язки та оптимізую збереження інформації.",
        "Розробляю кросплатформенні та нативні мобільні інтерфейси з фокусом на UX.",
        "Інтегрую інтелектуальні підказки та автоматизую рутинні завдання користувача.",
        "Веду чисту історію комітів, керую гілками та налаштовую деплой через Vercel, Render і Atlas."
      ],
      workflowTitle: "Мій робочий підхід",
      workflow:
        "Швидко збираю першу стабільну версію, а потім проходжуся по деталях: responsive, loading, empty-states, помилки, тексти, hover-ефекти, структура даних і те, як продукт відчувається після реального користування."
    },
    projects: {
      eyebrow: "Проєкти",
      title: "Мої проєкти",
      copy:
        "Тут зібрані роботи, які показують різні частини мого стеку: frontend, backend, mobile, AI, CMS-логіку та продуктове мислення. Кожен проєкт має свою задачу, стек і сценарій використання.",
      all: "Всі",
      featured: "Featured",
      details: "Деталі",
      live: "Live Demo"
    },
    terminal: {
      eyebrow: "Fullstack signal",
      title: "Портфоліо — це не статична візитка, а інженерний продукт.",
      copy:
        "Усередині є CMS, контактна форма, upload pipeline, auth, fallback data, адаптивна сітка та структура, яку можна розвивати без ручного редагування коду.",
      lines: [
        ["ui", "сучасна темна дизайн-система, плавна інтерактивність та адаптивна сітка"],
        ["api", "безпечна обробка форм, захищені маршрути, завантаження файлів та адмін-панель"],
        ["cms", "динамічне керування контентом без прямого втручання в код сайту"],
        ["care", "ретельна перевірка мобільного UX, відсутність візуального хаосу та фокус на читанні"]
      ]
    },
    contact: {
      eyebrow: "Контакти",
      title: "Зв'язатися зі мною",
      copy:
        "Відкрита до junior/fullstack позицій, стажування, командних pet-проектів та фріланс-задач. Якщо вам потрібен розробник, який не просто пише код, а занурюється в продукт і дбає про фінальний досвід користувача — давайте створимо щось круте разом.",
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
      footerNote:
        "Комунікація, увага до деталей і повага до дедлайнів для мене такі ж важливі, як чистий код і красивий інтерфейс."
    },
    footer: {
      status: "Open to junior/fullstack opportunities",
      stack: "React · Node · FastAPI · Laravel · Flutter",
      note:
        "Портфоліо оформлене як живий продукт: CMS, адаптивність, контактна форма, продуманий контент і охайний UX без зайвого візуального шуму.",
      backTop: "Вгору"
    }
  },
  en: {
    nav: {
      brand: "Oleksandra",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      switchLabel: "Switch language",
      menuLabel: "Open navigation"
    },
    loader: {
      label: "Preparing portfolio",
      name: "Oleksandra",
      note: "UX, backend, mobile, CMS"
    },
    hero: {
      eyebrow: "Junior Fullstack · Mobile First · Clean UI/UX · Product Thinking",
      titleName: "Oleksandra",
      titleRole: "Web, Mobile",
      titlePlace: "& Backend Builder",
      intro:
        "I create digital products with a focus on UX, logical architecture, and mobile responsiveness. I do not just write code — I design interfaces that feel cohesive.",
      note:
        "My focus is a clean visual system, thoughtful user flows, reliable backend logic, and the details that make a site feel alive: states, animation, validation, admin tools, and a smooth phone experience.",
      projectsCta: "View Projects",
      contactCta: "Contact Me",
      stats: [
        ["UX", "cohesive experience"],
        ["API", "logic and data"],
        ["CMS", "content without code"]
      ],
      identity: [
        ["Junior Fullstack", "web · backend · mobile"],
        ["Mobile First", "responsive from the first screen"],
        ["Product Thinking", "interface as a finished product"]
      ],
      stackLabel: "Currently building with",
      stackCards: [
        ["APIs", "Express, FastAPI, Laravel"],
        ["Data", "PostgreSQL, SQLite, MongoDB"],
        ["Mobile", "Flutter, Compose, responsive web"],
        ["Frontend", "React, Tailwind, motion UI"]
      ],
      deploy: "Ship path",
      performance: "clean UI, stable states"
    },
    about: {
      eyebrow: "About",
      title: "About me",
      copy:
        "I develop web and mobile applications by combining clean backend logic with polished visual execution. My approach is to treat every project as a real business product: user flows, database logic, error states, and small animations all matter.",
      profileLabel: "Approach",
      profileTitle:
        "I want the phone version to feel like a complete, native, comfortable experience — not a cropped copy of a desktop site.",
      profileCopy:
        "I learn new technologies quickly, value constructive feedback, and enjoy bringing code and UI into balance. I care about products that look professional, behave predictably, and make every block feel intentional.",
      principlesTitle: "How I work",
      principles: [
        "01 / User journey design — I analyze who opens the page, what action they need, and how to make the path seamless.",
        "02 / Mobile-first responsiveness — I build interfaces that scale cleanly: nothing sticks together on phones or feels stretched on desktop.",
        "03 / Efficient backend — I design reliable logic: auth, validation, CRUD operations, database requests, and AI integration.",
        "04 / Aesthetics and microinteractions — less visual noise, more breathing room, smooth hover effects, loaders, and empty states."
      ],
      interests: [
        ["Web products", "I like creating sites that feel like thoughtful digital products, not generic templates."],
        ["Mobile experience", "I pay close attention to phones: sizing, spacing, buttons, readability, and a native feel."],
        ["Backend logic", "APIs, auth, validation, databases, file uploads, and stable structure interest me."],
        ["UI craft", "Typography, contrast, rhythm, hover states, and small interactions shape how the product feels."],
        ["Product thinking", "I think about real usage, not only implementation."],
        ["Fast learning", "I get into new tasks quickly, handle feedback well, and like moving projects toward a finished state."]
      ]
    },
    skills: {
      eyebrow: "Skills",
      title: "Skills & Tech Stack",
      copy:
        "My stack is built around the idea of a full development cycle. I understand how to connect interface, data, API, and deployment into one stable system.",
      groups: [
        ["Frontend", "Component architecture, responsive screens, state control, and a clean design system."],
        ["Backend", "REST APIs, auth, CRUD, forms, file uploads, and protected routes."],
        ["Mobile", "Cross-platform and native approaches focused on user experience."],
        ["Data & AI", "Data structure, database queries, intelligent helpers, and routine automation."]
      ],
      details: [
        "I design component architecture, manage states, and create predictable interfaces.",
        "I build responsive layouts and add subtle, non-intrusive animation.",
        "I create REST APIs, handle requests, and connect frontend flows with databases.",
        "I use it for fast backend services, data parsing, and AI integrations.",
        "I implement classic CRUD scenarios, forms, and admin panels.",
        "I design data schemas, relationships, and stable information storage.",
        "I build cross-platform and native mobile interfaces with a focus on UX.",
        "I integrate intelligent helpers and automate routine user tasks.",
        "I keep clean commit history, manage branches, and configure deployment with Vercel, Render, and Atlas."
      ],
      workflowTitle: "Working approach",
      workflow:
        "I quickly assemble the first stable version, then polish the details: responsive behavior, loading, empty states, errors, copy, hover effects, data structure, and how the product feels after real use."
    },
    projects: {
      eyebrow: "Projects",
      title: "My projects",
      copy:
        "These projects show different parts of my stack: frontend, backend, mobile, AI, CMS logic, and product thinking. Each one has its own task, stack, and usage scenario.",
      all: "All",
      featured: "Featured",
      details: "Details",
      live: "Live Demo"
    },
    terminal: {
      eyebrow: "Fullstack signal",
      title: "This portfolio is an engineered product, not a static card.",
      copy:
        "It includes a CMS, contact form, upload pipeline, auth, fallback data, responsive layout, and a structure that can grow without manual code edits.",
      lines: [
        ["ui", "modern dark design system, smooth interaction, and responsive grid"],
        ["api", "secure form handling, protected routes, file uploads, and admin panel"],
        ["cms", "dynamic content management without direct code edits"],
        ["care", "mobile UX checks, no visual chaos, and a focus on readability"]
      ]
    },
    contact: {
      eyebrow: "Contact",
      title: "Get in touch",
      copy:
        "Open to junior/fullstack roles, internships, team pet projects, and freelance tasks. If you need a developer who does not just write code, but gets into the product and cares about the final user experience, let us create something strong together.",
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
      footerNote:
        "Communication, attention to detail, and respect for deadlines matter to me as much as clean code and polished UI."
    },
    footer: {
      status: "Open to junior/fullstack opportunities",
      stack: "React · Node · FastAPI · Laravel · Flutter",
      note:
        "Built as a living portfolio: CMS, responsive design, contact form, thoughtful content, and clean UX without visual noise.",
      backTop: "Back top"
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
