import type { WeekPanel as Data } from "@/lib/content";
import { FactGrid } from "@/components/panels/fact-grid";
import { PanelFrame } from "@/components/panels/panel-frame";

export function WeekPanel({ panel }: { panel: Data }) {
  const { caption, tag, max, days, legend, report, facts } = panel;
  const summary = days
    .map((d) => `${d.day} ${d.execution} h ${legend.execution}, ${d.preparation} h ${legend.preparation}`)
    .join("; ");

  return (
    <PanelFrame caption={caption} tag={tag}>
      <div role="img" aria-label={summary} className="grid h-[170px] grid-cols-7 items-end gap-2.5 font-mono">
        {days.map(({ day, execution, preparation }) => (
          <div key={day} className="flex h-full flex-col justify-end gap-[3px]">
            <div className="rounded-xs bg-dusk" style={{ height: `${(preparation / max) * 100}%` }} />
            <div className="rounded-t-[4px] rounded-b-xs bg-amber" style={{ height: `${(execution / max) * 100}%` }} />
            <span className="mt-1.5 text-center text-[11px] text-faint">{day}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-[18px] text-xs text-muted">
        <span>
          <i className="mr-1.5 inline-block h-2.5 w-2.5 rounded-[3px] bg-amber align-[-1px]" />
          {legend.execution}
        </span>
        <span>
          <i className="mr-1.5 inline-block h-2.5 w-2.5 rounded-[3px] bg-dusk align-[-1px]" />
          {legend.preparation}
        </span>
      </div>

      <p className="mt-[18px] rounded-[10px] border border-line bg-canvas px-4 py-3.5 text-sm text-muted">
        <b className="font-medium text-fg">{report.title}</b> {report.body}
      </p>

      <FactGrid facts={facts} />
    </PanelFrame>
  );
}
