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
      note: "UI, код, адмінка, адаптивність"
    },
    hero: {
      eyebrow: "beginner fullstack developer",
      titleName: "Oleksandra",
      titleRole: "web, mobile",
      titlePlace: "& backend builder",
      intro:
        "Я початківець у fullstack, але підходжу до роботи як до маленького продукту: продумую сценарій, стан інтерфейсу, структуру даних і те, як усе буде виглядати на телефоні.",
      note:
        "Мені подобається робити сайти й застосунки не просто “щоб було”, а щоб вони мали характер: акуратну візуальну систему, зрозумілі форми, нормальний backend, адмінку, адаптивність і відчуття, що за інтерфейсом хтось уважно стояв.",
      projectsCta: "Дивитись проєкти",
      contactCta: "Написати",
      stats: [
        ["Junior", "рівень росту"],
        ["CMS", "контент без коду"],
        ["Mobile", "перший тест UX"]
      ],
      identity: [
        ["Країна", "Україна"],
        ["Часовий пояс", "Europe/Kyiv"],
        ["Діапазон", "web · mobile · backend · UI"]
      ],
      stackLabel: "Що зараз у роботі",
      stackCards: [
        ["APIs", "Express, FastAPI, Laravel"],
        ["Data", "PostgreSQL, SQLite, MongoDB"],
        ["Mobile", "Flutter, Compose, responsive web"],
        ["Frontend", "React, Tailwind, motion UI"]
      ],
      deploy: "Ship path",
      performance: "polished UI, clean states"
    },
    about: {
      eyebrow: "Про мене",
      title: "Про мене коротко, але по суті.",
      copy:
        "Я люблю робити сайти, красиві інтерфейси й невеликі застосунки, які виглядають охайно та працюють логічно. Я ще росту як розробниця, але вже звикла думати не тільки про “написати код”, а й про те, чи зручно людині користуватись, чи легко підтримувати проєкт і чи не соромно його показати.",
      profileLabel: "Профіль",
      profileTitle:
        "Початківець з сильним ентузіазмом, хорошим смаком до UI і бажанням доводити задачі до нормального вигляду.",
      profileCopy:
        "Я відповідально ставлюся до деталей, швидко розбираюся в нових задачах і стараюся не залишати інтерфейс “сирим”. Мені цікаво збирати все разом: сторінку, форму, API, базу даних, завантаження файлів, повідомлення, стани помилок і дрібні анімації. Особливо люблю, коли на телефоні все виглядає не як урізана версія, а як повноцінний досвід.",
      principlesTitle: "Як я працюю",
      principles: [
        "Спочатку розумію сценарій: хто відкриє сторінку, що він має побачити і яку дію зробити.",
        "Пишу інтерфейс так, щоб він не ламався на маленькому екрані й не виглядав роздутим на desktop.",
        "Додаю backend тільки там, де він реально потрібен: auth, CRUD, повідомлення, завантаження, збереження даних.",
        "Люблю чистий візуал: менше шуму, більше повітря, зрозумілі акценти й нормальні стани."
      ],
      interests: [
        ["Сайти й інтерфейси", "Люблю збирати сучасні сторінки з темною естетикою, плавними рухами й акуратною типографікою."],
        ["Мобільний UX", "Перевіряю, щоб кнопки були зручні пальцем, текст не злипався, а блоки не виглядали обрізаними."],
        ["Backend логіка", "Цікавлять API, авторизація, форми, база даних і все, що робить сайт не просто красивою картинкою."],
        ["UI/UX деталі", "Помічаю відступи, ритм, контраст, hover-стани, порожні стани й те, як сторінка відчувається в русі."],
        ["Корисні застосунки", "Мені подобаються продукти для навчання, звичок, фітнесу, організації даних і маленьких щоденних задач."],
        ["Ріст і практика", "Я ще вчуся, але дуже заряджена: беру складне, розкладаю на частини й поступово доводжу до результату."]
      ]
    },
    skills: {
      eyebrow: "Навички",
      title: "Навички, з якими я зараз працюю.",
      copy:
        "Мій стек ще росте, але він уже не про одну кнопку на сторінці. Я вчуся бачити повну картину: інтерфейс, дані, запити, адаптивність, адмінку, валідацію, деплой і нормальну структуру проєкту.",
      groups: [
        ["Frontend", "Компоненти, адаптивні секції, форми, стани, анімації, темна UI-система."],
        ["Backend", "REST API, CRUD, auth, файли, повідомлення, валідація і зрозумілі маршрути."],
        ["Mobile", "Flutter, Compose і mobile-first мислення навіть у web-інтерфейсах."],
        ["Data & AI", "Бази даних, структуровані дані, парсинг, AI-підказки й автоматизація рутини."]
      ],
      details: [
        "Збираю компоненти, сторінки й стани так, щоб інтерфейс не виглядав випадковим.",
        "Пишу логіку на JavaScript/TypeScript і поступово звикаю до більш чистої структури коду.",
        "Розумію, як будувати API, обробляти запити, зберігати дані й підключати frontend до backend.",
        "Використовую Python для backend-задач, парсингу, обробки даних і швидких утиліт.",
        "Працюю з Laravel/PHP у backend-логіці, формах, CRUD-підході та адмінських сценаріях.",
        "Вчуся правильно думати про схеми, зв'язки, локальне збереження й стабільні дані.",
        "Люблю Tailwind за швидкість, а motion додаю обережно, щоб було плавно, а не дешево.",
        "Пишу мобільні інтерфейси й переношу це мислення в web: менше хаосу, більше зручності.",
        "Пробую нативні підходи, компоненти й логіку екранів, щоб краще розуміти mobile UX.",
        "Додаю AI там, де це робить продукт розумнішим, а не просто модним словом.",
        "Працюю з Git як з нормальною історією проєкту: зміни, коміти, пуші, порядок."
      ],
      workflowTitle: "Мій робочий підхід",
      workflow:
        "Я швидко збираю першу версію, потім проходжуся по деталях: відступи, responsive, порожні стани, помилки, тексти, hover, loading і те, як усе виглядає після десяти хвилин реального користування."
    },
    projects: {
      eyebrow: "Проєкти",
      title: "Мої проєкти",
      copy:
        "Тут уже конкретні роботи: різні ідеї, різні стеки, різні задачі. Я залишила проєкти саме в цій секції, щоб портфоліо не повторювало одне й те саме в кожному блоці.",
      all: "Всі",
      featured: "Featured",
      details: "Деталі",
      live: "Live Demo"
    },
    terminal: {
      eyebrow: "Fullstack signal",
      title: "Портфоліо має поводитись як маленький продукт.",
      copy:
        "Тому тут є не тільки красивий перший екран, а й CMS, контактна форма, upload pipeline, auth, fallback data, адаптивність і структура, яку можна розвивати далі.",
      lines: [
        ["ui", "responsive layout, motion, clean dark visual system"],
        ["api", "forms, auth, uploads, messages, admin actions"],
        ["cms", "projects can be changed without editing code"],
        ["care", "mobile checks, readable content, less visual noise"]
      ]
    },
    contact: {
      eyebrow: "Контакти",
      title: "Можна написати мені напряму.",
      copy:
        "Відкрита до практики, junior/fullstack задач, стажування, pet-проєктів і всього, де треба не просто накидати код, а подумати про користувача, вигляд і логіку. Я чуйна в комунікації, нормально ставлюся до фідбеку й люблю, коли задача рухається швидко та акуратно.",
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
      footerNote: "Built by Oleksandra with React, Node and a lot of careful UI polishing."
    },
    footer: {
      status: "Open to junior/fullstack opportunities",
      stack: "React · Node · FastAPI · Laravel · Flutter",
      note:
        "Зроблено як живе портфоліо: з CMS, адаптивністю, контактною формою і контентом, який можна розвивати без ручного редагування коду.",
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
      note: "UI, code, CMS, responsive polish"
    },
    hero: {
      eyebrow: "beginner fullstack developer",
      titleName: "Oleksandra",
      titleRole: "web, mobile",
      titlePlace: "& backend builder",
      intro:
        "I am a beginner in fullstack development, but I approach work like a small product: user flow, interface states, data structure, and how everything feels on a phone.",
      note:
        "I like building sites and apps that have character: a clean visual system, thoughtful forms, a real backend, admin tools, responsive layout, and the feeling that someone cared about the details.",
      projectsCta: "View Projects",
      contactCta: "Contact Me",
      stats: [
        ["Junior", "growth level"],
        ["CMS", "content without code"],
        ["Mobile", "first UX test"]
      ],
      identity: [
        ["Country", "Ukraine"],
        ["Timezone", "Europe/Kyiv"],
        ["Range", "web · mobile · backend · UI"]
      ],
      stackLabel: "Currently building with",
      stackCards: [
        ["APIs", "Express, FastAPI, Laravel"],
        ["Data", "PostgreSQL, SQLite, MongoDB"],
        ["Mobile", "Flutter, Compose, responsive web"],
        ["Frontend", "React, Tailwind, motion UI"]
      ],
      deploy: "Ship path",
      performance: "polished UI, clean states"
    },
    about: {
      eyebrow: "About",
      title: "Short, honest, and to the point.",
      copy:
        "I enjoy building websites, clean interfaces, and small apps that look polished and behave logically. I am still growing as a developer, but I already think beyond just writing code: usability, maintainability, and whether the result is good enough to show.",
      profileLabel: "Profile",
      profileTitle:
        "A beginner with strong enthusiasm, good UI taste, and a habit of making tasks feel finished.",
      profileCopy:
        "I care about details, learn new tasks quickly, and try not to leave interfaces raw. I like connecting the whole flow: page, form, API, database, file upload, messages, error states, and subtle animation. I especially care about mobile, because a phone quickly shows whether the design is truly usable.",
      principlesTitle: "How I work",
      principles: [
        "I start with the user flow: what should be visible, clear, and easy to do.",
        "I build layouts that do not break on small screens or feel oversized on desktop.",
        "I add backend logic where it matters: auth, CRUD, messages, uploads, saved data.",
        "I prefer clean visuals: less noise, more breathing room, clear accents, useful states."
      ],
      interests: [
        ["Web interfaces", "Modern pages with dark aesthetics, smooth motion, and careful typography."],
        ["Mobile UX", "Touch-friendly controls, readable spacing, and layouts that do not feel cropped."],
        ["Backend logic", "APIs, auth, forms, databases, and the parts that make a site actually work."],
        ["UI/UX details", "Spacing, rhythm, contrast, hover states, empty states, and how motion feels."],
        ["Useful apps", "Products for learning, habits, fitness, data organization, and daily tasks."],
        ["Practice & growth", "I am still learning, but I am very motivated and like breaking difficult tasks down."]
      ]
    },
    skills: {
      eyebrow: "Skills",
      title: "Skills I am working with now.",
      copy:
        "My stack is still growing, but it is already bigger than one button on a page. I am learning to see the full picture: UI, data, requests, responsiveness, admin flows, validation, deploy, and project structure.",
      groups: [
        ["Frontend", "Components, responsive sections, forms, states, animation, dark UI systems."],
        ["Backend", "REST APIs, CRUD, auth, files, messages, validation, readable routes."],
        ["Mobile", "Flutter, Compose, and mobile-first thinking even inside web interfaces."],
        ["Data & AI", "Databases, structured data, parsing, AI helpers, and routine automation."]
      ],
      details: [
        "I build components, pages, and states so the interface feels intentional.",
        "I use JavaScript/TypeScript for app logic and keep improving code structure.",
        "I understand how to connect APIs, requests, saved data, and frontend behavior.",
        "I use Python for backend tasks, parsing, data processing, and utilities.",
        "I work with Laravel/PHP for backend logic, forms, CRUD, and admin scenarios.",
        "I think about schemas, relationships, local storage, and stable data.",
        "Tailwind helps me move fast; motion is used carefully so it feels premium.",
        "Mobile UI helps me think about comfort, hierarchy, and real usage.",
        "Native-style components help me understand mobile screens more deeply.",
        "I add AI only when it makes the product smarter, not just trendy.",
        "I use Git/GitHub for history, commits, pushes, and project order."
      ],
      workflowTitle: "Working approach",
      workflow:
        "I build the first version quickly, then polish the things people actually feel: spacing, responsive behavior, empty states, errors, loading, copy, hover, and how the page behaves after real use."
    },
    projects: {
      eyebrow: "Projects",
      title: "My projects",
      copy:
        "This section is where the actual work lives: different ideas, stacks, and product problems. Project names stay here so the rest of the portfolio can focus on personality and approach.",
      all: "All",
      featured: "Featured",
      details: "Details",
      live: "Live Demo"
    },
    terminal: {
      eyebrow: "Fullstack signal",
      title: "A portfolio should behave like a small product.",
      copy:
        "So this is not just a pretty first screen: it has a CMS, contact form, upload pipeline, auth, fallback data, responsive layout, and a structure that can keep growing.",
      lines: [
        ["ui", "responsive layout, motion, clean dark visual system"],
        ["api", "forms, auth, uploads, messages, admin actions"],
        ["cms", "projects can be changed without editing code"],
        ["care", "mobile checks, readable content, less visual noise"]
      ]
    },
    contact: {
      eyebrow: "Contact",
      title: "You can message me directly.",
      copy:
        "Open to practice, junior/fullstack tasks, internships, pet projects, and work where code, product thinking, and visual taste matter together. I communicate carefully, handle feedback well, and like when tasks move quickly but neatly.",
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
      footerNote: "Built by Oleksandra with React, Node and a lot of careful UI polishing."
    },
    footer: {
      status: "Open to junior/fullstack opportunities",
      stack: "React · Node · FastAPI · Laravel · Flutter",
      note:
        "Built as a living portfolio: CMS, responsive design, a contact form, and content that can grow without manual code edits.",
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
