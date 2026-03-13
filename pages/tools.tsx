import Head from 'next/head';
import Link from 'next/link';

export default function LegacyRouteNotice() {
  return (
    <>
      <Head>
        <title>Community Content | AI Community</title>
      </Head>
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 text-slate-900">
          <h1 className="text-2xl font-bold">Community Content Feed</h1>
          <p className="mt-3 text-sm text-slate-600">
            This project has been rebuilt into an AI community content aggregation platform and is no longer a tools directory.
          </p>
          <Link href="/" className="mt-5 inline-block text-sm font-semibold text-indigo-700 hover:text-indigo-600">
            Go to homepage feed →
          </Link>
        </div>
      </main>
    </>
  );
}
