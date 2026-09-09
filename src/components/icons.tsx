type IconProps = { className?: string };

const base = "h-[18px] w-[18px]";

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className ?? ""}`}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.64h.06c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.76V21h-4v-5.66c0-1.35-.03-3.09-1.98-3.09-1.98 0-2.29 1.47-2.29 3v5.75h-4V9Z" />
    </svg>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className ?? ""}`}>
      <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.53.1.72-.23.72-.5v-1.9c-2.92.62-3.54-1.28-3.54-1.28-.48-1.2-1.17-1.52-1.17-1.52-.95-.64.07-.63.07-.63 1.05.07 1.6 1.06 1.6 1.06.94 1.58 2.46 1.12 3.06.86.1-.68.37-1.13.67-1.39-2.33-.26-4.78-1.15-4.78-5.13 0-1.14.41-2.06 1.07-2.79-.1-.26-.46-1.32.1-2.75 0 0 .88-.28 2.88 1.06a10 10 0 0 1 5.24 0c2-1.34 2.87-1.06 2.87-1.06.57 1.43.21 2.49.11 2.75.67.73 1.07 1.65 1.07 2.79 0 3.99-2.46 4.87-4.8 5.13.38.32.71.96.71 1.94v2.87c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5Z" />
    </svg>
  );
}

export function LeetCodeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className ?? ""}`}>
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.02-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

export function MediumIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className ?? ""}`}>
      <ellipse cx="6.2" cy="12" rx="6.2" ry="6.9" />
      <ellipse cx="16.2" cy="12" rx="3.1" ry="6.5" />
      <ellipse cx="22.4" cy="12" rx="1.3" ry="5.8" />
    </svg>
  );
}

/* Outbound mark. Sized in `em` by the caller rather than from `base`, because
   it has to sit against the cap height of whatever it follows. */
export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M1.6 8.4 8.4 1.6" />
      <path d="M3.1 1.6h5.3v5.3" />
    </svg>
  );
}
