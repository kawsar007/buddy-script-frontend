import { LoginForm } from "@/src/components/auth/LoginForm";
import { FullPageSpinner } from "@/src/components/ui/Spinner";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your BuddyScript account.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<FullPageSpinner label="Loading login…" />}>
      <LoginForm />
    </Suspense>
  );
}
