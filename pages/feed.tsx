import Head from 'next/head'
import Link from 'next/link'

import Navbar from '../components/Navbar'
import type { GetServerSideProps } from 'next'
import { createClient } from '@supabase/supabase-js'

type Article = {
  id: string
  title: string
  category: string
  summary: string
  published_at: string
}

type FeedPageProps = {
  articles: Article[]
  fetchError: string | null
}

const CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'tool', label: 'AI 工具' },
  { key: 'news', label: '行业资讯' },
  { key: 'product', label: '社区产品' },
]

function formatDate(isoDate: string) {
  const d = new Date(isoDate)
  if (Number.isNaN(d.getTime())) return isoDate
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function FeedPage({ articles, fetchError }: FeedPageProps) {
  return (
    <>
      <Head>
        <title>内容精选 · AI Forge</title>
        <meta name="description" content="AI Forge 社区精选内容" />
      </Head>
      <main className="min-h-screen bg-[#f3f3f3] text-black">

        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-12">

          <h1 className="text-4xl font-semibold mb-2">内容精选</h1>
          <p className="text-gray-500 mb-8">编辑精选的 AI 工具测评、行业资讯与社区产品案例</p>

          {/* 分类筛选 */}
          <div className="flex gap-3 mb-10 flex-wrap">
            {CATEGORIES.map((cat) => (
              <span
                key={cat.key}
                className="px-5 py-2 rounded-full border border-gray-200 bg-white text-sm cursor-pointer hover:bg-black hover:text-white transition"
              >
                {cat.label}
              </span>
            ))}
          </div>

          {fetchError && (
            <p className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm">{fetchError}</p>
          )}

          {/* 文章列表 */}
          {articles.length === 0 ? (
            <p className="text-gray-400 text-center py-20">暂无内容</p>
          ) : (
            <div className="grid gap-4">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.id}`}
                  className="group block bg-white rounded-[24px] p-7 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-[#f3f3f3] text-gray-600 font-medium">
                      {article.category === 'tool' ? 'AI 工具' : article.category === 'news' ? '行业资讯' : '社区产品'}
                    </span>
                    <span className="text-xs text-gray-400">{formatDate(article.published_at)}</span>
                  </div>
                  <h2 className="text-xl font-semibold group-hover:text-[#ff6b6b] transition">{article.title}</h2>
                  {article.summary && (
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">💬 {article.summary}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<FeedPageProps> = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return { props: { articles: [], fetchError: 'Supabase 未配置' } }
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabase
    .from('articles')
    .select('id,title,category,summary,published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) {
    return { props: { articles: [], fetchError: error.message } }
  }

  return { props: { articles: (data ?? []) as Article[], fetchError: null } }
}
