import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type Tool = {
  id: string | number;
  name: string;
  description: string | null;
  link: string | null;
};


export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const loadTools = async () => {
      if (!supabase) {
        setError('Supabase environment variables are missing.');
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase.from('tools').select('id, name, description, link').order('name');

      if (ignore) {
        return;
      }

      if (fetchError) {
        setError(fetchError.message);
        setTools([]);
      } else {
        setTools((data ?? []) as Tool[]);
      }

      setLoading(false);
    };

    loadTools();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Head>
        <title>AI Forge Tools · Discover AI Products</title>
        <meta name="description" content="Browse the latest AI tools from the AI Forge directory." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-950 text-slate-100">
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">AI Forge Directory</p>
              <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Tools</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
                Discover and compare products from the AI Forge tool database.
              </p>
            </div>
            <Link
              href="/"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
            >
              Back to home
            </Link>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-300">Loading tools…</div>
          ) : error ? (
            <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-8 text-center text-rose-200">
              Failed to load tools: {error}
            </div>
          ) : tools.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-300">
              No tools found yet. Check back soon for new additions.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <article key={tool.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                  <h2 className="text-lg font-semibold text-white">{tool.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{tool.description || 'No description provided.'}</p>
                  {tool.link ? (
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
                    >
                      Visit tool
                    </a>
                  ) : (
                    <p className="mt-5 text-sm text-slate-400">No link available.</p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
