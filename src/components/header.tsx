import { getNav, getProfile } from "@/lib/content";
import { Button } from "@/components/button";
import { DownloadIcon } from "@/components/icons";
import { SectionTabs } from "@/components/section-tabs";

export function Header() {
  const { name, domain, resume } = getProfile();
  const monogram = name
    .split(" ")
    .map((part) => part[0].toLowerCase())
    .join("");
  const [host, tld] = domain.split(".");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/92 backdrop-blur-sm backdrop-saturate-[1.2]">
      <div className="mx-auto flex h-14 max-w-page items-stretch justify-between gap-6 px-4 sm:px-10">
        <a href="#top" aria-label={`${name}, home`} className="flex items-center gap-2.5 font-semibold tracking-[-0.01em] text-fg">
          <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-amber font-mono text-xs font-semibold text-canvas">
            {monogram}
          </span>
          <span>
            {host}
            <span className="text-faint">.{tld}</span>
          </span>
        </a>

        <SectionTabs items={getNav()} />

        <div className="flex items-center">
          <Button href={resume} newTab primary small label="Resume PDF">
            <DownloadIcon />
            <span className="max-sm:hidden">Resume PDF</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
