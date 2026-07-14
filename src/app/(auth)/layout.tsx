import { AuthLayout } from "@/src/features/auth/components/AuthLayout";
import { BrandLogo } from "@/src/features/auth/components/BrandLogo";
import type { ReactNode } from "react";

export default function AuthRouteLayout({ children }: { children: ReactNode }) {
  return (
    <AuthLayout>
      <div className="mb-6 flex items-center justify-center">
        <BrandLogo />
      </div>
      {children}
    </AuthLayout>
  );
}
