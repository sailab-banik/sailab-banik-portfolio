import { getSection, getStack } from "@/lib/content";
import { Chips } from "@/components/chips";

export function Toolbox() {
  const { title } = getSection("toolbox");

  return (
    <div data-reveal>
      <h2 className="fx-wipe mb-8 text-3xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[40px]">{title}</h2>
      <dl className="fx-rise grid items-start gap-x-5 gap-y-1.5 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-y-3.5">
        {getStack().map(({ group, items }) => (
          <div key={group} className="contents">
            <dt className="pt-[5px] font-mono text-[13px] text-faint max-sm:not-first:mt-3">{group}</dt>
            <dd>
              <Chips items={items} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
