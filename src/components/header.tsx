import { getProfile } from "@/lib/content";
import { SocialLinks } from "@/components/social-links";

export function Header() {
  const { name, links, resume } = getProfile();
  const monogram = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          className="text-ui font-semibold tracking-[0.08em] text-ink"
          aria-label={`${name}, back to top`}
        >
          {monogram}
        </a>

        <nav className="flex items-center gap-2 sm:gap-4">
          <SocialLinks links={links} compact />
          <a
            href={resume}
            download
            className="text-ui font-medium text-ink underline decoration-edge decoration-1 underline-offset-4 transition-colors hover:decoration-signal"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
