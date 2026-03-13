import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AppShell from '../../components/AppShell';
import { getArticleById } from '../../data/articles';
import { addToReadHistory, getBookmarks, toggleBookmark } from '../../lib/userData';

export default function ArticleDetailPage() {
  const router = useRouter();
  const id = String(router.query.id ?? '');
  const article = getArticleById(id);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!id) return;
    getBookmarks().then((items) => setBookmarked(items.includes(id)));
    addToReadHistory(id);
  }, [id]);

  if (!article) {
    return (
      <AppShell title="Article not found">
        <p className="mb-4 text-slate-300">This article does not exist.</p>
        <Link href="/" className="text-indigo-300">
          Back to feed
        </Link>
      </AppShell>
    );
  }

  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <AppShell title={article.title}>
        <article className="rounded-xl border border-slate-800 bg-card p-5">
          <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
            <span>{article.category}</span>
            <span>{article.publishedAt}</span>
          </div>
          <p className="mb-4 text-sm text-slate-300">By {article.author}</p>
          <div className="space-y-4 text-slate-100">
            {article.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <button
            type="button"
            onClick={async () => {
              const updated = await toggleBookmark(article.id);
              setBookmarked(updated.includes(article.id));
            }}
            className="mt-6 rounded-md border border-slate-700 px-4 py-2 text-sm hover:border-indigo-300"
          >
            {bookmarked ? 'Remove bookmark' : 'Bookmark article'}
          </button>
        </article>
      </AppShell>
    </>
  );
}
