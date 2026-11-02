import type { CSSProperties, ReactNode } from "react";
import { getTerminal } from "@/lib/content";

/* Lines type out in sequence: a command or its output every 0.7s, check marks
   faster at 0.4s, and the idle prompt a beat after the last of them. */
const START = 0.2;
const STEP = 0.7;
const CHECK_STEP = 0.4;
const SETTLE = 0.6;

type Line = { key: string; delay: number; content: ReactNode; output?: boolean };

export function Terminal() {
  const { title, size, label, commands } = getTerminal();
  const lines: Line[] = [];
  let t = START;

  for (const { input, output, checks } of commands) {
    lines.push({ key: input, delay: t, content: <Prompt>{input}</Prompt> });
    t += STEP;
    if (output) {
      lines.push({ key: `${input}-out`, delay: t, content: output, output: true });
      t += STEP;
    }
    for (const check of checks ?? []) {
      lines.push({
        key: check.label,
        delay: t,
        content: (
          <>
            <span className="text-green">✓</span> <span className="text-fg/92">{check.label}</span>{" "}
            <span className="text-amber">{check.value}</span>
          </>
        ),
      });
      t += CHECK_STEP;
    }
  }
  const idle = lines[lines.length - 1].delay + SETTLE;

  return (
    <div
      role="img"
      aria-label={label}
      className="overflow-hidden rounded-[14px] border border-line bg-sunken font-mono shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.03)]"
    >
      <div className="flex items-center justify-between border-b border-line px-3.5 py-2.5 text-xs text-faint">
        <span>{title}</span>
        <span>{size}</span>
      </div>
      <div className="px-5 pt-5 pb-6 text-[12.5px] leading-[1.85] sm:text-[13.5px]">
        {lines.map(({ key, delay, content, output }) => (
          <TypedLine key={key} delay={delay} className={output ? "text-fg/92" : undefined}>
            {content}
          </TypedLine>
        ))}
        <TypedLine delay={idle}>
          <Prompt>
            <span className="caret-blink inline-block h-4 w-2 bg-amber align-[-3px]" />
          </Prompt>
        </TypedLine>
      </div>
    </div>
  );
}

function Prompt({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="text-green">➜</span> <span className="text-blue">~</span> {children}
    </>
  );
}

function TypedLine({ delay, className, children }: { delay: number; className?: string; children: ReactNode }) {
  return (
    <span
      style={{ "--d": `${delay.toFixed(1)}s` } as CSSProperties}
      className={`type-line block overflow-hidden sm:whitespace-nowrap ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
