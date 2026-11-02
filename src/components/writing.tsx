import { getArticles, getProfile, getSection } from "@/lib/content";
import { Credentials } from "@/components/credentials";
import { ArrowUpRightIcon } from "@/components/icons";
import { Toolbox } from "@/components/toolbox";

export function Writing() {
  return (
    <section id="writing" className="scroll-mt-14 border-t border-line py-[72px] sm:py-[104px]">
      <div className="mx-auto max-w-page px-4 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Toolbox />
          <Articles />
        </div>
        <Credentials />
      </div>
    </section>
  );
}

function Articles() {
  const { title, action } = getSection("writing");
  const { links } = getProfile();

  return (
    <div>
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 className="text-3xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[40px]">{title}</h2>
        <a
          href={links.medium}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[13px] text-muted transition-colors hover:text-amber"
        >
          {action}
        </a>
      </div>
      <ul>
        {getArticles().map(({ title, publication, date, url }) => (
          <li key={url} className="border-t border-line first:border-t-0">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="group grid items-baseline gap-x-4 gap-y-1 py-4 sm:grid-cols-[96px_minmax(0,1fr)_20px]"
            >
              <span className="font-mono text-xs text-faint">{date}</span>
              <span className="font-medium transition-colors group-hover:text-amber">
                {title}
                <span className="mt-0.5 block text-[13px] font-normal text-faint">{publication}</span>
              </span>
              <ArrowUpRightIcon className="text-faint max-sm:hidden" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
