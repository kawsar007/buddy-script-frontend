import { Avatar } from "@/src/components/ui/Avatar";
import { exploreNavItems, suggestedPeople, upcomingEvents } from "@/src/lib/data/feed.mock";
import {
  BarChart3,
  Bookmark,
  Gamepad2,
  Save,
  Settings,
  UserPlus,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  learning: Video,
  insights: BarChart3,
  "find-friends": UserPlus,
  bookmarks: Bookmark,
  group: Users,
  gaming: Gamepad2,
  settings: Settings,
  "save-post": Save,
};

export function LeftSidebar() {
  return (
    <div className="flex flex-col gap-4">
      <section className="border-border bg-surface rounded-2xl border p-5 shadow-sm">
        <h2 className="text-ink mb-3 text-base font-bold">Explore</h2>
        <ul className="flex flex-col gap-1">
          {exploreNavItems.map((item) => {
            const Icon = iconMap[item.id] ?? Bookmark;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="text-muted hover:bg-bg hover:text-ink flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-medium transition-colors"
                >
                  <Icon className="size-[18px]" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="bg-success rounded-full px-2 py-0.5 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-border bg-surface rounded-2xl border p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-ink text-base font-bold">Suggested People</h2>
          <button
            type="button"
            className="text-primary text-xs font-semibold hover:underline"
          >
            See All
          </button>
        </div>
        <ul className="flex flex-col gap-3">
          {suggestedPeople.map((person) => (
            <li key={person.id} className="flex items-center gap-3 p-2">
              <Avatar avatarUrl={person.image} firstName="" lastName="" size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-ink truncate text-sm font-normal">{person.name}</p>

                <p className="text-muted truncate text-xs">{person.role}</p>
              </div>
              <button
                type="button"
                className="border-border text-muted hover:bg-primary hover:text-white shrink-0 rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer"
              >
                Connect
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* <section className="border-border bg-surface rounded-2xl border p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-ink text-base font-bold">Events</h2>
          <button
            type="button"
            className="text-primary text-xs font-semibold hover:underline"
          >
            See all
          </button>
        </div>
        <ul className="flex flex-col gap-3">
          {upcomingEvents.map((event) => (
            <li key={event.id} className="flex items-start gap-3">
              <div className="bg-primary-light text-primary flex size-10 shrink-0 flex-col items-center justify-center rounded-xl text-[10px] font-bold">
                {event.date.split(" ")[1]}
              </div>
              <div className="min-w-0">
                <p className="text-ink truncate text-sm font-semibold">{event.title}</p>
                <p className="text-muted text-xs">
                  {event.date} · {event.attendees} going
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section> */}
      <section className="border-border bg-surface rounded-2xl border p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-ink text-xl font-bold">Events</h2>

          <button
            type="button"
            className="text-primary text-sm font-semibold hover:underline"
          >
            See all
          </button>
        </div>

        <ul className="space-y-5">
          {upcomingEvents.map((event) => {
            const [, month, day] = event.date.replace(",", "").split(" ");

            return (
              <li
                key={event.id}
                className="border-border overflow-hidden rounded-md border bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Cover */}
                <div className="relative h-44 w-full">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 320px"
                  />
                </div>

                {/* Body */}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Date */}
                    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md bg-emerald-500 text-white">
                      <span className="text-lg font-bold leading-none">
                        {day}
                      </span>

                      <span className="text-xs font-semibold uppercase">
                        {month}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-ink line-clamp-2 text-md font-medium leading-snug">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-border mt-5 flex items-center justify-between border-t pt-4">
                    <p className="text-muted text-sm">
                      {event.attendees.toLocaleString()} People Going
                    </p>

                    <button
                      type="button"
                      className="border-primary text-primary hover:bg-primary rounded-sm border px-3 py-1 text-sm font-normal transition-colors hover:text-white cursor-pointer"
                    >
                      Going
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
