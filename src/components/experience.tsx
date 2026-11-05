import type { CSSProperties } from "react";
import { getExperience, type Change, type Commit } from "@/lib/content";
import { SectionHead } from "@/components/section-head";

/* Experience as a commit graph: roles are commits on main, and the drawing
   extraction proof of concept is a branch off it, not yet merged. */
export function Experience() {
  const commits = getExperience();

  return (
    <section id="experience" className="relative scroll-mt-14 border-t border-line py-[72px] sm:py-[104px]">
      <span aria-hidden data-reveal className="fx-sweep" />
      <div className="mx-auto max-w-page px-4 sm:px-10">
        <SectionHead name="experience" />
        <ol>
          {commits.map((commit, index) => (
            <Entry key={commit.hash} commit={commit} first={index === 0} last={index === commits.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Entry({ commit, first, last }: { commit: Commit; first: boolean; last: boolean }) {
  const { hash, ref, branch, award, period, title, org, summary, diff, changes } = commit;
  const rail = `before:absolute before:left-[11px] before:w-0.5 before:bg-line sm:before:left-[23px] ${
    first ? "before:top-3.5" : "before:top-0"
  } ${last ? "before:h-3.5" : "before:bottom-0"}`;

  return (
    <li data-reveal className="grid grid-cols-[44px_minmax(0,1fr)] sm:grid-cols-[72px_minmax(0,1fr)]">
      <div className={`fx-rail relative ${rail}`}>
        {branch ? (
          <>
            <span className="absolute -top-[30px] left-3 h-11 w-7 rounded-bl-[18px] border-b-2 border-l-2 border-l-transparent border-b-blue opacity-70 sm:left-6" />
            <span className="fx-pop absolute top-2 left-[26px] h-3 w-3 rounded-full border-2 border-blue bg-canvas sm:left-[46px]" />
          </>
        ) : (
          <span
            className={`fx-pop absolute top-1.5 left-1 h-4 w-4 rounded-full border-2 border-amber sm:left-4 ${
              first ? "bg-amber shadow-[0_0_0_5px_rgba(245,185,66,0.14)]" : "bg-canvas"
            }`}
          />
        )}
      </div>

      <div className={`${last ? "" : "pb-14"} ${branch ? "pl-6" : ""}`}>
        <div style={{ "--d": "0.15s" } as CSSProperties} className="fx-rise mb-2 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[13px] text-faint">
          <span className="text-blue">{hash}</span>
          {ref && <Pill>{ref}</Pill>}
          {branch && <Pill branch>{branch}</Pill>}
          <span>{period}</span>
          {award && <Pill>{award}</Pill>}
        </div>
        <h3 style={{ "--d": "0.22s" } as CSSProperties} className={`fx-rise mb-1 font-semibold tracking-[-0.02em] ${branch ? "text-xl" : "text-2xl"}`}>{title}</h3>
        <p style={{ "--d": "0.29s" } as CSSProperties} className="fx-rise mb-5 text-muted">
          {summary ?? org}
        </p>

        <div style={{ "--d": "0.36s" } as CSSProperties} className="fx-rise overflow-hidden rounded-xl border border-line bg-raised">
          {diff && (
            <div className="flex justify-between gap-3 border-b border-line px-4 py-2.5 font-mono text-xs text-faint">
              <span>{diff}</span>
              <span className="text-green">+{changes.length} changes</span>
            </div>
          )}
          <div>
            {changes.map((change, index) => (
              <Line key={change.text} change={change} index={index} />
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

function Pill({ branch, children }: { branch?: boolean; children: string }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-xs ${
        branch ? "border-blue/35 text-blue" : "border-amber/40 text-amber"
      }`}
    >
      {children}
    </span>
  );
}

function Line({ change, index }: { change: Change; index: number }) {
  return (
    <div
      style={{ "--i": index } as CSSProperties}
      className="fx-diff grid grid-cols-[20px_minmax(0,1fr)] items-baseline gap-3 border-t border-line/60 px-4 py-2.5 first:border-t-0 odd:bg-green/[0.045] sm:grid-cols-[28px_minmax(0,1fr)_auto]">
      <span className="font-mono text-sm text-green">+</span>
      <span className="max-w-[72ch] text-[15px]">{change.text}</span>
      <span className="col-start-2 font-mono text-[13px] whitespace-nowrap text-green tabular-nums sm:col-start-3">
        {change.metric}
      </span>
    </div>
  );
}
