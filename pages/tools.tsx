import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import TopNav from '../components/TopNav'
import { supabase } from '../lib/supabaseClient'

type Tool = {
  id: string | number
  name: string
  description: string | null
  link: string | null
}

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    const loadTools = async () => {
      if (!supabase) {
        setError('Supabase environment variables are missing.')
        setLoading(false)
        return
      }

      const { data, error: fetchError } = await supabase
        .from('tools')
        .select('id, name, description, link')
        .order('name')

      if (ignore) {
        return
      }

      if (fetchError) {
        setError(fetchError.message)
        setTools([])
      } else {
        setTools((data ?? []) as Tool[])
      }

      setLoading(false)
    }

    loadTools()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <>
      <Head>
        <title>AI 工具目录 · AI Forge</title>
        <meta name="description" content="浏览 AI Forge 社区收录的 AI 工具。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-[#f3f3f3] text-black">
        <TopNav />

        <section className="px-14 pb-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">AI 工具目录</p>
              <h1 className="mt-3 text-4xl font-semibold">发现适合你的 AI 工具</h1>
              <p className="mt-3 max-w-2xl text-base text-gray-700">
                收录社区常用的 AI 产品，支持按名称快速浏览并跳转到官网体验。
              </p>
            </div>
            <Link href="/" className="rounded-full bg-black px-6 py-3 text-sm text-white">
              返回首页
            </Link>
          </div>

          {loading ? (
            <div className="rounded-[28px] bg-white p-8 text-center text-gray-600 shadow-sm">正在加载工具列表…</div>
          ) : error ? (
            <div className="rounded-[28px] bg-white p-8 text-center text-red-500 shadow-sm">加载失败：{error}</div>
          ) : tools.length === 0 ? (
            <div className="rounded-[28px] bg-white p-8 text-center text-gray-600 shadow-sm">暂无工具，稍后再来看看。</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <article key={tool.id} className="rounded-[24px] bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">{tool.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{tool.description || '暂无描述。'}</p>
                  {tool.link ? (
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex rounded-full bg-black px-4 py-2 text-sm text-white"
                    >
                      访问工具
                    </a>
                  ) : (
                    <p className="mt-5 text-sm text-gray-400">暂无可用链接。</p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}
