import { getArticles, getProfile, type Article } from "@/lib/content";

export function Writing() {
  const articles = getArticles();
  const { links } = getProfile();

  return (
    <section id="writing" className="border-t border-edge">
      <div className="mx-auto w-full max-w-page px-6 py-section md:px-10">
        <h2 className="type-h2 text-h2 text-ink">Writing</h2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <Card key={article.url} article={article} />
          ))}
        </ul>
        <a
          href={links.medium}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block text-ui text-signal underline decoration-edge decoration-1 underline-offset-4 transition-colors hover:decoration-signal"
        >
          All writing on Medium
        </a>
      </div>
    </section>
  );
}

function Card({ article }: { article: Article }) {
  const { title, publication, date, url, summary } = article;

  return (
    <li>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex h-full flex-col rounded-2xl border border-edge bg-surface p-6 transition-[border-color] hover:border-signal"
      >
        <h3 className="text-h3 font-semibold text-ink">{title}</h3>
        <p className="mt-3 font-serif text-body text-ink">{summary}</p>
        <p className="mt-auto pt-6 text-meta text-slate">
          {publication}, {date}
        </p>
      </a>
    </li>
  );
}
