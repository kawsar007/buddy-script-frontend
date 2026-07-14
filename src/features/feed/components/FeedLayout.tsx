"use client";
import { useAuth } from "@/src/contexts/AuthContext";
import { posts } from "@/src/lib/data/feed.mock";
import { X } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "../../auth/components/BrandLogo";
import { AppHeader } from "./AppHeader";
import { ComposerCard } from "./ComposerCard";
import { LeftSidebar } from "./LeftSidebar";
import { PostCard } from "./PostCard";
import { RightSidebar } from "./RightSidebar";
import { StoriesRow } from "./StoriesRow";

export function FeedLayout() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="bg-bg flex h-screen flex-col overflow-hidden">
      <AppHeader onMenuClick={() => setIsDrawerOpen(true)} />

      <div className="mx-auto flex w-full max-w-[1320px] flex-1 gap-5 overflow-hidden px-2 py-5 sm:px-6">
        {/* Left sidebar — tablet & desktop, scrolls independently */}
        <aside className="scroll-column hidden w-72 shrink-0 overflow-y-auto md:block">
          <LeftSidebar />
        </aside>

        {/* Middle feed — scrolls independently */}
        <main className="scroll-column min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-2xl flex-col gap-4 pb-8">
            <StoriesRow />
            <ComposerCard />
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </main>

        {/* Right sidebar — desktop only, scrolls independently */}
        <aside className="scroll-column hidden w-80 shrink-0 overflow-y-auto xl:block">
          <RightSidebar />
        </aside>
      </div>

      {/* Mobile navigation drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="bg-bg border-border scroll-column absolute inset-y-0 left-0 w-[85%] max-w-xs overflow-y-auto border-r p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <BrandLogo />
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close navigation menu"
                className="text-muted hover:text-ink hover:bg-surface inline-flex size-9 items-center justify-center rounded-full"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <LeftSidebar />
          </div>
        </div>
      )}
    </div>
  );
}
