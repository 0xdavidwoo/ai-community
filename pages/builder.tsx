import Head from 'next/head';
import { FormEvent, useState } from 'react';

type ProductPlan = {
  product_name: string;
  core_features: string[];
  tech_stack: string[];
};

export default function BuilderPage() {
  const [idea, setIdea] = useState('');
  const [product, setProduct] = useState<ProductPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idea })
      });

      const data = (await response.json()) as ProductPlan | { error: string };

      if (!response.ok) {
        setProduct(null);
        setError('error' in data ? data.error : 'Failed to generate product plan');
        return;
      }

      if (!('product_name' in data) || !('core_features' in data) || !('tech_stack' in data)) {
        setProduct(null);
        setError('Invalid response from server');
        return;
      }

      setProduct(data);
    } catch {
      setProduct(null);
      setError('Something went wrong while generating your product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>AI Product Builder</title>
        <meta name="description" content="Turn your idea into an AI product blueprint." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 sm:px-6">
        <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">AI Product Builder</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Generate your product plan</h1>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Share your product idea and get a generated name, core features, and suggested tech stack.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label htmlFor="idea" className="block text-sm font-medium text-slate-200">
              Product idea
            </label>
            <textarea
              id="idea"
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="e.g. an AI assistant that turns blog posts into weekly podcasts"
              rows={4}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none ring-indigo-400 transition focus:ring-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Generating...' : 'Generate product'}
            </button>
          </form>

          {error ? <p className="mt-6 rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

          {product && !error ? (
            <div className="mt-8 space-y-6 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
              <div>
                <h2 className="text-sm uppercase tracking-wide text-slate-400">Product name</h2>
                <p className="mt-2 text-2xl font-semibold text-white">{product.product_name}</p>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wide text-slate-400">Core features</h3>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {product.core_features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-100"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wide text-slate-400">Tech stack</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {product.tech_stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-200"
                    >
                      {tech}
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
