"use client";

import { Avatar } from "@/src/components/ui/Avatar";
import { Button } from "@/src/components/ui/Button";
import { useAuth } from "@/src/contexts/AuthContext";
import { Calendar, FileText, Image as ImageIcon, Send, Video } from "lucide-react";
import { useState } from "react";
// import { Avatar } from "@/components/ui/Avatar";
// import { Button } from "@/components/ui/Button";
// import { useAuth } from "@/hooks/useAuth";

export function ComposerCard() {
  const { user } = useAuth();
  const [text, setText] = useState("");

  return (
    <div className="border-border bg-surface rounded-2xl border p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar size="sm" firstName={""} lastName={""} />
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Write something…"
          rows={1}
          className="text-ink placeholder:text-muted max-h-32 min-h-[24px] flex-1 resize-none bg-transparent pt-1.5 text-sm focus:outline-none"
        />
      </div>

      <div className="bg-bg mt-4 flex flex-wrap items-center gap-1 rounded-xl p-2 sm:gap-2">
        <button
          type="button"
          className="text-muted hover:text-ink hover:bg-surface flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium sm:text-sm"
        >
          <ImageIcon className="size-4 text-emerald-500" /> Photo
        </button>
        <button
          type="button"
          className="text-muted hover:text-ink hover:bg-surface flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium sm:text-sm"
        >
          <Video className="size-4 text-rose-500" /> Video
        </button>
        <button
          type="button"
          className="text-muted hover:text-ink hover:bg-surface hidden items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium sm:flex sm:text-sm"
        >
          <Calendar className="size-4 text-amber-500" /> Event
        </button>
        <button
          type="button"
          className="text-muted hover:text-ink hover:bg-surface hidden items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium sm:flex sm:text-sm"
        >
          <FileText className="size-4 text-sky-500" /> Article
        </button>

        <Button
          variant="primary"
          className="ml-auto w-auto px-5 py-2 text-sm"
          disabled={!text.trim()}
        >
          <Send className="size-4" aria-hidden="true" />
          Post
        </Button>
      </div>
    </div>
  );
}
