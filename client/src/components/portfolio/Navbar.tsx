"use client";

import clsx from "clsx";
import { Languages, Menu, Sparkles, X } from "lucide-react";
import { PointerEvent, useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const { locale, t, toggleLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeHref, setActiveHref] = useState("");
  const localeLabel = locale === "uk" ? "UA" : "EN";

  const links = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" }
  ];

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
  }, []);

  const moveGlow = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--nav-x", `${event.clientX - rect.left}px`);
  };

  return (
    <header
      className="fixed left-0 right-0 top-0 z-40 border-b border-white/[0.10] bg-[#080d16] shadow-[0_18px_60px_rgba(0,0,0,0.38)]"
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
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-ink">
            <Sparkles size={19} aria-hidden="true" />
          </span>
          <span className="hidden sm:block">{t.nav.brand}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={clsx(
                "rounded-xl px-4 py-2 text-sm font-semibold transition",
                activeHref === link.href
                  ? "bg-white text-ink shadow-glow"
                  : "text-white/[0.72] hover:bg-white/[0.08] hover:text-white"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            className="inline-flex h-11 min-w-16 items-center justify-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-3 text-sm font-black text-white transition hover:border-electric/[0.40] hover:bg-electric/[0.10]"
            aria-label={t.nav.switchLabel}
            title={t.nav.switchLabel}
            onClick={toggleLocale}
          >
            <Languages size={17} />
            {localeLabel}
          </button>
          <button
            className="icon-button md:hidden"
            aria-label={t.nav.menuLabel}
            title="Menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="relative mx-auto w-full max-w-6xl border-t border-white/[0.08] bg-[#080d16] p-2 shadow-lift md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "block rounded-xl px-4 py-3 text-sm font-bold",
                activeHref === link.href
                  ? "bg-white text-ink"
                  : "text-white/[0.78] hover:bg-white/[0.08]"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
      <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-electric via-mint to-coral" style={{ width: `${progress}%` }} />
    </header>
  );
}
