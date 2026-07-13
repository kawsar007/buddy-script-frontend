"use client";

import { ROUTES } from "@/app/lib/constants/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import { FormError } from "../ui/FormError";
import { Input } from "../ui/Input";
import { PasswordInput } from "../ui/PasswordInput";
import { GoogleSignInButton } from "./GoogleSignInButton";


export function RegisterForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-muted text-md font-normal">Get started</p>
        <h1 className="font-display text-ink mt-1 text-2xl font-medium sm:text-3xl">
          Create your account
        </h1>
      </div>

      <GoogleSignInButton />

      <div className="flex items-center gap-3">
        <span className="bg-border h-px flex-1" />
        <span className="text-muted text-xs font-medium">Or</span>
        <span className="bg-border h-px flex-1" />
      </div>

      <form noValidate className="flex flex-col gap-5">
        <FormError message={submitError} />

        <Input
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Jane Cooper"
        />

        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
        />

        <PasswordInput
          label="Password"
          autoComplete="new-password"
          placeholder="••••••••"
        />

        <PasswordInput
          label="Confirm password"
          autoComplete="new-password"
          placeholder="••••••••"
        />

        <Checkbox
          label="I agree to the Terms & Conditions and Privacy Policy"
        />

        <Button type="submit">
          Create account
        </Button>
      </form>

      <p className="text-muted text-center text-sm">
        Already have an account?{" "}
        <Link href={ROUTES.login} className="text-primary font-medium hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
