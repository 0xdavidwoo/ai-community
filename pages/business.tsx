import Head from 'next/head';
import { FormEvent, useState } from 'react';

type BusinessAnalysis = {
  revenue_models: string[];
  target_users: string;
  pricing_suggestion: string;
};

export default function BusinessPage() {
  const [product, setProduct] = useState('');
  const [analysis, setAnalysis] = useState<BusinessAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product })
      });

      const data = (await response.json()) as BusinessAnalysis | { error: string };

      if (!response.ok) {
        setAnalysis(null);
        setError('error' in data ? data.error : 'Failed to analyze business model');
        return;
      }

      if (!('revenue_models' in data) || !('target_users' in data) || !('pricing_suggestion' in data)) {
        setAnalysis(null);
        setError('Invalid response from server');
        return;
      }

      setAnalysis(data);
    } catch {
      setAnalysis(null);
      setError('Something went wrong while analyzing your product idea.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Business Model Analyzer</title>
        <meta name="description" content="Analyze your product idea and generate a business model." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 sm:px-6">
        <section className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">Business Model Analyzer</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Validate your product monetization</h1>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Enter a product idea and get AI-generated revenue model, target user, and pricing suggestions.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label htmlFor="product" className="block text-sm font-medium text-slate-200">
              Product idea
            </label>
            <input
              id="product"
              type="text"
              value={product}
              onChange={(event) => setProduct(event.target.value)}
              placeholder="e.g. AI-powered meeting notes app"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none ring-indigo-400 transition focus:ring-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Analyzing...' : 'Analyze business model'}
            </button>
          </form>

          {error ? <p className="mt-6 rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

          {analysis && !error ? (
            <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
              <h2 className="text-lg font-semibold text-white">Business model analysis</h2>

              <div className="mt-4 space-y-4 text-sm text-slate-200">
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-slate-400">Revenue models</h3>
                  <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {analysis.revenue_models.map((model) => (
                      <li
                        key={model}
                        className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-100"
                      >
                        {model}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-wide text-slate-400">Target users</h3>
                  <p className="mt-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100">{analysis.target_users}</p>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-wide text-slate-400">Pricing suggestion</h3>
                  <p className="mt-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100">
                    {analysis.pricing_suggestion}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </main>
    </>
  );
}
