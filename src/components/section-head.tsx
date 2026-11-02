import type { ReactNode } from "react";
import { getSection, type SectionName } from "@/lib/content";

type Props = {
  name: SectionName;
  aside?: ReactNode;
};

/* The heading on the left, and on the right either the shell command the
   section answers to or the one action it offers. */
export function SectionHead({ name, aside }: Props) {
  const { title, lead, path } = getSection(name);

  return (
    <div className="mb-12 flex flex-wrap items-baseline justify-between gap-6">
      <div>
        <h2 className="text-3xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[40px]">{title}</h2>
        {lead && <p className="mt-3 max-w-[60ch] text-muted">{lead}</p>}
      </div>
      {aside ?? (path && <span className="font-mono text-[13px] text-faint">{path}</span>)}
    </div>
  );
}
