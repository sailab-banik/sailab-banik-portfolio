import type { Fact } from "@/lib/content";

export function FactGrid({ facts }: { facts: Fact[] }) {
  return (
    <dl className="mt-5 grid gap-px overflow-hidden rounded-[10px] border border-line bg-line font-mono sm:grid-cols-3">
      {facts.map(({ label, value, note }) => (
        <div key={label} className="bg-raised px-3.5 py-3">
          <dt className="text-xs text-faint">{label}</dt>
          <dd className="mt-0.5 text-lg font-semibold tabular-nums">
            {value}
            {note && <span className="ml-1.5 text-[13px] font-normal text-faint">{note}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
