import Head from 'next/head'
import Link from 'next/link'
import TopNav from '../components/TopNav'

export default function AIBuilderPage() {
  return (
    <>
      <Head>
        <title>AI 产品构建器 · AI Forge</title>
        <meta name="description" content="在统一仪表板中规划并推进 AI 产品构建流程。" />
      </Head>

      <main className="min-h-screen bg-[#f3f3f3] text-black">
        <TopNav />

        <section className="px-14 pb-16">
          <div className="max-w-4xl rounded-[32px] bg-white p-10 shadow-sm">
            <p className="text-sm text-gray-500">AI 产品构建器</p>
            <h1 className="mt-3 text-4xl font-semibold">从想法到上线的一站式工具仪表板</h1>
            <p className="mt-5 text-base text-gray-700 leading-7">
              在这里你可以管理需求、生成原型、追踪功能进度与发布计划。
              页面聚合了产品开发常用的 AI 能力，让独立开发者也能快速推进构建流程。
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
