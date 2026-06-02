"use client";

import type { Message } from "@/types";
import { Eye, Mail, Trash2 } from "lucide-react";

type MessageAdminCardProps = {
  message: Message;
  onDelete: (messageId: string) => void;
  onRead: (messageId: string) => void;
};

export default function MessageAdminCard({
  message,
  onDelete,
  onRead
}: MessageAdminCardProps) {
  return (
    <article className="rounded-[24px] border border-white/[0.10] bg-white/[0.06] p-5 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-electric">
            <Mail size={16} />
            {message.email}
          </div>
          <h3 className="mt-3 text-xl font-black text-white">{message.name}</h3>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-black uppercase ${
            message.status === "new"
              ? "bg-coral text-white"
              : "bg-white/[0.10] text-white/[0.52]"
          }`}
        >
          {message.status}
        </span>
      </div>
      <p className="mt-4 leading-7 text-white/[0.62]">{message.message}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => onRead(message._id)}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-3 text-sm font-bold text-white/[0.70]"
        >
          <Eye size={15} />
          Read
        </button>
        <button
          onClick={() => onDelete(message._id)}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-coral/[0.25] bg-coral/[0.10] px-3 text-sm font-bold text-coral"
        >
          <Trash2 size={15} />
          Delete
        </button>
      </div>
    </article>
  );
}
