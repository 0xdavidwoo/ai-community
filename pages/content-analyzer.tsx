import Head from 'next/head';
import { FormEvent, useState } from 'react';
import type { ContentAnalysisResponse } from './api/analyze-content';

const sections: Array<{ key: keyof ContentAnalysisResponse; label: string; type: 'array' | 'text' }> = [
  { key: 'core_viewpoint', label: 'Core viewpoint', type: 'text' },
  { key: 'sub_points', label: 'Sub points', type: 'array' },
  { key: 'persuasion_strategy', label: 'Persuasion strategy', type: 'array' },
  { key: 'emotional_triggers', label: 'Emotional triggers', type: 'array' },
  { key: 'key_quotes', label: 'Key quotes', type: 'array' },
  { key: 'emotion_curve', label: 'Emotion curve', type: 'text' },
  { key: 'emotion_progression', label: 'Emotion progression', type: 'text' },
  { key: 'argument_types', label: 'Argument types', type: 'array' },
  { key: 'perspective_shift', label: 'Perspective shift', type: 'text' },
  { key: 'language_style', label: 'Language style', type: 'array' },
  { key: 'emotional_sentence_patterns', label: 'Emotional sentence patterns', type: 'array' },
  { key: 'cognitive_shock_patterns', label: 'Cognitive shock patterns', type: 'array' },
  { key: 'viral_structure_template', label: 'Viral structure template', type: 'text' },
  { key: 'rewrite_article', label: 'Rewrite article', type: 'text' },
  { key: 'titles', label: 'Titles', type: 'array' }
];

export default function ContentAnalyzerPage() {
  const [article, setArticle] = useState('');
  const [analysis, setAnalysis] = useState<ContentAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ article })
      });

      const data = (await response.json()) as ContentAnalysisResponse | { error: string };

      if (!response.ok) {
        setAnalysis(null);
        setError('error' in data ? data.error : 'Failed to analyze article');
        return;
      }

      setAnalysis(data as ContentAnalysisResponse);
    } catch {
      setAnalysis(null);
      setError('Something went wrong while analyzing your article.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Content Analyzer</title>
        <meta name="description" content="Analyze article structure, persuasion, and virality with AI." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 sm:px-6">
        <section className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">Content Analyzer</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Analyze article psychology and viral potential</h1>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Paste a full article to extract viewpoint, emotional structure, persuasive patterns, and a rewrite optimized for
            engagement.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label htmlFor="article" className="block text-sm font-medium text-slate-200">
              Article
            </label>
            <textarea
              id="article"
              value={article}
              onChange={(event) => setArticle(event.target.value)}
              placeholder="Paste the article text here..."
              rows={12}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none ring-indigo-400 transition focus:ring-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Analyzing...' : 'Analyze content'}
            </button>
          </form>

          {error ? <p className="mt-6 rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

          {analysis && !error ? (
            <div className="mt-8 space-y-5">
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-5">
                <h2 className="text-lg font-semibold text-white">Viral score</h2>
                <ul className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                  {Object.entries(analysis.viral_score).map(([key, value]) => (
                    <li key={key} className="rounded-lg border border-emerald-400/30 bg-slate-950/40 px-4 py-3 text-emerald-100">
                      <p className="text-xs uppercase tracking-wide text-emerald-200/80">{key.replaceAll('_', ' ')}</p>
                      <p className="mt-1 text-xl font-bold text-white">{value}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {sections.map((section) => {
                const value = analysis[section.key];

                if (section.type === 'array') {
                  const items = Array.isArray(value) ? value : [];

                  return (
                    <div key={section.key} className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
                      <h3 className="text-base font-semibold text-white">{section.label}</h3>
                      {items.length > 0 ? (
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-200">
                          {items.map((item) => (
                            <li key={`${section.key}-${item.slice(0, 30)}`}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-3 text-sm text-slate-400">No items returned.</p>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={section.key} className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
                    <h3 className="text-base font-semibold text-white">{section.label}</h3>
                    <p className="mt-3 whitespace-pre-wrap text-sm text-slate-200">{typeof value === 'string' ? value : ''}</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </section>
      </main>
    </>
  );
}
