"use client";

import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { MouseEvent, ReactNode, useRef } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  disabled
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const setRef = (node: HTMLAnchorElement | HTMLButtonElement | null) => {
    ref.current = node;
  };

  const onMove = (event: MouseEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${x * 0.14}px, ${y * 0.22}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  const classes = clsx(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition",
    variant === "primary"
      ? "border-transparent bg-white text-ink shadow-glow hover:bg-electric"
      : "border-white/[0.15] bg-white/[0.07] text-white hover:border-electric/[0.60] hover:bg-electric/[0.10]",
    "disabled:pointer-events-none disabled:opacity-60",
    className
  );

  const content = (
    <>
      <span>{children}</span>
      <ArrowRight
        size={17}
        className="transition group-hover:translate-x-1"
        aria-hidden="true"
      />
    </>
  );

  if (href) {
    return (
      <a
        ref={setRef}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={setRef}
      type={type}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={classes}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
