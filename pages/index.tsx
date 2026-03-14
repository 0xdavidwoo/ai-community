import Head from 'next/head';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>AI Start</title>
        <meta
          name="description"
          content="Build your startup with AI. Enter one idea and get product plan, business model, website structure, and evaluation."
        />
      </Head>

      <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 sm:px-6">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-start rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">AI Start</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">Build your startup with AI</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
            Enter one idea and get product plan, business model, website structure, and evaluation.
          </p>
          <Link
            href="/ai-start"
            className="mt-8 inline-flex items-center rounded-xl bg-indigo-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-indigo-400"
          >
            Start building →
          </Link>
        </section>
      </main>
    </>
  );
}
