"use client";

import { stories } from "@/src/lib/data/feed.mock";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function StoriesRow() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const updateButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 5);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    updateButtons();

    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "right" ? 280 : -280,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-primary p-1 shadow-lg border border-white"
        >
          <ChevronLeft className="size-4" color="white" />
        </button>
      )}

      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-primary p-1 shadow-lg border border-white"
        >
          <ChevronRight className="size-4" color="white" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-1 pb-1"
      >
        {stories.map((story) => (
          <button
            key={story.id}
            className="group relative h-40 w-28 shrink-0 overflow-hidden rounded-2xl cursor-pointer"
          >
            <Image
              src={story.image ?? ""}
              alt={story.name}
              fill
              className="object-cover transition-transform scale-105"
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-colors duration-300 group-hover:bg-black/35"
            />

            {story.isOwn && (
              <span className="bg-primary border-surface absolute bottom-9 left-1/2 flex size-7 -translate-x-1/2 items-center justify-center rounded-full border-2 text-white">
                <Plus className="size-4" />
              </span>
            )}

            <span className="absolute inset-x-2 bottom-2 truncate text-xs font-semibold text-white">
              {story.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
