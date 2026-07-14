import { stories } from "@/src/lib/data/feed.mock";
import { Plus } from "lucide-react";
// import { stories } from "@/lib/data/feed.mock";

export function StoriesRow() {
  return (
    <div className="scroll-column -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
      {stories.map((story) => (
        <button
          key={story.id}
          type="button"
          className={`relative h-40 w-28 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br shadow-sm transition-transform hover:-translate-y-0.5 ${story.gradient}`}
        >
          {story.isOwn && (
            <span className="bg-primary border-surface absolute right-1/2 bottom-9 flex size-7 translate-x-1/2 items-center justify-center rounded-full border-2 text-white">
              <Plus className="size-4" aria-hidden="true" />
            </span>
          )}
          <span className="absolute inset-x-2 bottom-2 truncate text-left text-xs font-semibold text-white">
            {story.name}
          </span>
        </button>
      ))}
    </div>
  );
}
