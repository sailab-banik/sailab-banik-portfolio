import type { ReactNode } from "react";
import { getSection, type SectionName } from "@/lib/content";

type Props = {
  name: SectionName;
  children: ReactNode;
};

/* Section titles hold in the left margin while their content scrolls past, so
   the heading is still there to read against at the bottom of a long section. */
export function Section({ name, children }: Props) {
  const { title, lead } = getSection(name);

  return (
    <section id={name} className="scroll-mt-20 border-t border-edge">
      <div className="mx-auto w-full max-w-page px-6 py-section md:px-10">
        <div className="md:grid md:grid-cols-12 md:gap-x-12">
          <header className="md:sticky md:top-24 md:col-span-3 md:self-start">
            <h2 className="type-h2 text-h2 text-ink">{title}</h2>
            <p className="mt-3 max-w-[30ch] text-ui text-slate">{lead}</p>
          </header>
          <div className="mt-10 md:col-span-9 md:mt-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
