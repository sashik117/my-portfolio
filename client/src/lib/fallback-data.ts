import type { Project } from "@/types";

export const fallbackProjects: Project[] = [
  {
    _id: "dreamtune",
    title: "DreamTune",
    description:
      "Fullstack music player with Spotify playlist import, YouTube audio sourcing, offline playback, collaborative playlists, and Android-ready UI.",
    longDescription:
      "DreamTune is a fullstack music experience built with React, Vite, Tailwind, Node/Express, PostgreSQL, Capacitor, Spotify import flows, YouTube audio sourcing, offline-ready playback, and a polished mobile-first interface.",
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
      "Mobile-first strength training app for fast workout logging, structured plans, offline data, analytics, and backend sync foundations.",
    longDescription:
      "GymEngine is a product-style fitness app built with Flutter and Dart, supported by a Node/NestJS TypeScript backend. It includes authentication flows, SQLite/Drift offline storage, training plans, active workout mode, rest timers, analytics, localization, and a premium dark mobile UI.",
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
      "AI nutrition tracker with food logging, smart calorie goals, Gemini meal analysis, meal planning, rewards, and PostgreSQL persistence.",
    longDescription:
      "NutriAI is a mobile-first fullstack nutrition product using React, Vite, Tailwind, Node/Express, PostgreSQL, and Gemini AI. The project shows food tracking, intelligent meal analysis, weekly meal planning, water tracking, rewards, and a PWA-style phone interface.",
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
      "Cozy language learning app with Kotlin Compose Multiplatform UI, FastAPI backend, JWT auth, SRS scheduling, and speaking WebSocket.",
    longDescription:
      "PajamaTalk is a mobile-first language learning product concept. The frontend is Kotlin Compose Multiplatform with Android-ready structure and desktop preview, while the backend is FastAPI with JWT auth, word storage, AI enrichment stubs, spaced repetition, context analysis, grammar drops, and realtime speaking practice.",
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
      "Ukrainian driving theory exam platform with tests, MVS exam simulation, theory, tickets, progress, friends, chats, battles, and premium access.",
    longDescription:
      "DrivePrep is a fullstack exam-prep platform for Ukrainian driving theory. It combines React/Vite/Tailwind and Framer Motion on the frontend with FastAPI, Python, PostgreSQL-style architecture, content import scripts, LiqPay-ready payments, progress analytics, social features, and a responsive mobile-first exam experience.",
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
      "Laravel/PHP menu-management portal with admin-style CRUD flows, structured menu content, validation, and a practical CMS direction.",
    longDescription:
      "Menu Portal adds the PHP/Laravel side of the stack: a backend-focused menu management project with CRUD thinking, structured restaurant/menu data, form validation, admin editing flows, and a realistic content-management use case. It fits the portfolio because it shows that Oleksandra is not locked into one stack and can move between JavaScript, Python, mobile, and Laravel-style backend work.",
    technologies: ["PHP", "Laravel", "Blade", "MySQL", "CRUD", "Admin Panel"],
    imageUrl: "/assets/menu-portal.svg",
    category: "Laravel App",
    featured: false,
    status: "published"
  },
  {
    _id: "parsing-pdr",
    title: "PDR PDF Parser",
    description:
      "Python parser for driving-theory PDFs that extracts questions, answers, images, and structured JSON datasets.",
    longDescription:
      "A practical data-processing tool for the PDR ecosystem. It uses Python, pdfplumber, PyMuPDF, Pillow, and pandas to parse PDFs, extract question images, split large datasets, and generate structured JSON ready for import into the exam platform.",
    technologies: ["Python", "pdfplumber", "PyMuPDF", "Pillow", "pandas", "JSON"],
    imageUrl: "/assets/parsing-pdr.svg",
    category: "Python Tool",
    featured: false,
    status: "published"
  }
];
