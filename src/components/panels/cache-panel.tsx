import type { CSSProperties } from "react";
import type { CachePanel as Data } from "@/lib/content";
import { FactGrid } from "@/components/panels/fact-grid";
import { PanelFrame } from "@/components/panels/panel-frame";

export function CachePanel({ panel }: { panel: Data }) {
  const { caption, status, bars, facts } = panel;

  return (
    <PanelFrame caption={caption} status={status}>
      {bars.map(({ label, value, share, highlight }, index) => (
        <div
          key={label}
          className="mb-3.5 grid grid-cols-[90px_minmax(0,1fr)_60px] items-center gap-3.5 font-mono text-[13px] sm:grid-cols-[120px_minmax(0,1fr)_80px]"
        >
          <span className="text-faint">{label}</span>
          <div className="relative h-7 overflow-hidden rounded-md bg-raised-2">
            <i
              style={{ width: `${share * 100}%`, "--i": index } as CSSProperties}
              className={`bar-grow absolute inset-y-0 left-0 rounded-md ${highlight ? "bg-amber" : "bg-dusk"}`}
            />
          </div>
          <span className={highlight ? "text-amber" : undefined}>{value}</span>
        </div>
      ))}
      <FactGrid facts={facts} />
    </PanelFrame>
  );
}
