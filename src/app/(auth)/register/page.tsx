// import { RegisterForm } from "@/src/components/auth/RegisterForm";
import { RegisterForm } from "@/src/features/auth/components/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your BuddyScript account.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
