"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function Loader() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-ink px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.95, ease: "easeInOut" }}
        >
          <motion.div
            className="w-full max-w-sm text-center"
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.04, opacity: 0 }}
          >
            <div className="relative mx-auto h-24 w-24">
              <div className="absolute inset-0 rounded-full border border-white/[0.10]" />
              <motion.div
                className="absolute inset-0 rounded-full border-t-2 border-electric"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.25, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-4 grid place-items-center rounded-full bg-white/[0.05] text-xl font-black text-electric">
                ✦
              </div>
            </div>
            <div className="mt-6 text-xs font-black uppercase text-electric">
              {t.loader.label}
            </div>
            <div className="mt-3 text-3xl font-black text-white">{t.loader.name}</div>
            <div className="mt-3 text-sm font-bold text-white/[0.50]">{t.loader.note}</div>
            <div className="mx-auto mt-5 h-1.5 max-w-56 overflow-hidden rounded-full bg-white/[0.10]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-electric via-mint to-coral"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.35, ease: "easeInOut" }}
              />
            </div>
            <div className="mt-5 flex justify-center gap-2">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="h-2 w-2 rounded-full bg-electric"
                  animate={{ opacity: [0.32, 1, 0.32], y: [0, -4, 0] }}
                  transition={{ duration: 1.15, repeat: Infinity, delay: dot * 0.16 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
