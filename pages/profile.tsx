import Head from 'next/head';
import Link from 'next/link';

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
    </>
  );
}
