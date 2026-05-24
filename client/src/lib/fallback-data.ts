import type { Project } from "@/types";

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
  },
];
