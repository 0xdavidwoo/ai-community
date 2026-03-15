import Head from 'next/head'
import Link from 'next/link'
import TopNav from '../components/TopNav'

export default function EvaluatePage() {
  return (
    <>
      <Head>
        <title>项目评估 · AI Forge</title>
        <meta name="description" content="评估你的 AI 创业项目潜力与落地优先级。" />
      </Head>

      <main className="min-h-screen bg-[#f3f3f3] text-black">
        <TopNav />

        <section className="px-14 pb-16">
          <div className="max-w-4xl rounded-[32px] bg-white p-10 shadow-sm">
            <p className="text-sm text-gray-500">项目评估</p>
            <h1 className="mt-3 text-4xl font-semibold">评估创业项目的真实增长潜力</h1>
            <p className="mt-5 text-base text-gray-700 leading-7">
              从市场规模、目标用户、竞争格局和变现能力四个维度，
              快速识别项目机会与风险，帮助你判断是否值得继续投入开发资源。
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
