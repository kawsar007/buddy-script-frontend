"use client";

import { CountBadge } from "@/src/components/ui/Badge";
import { messageCount, notificationCount } from "@/src/lib/data/feed.mock";
import {
  Bell,
  Home,
  Menu,
  MessageCircle,
  Search,
  Users,
} from "lucide-react";
import { BrandLogo } from "../../auth/components/BrandLogo";
import { UserMenu } from "./UserMenu";

interface AppHeaderProps {
  onMenuClick: () => void;
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  return (
    <header className="border-border bg-surface sticky top-0 z-40 w-full border-b">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center gap-3 px-4 sm:gap-4 sm:px-6">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="text-ink hover:bg-bg -ml-1 inline-flex size-9 items-center justify-center rounded-lg transition-colors md:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>

        {/* Logo */}
        <div className="shrink-0">
          <BrandLogo />
        </div>

        {/* Search */}
        <div className="relative mx-auto hidden max-w-md flex-1 md:block">
          <Search
            className="text-muted absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
            aria-hidden="true"
          />

          <input
            type="search"
            placeholder="Input search text"
            className="bg-bg text-ink placeholder:text-muted focus:ring-primary/30 w-full rounded-full py-2.5 pr-4 pl-10 text-sm transition-all focus:ring-2 focus:outline-none"
          />
        </div>

        {/* Navigation */}
        <nav className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Home"
            aria-current="page"
            className="text-primary relative inline-flex size-10 items-center justify-center rounded-lg transition-colors after:absolute after:-bottom-[18px] after:h-0.5 after:w-8 after:rounded-full after:bg-current"
          >
            <Home className="size-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Friends"
            className="text-muted hover:text-ink hover:bg-bg hidden size-10 items-center justify-center rounded-lg transition-colors sm:inline-flex"
          >
            <Users className="size-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label={`Notifications, ${notificationCount} unread`}
            className="text-muted hover:text-ink hover:bg-bg relative inline-flex size-10 items-center justify-center rounded-lg transition-colors"
          >
            <Bell className="size-5" aria-hidden="true" />
            <CountBadge count={notificationCount} />
          </button>

          <button
            type="button"
            aria-label={`Messages, ${messageCount} unread`}
            className="text-muted hover:text-ink hover:bg-bg relative hidden size-10 items-center justify-center rounded-lg transition-colors sm:inline-flex"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            <CountBadge count={messageCount} />
          </button>

          {/* ThemeToggle */}
          {/* <ThemeToggle className="ml-1" /> */}

          {/* User Menu */}
          <UserMenu />
        </nav>
      </div>
    </header>
  );
}
