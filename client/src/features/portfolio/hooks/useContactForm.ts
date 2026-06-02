"use client";

import { FormEvent, useState } from "react";
import { sendContactMessage } from "../services/contactService";

type ContactFormState = "idle" | "loading" | "success" | "error";

type ContactFormMessages = {
  success: string;
  error: string;
};

type ContactForm = {
  name: string;
  email: string;
  message: string;
  website: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  message: "",
  website: ""
};

export function useContactForm(messages: ContactFormMessages) {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [state, setState] = useState<ContactFormState>("idle");
  const [feedback, setFeedback] = useState("");

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("loading");
    setFeedback("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      website: form.website.trim()
    };

    if (payload.name.length < 2 || payload.message.length < 10) {
      setState("error");
      setFeedback(messages.error);
      return;
    }

    try {
      await sendContactMessage(payload);
      setState("success");
      setFeedback(messages.success);
      setForm(initialForm);
    } catch (error) {
      setState("error");
      setFeedback(error instanceof Error ? error.message : messages.error);
    }
  };

  return {
    feedback,
    form,
    state,
    submit,
    updateField
  };
}
