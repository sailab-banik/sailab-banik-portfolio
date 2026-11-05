import type { CSSProperties } from "react";
import { getProjects, type Panel, type Project } from "@/lib/content";
import { Button } from "@/components/button";
import { Chips } from "@/components/chips";
import { SectionHead } from "@/components/section-head";
import { CachePanel } from "@/components/panels/cache-panel";
import { QueuePanel } from "@/components/panels/queue-panel";
import { WeekPanel } from "@/components/panels/week-panel";

export function Projects() {
  const projects = getProjects();

  return (
    <section id="projects" className="relative scroll-mt-14 border-t border-line py-[72px] sm:py-[104px]">
      <span aria-hidden data-reveal className="fx-sweep" />
      <div className="mx-auto max-w-page px-4 sm:px-10">
        <SectionHead name="projects" />
        {projects.map((project) => (
          <Entry key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function Entry({ project }: { project: Project }) {
  const { title, path, summary, stack, links, panel } = project;

  return (
    <article data-reveal className="grid items-start gap-7 border-t border-line py-14 first-of-type:border-t-0 first-of-type:pt-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div style={{ "--d": "0.05s" } as CSSProperties} className="fx-rise">
        <span className="font-mono text-[13px] text-faint">{path}</span>
        <h3 className="mt-1.5 mb-3 text-3xl font-semibold tracking-[-0.025em]">{title}</h3>
        <p className="mb-5 text-muted">{summary}</p>
        <Chips items={stack} className="mb-6" />
        <div className="flex flex-wrap gap-2">
          {links.map(({ label, href, primary }) => (
            <Button key={href} href={href} primary={primary} small>
              {label}
            </Button>
          ))}
        </div>
      </div>
      <div style={{ "--d": "0.2s" } as CSSProperties} className="fx-rise">
        <ProjectPanel panel={panel} />
      </div>
    </article>
  );
}

function ProjectPanel({ panel }: { panel: Panel }) {
  switch (panel.kind) {
    case "cache":
      return <CachePanel panel={panel} />;
    case "week":
      return <WeekPanel panel={panel} />;
    case "queue":
      return <QueuePanel panel={panel} />;
  }
}
