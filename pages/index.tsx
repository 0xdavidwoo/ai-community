import Head from 'next/head';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Article, Category, articles } from '../lib/articles';

type FeedCategory = 'all' | Category;

const PAGE_SIZE = 3;

const categoryLabel: Record<FeedCategory, string> = {
  all: 'All',
  tool: 'Tool',
  news: 'News',
  product: 'Product'
};

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
          {article.category}
        </span>
        <button
          type="button"
          aria-label={`Bookmark ${article.title}`}
          className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600"
        >
          ☆ Bookmark
        </button>
      </div>

      <h2 className="text-lg font-semibold text-slate-900">
        <Link href={`/article/${article.id}`} className="hover:text-indigo-700">
          {article.title}
        </Link>
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{article.summary}</p>
      <p className="mt-4 text-xs font-medium text-slate-500">Published {article.publishedAt}</p>
    </article>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<FeedCategory>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') {
      return articles;
    }
    return articles.filter((article) => article.category === activeCategory);
  }, [activeCategory]);

  const visibleArticles = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <>
      <Head>
        <title>AI Forge Feed</title>
        <meta name="description" content="AI Forge (造物社) content aggregation platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <Link href="/" className="text-lg font-bold text-indigo-700">
              AI Forge
            </Link>

            <nav className="order-3 w-full overflow-x-auto sm:order-2 sm:w-auto">
              <ul className="flex min-w-max items-center gap-2">
                {(Object.keys(categoryLabel) as FeedCategory[]).map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory(category);
                        setVisibleCount(PAGE_SIZE);
                      }}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                        activeCategory === category
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {categoryLabel[category]}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <Link
              href="/login"
              className="order-2 rounded-lg border border-indigo-200 px-3 py-1.5 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50 sm:order-3"
            >
              Login
            </Link>
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="mb-5 flex items-end justify-between">
            <h1 className="text-xl font-semibold sm:text-2xl">Community feed</h1>
            <Link href="/profile" className="text-sm font-medium text-indigo-700 hover:text-indigo-600">
              Go to profile →
            </Link>
          </div>

          <div className="grid gap-4 sm:gap-5">
            {visibleArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              disabled={!hasMore}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition enabled:hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {hasMore ? 'Load more' : 'No more articles'}
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
