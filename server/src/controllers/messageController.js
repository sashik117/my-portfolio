import { z } from "zod";
import Message from "../models/Message.js";
import { sendContactEmail } from "../utils/mail.js";

const messageSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(160),
  message: z.string().min(10).max(1800),
  website: z.string().max(200).optional().default("")
});

export async function createMessage(req, res) {
  const parsed = messageSchema.safeParse(req.body);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || "Invalid message.";
    return res.status(400).json({ message: firstError });
  }

  if (parsed.data.website) {
    return res.status(201).json({ message: "Message sent." });
  }

  const { website: _website, ...messagePayload } = parsed.data;
  const message = await Message.create(messagePayload);
  await sendContactEmail(message).catch((error) => {
    console.warn("Contact email was not sent:", error.message);
  });

  res.status(201).json({ message: "Message sent." });
}

export async function getMessages(_req, res) {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
}

export async function markMessageRead(req, res) {
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { status: "read" },
    { new: true }
  );

  if (!message) {
    return res.status(404).json({ message: "Message not found." });
  }

  res.json(message);
}

export async function deleteMessage(req, res) {
  const message = await Message.findByIdAndDelete(req.params.id);

  if (!message) {
    return res.status(404).json({ message: "Message not found." });
  }

  res.json({ message: "Message deleted." });
}
