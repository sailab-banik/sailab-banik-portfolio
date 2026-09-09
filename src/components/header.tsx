import { getProfile } from "@/lib/content";
import { SocialLinks } from "@/components/social-links";

export function Header() {
  const { name, links, resume } = getProfile();
  const monogram = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-paper/85 backdrop-blur-md">
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
            className="flex h-9 items-center rounded-full border border-edge px-4 text-ui font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
