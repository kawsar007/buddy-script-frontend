import { cn } from '@/src/lib/utils/cn';
import { ChevronDown } from 'lucide-react';
import { forwardRef, useId, type SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  /**
   * Visual style of the control.
   * - "default": standard bordered form field (unchanged, used everywhere today).
   * - "pill": compact, borderless chip that matches inline toolbar actions
   *   (e.g. the Composer Card's Photo / Video / Event buttons).
   */
  variant?: 'default' | 'pill';
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, required, variant = 'default', ...props }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const errorId = `${selectId}-error`;
    const isPill = variant === 'pill';

    return (
      <div className={cn('flex flex-col gap-1.5', isPill && 'gap-0')}>
        {label && (
          <label htmlFor={selectId} className="text-foreground text-sm font-medium">
            {label}
            {required && (
              <span className="text-destructive ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className={cn('group relative', isPill && 'inline-flex')}>
          <select
            ref={ref}
            id={selectId}
            required={required}
            aria-invalid={!!error || undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              isPill
                ? cn(
                  'text-muted h-8 w-auto max-w-37.5 cursor-pointer appearance-none truncate',
                  'rounded-full border border-transparent bg-transparent py-1.5 pr-7 pl-3 text-xs font-medium sm:text-sm',
                  'transition-colors duration-150 ease-out',
                  'hover:bg-primary/10 hover:text-primary',
                  'focus-visible:ring-ring focus-visible:bg-primary/10 focus-visible:text-primary focus-visible:ring-2 focus-visible:outline-none',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                  error && 'text-destructive',
                )
                : cn(
                  'border-input bg-background text-foreground h-10 w-full appearance-none rounded-lg border px-3 pr-9 text-sm',
                  'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                  error && 'border-destructive focus-visible:ring-destructive',
                ),
              className,
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className={cn(
              'pointer-events-none absolute top-1/2 -translate-y-1/2',
              isPill
                ? 'text-muted group-hover:text-primary right-2 size-3.5 transition-colors duration-150'
                : 'text-muted-foreground right-3 h-4 w-4',
            )}
            aria-hidden="true"
          />
        </div>
        {error && (
          <p id={errorId} role="alert" className="text-destructive text-sm">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';