import Head from 'next/head';
import Link from 'next/link';

type ToolCard = {
  title: string;
  href: string;
  description: string;
};

const toolCards: ToolCard[] = [
  {
    title: 'AI Tool Advisor',
    href: '/tools',
    description: 'Get fast tool recommendations based on your task and goals.'
  },
  {
    title: 'AI Product Builder',
    href: '/builder',
    description: 'Draft and shape your AI product concept with structured guidance.'
  },
  {
    title: 'Business Model Analyzer',
    href: '/business',
    description: 'Evaluate revenue logic, target users, and strategic trade-offs.'
  },
  {
    title: 'Website Generator',
    href: '/website',
    description: 'Generate website direction and core content for your AI idea.'
  },
  {
    title: 'Project Evaluator',
    href: '/evaluate',
    description: 'Assess feasibility, risks, and next steps before execution.'
  }
];

export default function AiBuilderPage() {
  return (
    <>
      <Head>
        <title>AI Builder Dashboard</title>
        <meta name="description" content="Launch your workflow with five AI Forge tools in one dashboard." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-950 px-4 py-14 text-slate-100 sm:px-6">
        <section className="mx-auto max-w-5xl">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">AI Builder</p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Dashboard</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
              Choose a tool to design, validate, and launch your AI project.
            </p>
          </header>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {toolCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-indigo-400/60 hover:bg-slate-900"
              >
                <p className="text-lg font-semibold text-white transition group-hover:text-indigo-300">{card.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{card.description}</p>
                <p className="mt-4 text-sm font-medium text-indigo-300">Open tool →</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
