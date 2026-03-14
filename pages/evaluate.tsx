import Head from 'next/head';
import { FormEvent, useState } from 'react';

type ProjectEvaluation = {
  market_potential: number;
  difficulty: number;
  competition: number;
  virality: number;
  overall_score: number;
  recommendation: string;
};

export default function EvaluatePage() {
  const [idea, setIdea] = useState('');
  const [evaluation, setEvaluation] = useState<ProjectEvaluation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/evaluate-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idea })
      });

      const data = (await response.json()) as ProjectEvaluation | { error: string };

      if (!response.ok) {
        setEvaluation(null);
        setError('error' in data ? data.error : 'Failed to evaluate project');
        return;
      }

      if (
        !('market_potential' in data) ||
        !('difficulty' in data) ||
        !('competition' in data) ||
        !('virality' in data) ||
        !('overall_score' in data) ||
        !('recommendation' in data)
      ) {
        setEvaluation(null);
        setError('Invalid response from server');
        return;
      }

      setEvaluation(data);
    } catch {
      setEvaluation(null);
      setError('Something went wrong while evaluating your project idea.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Project Evaluator</title>
        <meta name="description" content="Evaluate your startup idea with AI-generated scoring." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 sm:px-6">
        <section className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">Project Evaluator</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Score your startup idea</h1>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Enter a startup idea and receive a quick market, difficulty, competition, and virality assessment.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label htmlFor="idea" className="block text-sm font-medium text-slate-200">
              Startup idea
            </label>
            <input
              id="idea"
              type="text"
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="e.g. AI assistant for customer support QA"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none ring-indigo-400 transition focus:ring-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Evaluating...' : 'Evaluate project'}
            </button>
          </form>

          {error ? <p className="mt-6 rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

          {evaluation && !error ? (
            <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
              <h2 className="text-lg font-semibold text-white">Evaluation result</h2>

              <ul className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                <li className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-indigo-100">
                  <p className="text-xs uppercase tracking-wide text-indigo-200/80">Market potential</p>
                  <p className="mt-1 text-xl font-bold text-white">{evaluation.market_potential}/10</p>
                </li>
                <li className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-indigo-100">
                  <p className="text-xs uppercase tracking-wide text-indigo-200/80">Difficulty</p>
                  <p className="mt-1 text-xl font-bold text-white">{evaluation.difficulty}/10</p>
                </li>
                <li className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-indigo-100">
                  <p className="text-xs uppercase tracking-wide text-indigo-200/80">Competition</p>
                  <p className="mt-1 text-xl font-bold text-white">{evaluation.competition}/10</p>
                </li>
                <li className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-indigo-100">
                  <p className="text-xs uppercase tracking-wide text-indigo-200/80">Virality</p>
                  <p className="mt-1 text-xl font-bold text-white">{evaluation.virality}/10</p>
                </li>
                <li className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-emerald-100 sm:col-span-2">
                  <p className="text-xs uppercase tracking-wide text-emerald-200/80">Overall score</p>
                  <p className="mt-1 text-xl font-bold text-white">{evaluation.overall_score}/10</p>
                </li>
              </ul>

              <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100">
                <p className="text-xs uppercase tracking-wide text-slate-400">Recommendation</p>
                <p className="mt-1 text-base font-medium text-white">{evaluation.recommendation}</p>
              </div>
            </div>
          ) : null}
        </section>
      </main>
    </>
  );
}
