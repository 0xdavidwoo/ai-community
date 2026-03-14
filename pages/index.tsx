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

function formatPublishedDate(isoDate: string) {
  const parsedDate = new Date(isoDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return isoDate;
  }

  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export default function HomePage({ articles, fetchError }: HomePageProps) {
  return (
    <>
      <Head>
        <title>AI Forge · Home Feed</title>
        <meta name="description" content="A community feed of recent AI Forge articles." />
      </Head>

      <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">AI Forge</p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Homepage Feed</h1>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">Browse the latest community articles from Supabase.</p>
          </header>

          {fetchError ? (
            <p className="mb-6 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">{fetchError}</p>
          ) : null}

          {articles.length === 0 ? (
            <p className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-300">No articles found.</p>
          ) : (
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.id}`}
                  className="group block rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-indigo-400/50 hover:bg-slate-900"
                >
                  <div className="mb-3 flex items-center justify-between gap-2 text-xs text-slate-400">
                    <span className="rounded-full bg-indigo-500/20 px-2 py-1 font-medium text-indigo-200">{article.category}</span>
                    <time dateTime={article.published_at}>{formatPublishedDate(article.published_at)}</time>
                  </div>

                  <h2 className="text-lg font-semibold text-white transition group-hover:text-indigo-300">{article.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{article.summary}</p>
                </Link>
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
