type ClassValue = string | number | null | boolean | undefined;

/**
 * Minimal className combiner (avoids pulling in clsx/tailwind-merge for a
 * single utility). Falsy values are dropped, duplicates are left as-is.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
