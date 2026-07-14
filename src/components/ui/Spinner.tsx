import { cn } from '@/src/lib/utils/cn';
import { Loader2 } from 'lucide-react';

const SIZES = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
} as const;

export function Spinner({
  size = 'md',
  className,
  label = 'Loading…',
}: {
  size?: keyof typeof SIZES;
  className?: string;
  label?: string;
}) {
  return (
    <span role="status" className="inline-flex items-center gap-2">
      <Loader2
        className={cn('text-muted-foreground animate-spin', SIZES[size], className)}
      />
      <span className="sr-only">{label}</span>
    </span>
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

