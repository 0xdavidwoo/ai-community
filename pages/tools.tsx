import Head from 'next/head';
import Link from 'next/link';

type Tool = {
  name: string;
  description: string;
  website: string;
};

const tools: Tool[] = [
  {
    name: 'ChatGPT',
    description: 'Conversational AI assistant for writing, coding, research, and brainstorming.',
    website: 'https://chat.openai.com',
  },
  {
    name: 'Claude',
    description: 'AI assistant focused on long-form reasoning, writing, and analysis tasks.',
    website: 'https://claude.ai',
  },
  {
    name: 'Midjourney',
    description: 'Text-to-image AI platform for generating imaginative artwork and visuals.',
    website: 'https://www.midjourney.com',
  },
  {
    name: 'Perplexity',
    description: 'AI-powered search and answer engine with cited, web-grounded responses.',
    website: 'https://www.perplexity.ai',
  },
  {
    name: 'Runway',
    description: 'Generative AI toolkit for creating and editing images and videos.',
    website: 'https://runwayml.com',
  },
];

export default function ToolsPage() {
  return (
    <>
      <Head>
        <title>AI Tools Directory</title>
        <meta name="description" content="Browse popular AI tools and their websites." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-4">
            <Link href="/" className="inline-flex text-sm text-cyan-300 transition hover:text-cyan-200">
              ← Back to home
            </Link>
            <h1 className="text-4xl font-bold tracking-tight">AI Tools Directory</h1>
            <p className="text-slate-300">Discover a few popular AI tools and visit their websites.</p>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <article
                key={tool.name}
                className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-black/20"
              >
                <h2 className="text-xl font-semibold text-white">{tool.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-300">{tool.description}</p>
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
                >
                  Visit website ↗
                </a>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
