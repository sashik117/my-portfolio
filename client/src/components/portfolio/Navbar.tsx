"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  FolderKanban,
  Languages,
  Mail,
  Menu,
  Sparkles,
  UserRound,
  X
} from "lucide-react";
import { PointerEvent, useEffect, useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const { locale, t, toggleLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeHref, setActiveHref] = useState("");
  const localeLabel = locale === "uk" ? "UA" : "EN";

  const links = useMemo(
    () => [
      {
        label: t.nav.about,
        href: "#about",
        description: locale === "uk" ? "bio, values, workflow" : "bio, values, workflow",
        Icon: UserRound,
        accent: "text-electric"
      },
      {
        label: t.nav.skills,
        href: "#skills",
        description: locale === "uk" ? "stack, tools, product logic" : "stack, tools, product logic",
        Icon: Code2,
        accent: "text-mint"
      },
      {
        label: t.nav.projects,
        href: "#projects",
        description: locale === "uk" ? "real cases, tech filters" : "real cases, tech filters",
        Icon: FolderKanban,
        accent: "text-coral"
      },
      {
        label: t.nav.contact,
        href: "#contact",
        description: locale === "uk" ? "roles, freelance, collabs" : "roles, freelance, collabs",
        Icon: Mail,
        accent: "text-solar"
      }
    ],
    [locale, t.nav.about, t.nav.contact, t.nav.projects, t.nav.skills]
  );

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);

      const current = links.reduce((active, link) => {
        const section = document.querySelector(link.href);
        if (!(section instanceof HTMLElement)) return active;
        return window.scrollY >= section.offsetTop - 170 ? link.href : active;
      }, "");
      setActiveHref(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [links]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const moveGlow = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--nav-x", `${event.clientX - rect.left}px`);
  };

  return (
    <header
      className="premium-line fixed left-0 right-0 top-0 z-40 border-b border-white/[0.10] bg-[#080d16] shadow-[0_18px_60px_rgba(0,0,0,0.38)]"
      onPointerMove={moveGlow}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(420px circle at var(--nav-x, 50%) 0%, rgba(110,231,249,0.12), transparent 48%)"
        }}
      />
      <nav
        className={clsx(
          "relative mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-4 transition md:px-5"
        )}
      >
        <a href="#top" className="flex min-w-0 items-center gap-3 font-black">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-ink shadow-[0_0_34px_rgba(110,231,249,0.20)] transition hover:scale-[1.04]">
            <Sparkles size={19} aria-hidden="true" />
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block">{t.nav.brand}</span>
            <span className="mt-1 block text-[0.66rem] font-bold uppercase text-white/[0.42]">
              UX, backend, mobile, CMS
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={clsx(
                "group relative rounded-xl px-4 py-2 text-sm font-semibold transition",
                activeHref === link.href
                  ? "bg-white text-ink shadow-glow"
                  : "text-white/[0.68] hover:bg-white/[0.08] hover:text-white"
              )}
            >
              <span
                className={clsx(
                  "absolute inset-x-4 bottom-1 h-px scale-x-0 rounded-full bg-current opacity-60 transition group-hover:scale-x-100",
                  activeHref === link.href ? "scale-x-100 text-ink" : "text-electric"
                )}
              />
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            className="touch-premium inline-flex h-11 min-w-16 items-center justify-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-3 text-sm font-black text-white transition hover:border-electric/[0.40] hover:bg-electric/[0.10] active:scale-[0.98]"
            aria-label={t.nav.switchLabel}
            title={t.nav.switchLabel}
            onClick={toggleLocale}
          >
            <Languages size={17} />
            {localeLabel}
          </button>
          <button
            className={clsx(
              "icon-button touch-premium md:hidden",
              open && "border-electric/[0.40] bg-electric/[0.12] text-electric"
            )}
            aria-label={t.nav.menuLabel}
            title="Menu"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              className="fixed inset-0 top-[72px] z-[-1] bg-black/[0.42] md:hidden"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative mx-auto w-[calc(100%-24px)] max-w-6xl overflow-hidden rounded-b-[24px] border-x border-b border-white/[0.10] bg-[#080d16] p-3 shadow-lift md:hidden"
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="pointer-events-none absolute -right-20 -top-28 h-48 w-48 rounded-full bg-electric/[0.12] blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 left-4 h-40 w-40 rounded-full bg-coral/[0.10] blur-3xl" />
              <div className="relative mb-3 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.045] px-4 py-3">
                <div>
                  <div className="text-xs font-black uppercase text-electric">Navigation</div>
                  <div className="mt-1 text-sm font-bold text-white/[0.70]">
                    {locale === "uk" ? "швидкий доступ до секцій" : "quick section access"}
                  </div>
                </div>
                <div className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-1 text-xs font-black text-white/[0.66]">
                  {Math.round(progress)}%
                </div>
              </div>
              <div className="relative grid gap-2">
                {links.map((link, index) => {
                  const Icon = link.Icon;
                  const active = activeHref === link.href;

                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        "touch-premium group grid min-h-[72px] grid-cols-[44px_1fr_20px] items-center gap-3 rounded-2xl border px-3 transition active:scale-[0.99]",
                        active
                          ? "border-electric/[0.45] bg-electric/[0.12] text-white shadow-glow"
                          : "border-white/[0.08] bg-white/[0.045] text-white/[0.78] hover:border-white/[0.16] hover:bg-white/[0.08]"
                      )}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.035 }}
                    >
                      <span
                        className={clsx(
                          "grid h-11 w-11 place-items-center rounded-xl border border-white/[0.10] bg-black/[0.20] transition group-hover:scale-[1.04]",
                          active ? "text-electric" : link.accent
                        )}
                      >
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-base font-black">{link.label}</span>
                        <span className="mt-1 block truncate text-xs font-bold text-white/[0.48]">
                          {link.description}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={17}
                        className={clsx(
                          "transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                          active ? "text-electric" : "text-white/[0.34]"
                        )}
                      />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-electric via-mint to-coral" style={{ width: `${progress}%` }} />
    </header>
  );
}
