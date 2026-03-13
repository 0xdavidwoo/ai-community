import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import AppShell from '../components/AppShell';
import ArticleCard from '../components/ArticleCard';
import { Category, articles } from '../data/articles';
import { getBookmarks, toggleBookmark } from '../lib/userData';

const PAGE_SIZE = 3;
const categories: Array<'All' | Category> = ['All', 'Tools', 'News', 'Products'];

export default function HomePage() {
  const [selected, setSelected] = useState<'All' | Category>('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    getBookmarks().then(setBookmarks);
  }, []);

  const filtered = useMemo(
    () => (selected === 'All' ? articles : articles.filter((article) => article.category === selected)),
    [selected]
  );

  const visible = filtered.slice(0, visibleCount);

  const onBookmark = async (articleId: string) => {
    const updated = await toggleBookmark(articleId);
    setBookmarks(updated);
  };

  return (
    <>
      <Head>
        <title>AI Community Feed</title>
        <meta name="description" content="Community feed for AI tools, news, and products." />
      </Head>
      <AppShell title="Community Feed">
        <section className="mb-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelected(category);
                setVisibleCount(PAGE_SIZE);
              }}
              className={`rounded-full px-4 py-2 text-sm ${
                selected === category ? 'bg-indigo-500 text-white' : 'bg-slate-900 text-slate-300'
              }`}
            >
              {category}
            </button>
          ))}
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {visible.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              bookmarked={bookmarks.includes(article.id)}
              onBookmark={onBookmark}
            />
          ))}
        </section>

        {visibleCount < filtered.length && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}
              className="rounded-lg bg-indigo-500 px-5 py-2 text-sm font-medium hover:bg-indigo-400"
            >
              Load more
            </button>
          </div>
        )}
      </AppShell>
    </>
  );
}
