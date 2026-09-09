import { getProfile, getSection } from "@/lib/content";
import { SocialLinks } from "@/components/social-links";

export function Footer() {
  const { name, email, location, links, resume } = getProfile();
  const { title, lead } = getSection("contact");

  return (
    <footer id="contact" className="mt-auto border-t border-edge">
      <div className="mx-auto w-full max-w-page px-6 py-section md:px-10">
        {/* The invitation is the heading. A small "Get in touch" label sitting
            above the email would be an eyebrow, so the sentence does both jobs
            and the landmark keeps the plain name for screen readers. */}
        <h2 className="sr-only">{title}</h2>
        <p className="max-w-[42ch] font-serif text-lead text-ink">{lead}</p>

        <a
          href={`mailto:${email}`}
          className="type-h2 mt-6 block text-[clamp(1.5rem,4.2vw,3rem)] leading-tight break-words text-signal decoration-edge decoration-1 underline-offset-[0.14em] hover:underline"
        >
          {email}
        </a>

        <div className="mt-16 flex flex-col gap-6 border-t border-edge pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="-ml-2 flex items-center gap-4">
            <SocialLinks links={links} />
            <a
              href={resume}
              download
              className="text-ui font-medium text-ink underline decoration-edge decoration-1 underline-offset-4 transition-colors hover:decoration-signal"
            >
              Resume
            </a>
          </div>
          <p className="text-meta text-slate">
            {name}, {location}
          </p>
        </div>
      </div>
    </footer>
  );
}
