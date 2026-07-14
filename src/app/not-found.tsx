import Link from "next/link";
import { ROUTES } from "../lib/constants/routes";

export default function NotFound() {
  return (
    <div className="bg-bg flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-display text-primary text-6xl font-extrabold">404</p>
      <h1 className="font-display text-ink text-2xl font-bold">Page not found</h1>
      <p className="text-muted max-w-sm text-sm">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href={ROUTES.login}
        className="bg-primary hover:bg-primary-dark rounded-xl px-6 py-3 text-sm font-semibold text-white"
      >
        Back to login
      </Link>
    </div>
  );
}
