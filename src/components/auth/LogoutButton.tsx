"use client";

import { cn } from "@/src/lib/utils/cn";
import { LogOut } from "lucide-react";
import { useState } from "react";

export function LogoutButton({ className }: { className?: string }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setIsLoggingOut(false);
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={cn(
        "border-border bg-surface inline-flex items-center gap-2 rounded-xl border px-4 py-2.5",
        "text-ink hover:bg-bg text-sm font-semibold transition-colors disabled:opacity-60",
        className,
      )}
    >
      <LogOut className="size-4" aria-hidden="true" />
      {isLoggingOut ? "Logging out…" : "Log out"}
    </button>
  );
}
