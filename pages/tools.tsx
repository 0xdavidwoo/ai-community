import Head from 'next/head';
import { FormEvent, useState } from 'react';

type RecommendedTool = {
  name: string;
  description: string;
};

type RecommendToolsApiResponse = {
  task: string;
  tools: RecommendedTool[];
};

export default function ToolsPage() {
  const [task, setTask] = useState('');
  const [tools, setTools] = useState<RecommendedTool[]>([]);
  const [submittedTask, setSubmittedTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/recommend-tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
      });

      const data = (await response.json()) as RecommendToolsApiResponse | { error: string };

      if (!response.ok) {
        setTools([]);
        setSubmittedTask('');
        setError('error' in data ? data.error : 'Failed to fetch recommended tools');
        return;
      }

      if (!('task' in data) || !('tools' in data)) {
        setTools([]);
        setSubmittedTask('');
        setError('Invalid response from server');
        return;
      }

      setSubmittedTask(data.task);
      setTools(data.tools);
    } catch {
      setTools([]);
      setSubmittedTask('');
      setError('Something went wrong while fetching recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>AI Tool Advisor</title>
        <meta name="description" content="Get AI tool recommendations based on your task." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 sm:px-6">
        <section className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">AI Tool Advisor</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Find tools for your task</h1>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Describe what you want to do and get instant AI tool recommendations.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label htmlFor="task" className="block text-sm font-medium text-slate-200">
              Task
            </label>
            <input
              id="task"
              type="text"
              value={task}
              onChange={(event) => setTask(event.target.value)}
              placeholder="e.g. build ai website"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none ring-indigo-400 transition focus:ring-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Recommending...' : 'Recommend tools'}
            </button>
          </form>

          {error ? <p className="mt-6 rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

          {submittedTask && !error ? (
            <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
              <h2 className="text-lg font-semibold text-white">Recommended tools</h2>
              <p className="mt-2 text-sm text-slate-300">
                Task: <span className="font-medium text-slate-100">{submittedTask}</span>
              </p>

              {tools.length > 0 ? (
                <ul className="mt-4 grid grid-cols-1 gap-3">
                  {tools.map((tool) => (
                    <li
                      key={tool.name}
                      className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-100"
                    >
                      <p className="font-semibold text-white">{tool.name}</p>
                      <p className="mt-1 text-indigo-100/90">{tool.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-slate-400">No matching recommendation found for this task yet.</p>
              )}
            </div>
          ) : null}
        </section>
      </main>
    </>
  );
}
