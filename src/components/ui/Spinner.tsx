import { cn } from "@/src/lib/utils/cn";
import { Loader2 } from "lucide-react";

export function Spinner({ className }: { className?: string }) {
  return (
    <Loader2
      className={cn("text-primary size-5 animate-spin", className)}
      aria-hidden="true"
    />
  );
}

export function FullPageSpinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-3">
      <Spinner className="size-8" />
      <p className="text-muted text-sm">{label}</p>
    </div>
  );
}
