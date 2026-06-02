import type { Project } from "@/types";

export type ProjectLocale = "uk" | "en";

export type ProjectTechnologyFilter = {
  id: string;
  label: string;
  matches: string[];
};

export type ProjectLocalizedCopy = {
  category: string;
  description: string;
  longDescription: string;
};

export const projectTechnologyFilters = [
  {
    id: "js-ts",
    label: "JS / TS",
    matches: ["React", "Vite", "JavaScript", "TypeScript", "Node.js", "Express", "NestJS"]
  },
  { id: "python", label: "Python", matches: ["Python", "FastAPI"] },
  { id: "dart", label: "Dart / Flutter", matches: ["Dart", "Flutter"] },
  { id: "kotlin", label: "Kotlin / Compose", matches: ["Kotlin", "Compose"] },
  { id: "php", label: "PHP / Laravel", matches: ["PHP", "Laravel", "Blade"] },
  { id: "data", label: "SQL / Data", matches: ["PostgreSQL", "SQLite", "MySQL", "MongoDB"] },
  { id: "ai", label: "AI / Gemini", matches: ["Gemini AI"] }
] as const satisfies readonly ProjectTechnologyFilter[];

export const fallbackProjects: Project[] = [
  {
    _id: "dreamtune",
    title: "DreamTune",
    description:
      "Full-stack music platform featuring Spotify playlist synchronization, automated YouTube audio sourcing, and offline playback.",
    longDescription:
      "DreamTune is a full-stack music platform featuring Spotify playlist synchronization, automated YouTube audio sourcing, offline playback, collaborative playlists, and an Android-optimized, gesture-driven UI. The project focuses on a product-style listening experience rather than a simple audio demo.",
    technologies: ["React", "Vite", "Tailwind", "Node.js", "Express", "PostgreSQL", "Capacitor"],
    githubUrl: "https://github.com/sashik117/DreamTune",
    liveUrl: "https://huggingface.co/spaces/dreamtune7/dreamtune-api",
    imageUrl: "/assets/dreamtune.png",
    category: "Music App",
    featured: true,
    status: "published"
  },
  {
    _id: "gymengine",
    title: "GymEngine",
    description:
      "Mobile-first strength training companion focused on rapid workout logging, structured routines, and offline-ready local storage.",
    longDescription:
      "GymEngine is a mobile-first strength training companion focused on rapid workout logging, structured routines, and offline-ready local storage with seamless cloud synchronization foundations. It combines Flutter/Dart mobile UX with backend planning for authentication, analytics, and long-term progress tracking.",
    technologies: ["Flutter", "Dart", "NestJS", "TypeScript", "SQLite", "Node.js"],
    githubUrl: "https://github.com/sashik117/GymEngine",
    imageUrl: "/assets/gymengine.png",
    category: "Fitness App",
    featured: true,
    status: "published"
  },
  {
    _id: "nutriai",
    title: "NutriAI",
    description:
      "Smart nutrition platform featuring automated meal analysis via Gemini AI, calorie tracking, rewards, and PostgreSQL persistence.",
    longDescription:
      "NutriAI is a smart nutrition platform featuring automated meal analysis via Gemini AI, calorie tracking, gamified rewards, meal planning, and dynamic data persistence with PostgreSQL. The interface is designed around mobile food logging, fast decisions, and a more motivating daily health flow.",
    technologies: ["React", "Vite", "Tailwind", "Node.js", "Express", "PostgreSQL", "Gemini AI"],
    githubUrl: "https://github.com/sashik117/NutriAI",
    imageUrl: "/assets/nutriai.png",
    category: "AI App",
    featured: true,
    status: "published"
  },
  {
    _id: "pajamatalk",
    title: "PajamaTalk",
    description:
      "Cozy language learning tool with Kotlin Compose Multiplatform UI, FastAPI backend, JWT auth, SRS scheduling, and WebSockets.",
    longDescription:
      "PajamaTalk is a cozy language learning tool with a Kotlin Compose Multiplatform frontend, powered by a FastAPI backend. It features JWT authentication, Spaced Repetition scheduling, word storage, AI enrichment direction, and WebSockets for real-time speech practice.",
    technologies: ["Kotlin", "Compose", "FastAPI", "Python", "JWT", "WebSocket"],
    imageUrl: "/assets/pajamatalk.svg",
    category: "Language App",
    featured: false,
    status: "published"
  },
  {
    _id: "driveprep",
    title: "DrivePrep / PDRPrep",
    description:
      "Comprehensive Ukrainian driving theory exam platform with official MVS simulations, progress analytics, battles, and premium access.",
    longDescription:
      "DrivePrep / PDRPrep is a comprehensive Ukrainian driving theory exam platform. It implements official MVS test simulations, interactive progress analytics, peer-to-peer battles, theory content, social features, and a premium tier architecture with a responsive mobile-first exam experience.",
    technologies: ["React", "Vite", "Tailwind", "FastAPI", "Python", "PostgreSQL", "Framer Motion"],
    githubUrl: "https://github.com/sashik117/pdr_prep",
    imageUrl: "/assets/driveprep.svg",
    category: "Exam Platform",
    featured: true,
    status: "published"
  },
  {
    _id: "menu-portal",
    title: "Menu Portal",
    description:
      "Enterprise-ready menu management system built with Laravel, featuring admin CRUD flows, validation, and a custom CMS direction.",
    longDescription:
      "Menu Portal is an enterprise-ready menu management system built with Laravel. It features role-based admin CRUD flows, strict request validation, structured menu content, form handling, and an intuitive custom CMS direction for managing restaurant-style data without editing source code.",
    technologies: ["PHP", "Laravel", "Blade", "MySQL", "CRUD", "Admin Panel"],
    imageUrl: "/assets/menu-portal.svg",
    category: "Laravel App",
    featured: false,
    status: "published"
  }
];

