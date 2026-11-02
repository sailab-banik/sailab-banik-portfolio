import type { ReactNode } from "react";

type Props = {
  caption: string;
  status?: string;
  tag?: string;
  children: ReactNode;
};

/* A status reports something the system measured; a tag owns up to data drawn
   for the picture rather than taken from a run. */
export function PanelFrame({ caption, status, tag, children }: Props) {
  return (
    <div className="rounded-[14px] border border-line bg-raised p-6">
      <div className="mb-5 flex items-center justify-between gap-3 font-mono text-xs text-faint">
        <span>{caption}</span>
        {status && <span className="text-green">{status}</span>}
        {tag && <span className="rounded-full border border-dashed border-line-strong px-2 py-0.5 text-[11px]">{tag}</span>}
      </div>
      {children}
    </div>
  );
}
