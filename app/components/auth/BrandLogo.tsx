import Image from "next/image";

export function BrandLogo() {
  return (
    <div className="flex items-center justify-center gap-2 h-10 w-40 relative">
      <Image
        src="/images/logo.svg"
        alt="BuddyScript"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
