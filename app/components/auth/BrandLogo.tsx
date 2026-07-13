export function BrandLogo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <rect width="30" height="30" rx="9" fill="var(--color-primary)" />
        <path
          d="M9 8h8a4 4 0 0 1 0 8H9V8Zm0 8h9a4 4 0 0 1 0 8H9v-8Z"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="font-display text-ink text-xl font-extrabold">
        Buddy<span className="text-primary">Script</span>
      </span>
    </div>
  );
}
