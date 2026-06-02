"use client";

import { sendContactMessage } from "@/features/portfolio/services/contactService";
import { motion } from "framer-motion";
import { Github, Instagram, Mail, MessageCircle, Send, SendHorizonal, ShieldCheck, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import MagneticButton from "./MagneticButton";

const socials = [
  { label: "GitHub", href: "https://github.com/sashik117", icon: Github },
  { label: "Telegram", href: "https://t.me/Cinnamonroll69", icon: Send },
  { label: "Email", href: "mailto:sanyoklolik@gmail.com", icon: Mail },
  { label: "Instagram", href: "https://www.instagram.com/_o.suhova/", icon: Instagram }
];

const badgeIcons = [Sparkles, ShieldCheck, MessageCircle];

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("loading");
    setFeedback("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim()
    };

    if (payload.name.length < 2 || payload.message.length < 10) {
      setState("error");
      setFeedback(t.contact.error);
      return;
    }

    try {
      await sendContactMessage(payload);
      setState("success");
      setFeedback(t.contact.success);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setState("error");
      setFeedback(error instanceof Error ? error.message : t.contact.error);
    }
  };

  return (
    <section id="contact" className="section-shell pb-16">
      <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">{t.contact.eyebrow}</div>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-copy">
            {t.contact.copy}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="icon-button"
                title={social.label}
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
          <div className="group relative mt-5 overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.05] p-4 text-sm leading-6 text-white/[0.66] transition hover:border-electric/[0.30] hover:bg-electric/[0.07]">
            <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-electric/[0.10] blur-2xl transition group-hover:bg-mint/[0.12]" />
            <div className="relative flex gap-3">
              <Mail size={18} className="mt-1 shrink-0 text-electric" />
              <span>{t.contact.footerNote}</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          className="glass relative overflow-hidden rounded-[26px] p-5 md:p-7"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          whileHover={{ y: -4 }}
        >
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-electric/[0.10] blur-3xl" />
          <div className="absolute -bottom-20 left-8 h-40 w-40 rounded-full bg-coral/[0.08] blur-3xl" />
          <div className="relative mb-5 flex flex-wrap gap-2">
            {t.contact.formBadges.map((badge, index) => {
              const Icon = badgeIcons[index];

              return (
                <motion.span
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-2 text-xs font-bold text-white/[0.72]"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -2 }}
                >
                  <Icon size={14} className={index === 0 ? "text-electric" : index === 1 ? "text-mint" : "text-coral"} />
                  {badge}
                </motion.span>
              );
            })}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <motion.label
              className="group block rounded-2xl border border-white/[0.08] bg-white/[0.045] p-3 transition focus-within:border-electric/[0.45] focus-within:bg-electric/[0.07] hover:border-electric/[0.28]"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="mb-2 block text-sm font-bold text-white/[0.62]">{t.contact.name}</span>
              <input
                className="input bg-black/[0.18]"
                required
                minLength={2}
                maxLength={80}
                value={form.name}
                onChange={(event) =>
                  setForm((value) => ({ ...value, name: event.target.value }))
                }
                placeholder={t.contact.namePlaceholder}
              />
            </motion.label>
            <motion.label
              className="group block rounded-2xl border border-white/[0.08] bg-white/[0.045] p-3 transition focus-within:border-mint/[0.45] focus-within:bg-mint/[0.07] hover:border-mint/[0.28]"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="mb-2 block text-sm font-bold text-white/[0.62]">{t.contact.email}</span>
              <input
                className="input bg-black/[0.18]"
                required
                type="email"
                maxLength={160}
                value={form.email}
                onChange={(event) =>
                  setForm((value) => ({ ...value, email: event.target.value }))
                }
                placeholder={t.contact.emailPlaceholder}
              />
            </motion.label>
          </div>
          <motion.label
            className="group mt-4 block rounded-2xl border border-white/[0.08] bg-white/[0.045] p-3 transition focus-within:border-coral/[0.45] focus-within:bg-coral/[0.07] hover:border-coral/[0.28]"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="mb-2 block text-sm font-bold text-white/[0.62]">{t.contact.message}</span>
            <textarea
              className="input min-h-40 resize-y bg-black/[0.18]"
              required
              minLength={10}
              maxLength={1800}
              value={form.message}
              onChange={(event) =>
                setForm((value) => ({ ...value, message: event.target.value }))
              }
              placeholder={t.contact.messagePlaceholder}
            />
          </motion.label>

          <div className="relative mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MagneticButton type="submit" disabled={state === "loading"}>
              {state === "loading" ? t.contact.sending : t.contact.send}
            </MagneticButton>
            {feedback && (
              <div
                className={`flex items-center gap-2 text-sm font-bold ${
                  state === "success" ? "text-mint" : "text-coral"
                }`}
              >
                <SendHorizonal size={16} />
                {feedback}
              </div>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
