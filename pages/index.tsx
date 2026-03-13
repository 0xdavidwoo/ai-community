import Head from 'next/head';
import Link from 'next/link';

type Pillar = {
  title: string;
  summary: string;
  metrics: string;
};

const pillars: Pillar[] = [
  {
    title: 'AI News Radar',
    summary: 'Daily intelligence on model launches, research breakthroughs, and policy moves that matter to builders.',
    metrics: 'Daily digest · 5 min read'
  },
  {
    title: 'Product & Tool Atlas',
    summary: 'Curated stacks for creators and teams: compare tools, pricing, and best-fit workflows in one place.',
    metrics: '300+ tools tracked'
  },
  {
    title: 'Builder Showcases',
    summary: 'Real projects from the community with architecture notes, launch retrospectives, and reusable playbooks.',
    metrics: 'Weekly ship stories'
  },
  {
    title: 'Creator Studio',
    summary: 'Interviews and systems from AI-first creators scaling output with quality and consistency.',
    metrics: 'Templates + SOPs'
  }
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>AI Forge (造物社) · Build the Future with AI</title>
        <meta
          name="description"
          content="AI Forge is the modern home for AI news, tools, projects, and creators. Discover what to build next."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-950 text-slate-100">
        <section className="relative overflow-hidden border-b border-slate-800">
          <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">AI Forge (造物社)</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              The AI Forge homepage for builders, creators, and curious minds.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Stay ahead with signal-rich AI coverage, practical product intelligence, and a community focused on
              shipping real outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
              >
                Join AI Forge
              </Link>
              <a
                href="#pillars"
                className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
              >
                Explore pillars
              </a>
            </div>
          </div>
        </section>

        <section id="pillars" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">What you get inside AI Forge</h2>
              <p className="mt-2 text-sm text-slate-400 sm:text-base">A focused operating system for navigating the AI era.</p>
            </div>
            <span className="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              Updated weekly
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{pillar.summary}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-indigo-300">{pillar.metrics}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
