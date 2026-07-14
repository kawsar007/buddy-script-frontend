"use client";

import { ROUTES } from "@/src/lib/constants/routes";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import { FormError } from "../ui/FormError";
import { Input } from "../ui/Input";
import { PasswordInput } from "../ui/PasswordInput";
import { GoogleSignInButton } from "./GoogleSignInButton";


export function LoginForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-muted text-md font-normal">Welcome back</p>
        <h1 className="font-display text-ink mt-1 text-2xl font-medium sm:text-3xl">
          Login to your account
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
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
        />

        <PasswordInput
          label="Password"
          autoComplete="current-password"
          placeholder="••••••••"
        />

        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" />
          <Link href="#" className="text-primary text-sm font-medium hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="cursor-pointer">
          Login now
        </Button>
      </form>

      <p className="text-muted text-center text-sm">
        Dont have an account?{" "}
        <Link href={ROUTES.register} className="text-primary font-medium hover:underline">
          Create New Account
        </Link>
      </p>
    </div>
  );
}
