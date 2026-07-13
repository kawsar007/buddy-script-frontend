import type { ReactNode } from "react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { BrandLogo } from "../components/auth/BrandLogo";

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
