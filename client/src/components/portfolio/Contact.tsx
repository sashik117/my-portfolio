"use client";

import { portfolioApi } from "@/lib/api";
import { motion } from "framer-motion";
import { Github, Instagram, Mail, Send, SendHorizonal } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import MagneticButton from "./MagneticButton";

const socials = [
  { label: "GitHub", href: "https://github.com/sashik117", icon: Github },
  { label: "Telegram", href: "https://t.me/Cinnamonroll69", icon: Send },
  { label: "Email", href: "mailto:sanyoklolik@gmail.com", icon: Mail },
  { label: "Instagram", href: "https://www.instagram.com/_o.suhova/", icon: Instagram }
];

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
      await portfolioApi.sendMessage(payload);
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
          <div className="mt-5 rounded-2xl border border-white/[0.10] bg-white/[0.05] p-4 text-sm leading-6 text-white/[0.56]">
            {t.contact.footerNote}
          </div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          className="glass rounded-[26px] p-5 md:p-7"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-bold text-white/[0.62]">{t.contact.name}</span>
              <input
                className="input"
                required
                minLength={2}
                maxLength={80}
                value={form.name}
                onChange={(event) =>
                  setForm((value) => ({ ...value, name: event.target.value }))
                }
                placeholder={t.contact.namePlaceholder}
              />
            </label>
            <label>
              <span className="mb-2 block text-sm font-bold text-white/[0.62]">{t.contact.email}</span>
              <input
                className="input"
                required
                type="email"
                maxLength={160}
                value={form.email}
                onChange={(event) =>
                  setForm((value) => ({ ...value, email: event.target.value }))
                }
                placeholder={t.contact.emailPlaceholder}
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-bold text-white/[0.62]">{t.contact.message}</span>
            <textarea
              className="input min-h-40 resize-y"
              required
              minLength={10}
              maxLength={1800}
              value={form.message}
              onChange={(event) =>
                setForm((value) => ({ ...value, message: event.target.value }))
              }
              placeholder={t.contact.messagePlaceholder}
            />
          </label>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
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
