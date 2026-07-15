"use client";

import { Avatar } from "@/src/components/ui/Avatar";
import { Button } from "@/src/components/ui/Button";
import { useAuth } from "@/src/contexts/AuthContext";
import { getErrorMessage } from "@/src/lib/utils/get-error-message";
import {
  Calendar,
  FileText,
  Image as ImageIcon,
  PencilLine,
  Send,
  Video,
} from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { useCreatePost } from "../hooks/useCreatePost";
import { PostFormValues } from "../schemas/post.schema";
import { PostFormModal } from "./PostFormModal";

export function ComposerCard() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { data: currentUser } = useCurrentUser(isAuthenticated);
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const createPost = useCreatePost();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (values: PostFormValues) => {
    try {
      await createPost.mutateAsync(values);
      toast.success('Posted!');
      setIsModalOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // if (!currentUser) return null;

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
            onClick={() => setIsModalOpen(true)}
            className={`text-muted absolute top-2 left-0 flex items-center gap-2 text-md transition-all duration-300 ease-out ${isFocused || text
              ? "-translate-y-2 scale-95 opacity-0"
              : "translate-y-0 scale-100 opacity-100"
              }`}
          >

            <span onClick={() => textareaRef.current?.focus()} >Write something…</span>
            <PencilLine className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-1 bg-[#1890FF0D] p-2 sm:gap-2">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
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
      <PostFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isSubmitting={createPost.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
}