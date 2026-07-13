import { RegisterForm } from "@/app/components/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your BuddyScript account.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