export const projectCopy: Record<string, Record<ProjectLocale, ProjectLocalizedCopy>> = {
  dreamtune: {
    uk: {
      category: "Музичний застосунок",
      description:
        "Fullstack-платформа для музики зі Spotify-синхронізацією, пошуком аудіо через YouTube та офлайн-відтворенням.",
      longDescription:
        "DreamTune — це fullstack-платформа для музики, де я поєдную синхронізацію Spotify-плейлистів, автоматизований пошук аудіо через YouTube, офлайн-відтворення, collaborative playlist напрям і Android-оптимізований gesture-driven інтерфейс. Ідея не в простому audio demo, а в продукті, який відчувається як реальний музичний застосунок з логікою, станами та зручним мобільним сценарієм."
    },
    en: {
      category: "Music App",
      description:
        "Full-stack music platform featuring Spotify playlist synchronization, automated YouTube audio sourcing, and offline playback.",
      longDescription:
        "DreamTune is a full-stack music platform featuring Spotify playlist synchronization, automated YouTube audio sourcing, offline playback, collaborative playlists, and an Android-optimized, gesture-driven UI. The project focuses on a product-style listening experience rather than a simple audio demo."
    }
  },
  gymengine: {
    uk: {
      category: "Фітнес-застосунок",
      description:
        "Mobile-first застосунок для силових тренувань: швидке логування, структуровані рутини й offline-ready local storage.",
      longDescription:
        "GymEngine — це mobile-first companion для силових тренувань, сфокусований на швидкому логуванні підходів, структурованих програмах, offline-ready local storage і фундаменті для cloud sync. Проєкт показує, як я думаю про фітнес-сценарій на телефоні: мінімум зайвих кліків, зрозумілі стани, швидке повернення до тренування і backend-напрям для авторизації, аналітики та довгострокового прогресу."
    },
    en: {
      category: "Fitness App",
      description:
        "Mobile-first strength training companion focused on rapid workout logging, structured routines, and offline-ready local storage.",
      longDescription:
        "GymEngine is a mobile-first strength training companion focused on rapid workout logging, structured routines, and offline-ready local storage with seamless cloud synchronization foundations. It combines Flutter/Dart mobile UX with backend planning for authentication, analytics, and long-term progress tracking."
    }
  },
  nutriai: {
    uk: {
      category: "AI застосунок",
      description:
        "Smart nutrition-платформа з Gemini AI аналізом їжі, calorie tracking, rewards і PostgreSQL persistence.",
      longDescription:
        "NutriAI — це smart nutrition-платформа з автоматизованим аналізом прийомів їжі через Gemini AI, calorie tracking, gamified rewards, meal planning і динамічним збереженням даних у PostgreSQL. Я закладала логіку навколо мобільного food logging: швидко внести їжу, отримати зрозумілий результат, бачити прогрес і не відчувати, що застосунок заважає щоденному ритму."
    },
    en: {
      category: "AI App",
      description:
        "Smart nutrition platform featuring automated meal analysis via Gemini AI, calorie tracking, rewards, and PostgreSQL persistence.",
      longDescription:
        "NutriAI is a smart nutrition platform featuring automated meal analysis via Gemini AI, calorie tracking, gamified rewards, meal planning, and dynamic data persistence with PostgreSQL. The interface is designed around mobile food logging, fast decisions, and a more motivating daily health flow."
    }
  },
  pajamatalk: {
    uk: {
      category: "Застосунок для мов",
      description:
        "Cozy language learning tool з Kotlin Compose UI, FastAPI backend, JWT auth, SRS scheduling і WebSockets.",
      longDescription:
        "PajamaTalk — це cozy language learning tool з Kotlin Compose Multiplatform frontend і FastAPI backend. У проєкті є JWT-авторизація, Spaced Repetition scheduling, збереження слів, напрям для AI-enrichment і WebSockets для real-time speech practice. Тут важливий не тільки стек, а й відчуття: навчання має бути спокійним, зрозумілим і достатньо живим, щоб користувачу хотілося повертатися."
    },
    en: {
      category: "Language App",
      description:
        "Cozy language learning tool with Kotlin Compose Multiplatform UI, FastAPI backend, JWT auth, SRS scheduling, and WebSockets.",
      longDescription:
        "PajamaTalk is a cozy language learning tool with a Kotlin Compose Multiplatform frontend, powered by a FastAPI backend. It features JWT authentication, Spaced Repetition scheduling, word storage, AI enrichment direction, and WebSockets for real-time speech practice."
    }
  },
  driveprep: {
    uk: {
      category: "Платформа іспитів",
      description:
        "Українська платформа для підготовки до ПДР: офіційні тести МВС, аналітика прогресу, battles і premium access.",
      longDescription:
        "DrivePrep / PDRPrep — це комплексна українська платформа для підготовки до теоретичного іспиту з водіння. Вона охоплює симуляції офіційних тестів МВС, інтерактивну аналітику прогресу, peer-to-peer battles, теоретичні матеріали, соціальні елементи й premium tier architecture. Особливий фокус — mobile-first exam experience, щоб тестування на телефоні було читабельним, швидким і не ламало концентрацію."
    },
    en: {
      category: "Exam Platform",
      description:
        "Comprehensive Ukrainian driving theory exam platform with official MVS simulations, progress analytics, battles, and premium access.",
      longDescription:
        "DrivePrep / PDRPrep is a comprehensive Ukrainian driving theory exam platform. It implements official MVS test simulations, interactive progress analytics, peer-to-peer battles, theory content, social features, and a premium tier architecture with a responsive mobile-first exam experience."
    }
  },
  "menu-portal": {
    uk: {
      category: "Laravel CMS",
      description:
        "Menu management system на Laravel з admin CRUD, валідацією, формами й custom CMS напрямом.",
      longDescription:
        "Menu Portal — це menu management system на Laravel з role-based admin CRUD flows, strict request validation, structured menu content, form handling і custom CMS напрямом. Проєкт показує класичну backend-логіку: форми, правила доступу, зрозуміле керування контентом і структуру, де дані ресторанного меню можна оновлювати без ручного редагування source code."
    },
    en: {
      category: "Laravel App",
      description:
        "Enterprise-ready menu management system built with Laravel, featuring admin CRUD flows, validation, and a custom CMS direction.",
      longDescription:
        "Menu Portal is an enterprise-ready menu management system built with Laravel. It features role-based admin CRUD flows, strict request validation, structured menu content, form handling, and an intuitive custom CMS direction for managing restaurant-style data without editing source code."
    }
  }
};
