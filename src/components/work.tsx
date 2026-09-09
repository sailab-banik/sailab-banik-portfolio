import { Section } from "@/components/section";
import { getProjects, type Project } from "@/lib/content";

export function Work() {
  const projects = getProjects();

  return (
    <Section name="work">
      <ul>
        {projects.map((project) => (
          <Entry key={project.slug} project={project} />
        ))}
      </ul>
    </Section>
  );
}

function Entry({ project }: { project: Project }) {
  const { title, context, summary, stack, outcomes, repo, live } = project;

  return (
    <li className="mt-16 border-t border-edge pt-10 first:mt-0 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h3 className="type-h2 text-h3 max-w-[24ch] text-ink">{title}</h3>
        <p className="text-meta text-slate">{context}</p>
      </div>

      <p className="mt-5 max-w-[68ch] font-serif text-body text-ink">{summary}</p>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-meta text-slate">
        {stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <dl className="mt-9">
        {outcomes.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-baseline gap-x-4 border-t border-edge py-4 last:border-b"
          >
            <dt className="max-w-[42ch] text-ui text-ink">{label}</dt>
            <span aria-hidden className="mb-1.5 min-w-4 flex-1 border-b border-dotted border-edge" />
            <dd className="type-figure text-figure text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      {(repo || live) && (
        <p className="mt-6 flex gap-6 text-ui">
          {repo && <ProjectLink href={repo}>Source</ProjectLink>}
          {live && <ProjectLink href={live}>Live</ProjectLink>}
        </p>
      )}
    </li>
  );
}

function ProjectLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-signal underline decoration-edge decoration-1 underline-offset-4 transition-colors hover:decoration-signal"
    >
      {children}
    </a>
  );
}
