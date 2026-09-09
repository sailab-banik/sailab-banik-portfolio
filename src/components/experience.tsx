import { Section } from "@/components/section";
import { getExperience, type Experience as Entry } from "@/lib/content";
import { Logo, type LogoName } from "@/components/logos";

export function Experience() {
  const history = getExperience();

  return (
    <Section name="experience">
      <ul>
        {history.map((entry) => (
          <Company key={entry.company} entry={entry} />
        ))}
      </ul>
    </Section>
  );
}

function Company({ entry }: { entry: Entry }) {
  const { company, logo, url, location, roles } = entry;

  return (
    <li className="mt-16 first:mt-0">
      <div className="flex items-center gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg border border-edge bg-surface text-ink">
          <Logo name={logo as LogoName} title={company} />
        </span>
        <div>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-h3 font-semibold text-ink underline decoration-edge decoration-1 underline-offset-4 transition-colors hover:decoration-signal"
          >
            {company}
          </a>
          <p className="mt-1 text-meta text-slate">{location}</p>
        </div>
      </div>

      {/* Roles at one employer are a genuine sequence, so they get a timeline. */}
      <ol className="mt-9 ml-7 border-l border-edge pl-9">
        {roles.map((role) => (
          <li
            key={role.title}
            className="relative pb-12 last:pb-0 before:absolute before:top-[0.5em] before:-left-[2.4rem] before:h-[9px] before:w-[9px] before:rounded-full before:border before:border-slate before:bg-paper"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-h3 font-semibold text-ink">{role.title}</h3>
              <p className="text-meta text-slate">{role.period}</p>
            </div>
            <p className="mt-3 max-w-[68ch] font-serif text-body text-ink">{role.summary}</p>
          </li>
        ))}
      </ol>
    </li>
  );
}
