"use client";

import { Avatar } from "@/src/components/ui/Avatar";
import { Button } from "@/src/components/ui/Button";
import { Select } from "@/src/components/ui/Select";
import { useAuth } from "@/src/contexts/AuthContext";
import { getErrorMessage } from "@/src/lib/utils/get-error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Image as ImageIcon,
  PencilLine,
  Send,
  Video,
  X
} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { useCreatePost } from "../hooks/useCreatePost";
import { usePostImageUpload } from "../hooks/usePostImageUpload";
import { postFormSchema, PostFormValues } from "../schemas/post.schema";

export const VISIBILITY_OPTIONS = [
  { value: 'PUBLIC', label: 'Public' },
  { value: 'PRIVATE', label: 'Private' },
];

export function ComposerCard() {
  const { user } = useAuth();
  const { isAuthenticated } = useAuth();
  const { data: currentUser } = useCurrentUser(isAuthenticated);
  const [isFocused, setIsFocused] = useState(false);
  const createPost = useCreatePost();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Same validated shape PostFormModal used to produce: react-hook-form +
  // the shared postFormSchema, so the API contract is unchanged.
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      content: "",
      visibility: "PUBLIC",
    },
  });

  const content = watch("content");

  const { fileInputRef, previewUrl, handleFileChange, clearImage, resetImage } =
    usePostImageUpload(setValue, null);

  const submit = handleSubmit(async (values) => {
    try {
      await createPost.mutateAsync(values);
      toast.success("Posted!");
      reset({ content: "", visibility: "PUBLIC" });
      resetImage(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  });

  const handlePhotoButtonClick = () => {
    fileInputRef.current?.click();
  };

  // if (!currentUser) return null;

  if (!user) {
    return null;
  }

  const contentRegister = register("content");

  return (
    <div className="border-border bg-surface rounded-2xl border p-5 shadow-sm">
      <form onSubmit={submit}>
        <div className="flex items-start gap-3">
          <Avatar
            avatarUrl={user.avatarUrl}
            size="sm"
            firstName=""
            lastName=""
          />

          <div className="relative flex-1">
            <textarea
              {...contentRegister}
              ref={(el) => {
                contentRegister.ref(el);
                textareaRef.current = el;
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={(event) => {
                contentRegister.onBlur(event);
                setIsFocused(false);
              }}
              rows={1}
              className="text-ink max-h-32 min-h-20 w-full resize-none bg-transparent pt-1.5 text-sm focus:outline-none"
            />

            <button
              type="button"
              onClick={() => textareaRef.current?.focus()}
              className={`text-muted pointer-events-none absolute top-2 left-0 flex items-center gap-2 text-md transition-all duration-300 ease-out ${isFocused || content
                ? "-translate-y-2 scale-95 opacity-0"
                : "translate-y-0 scale-100 opacity-100"
                }`}
            >
              <span>Write something…</span>
              <PencilLine className="size-4" />
            </button>

            {errors.content && (
              <p role="alert" className="text-destructive mt-1 text-xs">
                {errors.content.message}
              </p>
            )}
          </div>
        </div>

        {/* Hidden file input driving the inline image upload flow */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="sr-only"
          aria-label="Upload image"
        />

        {/* Inline image preview, shown only after a photo is selected */}
        {previewUrl && (
          <div className="border-border relative mt-3 overflow-hidden rounded-xl border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Selected preview"
              className="max-h-80 w-full object-cover"
            />

            <div className="absolute top-2 right-2 flex items-center gap-2">
              <button
                type="button"
                onClick={handlePhotoButtonClick}
                className="rounded-lg bg-black/60 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-black/75"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={clearImage}
                aria-label="Remove image"
                className="flex size-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/75"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
        {errors.image && (
          <p role="alert" className="text-destructive mt-1 text-xs">
            {errors.image.message}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-1 rounded-xl bg-[#1890FF0D] p-2 sm:gap-2">
          <button
            type="button"
            onClick={handlePhotoButtonClick}
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

          {/* <button
            type="button"
            className="text-muted hover:text-primary hidden cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium sm:flex sm:text-sm"
          >
            <FileText className="size-5" />
            Article
          </button> */}

          <div className="ml-auto sm:ml-2">
            <Select
              variant="pill"
              options={VISIBILITY_OPTIONS}
              error={errors.visibility?.message}
              {...register("visibility")}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-auto cursor-pointer px-5 py-2 text-sm"
            disabled={!content?.trim()}
            isLoading={createPost.isPending}
          >
            <Send className="size-5" aria-hidden="true" />
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}