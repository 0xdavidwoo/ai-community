import Head from 'next/head';
import Link from 'next/link';

const capabilities = [
  {
    title: 'AI Tool Advisor',
    description: 'Get AI tool recommendations tailored to your specific workflow and goals.',
    href: '/ai-start',
  },
  {
    title: 'AI Product Builder',
    description: 'Turn your idea into a structured product concept with feature and launch guidance.',
    href: '/ai-start',
  },
  {
    title: 'Business Model Analyzer',
    description: 'Evaluate business viability with pricing, customer segments, and revenue strategy insights.',
    href: '/ai-start',
  },
  {
    title: 'Website Generator',
    description: 'Create a clear website structure and messaging plan for your startup in minutes.',
    href: '/ai-start',
  },
  {
    title: 'Project Evaluator',
    description: 'Assess project strengths, gaps, and next steps with AI-powered feedback.',
    href: '/ai-start',
  },
  {
    title: 'Content Analyzer',
    description: 'Analyze content quality and improve clarity, engagement, and impact quickly.',
    href: '/ai-start',
  },
];

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

        <section className="mx-auto mt-12 w-full max-w-5xl">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">AI Capabilities</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <Link
                key={capability.title}
                href={capability.href}
                className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-indigo-400/70 hover:bg-slate-900"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300">{capability.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{capability.description}</p>
                <span className="mt-4 inline-block text-sm font-medium text-indigo-300 group-hover:text-indigo-200">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
