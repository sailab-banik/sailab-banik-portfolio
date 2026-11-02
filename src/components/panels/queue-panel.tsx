import { Fragment, type CSSProperties } from "react";
import type { JobTone, QueuePanel as Data } from "@/lib/content";
import { PanelFrame } from "@/components/panels/panel-frame";

const TONES: Record<JobTone, string> = {
  queued: "text-blue",
  running: "text-amber",
  done: "text-green",
  rejected: "text-red",
  idle: "text-faint",
};

const FLOW_OFFSET = 1.1;

export function QueuePanel({ panel }: { panel: Data }) {
  const { caption, tag, lanes } = panel;

  return (
    <PanelFrame caption={caption} tag={tag}>
      <div className="grid gap-2.5 font-mono sm:grid-cols-[minmax(0,1fr)_28px_minmax(0,1.15fr)_28px_minmax(0,1fr)] sm:items-center sm:gap-0">
        {lanes.map(({ title, jobs }, index) => (
          <Fragment key={title}>
            {index > 0 && <Arrow delay={(index - 1) * FLOW_OFFSET} />}
            <div className="min-h-[150px] rounded-[10px] border border-line bg-canvas p-3.5">
              <h4 className="mb-2.5 text-xs font-medium text-faint">{title}</h4>
              {jobs.map(({ id, state, tone }) => (
                <div
                  key={id}
                  className={`mb-1.5 flex justify-between gap-2 rounded-md border border-line bg-raised-2 px-2 py-1.5 text-xs ${TONES[tone]}`}
                >
                  <span>{id}</span>
                  <span>{state}</span>
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </PanelFrame>
  );
}

function Arrow({ delay }: { delay: number }) {
  return (
    <div
      aria-hidden
      className="relative mx-1.5 hidden h-0.5 bg-line after:absolute after:-top-1 after:-right-px after:border-[5px] after:border-r-0 after:border-transparent after:border-l-line-strong sm:block"
    >
      <span
        style={{ animationDelay: `${delay}s` } as CSSProperties}
        className="flow-dot absolute -top-[3px] left-0 h-2 w-2 rounded-full bg-amber"
      />
    </div>
  );
}
