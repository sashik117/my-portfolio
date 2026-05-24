"use client";

import { portfolioApi } from "@/lib/api";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, SendHorizonal } from "lucide-react";
import { FormEvent, useState } from "react";
import MagneticButton from "./MagneticButton";

const socials = [
  { label: "GitHub", href: "https://github.com/sashik117", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin },
  { label: "Email", href: "mailto:sanyoklolik@gmail.com", icon: Mail },
  { label: "Telegram", href: "https://t.me/", icon: Send }
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("loading");
    setFeedback("");

    try {
      await portfolioApi.sendMessage(form);
      setState("success");
      setFeedback("Message sent. I will reply soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setState("error");
      setFeedback(error instanceof Error ? error.message : "Could not send message.");
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
          <div className="eyebrow">Contact</div>
          <h2 className="section-title">Let&apos;s build something that feels expensive.</h2>
          <p className="section-copy">
            Send a message through the backend-powered form or jump straight to
            socials. Contact messages are stored in the admin dashboard.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
              <span className="mb-2 block text-sm font-bold text-white/[0.62]">Name</span>
              <input
                className="input"
                required
                minLength={2}
                value={form.name}
                onChange={(event) =>
                  setForm((value) => ({ ...value, name: event.target.value }))
                }
                placeholder="Your name"
              />
            </label>
            <label>
              <span className="mb-2 block text-sm font-bold text-white/[0.62]">Email</span>
              <input
                className="input"
                required
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((value) => ({ ...value, email: event.target.value }))
                }
                placeholder="you@email.com"
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-bold text-white/[0.62]">Message</span>
            <textarea
              className="input min-h-40 resize-y"
              required
              minLength={10}
              value={form.message}
              onChange={(event) =>
                setForm((value) => ({ ...value, message: event.target.value }))
              }
              placeholder="Tell me about your idea"
            />
          </label>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MagneticButton type="submit" disabled={state === "loading"}>
              {state === "loading" ? "Sending" : "Send Message"}
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
