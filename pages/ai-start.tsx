import Head from 'next/head'
import Link from 'next/link'
import TopNav from '../components/TopNav'

export default function AIStartPage() {
  return (
    <>
      <Head>
        <title>AI 启动助手 · AI Forge</title>
        <meta name="description" content="帮助你快速选择适合当前阶段的 AI 工具组合。" />
      </Head>

      <main className="min-h-screen bg-[#f3f3f3] text-black">
        <TopNav />

        <section className="px-14 pb-16">
          <div className="max-w-4xl rounded-[32px] bg-white p-10 shadow-sm">
            <p className="text-sm text-gray-500">AI 启动助手</p>
            <h1 className="mt-3 text-4xl font-semibold">找到最适合你的 AI 工具起步方案</h1>
            <p className="mt-5 text-base text-gray-700 leading-7">
              根据你的目标（内容创作、产品设计、自动化开发、数据分析），系统将推荐最合适的工具组合，
              并提供可执行的第一周启动建议，帮助你更快进入实战。
            </p>
            <Link href="/" className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm text-white">
              返回首页
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
