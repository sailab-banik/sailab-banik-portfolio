import { getProjects, type Project } from "@/lib/content";

export function Work() {
  const projects = getProjects();

  return (
    <section id="work" className="border-t border-edge">
      <div className="mx-auto w-full max-w-page px-6 py-section md:px-10">
        <h2 className="type-h2 text-h2 text-ink">Work</h2>
        <ul className="mt-12">
          {projects.map((project) => (
            <Entry key={project.slug} project={project} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Entry({ project }: { project: Project }) {
  const { title, context, summary, stack, outcomes, repo, live } = project;

  return (
    <li className="border-t border-edge py-10 first:border-t-0 first:pt-0 md:grid md:grid-cols-12 md:gap-10">
      <div className="md:col-span-4">
        <h3 className="text-h3 font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-meta text-slate">{context}</p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-meta text-slate">
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-7 md:col-span-7 md:col-start-6 md:mt-0">
        <p className="max-w-[68ch] font-serif text-body text-ink">{summary}</p>
        <ul className="mt-7">
          {outcomes.map((outcome) => (
            <li key={outcome} className="border-t border-edge py-2.5 text-ui text-ink">
              {outcome}
            </li>
          ))}
        </ul>
        {(repo || live) && (
          <p className="mt-6 flex gap-6 text-ui">
            {repo && <ProjectLink href={repo}>Source</ProjectLink>}
            {live && <ProjectLink href={live}>Live</ProjectLink>}
          </p>
        )}
      </div>
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
