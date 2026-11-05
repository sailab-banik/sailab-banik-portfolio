import type { CSSProperties } from "react";
import { getCertificates } from "@/lib/content";

export function Credentials() {
  return (
    <ul data-reveal className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {getCertificates().map(({ title, detail, issuer, date }, index) => (
        <li key={title} style={{ "--d": "0s", "--i": index } as CSSProperties} className="fx-rise rounded-xl border border-line bg-raised p-[18px]">
          <span className="font-mono text-xs text-amber">
            {date} · {issuer}
          </span>
          <b className="mt-1.5 mb-1 block font-semibold">{title}</b>
          <p className="text-[13px] text-muted">{detail}</p>
        </li>
      ))}
    </ul>
  );
}
