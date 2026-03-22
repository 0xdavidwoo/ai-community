import { createClient } from '@supabase/supabase-js';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Navbar from '../../components/Navbar';

type Article = {
  id: string;
  title: string;
  category: string;
  published_at: string;
  content: string;
};

type ArticleDetailPageProps = {
  article: Article | null;
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

export default function ArticleDetailPage({ article, fetchError }: ArticleDetailPageProps) {
  if (!article) {
    return (
      <>
        <Head>
          <title>Article Not Found | AI Forge</title>
          <meta name="description" content="The requested article could not be loaded." />
        </Head>

        <main className="min-h-screen bg-slate-950 text-slate-100">
          <Navbar />
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <p className="text-sm text-slate-300">{fetchError ?? 'Article not found.'}</p>
              <Link href="/" className="mt-4 inline-block text-sm font-medium text-indigo-300 hover:text-indigo-200">
                ← Back to feed
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{article.title} | AI Forge</title>
        <meta name="description" content={article.content.slice(0, 140)} />
      </Head>

      <main className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar />
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
            <Link href="/" className="text-sm font-medium text-indigo-300 hover:text-indigo-200">
              ← Back to feed
            </Link>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span className="rounded-full bg-indigo-500/20 px-3 py-1 font-semibold uppercase tracking-wide text-indigo-200">
                {article.category}
              </span>
              <time dateTime={article.published_at}>{formatPublishedDate(article.published_at)}</time>
            </div>

            <h1 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">{article.title}</h1>
            <p className="mt-6 whitespace-pre-line text-base leading-7 text-slate-200">{article.content}</p>
          </article>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ArticleDetailPageProps> = async ({ params }) => {
  const articleId = typeof params?.id === 'string' ? params.id : '';

  if (!articleId) {
    return {
      props: {
        article: null,
        fetchError: 'Invalid article id.'
      }
    };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      props: {
        article: null,
        fetchError: 'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
      }
    };
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from('articles')
    .select('id,title,category,published_at,content')
    .eq('id', articleId)
    .maybeSingle();

  if (error) {
    return {
      props: {
        article: null,
        fetchError: `Failed to load article: ${error.message}`
      }
    };
  }

  if (!data) {
    return {
      props: {
        article: null,
        fetchError: 'Article not found.'
      }
    };
  }

  return {
    props: {
      article: data as Article,
      fetchError: null
    }
  };
};
