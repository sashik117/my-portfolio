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
        "Створюю цифрові продукти з фокусом на UX, логічну архітектуру та мобільну адаптивність. Не просто пишу код, а проєктую інтерфейси, які відчуваються цілісно.",
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
        "Я розробляю веб- та мобільні застосунки, поєднуючи чисту логіку бекенду з охайним, вивіреним візуалом. Мій підхід — ставитися до кожного проєкту як до готового бізнес-продукту: прораховувати користувацькі сценарії, логіку бази даних, стани помилок та кожну дрібну анімацію.",
      profileLabel: "Підхід",
      profileTitle:
        "Прагну, щоб інтерфейс на екрані телефона виглядав не як урізана версія сайту, а як повноцінний, нативний і зручний досвід.",
      profileCopy:
        "Швидко занурююсь у нові технології, ціную конструктивний фідбек і люблю доводити код та UI до ідеального балансу. Мені важливо, щоб продукт виглядав професійно, працював передбачувано і залишав відчуття, що кожен блок має сенс.",
      principlesTitle: "Як я працюю",
      principles: [
        "Проєктування сценарію: аналізую шлях користувача — хто відкриє сторінку, яку дію має виконати і як зробити цей процес безшовним.",
        "Mobile-First адаптивність: верстаю так, щоб інтерфейс масштабувався — нічого не злипається під пальцем на смартфоні й не розмивається на десктопі.",
        "Ефективний Backend: проєктую надійну логіку — від авторизації та валідації форм до CRUD-операцій, запитів до БД та інтеграції AI.",
        "Естетика та мікроінтеракції: мінімум візуального шуму, максимум повітря, плавні hover-ефекти, лоадери та empty-states."
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
        "Мій стек сформований навколо ідеї повного циклу розробки. Я розумію, як пов'язати інтерфейс, дані, API та деплой в єдину стабільну систему. Мені подобається не просто вчити технології окремо, а збирати з них готовий досвід: продумати екран, прописати логіку, зберегти дані, обробити помилки й довести все до акуратного вигляду. Я швидко розбираюсь у нових інструментах, уважно ставлюся до деталей і люблю, коли навіть junior-проєкт виглядає зібрано, відповідально та по-дорослому.",
      groups: [
        ["Frontend", "Компонентна архітектура, адаптивні екрани, контроль станів і акуратна дизайн-система."],
        ["Backend", "REST API, авторизація, CRUD, форми, завантаження файлів і захищені маршрути."],
        ["Mobile", "Кросплатформенні й нативні підходи з фокусом на сценарій користувача."],
        ["Data & AI", "Структура даних, запити до бази, інтелектуальні підказки й автоматизація рутини."]
      ],
      details: [
        "Проєктую компонентну архітектуру, керую станами та створюю передбачувані інтерфейси. Люблю, коли екран складається з охайних блоків, а не з випадкового набору кнопок.",
        "Створюю адаптивну верстку та додаю акуратну, ненав'язливу анімацію. Для мене важливо, щоб рух підкреслював дію користувача, а не просто блищав заради ефекту.",
        "Будую REST API, обробляю запити та забезпечую зв'язок фронтенду з базою. Думаю про валідацію, зрозумілі помилки та структуру, яку легко підтримувати.",
        "Використовую Python і FastAPI для швидких бекенд-сервісів, парсингу даних та інтеграції ШІ. Це допомагає швидко збирати корисні інструменти й автоматизувати рутину.",
        "Реалізую класичні CRUD-сценарії, роботу з формами та адмін-панелі. Laravel допомагає мені будувати зрозумілу логіку керування контентом без ручного редагування коду.",
        "Проєктую схеми даних, зв'язки та оптимізую збереження інформації. Мені подобається, коли база підтримує продуктову логіку, а не просто десь зберігає поля.",
        "Розробляю мобільні інтерфейси з фокусом на UX, зручні натискання й відчуття нативності.",
        "Інтегрую інтелектуальні підказки та автоматизую рутинні завдання користувача. AI для мене — це не модне слово, а спосіб зробити застосунок кориснішим і швидшим."
      ],
      workflowTitle: "Мій робочий підхід",
      workflow:
        "Починаю зі стабільної робочої версії, потім швидко проходжу responsive, loading, empty-states, помилки й фінальний polish.",
      workflowSteps: ["MVP", "mobile QA", "states", "polish"]
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
      title: "Сайт одразу показує, як я думаю про продукт.",
      copy:
        "Це не просто сторінка з красивими картками, а маленький доказ того, як я підходжу до задачі: спочатку продумую сценарій, потім збираю стабільну логіку, а вже після цього доводжу UI до приємного стану. Усередині є речі, які реально оцінить клієнт або команда: контент керується через CMS, форма має валідацію, зображення проходять upload pipeline, є fallback data, auth і структура, яку можна розвивати без ручного редагування коду. Я початківець, але дуже уважна до деталей, швидко входжу в задачі й люблю, коли результат виглядає завершено, а не “і так зійде”.",
      lines: [
        ["ui", "premium dark UI, який однаково впевнено виглядає на телефоні та ПК"],
        ["cms", "проєкти можна додавати, редагувати й оновлювати без правок у коді"],
        ["api", "контактна форма, auth, upload pipeline і fallback data працюють як частина системи"],
        ["care", "перевіряю мобільний UX, читабельність, стани помилок і дрібні інтеракції"]
      ]
    },
    contact: {
      eyebrow: "Контакти",
      title: "Зв'язатися зі мною",
      copy:
        "Відкрита до junior/fullstack позицій, стажування, командних pet-проєктів та фріланс-задач. Якщо вам потрібен розробник, який не просто пише код, а занурюється в продукт і дбає про фінальний досвід користувача — давайте створимо щось круте разом.",
      name: "Ім'я",
      email: "Email",
      message: "Повідомлення",
      namePlaceholder: "Ваше ім'я",
      emailPlaceholder: "you@email.com",
      messagePlaceholder: "Напишіть ідею, питання або просто привіт",
      formBadges: ["Відповім уважно", "Люблю чіткі задачі", "Можу підхопити pet-проєкт"],
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
        "Зроблено як маленький fullstack-продукт: адаптивний інтерфейс, CMS, контактна форма, продуманий контент і достатньо деталей, щоб сайт відчувався живим, а не зібраним нашвидкуруч.",
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
        "User journey design: I analyze who opens the page, what action they need, and how to make the path seamless.",
        "Mobile-first responsiveness: I build interfaces that scale cleanly, so nothing sticks together on phones or feels stretched on desktop.",
        "Efficient backend: I design reliable logic, from auth and validation to CRUD operations, database requests, and AI integration.",
        "Aesthetics and microinteractions: less visual noise, more breathing room, smooth hover effects, loaders, and empty states."
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
        "My stack is built around the idea of a full development cycle. I understand how to connect interface, data, API, and deployment into one stable system. I like learning technologies as part of a real product flow: designing the screen, writing the logic, storing data, handling errors, and polishing the final experience. I learn quickly, care about details, and want even a junior-level project to feel structured, responsible, and ready to grow.",
      groups: [
        ["Frontend", "Component architecture, responsive screens, state control, and a clean design system."],
        ["Backend", "REST APIs, auth, CRUD, forms, file uploads, and protected routes."],
        ["Mobile", "Cross-platform and native approaches focused on user experience."],
        ["Data & AI", "Data structure, database queries, intelligent helpers, and routine automation."]
      ],
      details: [
        "I design component architecture, manage state, and create predictable interfaces. I like screens that feel composed from intentional pieces, not random buttons placed together.",
        "I build responsive layouts and add subtle, non-intrusive animation. Motion should support the user's action and make the product feel smoother, not noisy.",
        "I create REST APIs, handle requests, and connect frontend flows with databases. I care about validation, readable errors, and backend structure that can be maintained.",
        "I use Python and FastAPI for fast backend services, data parsing, and AI integrations. It helps me build useful tools quickly and automate repetitive work.",
        "I implement classic CRUD scenarios, forms, and admin panels. Laravel helps me build clear content-management logic without manual code edits.",
        "I design data schemas, relationships, and stable information storage. I like when the database supports the product logic instead of only storing fields.",
        "I build mobile interfaces with a focus on UX, comfortable touch targets, and a native feeling.",
        "I integrate intelligent helpers and automate routine user tasks. For me, AI is not just a buzzword, but a way to make an app more useful and faster."
      ],
      workflowTitle: "Working approach",
      workflow:
        "I start with a stable working version, then quickly check responsiveness, loading, empty states, errors, and final polish.",
      workflowSteps: ["MVP", "mobile QA", "states", "polish"]
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
      title: "This site shows how I think about product work.",
      copy:
        "It is not just a page with nice cards, but a small proof of how I approach a task: first I think through the scenario, then I build stable logic, and after that I polish the UI until it feels pleasant to use. It includes product logic a client or team can actually value: CMS-managed content, validated contact flow, upload pipeline, fallback data, auth, and a structure that can grow without manual code edits. I am early in my career, but I care about details, learn quickly, and like shipping work that feels finished.",
      lines: [
        ["ui", "premium dark UI that feels solid on both phone and desktop"],
        ["cms", "projects can be added, edited, and updated without code changes"],
        ["api", "contact form, auth, upload pipeline, and fallback data work as one system"],
        ["care", "mobile UX, readability, error states, and small interactions are checked"]
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
      formBadges: ["Thoughtful reply", "Clear tasks welcome", "Pet projects too"],
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
        "Built like a small fullstack product: responsive UI, CMS, contact form, thoughtful content, and enough detail to feel alive instead of rushed.",
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
