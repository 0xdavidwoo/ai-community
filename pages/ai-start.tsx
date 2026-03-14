import Head from 'next/head';
import { FormEvent, useState } from 'react';

type ProductPlan = {
  product_name: string;
  core_features: string[];
  tech_stack: string[];
};

type BusinessAnalysis = {
  revenue_models: string[];
  target_users: string;
  pricing_suggestion: string;
};

type WebsiteStructure = {
  pages: string[];
  sections: string[];
};

type ProjectEvaluation = {
  market_potential: number;
  difficulty: number;
  competition: number;
  virality: number;
  overall_score: number;
  recommendation: string;
};

export default function AiStartPage() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [product, setProduct] = useState<ProductPlan | null>(null);
  const [business, setBusiness] = useState<BusinessAnalysis | null>(null);
  const [website, setWebsite] = useState<WebsiteStructure | null>(null);
  const [projectScore, setProjectScore] = useState<ProjectEvaluation | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setProduct(null);
    setBusiness(null);
    setWebsite(null);
    setProjectScore(null);

    try {
      const payload = JSON.stringify({ idea });

      const productResponse = await fetch('/api/generate-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload
      });

      const productData = (await productResponse.json()) as ProductPlan | { error: string };
      if (!productResponse.ok || !('product_name' in productData)) {
        throw new Error('error' in productData ? productData.error : 'Failed to generate product');
      }
      setProduct(productData);

      const [businessResponse, websiteResponse, evaluationResponse] = await Promise.all([
        fetch('/api/analyze-business', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ product: productData.product_name })
        }),
        fetch('/api/generate-website', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ product: productData.product_name })
        }),
        fetch('/api/evaluate-project', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: payload
        })
      ]);

      const businessData = (await businessResponse.json()) as BusinessAnalysis | { error: string };
      const websiteData = (await websiteResponse.json()) as WebsiteStructure | { error: string };
      const evaluationData = (await evaluationResponse.json()) as ProjectEvaluation | { error: string };

      if (!businessResponse.ok || !('revenue_models' in businessData)) {
        throw new Error('error' in businessData ? businessData.error : 'Failed to analyze business model');
      }

      if (!websiteResponse.ok || !('pages' in websiteData) || !('sections' in websiteData)) {
        throw new Error('error' in websiteData ? websiteData.error : 'Failed to generate website structure');
      }

      if (!evaluationResponse.ok || !('overall_score' in evaluationData)) {
        throw new Error('error' in evaluationData ? evaluationData.error : 'Failed to evaluate project');
      }

      setBusiness(businessData);
      setWebsite(websiteData);
      setProjectScore(evaluationData);
    } catch (submitError) {
      setProduct(null);
      setBusiness(null);
      setWebsite(null);
      setProjectScore(null);

      if (submitError instanceof Error) {
        setError(submitError.message);
      } else {
        setError('Something went wrong while generating your project output.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>AI Start</title>
        <meta
          name="description"
          content="Enter one idea and generate product, business model, website structure, and project score."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 sm:px-6">
        <section className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">AI Start</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">One idea, full startup snapshot</h1>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Enter a single idea and the system will generate your product concept, business model, website structure,
            and project score.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label htmlFor="idea" className="block text-sm font-medium text-slate-200">
              Your idea
            </label>
            <textarea
              id="idea"
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="e.g. AI agent that summarizes support tickets and drafts reply options"
              rows={4}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none ring-indigo-400 transition focus:ring-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Generating...' : 'Generate all'}
            </button>
          </form>

          {error ? <p className="mt-6 rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

          {product && business && website && projectScore && !error ? (
            <div className="mt-8 space-y-6">
              <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
                <h2 className="text-xl font-semibold text-white">Product</h2>
                <p className="mt-2 text-sm text-slate-300">{product.product_name}</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xs uppercase tracking-wide text-slate-400">Core features</h3>
                    <ul className="mt-2 space-y-2 text-sm text-slate-200">
                      {product.core_features.map((feature) => (
                        <li key={feature} className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wide text-slate-400">Tech stack</h3>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {product.tech_stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-100"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>

              <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
                <h2 className="text-xl font-semibold text-white">Business Model</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <h3 className="text-xs uppercase tracking-wide text-slate-400">Revenue models</h3>
                    <ul className="mt-2 space-y-2 text-sm text-slate-200">
                      {business.revenue_models.map((model) => (
                        <li key={model} className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2">
                          {model}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs uppercase tracking-wide text-slate-400">Target users</h3>
                      <p className="mt-1 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200">
                        {business.target_users}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-wide text-slate-400">Pricing suggestion</h3>
                      <p className="mt-1 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200">
                        {business.pricing_suggestion}
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
                <h2 className="text-xl font-semibold text-white">Website Structure</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xs uppercase tracking-wide text-slate-400">Pages</h3>
                    <ul className="mt-2 space-y-2 text-sm text-slate-200">
                      {website.pages.map((page) => (
                        <li key={page} className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2">
                          {page}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wide text-slate-400">Homepage sections</h3>
                    <ul className="mt-2 space-y-2 text-sm text-slate-200">
                      {website.sections.map((section) => (
                        <li key={section} className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2">
                          {section}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>

              <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
                <h2 className="text-xl font-semibold text-white">Project Score</h2>
                <ul className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                  <li className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-indigo-100">
                    <p className="text-xs uppercase tracking-wide text-indigo-200/80">Market potential</p>
                    <p className="mt-1 text-xl font-bold text-white">{projectScore.market_potential}/10</p>
                  </li>
                  <li className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-indigo-100">
                    <p className="text-xs uppercase tracking-wide text-indigo-200/80">Difficulty</p>
                    <p className="mt-1 text-xl font-bold text-white">{projectScore.difficulty}/10</p>
                  </li>
                  <li className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-indigo-100">
                    <p className="text-xs uppercase tracking-wide text-indigo-200/80">Competition</p>
                    <p className="mt-1 text-xl font-bold text-white">{projectScore.competition}/10</p>
                  </li>
                  <li className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-indigo-100">
                    <p className="text-xs uppercase tracking-wide text-indigo-200/80">Virality</p>
                    <p className="mt-1 text-xl font-bold text-white">{projectScore.virality}/10</p>
                  </li>
                  <li className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-emerald-100 sm:col-span-2">
                    <p className="text-xs uppercase tracking-wide text-emerald-200/80">Overall score</p>
                    <p className="mt-1 text-xl font-bold text-white">{projectScore.overall_score}/10</p>
                  </li>
                </ul>
                <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Recommendation</p>
                  <p className="mt-1 text-base font-medium text-white">{projectScore.recommendation}</p>
                </div>
              </article>
            </div>
          ) : null}
        </section>
      </main>
    </>
  );
}
