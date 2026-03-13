import Head from 'next/head';
import Link from 'next/link';
codex/build-complete-mvp-for-ai-community-platform
import { useEffect, useMemo, useState } from 'react';
import AppShell from '../components/AppShell';
import { articles } from '../data/articles';
import { supabase } from '../lib/supabaseClient';
import { getBookmarks, getReadHistory } from '../lib/userData';

export default function ProfilePage() {
  const [email, setEmail] = useState<string>('Guest');
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
      const userId = data.user?.id;
      setEmail(data.user?.email ?? 'Guest (local mode)');
      setBookmarks(await getBookmarks(userId));
      setHistory(await getReadHistory(userId));
    };
    load();
  }, []);

  const bookmarkedArticles = useMemo(() => articles.filter((article) => bookmarks.includes(article.id)), [bookmarks]);
  const historyArticles = useMemo(() => articles.filter((article) => history.includes(article.id)), [history]);

  return (
    <>
      <Head>
        <title>Profile | AI Community</title>
      </Head>
      <AppShell title="Profile">
        <section className="space-y-4 rounded-xl border border-slate-800 bg-card p-5">
          <p className="text-sm text-slate-300">Signed in as: {email}</p>
          <div>
            <h2 className="mb-2 text-lg font-semibold">Bookmarked articles</h2>
            {bookmarkedArticles.length === 0 ? (
              <p className="text-sm text-slate-400">No bookmarks yet.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {bookmarkedArticles.map((article) => (
                  <li key={article.id}>
                    <Link href={`/article/${article.id}`} className="text-indigo-300 hover:text-indigo-200">
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold">Read history</h2>
            {historyArticles.length === 0 ? (
              <p className="text-sm text-slate-400">No reading history yet.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {historyArticles.map((article) => (
                  <li key={article.id}>
                    <Link href={`/article/${article.id}`} className="text-indigo-300 hover:text-indigo-200">
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </AppShell>


export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>Profile | AI Forge</title>
        <meta name="description" content="Personal center for AI Forge (造物社) members" />
      </Head>
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
        <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h1 className="text-2xl font-bold">Personal Center</h1>
          <p className="mt-2 text-sm text-slate-600">Manage your bookmarks, profile details, and reading activity.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-100 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Saved bookmarks</p>
              <p className="mt-2 text-2xl font-semibold">12</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Reading streak</p>
              <p className="mt-2 text-2xl font-semibold">7 days</p>
            </div>
          </div>

          <Link href="/" className="mt-8 inline-block text-sm font-medium text-indigo-700 hover:text-indigo-600">
            ← Back to feed
          </Link>
        </section>
      </main>
main
    </>
  );
}
