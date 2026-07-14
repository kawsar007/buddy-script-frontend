"use client";

import { Avatar } from "@/src/components/ui/Avatar";
import { Button } from "@/src/components/ui/Button";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  Calendar,
  FileText,
  Image as ImageIcon,
  PencilLine,
  Send,
  Video,
} from "lucide-react";
import { useRef, useState } from "react";

export function ComposerCard() {
  const { user } = useAuth();

  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!user) {
    return null;
  }

  return (
    <div className="border-border bg-surface rounded-2xl border p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar
          avatarUrl={user.avatarUrl}
          size="sm"
          firstName=""
          lastName=""
        />

        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(event) => setText(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={1}
            className="text-ink max-h-32 min-h-20 w-full resize-none bg-transparent pt-1.5 text-sm focus:outline-none"
          />

          <button
            type="button"
            onClick={() => textareaRef.current?.focus()}
            className={`text-muted absolute top-2 left-0 flex items-center gap-2 text-md transition-all duration-300 ease-out ${isFocused || text
              ? "-translate-y-2 scale-95 opacity-0"
              : "translate-y-0 scale-100 opacity-100"
              }`}
          >

            <span>Write something…</span>
            <PencilLine className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-1 bg-[#1890FF0D] p-2 sm:gap-2">
        <button
          type="button"
          className="text-muted hover:text-primary flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium sm:text-sm"
        >
          <ImageIcon className="size-5" />
          Photo
        </button>

        <button
          type="button"
          className="text-muted hover:text-primary flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium sm:text-sm"
        >
          <Video className="size-5" />
          Video
        </button>

        <button
          type="button"
          className="text-muted hover:text-primary hidden cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium sm:flex sm:text-sm"
        >
          <Calendar className="size-5" />
          Event
        </button>

        <button
          type="button"
          className="text-muted hover:text-primary hidden cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium sm:flex sm:text-sm"
        >
          <FileText className="size-5" />
          Article
        </button>

        <Button
          variant="primary"
          className="ml-auto w-auto cursor-pointer px-5 py-2 text-sm"
          disabled={!text.trim()}
        >
          <Send className="size-5" aria-hidden="true" />
          Post
        </Button>
      </div>
    </div>
  );
}