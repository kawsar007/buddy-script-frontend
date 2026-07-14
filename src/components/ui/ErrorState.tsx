import { cn } from '@/src/lib/utils/cn';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  className,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        'border-border bg-card flex flex-col items-center gap-3 rounded-xl border p-8 text-center',
        className,
      )}
    >
      <AlertTriangle className="text-destructive h-8 w-8" aria-hidden="true" />
      <div className="flex flex-col gap-1">
        <p className="text-foreground font-medium">{title}</p>
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
