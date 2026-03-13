import Head from 'next/head';
import Link from 'next/link';
import type { GetServerSideProps } from 'next';
import { createClient } from '@supabase/supabase-js';

type Article = {
  id: string;
  title: string;
  category: string;
  summary: string;
  published_at: string;
};

type HomePageProps = {
  articles: Article[];
  fetchError: string | null;
};

export default function HomePage({ articles, fetchError }: HomePageProps) {
  return (
    <>
      <Head>
        <title>AI Forge · Home Feed</title>
        <meta name="description" content="Latest AI Forge articles from the community feed." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <header className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">AI Forge</p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Homepage Feed</h1>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">Discover recent articles from the AI Forge community.</p>
          </header>

          {fetchError ? (
            <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">{fetchError}</div>
          ) : null}

          {articles.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
              No articles available yet.
            </div>
          ) : (
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {articles.map((article) => (
                <article key={article.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-2 text-xs text-slate-400">
                    <span className="rounded-full bg-indigo-500/20 px-2 py-1 font-medium text-indigo-200">{article.category}</span>
                    <time dateTime={article.published_at}>{article.published_at}</time>
                  </div>

                  <h2 className="text-lg font-semibold text-white">
                    <Link href={`/article/${article.id}`} className="transition hover:text-indigo-300">
                      {article.title}
                    </Link>
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-300">{article.summary}</p>

                  <Link href={`/article/${article.id}`} className="mt-4 inline-block text-sm font-medium text-indigo-300 hover:text-indigo-200">
                    Read article →
                  </Link>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      props: {
        articles: [],
        fetchError: 'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
      }
    };
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase
    .from('articles')
    .select('id,title,category,summary,published_at')
    .order('published_at', { ascending: false });

  if (error) {
    return {
      props: {
        articles: [],
        fetchError: `Failed to load articles: ${error.message}`
      }
    };
  }

  return {
    props: {
      articles: (data ?? []) as Article[],
      fetchError: null
    }
  };
};
