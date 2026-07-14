"use client";

import { Avatar } from "@/src/components/ui/Avatar";
import { cn } from "@/src/lib/utils/cn";
import { PostContent } from "@/src/types/feed.types";
import {
  Globe2,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
  Users,
} from "lucide-react";
import { useState } from "react";

export function PostCard({ post }: { post: PostContent }) {
  const [liked, setLiked] = useState(Boolean(post.likedByMe));
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <article className="border-border bg-surface rounded-2xl border p-5 shadow-sm">
      <div className="flex items-start gap-3">
        {/* <Avatar name={post.author.name} size="sm" /> */}
        <Avatar firstName="" lastName="" size="sm" />
        <div className="min-w-0 flex-1">
          <p className="text-ink truncate text-sm font-semibold">{post.author.name}</p>
          <div className="text-muted flex items-center gap-1 text-xs">
            <span>{post.timeAgo}</span>
            <span aria-hidden="true">·</span>
            {post.visibility === "Public" ? (
              <Globe2 className="size-3" aria-label="Public" />
            ) : (
              <Users className="size-3" aria-label={post.visibility} />
            )}
            <span>{post.visibility}</span>
          </div>
        </div>
        <button
          type="button"
          aria-label="More options"
          className="text-muted hover:text-ink hover:bg-bg -mt-1 -mr-1 inline-flex size-8 shrink-0 items-center justify-center rounded-lg"
        >
          <MoreHorizontal className="size-4" aria-hidden="true" />
        </button>
      </div>

      <p className="text-ink mt-3 text-sm leading-relaxed">{post.text}</p>

      {post.image && (
        <div
          className={cn(
            "relative mt-4 flex h-56 items-end overflow-hidden rounded-xl bg-gradient-to-br sm:h-72",
            post.image.gradient,
          )}
        >
          <span className="m-4 rounded-lg bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            {post.image.caption}
          </span>
        </div>
      )}

      <div className="border-border text-muted mt-4 flex items-center gap-1 border-t pt-3 text-sm">
        <button
          type="button"
          onClick={toggleLike}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 font-medium transition-colors",
            liked ? "text-danger" : "hover:bg-bg hover:text-ink",
          )}
        >
          <Heart
            className="size-4"
            fill={liked ? "currentColor" : "none"}
            aria-hidden="true"
          />
          {likeCount}
        </button>
        <button
          type="button"
          className="hover:bg-bg hover:text-ink flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 font-medium transition-colors"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          {post.commentCount}
        </button>
        <button
          type="button"
          className="hover:bg-bg hover:text-ink flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 font-medium transition-colors"
        >
          <Share2 className="size-4" aria-hidden="true" />
          {post.shareCount}
        </button>
      </div>
    </article>
  );
}
