import { getProfile, getSection } from "@/lib/content";
import { Button } from "@/components/button";

export function Footer() {
  const { name, email, location, links, resume, colophon } = getProfile();
  const { title, lead, path } = getSection("contact");
  const [city] = location.split(",");

  return (
    <footer id="contact" className="scroll-mt-14 border-t border-line pt-[120px] pb-[72px]">
      <div className="mx-auto max-w-page px-4 sm:px-10">
        <span className="font-mono text-[13px] text-faint">{path}</span>
        <h2 className="mt-4 mb-6 max-w-[16ch] text-[40px] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-[64px]">
          {title}
        </h2>
        <p className="mb-7 max-w-[56ch] text-muted">{lead}</p>
        <a
          href={`mailto:${email}`}
          className="border-b border-amber/40 font-mono text-[22px] break-all text-amber transition-colors hover:border-amber"
        >
          {email}
        </a>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <Button href={resume} newTab primary>
            View resume
          </Button>
          <Button href={links.linkedin}>LinkedIn</Button>
          <Button href={links.github}>GitHub</Button>
        </div>

        <div className="mt-24 flex flex-wrap justify-between gap-6 border-t border-line pt-7 font-mono text-[13px] text-faint">
          <span>
            © {new Date().getFullYear()} {name} · {city}
          </span>
          <span>{colophon}</span>
        </div>
      </div>
    </footer>
  );
}
