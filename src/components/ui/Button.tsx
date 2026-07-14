import { cn } from '@/src/lib/utils/cn';
import { Loader2 } from 'lucide-react';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type Size = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Shows a spinner and disables the button, without shifting its layout. */
  isLoading?: boolean;
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90',
  secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
  outline: 'border border-border bg-transparent text-foreground hover:bg-muted',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
  destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
};

const SIZE_STYLES: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-10 w-10',
};

/**
 * Shared with any non-<button> element that needs to *look* like a Button
 * — most commonly next/link's <Link>, which can't be a real <button> since
 * navigation semantics and click-handler semantics don't mix. Using this
 * instead of duplicating the class list keeps both in visual sync for free.
 */
export function buttonVariants(
  variant: Variant = 'primary',
  size: Size = 'md',
  className?: string,
) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        className={buttonVariants(variant, size, className)}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';



// import { cn } from "@/src/lib/utils/cn";
// import { Loader2 } from "lucide-react";
// import { forwardRef, type ButtonHTMLAttributes } from "react";

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: "primary" | "secondary" | "outline";
//   isLoading?: boolean;
// }

// const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
//   primary:
//     "bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary disabled:bg-primary/60",
//   secondary:
//     "bg-primary-light text-primary hover:bg-primary-light/70 focus-visible:outline-primary",
//   outline:
//     "border border-border bg-surface text-ink hover:bg-bg focus-visible:outline-primary",
// };

// export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant = "primary", isLoading, disabled, children, ...props }, ref) => {
//     return (
//       <button
//         ref={ref}
//         disabled={disabled || isLoading}
//         className={cn(
//           "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3",
//           "text-[16px] font-medium transition-colors duration-150",
//           "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
//           "disabled:cursor-not-allowed disabled:opacity-70",
//           variantClasses[variant],
//           className,
//         )}
//         {...props}
//       >
//         {isLoading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
//         {children}
//       </button>
//     );
//   },
// );

// Button.displayName = "Button";
