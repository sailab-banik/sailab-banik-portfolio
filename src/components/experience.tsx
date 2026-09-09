import { getExperience, type Experience as Entry } from "@/lib/content";
import { Logo, type LogoName } from "@/components/logos";

export function Experience() {
  const history = getExperience();

  return (
    <section id="experience" className="border-t border-edge">
      <div className="mx-auto w-full max-w-page px-6 py-section md:px-10">
        <h2 className="type-h2 text-h2 text-ink">Experience</h2>
        <ul className="mt-12">
          {history.map((entry) => (
            <Company key={entry.company} entry={entry} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Company({ entry }: { entry: Entry }) {
  const { company, logo, url, location, roles } = entry;

  return (
    <li className="border-t border-edge py-10 first:border-t-0 first:pt-0 md:grid md:grid-cols-12 md:gap-10">
      <div className="md:col-span-4">
        <span className="block text-ink">
          <Logo name={logo as LogoName} title={company} />
        </span>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-h3 font-semibold text-ink underline decoration-edge decoration-1 underline-offset-4 transition-colors hover:decoration-signal"
        >
          {company}
        </a>
        <p className="mt-2 text-meta text-slate">{location}</p>
      </div>

      <ul className="mt-7 md:col-span-7 md:col-start-6 md:mt-0">
        {roles.map((role) => (
          <li key={role.title} className="mt-8 first:mt-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-h3 font-semibold text-ink">{role.title}</h3>
              <p className="text-meta text-slate">{role.period}</p>
            </div>
            <p className="mt-3 max-w-[68ch] font-serif text-body text-ink">{role.summary}</p>
          </li>
        ))}
      </ul>
    </li>
  );
}
