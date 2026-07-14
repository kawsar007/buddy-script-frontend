"use client";

import { Avatar } from "@/src/components/ui/Avatar";
import { Button } from "@/src/components/ui/Button";
import { friends, recommendations } from "@/src/lib/data/feed.mock";
import { Search } from "lucide-react";
import { useState } from "react";

export function RightSidebar() {
  const [query, setQuery] = useState("");
  const [ignored, setIgnored] = useState<string[]>([]);

  const visibleRecommendations = recommendations.filter((r) => !ignored.includes(r.id));
  const filteredFriends = friends.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-4">
      {visibleRecommendations.length > 0 && (
        <section className="border-border bg-surface rounded-2xl border p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-ink text-base font-bold">You Might Like</h2>
            <button
              type="button"
              className="text-primary text-xs font-semibold hover:underline"
            >
              See All
            </button>
          </div>
          {visibleRecommendations.slice(0, 1).map((rec) => (
            <div key={rec.id} className="flex flex-col items-center gap-2 text-center">
              {/* <Avatar name={rec.name} size="lg" /> */}
              <Avatar avatarUrl={rec?.image} firstName="" lastName="" size="lg" />
              <div>
                <p className="text-ink text-sm font-semibold">{rec.name}</p>
                <p className="text-muted text-xs">{rec.role}</p>
              </div>
              <div className="mt-2 flex w-full gap-2">
                <Button
                  variant="outline"
                  className="w-auto flex-1 px-3 py-2 text-xs"
                  onClick={() => setIgnored((prev) => [...prev, rec.id])}
                >
                  Ignore
                </Button>
                <Button variant="primary" className="w-auto flex-1 px-3 py-2 text-xs">
                  Follow
                </Button>
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="border-border bg-surface flex-1 rounded-2xl border p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-ink text-base font-bold">Your Friends</h2>
          <button
            type="button"
            className="text-primary text-xs font-semibold hover:underline"
          >
            See All
          </button>
        </div>

        <div className="relative mb-3">
          <Search
            className="text-muted absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Input search text"
            className="bg-bg text-ink placeholder:text-muted focus:ring-primary/30 w-full rounded-full py-2.5 pr-4 pl-10 text-sm focus:ring-2 focus:outline-none"
          />
        </div>

        <ul className="flex flex-col gap-3">
          {filteredFriends.map((friend) => (
            <li key={friend.id} className="flex items-center gap-3">
              <Avatar avatarUrl={friend?.image} firstName="" lastName="" size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-ink truncate text-sm font-semibold">{friend.name}</p>
                <p className="text-muted truncate text-xs">{friend.role}</p>
              </div>
              {friend.lastActive && (
                <span className="text-muted shrink-0 text-[11px]">
                  {friend.lastActive}
                </span>
              )}

              {friend.online && (
                <span className="h-2 w-2 rounded-full bg-green-500 ring-2 ring-green-200" />
              )}
            </li>
          ))}
          {filteredFriends.length === 0 && (
            <li className="text-muted py-4 text-center text-sm">
              No friends match &quot;{query}&quot;
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
