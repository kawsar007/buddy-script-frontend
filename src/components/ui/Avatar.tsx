import { cn } from "@/src/lib/utils/cn";

type Size = 'sm' | 'md' | 'lg';

const SIZE_STYLES: Record<Size, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-20 w-20 text-2xl',
};

export interface AvatarProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  size?: Size;
  className?: string;
}

export function Avatar({
  firstName,
  lastName,
  avatarUrl,
  size = 'md',
  className,
}: AvatarProps) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || '?';

  return (
    <span
      className={cn(
        'bg-accent text-accent-foreground inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold',
        SIZE_STYLES[size],
        className,
      )}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`${firstName} ${lastName}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  );
}
