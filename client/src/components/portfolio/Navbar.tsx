"use client";

import clsx from "clsx";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = light ? "light" : "dark";
  }, [light]);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-3 pt-3 md:px-6">
      <nav
        className={clsx(
          "mx-auto flex h-16 w-full max-w-6xl items-center justify-between rounded-2xl border px-4 transition md:px-5",
          scrolled
            ? "border-white/[0.12] bg-ink/[0.70] shadow-lift backdrop-blur-xl"
            : "border-white/[0.08] bg-white/[0.05] backdrop-blur-md"
        )}
      >
        <a href="#top" className="flex min-w-0 items-center gap-3 font-black">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-ink">
            <Sparkles size={19} aria-hidden="true" />
          </span>
          <span className="hidden sm:block">Fullstack Portfolio</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-white/[0.72] transition hover:bg-white/[0.08] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            className="icon-button"
            aria-label="Toggle color theme"
            title="Theme"
            onClick={() => setLight((value) => !value)}
          >
            {light ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            className="icon-button md:hidden"
            aria-label="Open navigation"
            title="Menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 w-full max-w-6xl rounded-2xl border border-white/[0.12] bg-ink/[0.92] p-2 shadow-lift backdrop-blur-xl md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-bold text-white/[0.78] hover:bg-white/[0.08]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
