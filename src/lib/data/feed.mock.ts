import type {
  EventItem,
  NavItem,
  Person,
  PostContent,
  Recommendation,
  Story,
} from "@/src/types/feed.types";

export const exploreNavItems: NavItem[] = [
  { id: "learning", label: "Learning", badge: "New" },
  { id: "insights", label: "Insights" },
  { id: "find-friends", label: "Find friends" },
  { id: "bookmarks", label: "Bookmarks" },
  { id: "group", label: "Group" },
  { id: "gaming", label: "Gaming", badge: "New" },
  { id: "settings", label: "Settings" },
  { id: "save-post", label: "Save post" },
];

export const stories: Story[] = [
  {
    id: "story-own",
    name: "Your Story",
    isOwn: true,
    gradient: "from-slate-700 to-slate-900",
  },
  { id: "story-1", name: "Amara Chen", gradient: "from-rose-400 to-orange-300" },
  { id: "story-2", name: "Ryan Roslansky", gradient: "from-sky-400 to-indigo-400" },
  { id: "story-3", name: "Priya Nair", gradient: "from-emerald-400 to-teal-500" },
  { id: "story-4", name: "Marcus Webb", gradient: "from-violet-500 to-fuchsia-400" },
];

export const suggestedPeople: Person[] = [
  { id: "sp-1", name: "Steve Jobs", role: "CEO of Apple", image: "/images/f1.png" },
  { id: "sp-2", name: "Ryan Roslansky", role: "CEO of LinkedIn", image: "/images/f2.png" },
  { id: "sp-3", name: "Dylan Field", role: "CEO of Figma", image: "/images/f3.png" },
];

export const upcomingEvents: EventItem[] = [
  { id: "ev-1", title: "Product Design Meetup", date: "Fri, Aug 14", attendees: 128 },
  { id: "ev-2", title: "Frontend Conf 2026", date: "Sat, Sep 5", attendees: 842 },
];

export const recommendations: Recommendation[] = [
  { id: "rec-1", name: "Radovan Novak", role: "Founder & CEO at SkillArena", image: "/images/img11.png" },
  { id: "rec-2", name: "Elena Petrova", role: "Head of Design at Trophy", image: "/images/img10.png" },
];

export const friends: (Person & { lastActive?: string })[] = [
  { id: "f-1", name: "Steve Jobs", role: "CEO of Apple", lastActive: "5 minute ago", image: "/images/people1.png" },
  { id: "f-2", name: "Ryan Roslansky", role: "CEO of LinkedIn", online: true, image: "/images/people2.png" },
  { id: "f-3", name: "Dylan Field", role: "CEO of Figma", online: true, image: "/images/people3.png" },
  { id: "f-4", name: "Priya Nair", role: "CEO of Notion", lastActive: "5 minute ago", image: "/images/img1.png" },
  { id: "f-5", name: "Marcus Webb", role: "CEO of Stripe", online: true, image: "/images/img2.png" },
  { id: "f-6", name: "Amara Chen", role: "CEO of Vercel", online: true, image: "/images/img3.png" },
];

export const posts: PostContent[] = [
  {
    id: "post-1",
    author: { id: "f-4", name: "Priya Nair", role: "Product Designer" },
    timeAgo: "5 minutes ago",
    visibility: "Public",
    text: "Just shipped the new onboarding flow for our health tracking app — three weeks of user testing finally paying off. Early numbers show a 30% drop in first-week churn.",
    image: {
      gradient: "from-slate-700 via-slate-800 to-slate-900",
      caption: "Healthy Tracking App",
    },
    likeCount: 248,
    commentCount: 36,
    shareCount: 12,
    likedByMe: true,
  },
  {
    id: "post-2",
    author: { id: "f-5", name: "Marcus Webb", role: "Engineering Lead" },
    timeAgo: "1 hour ago",
    visibility: "Friends",
    text: "Hot take: the best migrations are the ones nobody notices. Moved 40k records last night with zero downtime. Runbooks and dry-runs really do pay off.",
    likeCount: 96,
    commentCount: 14,
    shareCount: 3,
  },
  {
    id: "post-3",
    author: { id: "f-6", name: "Amara Chen", role: "Marketing Director" },
    timeAgo: "3 hours ago",
    visibility: "Public",
    text: "Our Q3 campaign retro is up. Biggest lesson: shorter feedback loops with the design team cut our revision cycles in half.",
    image: {
      gradient: "from-sky-500 via-blue-500 to-indigo-600",
      caption: "Q3 Campaign Retro",
    },
    likeCount: 152,
    commentCount: 21,
    shareCount: 8,
  },
];

export const notificationCount = 6;
export const messageCount = 2;
