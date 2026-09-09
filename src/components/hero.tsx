import Image from "next/image";
import { getProfile } from "@/lib/content";

const PORTRAIT_SIZE = 1000;

export function Hero() {
  const { name, role, statement, emphasis, location, portrait, resume, links } = getProfile();
  const [before, after] = statement.split(emphasis);

  return (
    <section id="top" className="mx-auto w-full max-w-page px-6 pt-12 pb-[clamp(3.5rem,8vh,6rem)] md:px-10 md:pt-20">
      <h1 className="type-display text-display text-ink">
        <span className="block overflow-hidden pt-[0.08em]">
          <span className="reveal-line block whitespace-nowrap">{name}</span>
        </span>
      </h1>

      {/* Both columns hang from the rule, and the text block is centred against
          the portrait rather than pinned to either of its edges — the text is
          always the shorter of the two, so matching one edge only moves the
          mismatch to the other. The two trims keep the centring optical: the
          cut-out carries ~6% transparent headroom above the hair, and the first
          line of serif carries 0.285em of leading above its cap, so the block
          being centred is the one you can see rather than the boxes. */}
      <div className="reveal mt-8 flex flex-col border-t border-edge pt-10 [animation-delay:260ms] md:mt-10 md:grid md:grid-cols-12 md:items-center md:gap-x-8 md:pt-12 lg:gap-x-12">
        <div className="order-1 mb-10 w-full max-w-[420px] md:order-2 md:col-span-5 md:col-start-8 md:mb-0 md:max-w-none">
          <Image
            src={portrait}
            alt={`${name}, ${role}`}
            width={PORTRAIT_SIZE}
            height={PORTRAIT_SIZE}
            sizes="(min-width: 768px) 36vw, (min-width: 468px) 420px, 100vw"
            priority
            className="portrait -mt-[6%] block w-full"
          />
        </div>

        <div className="order-2 md:order-1 md:col-span-6">
          <p className="font-serif text-lead text-ink md:-mt-[0.285em] md:max-w-[34ch]">
            {before}
            <strong className="font-sans font-semibold tracking-tight">{emphasis}</strong>
            {after}
          </p>

          <div className="mt-9">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={resume}
                download
                className="flex h-11 items-center rounded-full bg-signal px-6 text-ui font-semibold text-paper transition-opacity hover:opacity-85"
              >
                Download resume
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 items-center rounded-full border border-edge px-6 text-ui font-medium text-ink transition-colors hover:border-ink"
              >
                Connect on LinkedIn
              </a>
            </div>

            <p className="mt-8 text-ui text-slate">
              {role} in {location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
