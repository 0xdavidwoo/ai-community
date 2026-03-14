import Head from 'next/head';
import { FormEvent, useState } from 'react';

type WebsiteStructure = {
  pages: string[];
  sections: string[];
};

export default function WebsitePage() {
  const [product, setProduct] = useState('');
  const [structure, setStructure] = useState<WebsiteStructure | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product })
      });

      const data = (await response.json()) as WebsiteStructure | { error: string };

      if (!response.ok) {
        setStructure(null);
        setError('error' in data ? data.error : 'Failed to generate website structure');
        return;
      }

      if (!('pages' in data) || !('sections' in data)) {
        setStructure(null);
        setError('Invalid response from server');
        return;
      }

      setStructure(data);
    } catch {
      setStructure(null);
      setError('Something went wrong while generating your website structure.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Website Generator</title>
        <meta name="description" content="Generate a suggested website structure for your product idea." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 sm:px-6">
        <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">Website Generator</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Generate your website structure</h1>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Enter a product idea and get suggested pages and homepage sections.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label htmlFor="product" className="block text-sm font-medium text-slate-200">
              Product idea
            </label>
            <textarea
              id="product"
              value={product}
              onChange={(event) => setProduct(event.target.value)}
              placeholder="e.g. an AI workspace that turns community feedback into actionable product roadmaps"
              rows={4}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none ring-indigo-400 transition focus:ring-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Generating...' : 'Generate website'}
            </button>
          </form>

          {error ? <p className="mt-6 rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

          {structure && !error ? (
            <div className="mt-8 grid gap-6 rounded-xl border border-slate-800 bg-slate-950/70 p-5 sm:grid-cols-2">
              <div>
                <h2 className="text-sm uppercase tracking-wide text-slate-400">Pages</h2>
                <ul className="mt-3 space-y-2">
                  {structure.pages.map((page) => (
                    <li
                      key={page}
                      className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-100"
                    >
                      {page}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-wide text-slate-400">Homepage sections</h2>
                <ul className="mt-3 space-y-2">
                  {structure.sections.map((section) => (
                    <li
                      key={section}
                      className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100"
                    >
                      {section}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </section>
      </main>
    </>
  );
}
