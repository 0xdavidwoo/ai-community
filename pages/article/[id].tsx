import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
codex/build-complete-mvp-for-ai-community-platform
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

import { articles } from '../../lib/articles';

export default function ArticleDetailPage() {
  const router = useRouter();
  const articleId = typeof router.query.id === 'string' ? router.query.id : '';
  const article = articles.find((item) => item.id === articleId);

  if (!article) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Article not found.</p>
          <Link href="/" className="mt-3 inline-block text-sm font-medium text-indigo-700 hover:text-indigo-600">
            ← Back to feed
          </Link>
        </div>
      </main>
main
    );
  }

  return (
    <>
      <Head>
codex/build-complete-mvp-for-ai-community-platform
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

        <title>{article.title} | AI Forge</title>
        <meta name="description" content={article.summary} />
      </Head>

      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
        <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <Link href="/" className="text-sm font-medium text-indigo-700 hover:text-indigo-600">
            ← Back to feed
          </Link>
          <p className="mt-4 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            {article.category}
          </p>
          <h1 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">{article.title}</h1>
          <p className="mt-3 text-sm text-slate-500">Published {article.publishedAt}</p>
          <p className="mt-6 text-base leading-7 text-slate-700">{article.content}</p>
        </article>
      </main>
main
    </>
  );
}
