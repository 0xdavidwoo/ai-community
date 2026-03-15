import Head from 'next/head'
import Link from 'next/link'
import type { GetServerSideProps } from 'next'
import { createClient } from '@supabase/supabase-js'

type Article = {
  id: string
  title: string
  category: string
  summary: string
  published_at: string
  content: string
}

type Props = {
  article: Article | null
  fetchError: string | null
}

function formatDate(isoDate: string) {
  const d = new Date(isoDate)
  if (Number.isNaN(d.getTime())) return isoDate
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function ArticlePage({ article, fetchError }: Props) {
  if (!article) {
    return (
      <main className="min-h-screen bg-[#f3f3f3] flex items-center justify-center">
        <div className="bg-white rounded-[24px] p-10 text-center">
          <p className="text-gray-500">{fetchError ?? '文章不存在'}</p>
          <Link href="/feed" className="mt-4 inline-block text-sm font-medium text-black underline">← 返回内容精选</Link>
        </div>
      </main>
    )
  }

  return (
    <>
      <Head>
        <title>{article.title} · AI Forge</title>
        <meta name="description" content={article.summary} />
      </Head>
      <main className="min-h-screen bg-[#f3f3f3] text-black">

        <div className="flex justify-between items-center px-14 py-8 bg-white border-b border-gray-100">
          <Link href="/" className="text-xl font-semibold">AI Forge · 造物社</Link>
          <div className="flex gap-10 text-sm">
            <Link href="/feed" className="font-semibold">内容精选</Link>
            <a href="#">工具</a>
            <a href="#">社区</a>
          </div>
          <Link href="/login">
            <button className="bg-black text-white px-6 py-2 rounded-full text-sm">加入</button>
          </Link>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-12">

          <Link href="/feed" className="text-sm text-gray-400 hover:text-black transition">← 返回内容精选</Link>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600 font-medium">
              {article.category === 'tool' ? 'AI 工具' : article.category === 'news' ? '行业资讯' : '社区产品'}
            </span>
            <span className="text-xs text-gray-400">{formatDate(article.published_at)}</span>
          </div>

          <h1 className="mt-4 text-4xl font-semibold leading-tight">{article.title}</h1>

          {article.summary && (
            <div className="mt-6 bg-white rounded-[20px] p-6 border-l-4 border-[#ff6b6b]">
              <p className="text-sm text-gray-500 mb-1">编辑推荐</p>
              <p className="text-base text-gray-700 leading-relaxed">{article.summary}</p>
            </div>
          )}

          <div className="mt-8 bg-white rounded-[24px] p-8">
            <p className="text-base text-gray-700 leading-8 whitespace-pre-line">{article.content}</p>
          </div>

        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const articleId = typeof params?.id === 'string' ? params.id : ''
  if (!articleId) return { props: { article: null, fetchError: '无效的文章 ID' } }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseAnonKey) return { props: { article: null, fetchError: 'Supabase 未配置' } }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabase
    .from('articles')
    .select('id,title,category,summary,published_at,content')
    .eq('id', articleId)
    .maybeSingle()

  if (error || !data) return { props: { article: null, fetchError: '文章未找到' } }
  return { props: { article: data as Article, fetchError: null } }
}
