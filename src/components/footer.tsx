import { getProfile } from "@/lib/content";
import { SocialLinks } from "@/components/social-links";

export function Footer() {
  const { name, email, location, links, resume } = getProfile();

  return (
    <footer id="contact" className="mt-auto border-t border-edge">
      <div className="mx-auto w-full max-w-page px-6 py-section md:px-10">
        <h2 className="type-h2 text-h2 text-ink">Get in touch</h2>
        <a
          href={`mailto:${email}`}
          className="type-h2 mt-6 block text-h3 break-words sm:text-h2 text-signal underline decoration-edge decoration-1 underline-offset-[0.15em] transition-colors hover:decoration-signal"
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
