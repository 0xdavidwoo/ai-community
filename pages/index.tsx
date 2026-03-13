import Head from 'next/head';
import Link from 'next/link';

type Section = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

const sections: Array<{ name: string; items: Section[] }> = [
  {
    name: 'AI News',
    items: [
      {
        id: 'news-1',
        title: 'Weekly Frontier Model Briefing',
        description: 'A fast roundup of major model launches, open benchmarks, and notable research papers this week.',
        tags: ['Weekly', 'Research', 'Trends']
      },
      {
        id: 'news-2',
        title: 'Policy & Regulation Radar',
        description: 'Track AI policy movements and understand how they affect builders, startups, and creators.',
        tags: ['Policy', 'Global', 'Analysis']
      }
    ]
  },
  {
    name: 'AI Products',
    items: [
      {
        id: 'products-1',
        title: 'Creator Toolkit Index',
        description: 'A curated list of tools for writing, image generation, coding, and multilingual publishing workflows.',
        tags: ['Productivity', 'Curation', 'Workflow']
      },
      {
        id: 'products-2',
        title: 'Launch Watchlist',
        description: 'Discover newly shipped AI products with concise reviews, use cases, and pricing snapshots.',
        tags: ['Launches', 'Reviews', 'Pricing']
      }
    ]
  },
  {
    name: 'AI Projects',
    items: [
      {
        id: 'projects-1',
        title: 'Open Community Builds',
        description: 'Follow practical projects from the AI Forge community with architecture notes and learnings.',
        tags: ['Open Source', 'Case Study', 'Community']
      },
      {
        id: 'projects-2',
        title: 'From Idea to MVP',
        description: 'Step-by-step implementation diaries showing how teams ship AI products quickly and responsibly.',
        tags: ['MVP', 'Engineering', 'Roadmap']
      }
    ]
  },
  {
    name: 'AI Creators',
    items: [
      {
        id: 'creators-1',
        title: 'Creator Spotlight',
        description: 'Interviews with standout creators sharing their prompt systems, publishing rhythm, and growth tips.',
        tags: ['Interview', 'Creator Economy', 'Growth']
      },
      {
        id: 'creators-2',
        title: 'Studio Playbooks',
        description: 'Battle-tested playbooks for running solo or small AI creator studios with consistent quality output.',
        tags: ['Playbook', 'Operations', 'Content']
      }
    ]
  },
  {
    name: 'AI Experiments',
    items: [
      {
        id: 'experiments-1',
        title: 'Prompt Lab',
        description: 'Explore controlled prompt experiments with clear setup, result logs, and reusable templates.',
        tags: ['Prompting', 'Evaluation', 'Templates']
      },
      {
        id: 'experiments-2',
        title: 'Creative Model Challenges',
        description: 'Monthly challenges designed to test multimodal capabilities through real creative constraints.',
        tags: ['Multimodal', 'Challenge', 'Showcase']
      }
    ]
  }
];

function SectionCard({ item }: { item: Section }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>AI Forge (造物社)</title>
        <meta
          name="description"
          content="AI Forge (造物社): discover AI News, Products, Projects, Creators, and Experiments in one modern community hub."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <div>
              <p className="text-sm font-semibold text-indigo-700">AI Forge (造物社)</p>
              <h1 className="text-xl font-bold sm:text-2xl">Build, Discover, and Create with AI</h1>
            </div>
            <Link
              href="/login"
              className="rounded-lg border border-indigo-200 px-3 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50"
            >
              Join
            </Link>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            A modern, mobile-first homepage for the AI community. Explore curated updates and practical resources across
            five core sections.
          </p>

          <div className="mt-8 space-y-10">
            {sections.map((section) => (
              <section key={section.name}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold sm:text-xl">{section.name}</h2>
                  <button
                    type="button"
                    className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                  >
                    View all
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item) => (
                    <SectionCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
