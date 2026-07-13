import { cn } from "@/app/lib/utils/cn";
import { forwardRef, useId, type InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div>
        <label htmlFor={inputId} className="flex cursor-pointer items-center gap-2">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={cn(
              "border-border text-primary accent-primary size-4 rounded",
              "focus:ring-primary/30 focus:ring-2",
              className,
            )}
            {...props}
          />
          <span className="text-ink text-sm select-none">{label}</span>
        </label>
        {error && (
          <p role="alert" className="text-danger mt-1 text-xs font-medium">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
