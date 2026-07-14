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
// import { Avatar } from "@/components/ui/Avatar";
// import { exploreNavItems, suggestedPeople, upcomingEvents } from "@/lib/data/feed.mock";

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
            <li key={person.id} className="flex items-center gap-3">
              <Avatar avatarUrl={person.image} firstName="" lastName="" size="sm" />
              {/* <Image src={person.image} alt={person.name} height="10" width="10" /> */}
              <div className="min-w-0 flex-1">
                <p className="text-ink truncate text-sm font-semibold">{person.name}</p>

                <p className="text-muted truncate text-xs">{person.role}</p>
              </div>
              <button
                type="button"
                className="border-border text-ink hover:bg-bg shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors"
              >
                Connect
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-border bg-surface rounded-2xl border p-5 shadow-sm">
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
      </section>
    </div>
  );
}
