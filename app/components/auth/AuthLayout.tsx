import Image from "next/image";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * Purely presentational shell — no data fetching, no client state — so it
 * can be statically generated at build time (SSG) and reused by both the
 * login and register routes.
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F0F2F5]">
      <Image
        src="/images/shape1.svg"
        alt=""
        aria-hidden="true"
        width={176}
        height={540}
        className="pointer-events-none absolute top-0 left-0 hidden h-auto w-auto select-none md:block"
      />
      <Image
        src="/images/shape2.svg"
        alt=""
        aria-hidden="true"
        width={568}
        height={400}
        className="pointer-events-none absolute top-0 right-0 hidden h-auto w-auto select-none md:block"
      />
      <Image
        src="/images/shape3.svg"
        alt=""
        aria-hidden="true"
        width={568}
        height={548}
        style={{ right: "350px" }}
        className="pointer-events-none absolute bottom-0 hidden h-auto w-auto select-none md:block"
      />

      {/* Main two-column layout */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="flex w-full max-w-6xl items-center justify-center gap-12 lg:gap-20">
          <div className="hidden flex-1 items-center justify-center md:flex">
            <Image
              src="/images/login.png"
              alt="Illustration of a person sending a message"
              width={1269}
              height={1240}
              priority
              className="h-auto w-full max-w-md object-contain"
            />
          </div>

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-[0_20px_60px_-15px_rgba(22,33,58,0.15)] sm:p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
