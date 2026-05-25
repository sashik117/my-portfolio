"use client";

import { fallbackProjects } from "@/lib/fallback-data";
import { mediaUrl, portfolioApi } from "@/lib/api";
import type { Project } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import MagneticButton from "./MagneticButton";

const preserveUppercase = new Set(["ai", "api", "cms", "crud", "jwt", "mvs", "pdr", "ui", "ux"]);
const languageFilters = [
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
] as const;

const projectCopy = {
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
} as const;

function formatCategory(category?: string) {
  if (!category) return "Project";

  const normalized = category.trim().replace(/\s+/g, " ");

  if (/[^\x00-\x7F]/.test(normalized)) return normalized;

  return normalized
    .split(" ")
    .map((word) => {
      const lower = word.toLowerCase();
      if (preserveUppercase.has(lower)) return lower.toUpperCase();

      return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
    })
    .join(" ");
}

function normalizeProjectKey(value?: string) {
  return (value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getProjectCopy(project: Project, locale: "uk" | "en") {
  const keys = [
    normalizeProjectKey(project.slug),
    normalizeProjectKey(project._id),
    normalizeProjectKey(project.title),
    normalizeProjectKey(project.title.split("/")[0])
  ];
  const match = keys
    .map((key) => projectCopy[key as keyof typeof projectCopy])
    .find(Boolean);

  return match?.[locale];
}

function localizeProject(project: Project, locale: "uk" | "en"): Project {
  const copy = getProjectCopy(project, locale);

  if (!copy) return project;

  return {
    ...project,
    category: copy.category,
    description: copy.description,
    longDescription: copy.longDescription
  };
}

function projectMatchesFilter(project: Project, filter: (typeof languageFilters)[number]) {
  const technologies = project.technologies.map((tech) => tech.toLowerCase());

  return filter.matches.some((match) =>
    technologies.some((tech) => tech === match.toLowerCase())
  );
}

export default function Projects() {
  const { locale, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    portfolioApi
      .getProjects()
      .then((data) => {
        if (data.length) setProjects(data);
      })
      .catch(() => setProjects(fallbackProjects));
  }, []);

  const localizedProjects = useMemo(
    () => projects.map((project) => localizeProject(project, locale)),
    [locale, projects]
  );

  const filters = useMemo(
    () => languageFilters.filter((filter) => projects.some((project) => projectMatchesFilter(project, filter))),
    [projects]
  );

  useEffect(() => {
    if (activeFilter !== "all" && !filters.some((filter) => filter.id === activeFilter)) {
      setActiveFilter("all");
    }
  }, [activeFilter, filters]);

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return localizedProjects;
    const filter = filters.find((item) => item.id === activeFilter);

    if (!filter) return localizedProjects;

    return localizedProjects.filter((project) => projectMatchesFilter(project, filter));
  }, [activeFilter, filters, localizedProjects]);

  const selectedProject = selected ? localizeProject(selected, locale) : null;

  return (
    <section id="projects" className="section-shell">
      <motion.div
        className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7 }}
      >
        <div>
          <div className="eyebrow">{t.projects.eyebrow}</div>
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-copy">
            {t.projects.copy}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[{ id: "all", label: t.projects.all }, ...filters].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-bold transition ${
                activeFilter === filter.id
                  ? "border-electric bg-electric text-ink"
                  : "border-white/[0.12] bg-white/[0.06] text-white/[0.68] hover:border-electric/[0.42]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <motion.article
            key={project._id}
            className="group overflow-hidden rounded-[24px] border border-white/[0.10] bg-white/[0.06] shadow-lift backdrop-blur-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.58, delay: index * 0.06 }}
            whileHover={{ y: -8 }}
          >
            <button
              type="button"
              onClick={() => setSelected(project)}
              className="block w-full text-left"
              aria-label={`Open ${project.title}`}
            >
              <div className="relative aspect-[1.42] overflow-hidden border-b border-white/[0.10] bg-[#08101c] p-3">
                <img
                  src={mediaUrl(project.imageUrl) || "/assets/project-aurora.svg"}
                  alt={project.title}
                  className="h-full w-full rounded-2xl object-contain transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute left-4 top-4 rounded-full border border-white/[0.14] bg-black/[0.42] px-3 py-1 text-xs font-black text-white backdrop-blur-md">
                  {formatCategory(project.category)}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black text-white">{project.title}</h3>
                  {project.featured && (
                    <span className="rounded-full bg-mint px-2.5 py-1 text-[0.68rem] font-black uppercase text-ink">
                      {t.projects.featured}
                    </span>
                  )}
                </div>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/[0.58]">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-1 text-xs font-bold text-white/[0.62]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </button>
            <div className="flex items-center gap-2 border-t border-white/[0.10] p-4">
              {project.githubUrl && (
                <a
                  className="icon-button"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                  aria-label={`${project.title} GitHub`}
                >
                  <Github size={18} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  className="icon-button"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Live demo"
                  aria-label={`${project.title} live demo`}
                >
                  <ExternalLink size={18} />
                </a>
              )}
              <button
                className="ml-auto rounded-xl border border-white/[0.10] bg-white/[0.06] px-4 py-2 text-sm font-bold text-white/[0.72] transition hover:border-electric/[0.40]"
                onClick={() => setSelected(project)}
              >
                {t.projects.details}
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/[0.72] p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[28px] border border-white/[0.12] bg-ink shadow-lift"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[1.9] min-h-[220px] overflow-hidden border-b border-white/[0.10] bg-[#08101c] p-3">
                <img
                  src={mediaUrl(selectedProject.imageUrl) || "/assets/project-aurora.svg"}
                  alt={selectedProject.title}
                  className="h-full w-full rounded-2xl object-contain"
                />
                <button
                  className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/[0.12] bg-black/[0.45] text-white backdrop-blur"
                  onClick={() => setSelected(null)}
                  aria-label="Close project details"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 md:p-8">
                <div className="text-sm font-bold uppercase text-electric">
                  {formatCategory(selectedProject.category)}
                </div>
                <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">
                  {selectedProject.title}
                </h3>
                <p className="mt-5 max-w-3xl leading-8 text-white/[0.64]">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-2 text-xs font-bold text-white/[0.70]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  {selectedProject.liveUrl && <MagneticButton href={selectedProject.liveUrl}>{t.projects.live}</MagneticButton>}
                  {selectedProject.githubUrl && (
                    <MagneticButton href={selectedProject.githubUrl} variant="secondary">
                      GitHub
                    </MagneticButton>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
