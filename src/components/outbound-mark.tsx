import { ArrowUpRightIcon } from "@/components/icons";

/* A solid disc with the arrow knocked out of it, marking a link that leaves the
   site. On hover the disc takes the accent and the arrow swaps: the one in place
   leaves through the top-right corner as its replacement arrives from the
   bottom-left, both clipped by the disc so neither is ever seen outside it.

   Everything is sized in `em` so the mark tracks whatever it trails, and the
   disc is dropped below the baseline to centre on the cap height rather than
   sit on the line. Under reduced motion the replacement is not rendered and the
   arrow in place stays put; the colour change still answers the hover.

   Class strings are written out rather than composed, because Tailwind scans
   source text and never sees an interpolated name. */
export function OutboundMark() {
  return (
    <span className="relative ml-[0.3em] inline-flex h-[1.2em] w-[1.2em] overflow-hidden rounded-full bg-edge align-[-0.28em] text-ink transition-colors duration-200 group-hover:bg-signal group-hover:text-paper">
      <ArrowUpRightIcon className="absolute inset-0 m-auto h-[0.5em] w-[0.5em] transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-[1.2em] motion-safe:group-hover:-translate-y-[1.2em]" />
      <ArrowUpRightIcon className="absolute inset-0 m-auto h-[0.5em] w-[0.5em] -translate-x-[1.2em] translate-y-[1.2em] transition-transform duration-200 ease-out group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:hidden" />
    </span>
  );
}
