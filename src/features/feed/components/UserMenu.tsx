"use client";

import { Avatar } from "@/src/components/ui/Avatar";
import { useAuth } from "@/src/contexts/AuthContext";
import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  console.log("Logged In User:--->", user);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="hover:bg-bg flex items-center gap-2 rounded-full py-1 pr-2 pl-1 transition-colors"
      >
        {/* <Avatar name={user.name} size="sm" /> */}
        <Avatar avatarUrl={user.avatarUrl} firstName="" lastName="" size="sm" />
        <span className="text-ink hidden text-sm font-semibold sm:inline">
          {user.firstName}
        </span>
        <ChevronDown className="text-muted size-4" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          className="border-border bg-surface absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-2xl border shadow-lg"
        >
          <div className="border-border border-b px-4 py-3">
            <p className="text-ink text-sm font-semibold">{user.firstName} {user.lastName}</p>
            <p className="text-muted truncate text-xs">{user.email}</p>
          </div>
          <button
            type="button"
            role="menuitem"
            className="text-ink hover:bg-bg flex w-full items-center gap-2.5 px-4 py-2.5 text-sm"
          >
            <UserRound className="size-4" aria-hidden="true" />
            View profile
          </button>
          <button
            type="button"
            role="menuitem"
            className="text-ink hover:bg-bg flex w-full items-center gap-2.5 px-4 py-2.5 text-sm"
          >
            <Settings className="size-4" aria-hidden="true" />
            Settings
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => logout()}
            className="text-danger hover:bg-danger-light flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
