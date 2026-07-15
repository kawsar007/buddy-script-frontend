import { cn } from '@/src/lib/utils/cn';
import type { LucideIcon } from 'lucide-react';

export function EmptyState({
  icon: Icon,
  title,
  message,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  message?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'border-border flex flex-col items-center gap-2 rounded-xl border border-dashed p-10 text-center',
        className,
      )}
    >
      <Icon className="text-muted-foreground h-8 w-8" aria-hidden="true" />
      <p className="text-foreground font-medium">{title}</p>
      {message && <p className="text-muted-foreground text-sm">{message}</p>}
      {action}
    </div>
  );
}
