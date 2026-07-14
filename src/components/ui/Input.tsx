import { cn } from "@/src/lib/utils/cn";
import { forwardRef, useId, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hideLabel?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hideLabel, id, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className={cn("text-ink text-sm font-medium", hideLabel && "sr-only")}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "bg-surface text-ink w-full rounded-xl border px-4 py-3 text-sm",
            "placeholder:text-muted/70",
            "focus:ring-primary/30 transition-colors duration-150 focus:ring-2 focus:outline-none",
            error
              ? "border-danger focus:border-danger"
              : "border-border focus:border-primary",
            className,
          )}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="text-danger text-xs font-medium">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
