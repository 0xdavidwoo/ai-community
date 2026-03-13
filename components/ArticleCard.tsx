import Link from 'next/link';
import { Article } from '../data/articles';

type ArticleCardProps = {
  article: Article;
  bookmarked: boolean;
  onBookmark: (articleId: string) => void;
};

export default function ArticleCard({ article, bookmarked, onBookmark }: ArticleCardProps) {
  return (
    <article className="rounded-xl border border-slate-800 bg-card p-4">
      <div className="mb-2 flex items-center justify-between gap-2 text-xs text-slate-400">
        <span className="rounded-full bg-indigo-500/20 px-2 py-1 text-indigo-300">{article.category}</span>
        <span>{article.publishedAt}</span>
      </div>
      <h2 className="text-lg font-semibold text-white">
        <Link href={`/article/${article.id}`} className="hover:text-indigo-300">
          {article.title}
        </Link>
      </h2>
      <p className="mt-2 text-sm text-slate-300">{article.summary}</p>
      <p className="mt-3 rounded-lg bg-slate-900/70 p-3 text-sm text-slate-200">Editor: {article.editorSummary}</p>
      <div className="mt-4 flex items-center justify-between">
        <Link href={`/article/${article.id}`} className="text-sm text-indigo-300 hover:text-indigo-200">
          Read article →
        </Link>
        <button
          type="button"
          onClick={() => onBookmark(article.id)}
          className="rounded-md border border-slate-700 px-3 py-1 text-xs hover:border-indigo-300 hover:text-indigo-200"
        >
          {bookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
      </div>
    </article>
  );
}
