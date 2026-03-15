import Head from 'next/head'
import Link from 'next/link'
import TopNav from '../components/TopNav'

export default function BusinessPage() {
  return (
    <>
      <Head>
        <title>商业模式分析 · AI Forge</title>
        <meta name="description" content="分析 AI 产品的商业模式与可持续增长路径。" />
      </Head>

      <main className="min-h-screen bg-[#f3f3f3] text-black">
        <TopNav />

        <section className="px-14 pb-16">
          <div className="max-w-4xl rounded-[32px] bg-white p-10 shadow-sm">
            <p className="text-sm text-gray-500">商业模式分析</p>
            <h1 className="mt-3 text-4xl font-semibold">拆解你的收入模型与增长飞轮</h1>
            <p className="mt-5 text-base text-gray-700 leading-7">
              通过订阅、按量付费、企业服务等常见模式对比，
              帮你找到更适合当前产品阶段的定价策略与渠道组合，建立可持续的业务结构。
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
