import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { articles } from '../../lib/articles';

export default function ArticleDetailPage() {
  const router = useRouter();
  const articleId = typeof router.query.id === 'string' ? router.query.id : '';
  const article = articles.find((item) => item.id === articleId);

  if (!article) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Article not found.</p>
          <Link href="/" className="mt-3 inline-block text-sm font-medium text-indigo-700 hover:text-indigo-600">
            ← Back to feed
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{article.title} | AI Community</title>
        <meta name="description" content={article.summary} />
      </Head>

      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
        <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <Link href="/" className="text-sm font-medium text-indigo-700 hover:text-indigo-600">
            ← Back to feed
          </Link>
          <p className="mt-4 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            {article.category}
          </p>
          <h1 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">{article.title}</h1>
          <p className="mt-3 text-sm text-slate-500">Published {article.publishedAt}</p>
          <p className="mt-6 text-base leading-7 text-slate-700">{article.content}</p>
        </article>
      </main>
    </>
  );
}
