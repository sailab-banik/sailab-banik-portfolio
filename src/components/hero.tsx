import type { CSSProperties } from "react";
import Image from "next/image";
import { getProfile } from "@/lib/content";
import { Button } from "@/components/button";
import { CodeIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, MediumIcon } from "@/components/icons";
import { Terminal } from "@/components/terminal";

export function Hero() {
  const { name, headline, emphasis, statement, status, location, timezone, portrait, resume, email, links } =
    getProfile();
  const [before, after] = headline.split(emphasis);

  return (
    <section className="mx-auto grid max-w-page items-center gap-12 px-4 pt-14 pb-16 sm:px-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:pt-[88px] lg:pb-24">
      <div>
        <div className="rise mb-7 flex items-center gap-4">
          <Image
            src={portrait}
            alt={`Portrait of ${name}`}
            width={112}
            height={112}
            priority
            className="h-28 w-28 rounded-[20px] border border-line object-cover"
          />
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-raised px-3 py-1.5 text-[13px] text-fg">
              <span className="h-2 w-2 rounded-full bg-green" />
              {status}
            </span>
            <p className="mt-2.5 font-mono text-xs leading-[1.6] text-faint">
              {location} · {timezone}
            </p>
          </div>
        </div>

        <h1 style={rise(0.08)} className="rise mb-[18px] text-[44px] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-[72px]">
          {name}
        </h1>
        <p style={rise(0.16)} className="rise mb-[18px] text-lg leading-[1.4] font-medium tracking-[-0.01em] sm:text-[22px]">
          {before}
          <b className="font-medium text-amber">{emphasis}</b>
          {after}
        </p>
        <p style={rise(0.24)} className="rise mb-8 max-w-[58ch] text-[17px] text-muted">{statement}</p>

        <div style={rise(0.32)} className="rise flex flex-wrap items-center gap-2.5">
          <Button href={resume} newTab primary>
            <DownloadIcon />
            View resume
          </Button>
          <Button href={`mailto:${email}`}>
            <MailIcon />
            Email me
          </Button>
          <Button href={links.linkedin} square label="LinkedIn">
            <LinkedInIcon />
          </Button>
          <Button href={links.github} square label="GitHub">
            <GitHubIcon />
          </Button>
          <Button href={links.medium} square label="Medium">
            <MediumIcon />
          </Button>
          <Button href={links.leetcode} square label="LeetCode">
            <CodeIcon />
          </Button>
        </div>
      </div>

      <div style={rise(0.2)} className="rise">
        <Terminal />
      </div>
    </section>
  );
}

function rise(seconds: number) {
  return { "--rise": `${seconds}s` } as CSSProperties;
}
