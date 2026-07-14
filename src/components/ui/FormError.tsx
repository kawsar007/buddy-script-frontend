import { AlertCircle } from "lucide-react";

export function FormError({ message }: { message?: string | null }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="border-danger/20 bg-danger-light text-danger flex items-start gap-2 rounded-xl border px-4 py-3 text-sm"
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
