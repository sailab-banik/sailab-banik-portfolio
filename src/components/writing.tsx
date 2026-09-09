import { OutboundMark } from "@/components/outbound-mark";
import { Section } from "@/components/section";
import { getArticles, getProfile, type Article } from "@/lib/content";

const UNDERLINE =
  "decoration-1 underline-offset-4 group-hover:underline group-hover:decoration-signal";

export function Writing() {
  const articles = getArticles();
  const { links } = getProfile();

  return (
    <Section name="writing">
      <ul className="border-b border-edge">
        {articles.map((article) => (
          <Row key={article.url} article={article} />
        ))}
      </ul>
      <a
        href={links.medium}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-block text-ui text-signal underline decoration-edge decoration-1 underline-offset-4 transition-colors hover:decoration-signal"
      >
        Everything else on Medium
      </a>
    </Section>
  );
}

function Row({ article }: { article: Article }) {
  const { title, publication, date, url, summary } = article;
  const words = title.split(" ");
  const last = words.pop() as string;
  const head = words.join(" ");

  return (
    <li>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="group grid gap-x-8 gap-y-3 border-t border-edge py-7 md:grid-cols-12"
      >
        <span className="md:col-span-8">
          {/* The mark trails the last word rather than pinning to a corner, so
              it never orphans when the title wraps. Chrome will break between
              the text and an atomic inline even across a non-breaking space, so
              the last word and the mark are held in one nowrap span; they move
              down together or not at all. The mark stays outside the underlined
              spans so the hover rule stops at the word. */}
          <span className="block text-h3 font-semibold text-ink">
            {head && <span className={UNDERLINE}>{head} </span>}
            <span className="whitespace-nowrap">
              <span className={UNDERLINE}>{last}</span>
              <OutboundMark />
            </span>
          </span>
          <span className="mt-2 block max-w-[62ch] font-serif text-body text-slate">{summary}</span>
        </span>
        <span className="text-meta text-slate md:col-span-3 md:col-start-10 md:text-right">
          <span className="block">{publication}</span>
          <span className="mt-1 block">{date}</span>
        </span>
      </a>
    </li>
  );
}
