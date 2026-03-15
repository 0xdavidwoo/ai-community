import Head from 'next/head'
import Link from 'next/link'
import TopNav from '../components/TopNav'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>AI Forge · 造物社</title>
        <meta name="description" content="Build AI products together" />
      </Head>
      <main className="bg-[#f3f3f3] text-black">

        <TopNav />

        {/* Hero 卡片网格 */}
        <section className="px-14 pb-16 grid md:grid-cols-3 gap-6 auto-rows-[260px]">

          <div className="md:col-span-2 row-span-2 rounded-[40px] bg-[#ff6b6b] text-white p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-6xl font-semibold leading-tight">
                用 AI<br/>一起造<br/>好产品
              </h2>
              <p className="mt-6 max-w-md text-white/90">
                发现工具、结识创造者，在这里启动你的 AI 实验。
              </p>
            </div>
            <Link href="/feed">
              <button className="bg-white text-black px-6 py-3 rounded-full w-fit">开始探索</button>
            </Link>
          </div>

          <div className="rounded-[32px] overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-semibold">AI 实验</h3>
            </div>
          </div>

          <div className="rounded-[32px] bg-[#ffd93d] p-8 flex flex-col justify-between">
            <h3 className="text-2xl font-semibold">发现 AI 工具</h3>
            <p className="text-sm">探索创作者和开发者正在使用的 AI 工具。</p>
          </div>

          <div className="rounded-[32px] overflow-hidden relative group row-span-2">
            <img
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-semibold">创造者项目</h3>
            </div>
          </div>

          <div className="rounded-[32px] bg-[#6bcb77] p-8 flex flex-col justify-between">
            <h3 className="text-2xl font-semibold">社区</h3>
            <p className="text-sm">加入正在打造 AI 产品的创业者和独立开发者。</p>
          </div>

          <div className="rounded-[32px] overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1677442135136-760c813028c0?auto=format&fit=crop&w=1200&q=80"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-semibold">每周分享</h3>
            </div>
          </div>

        </section>

        {/* 内容精选入口 */}
        <section className="px-14 py-20 bg-white">
          <div className="mb-10">
            <p className="text-sm text-gray-500 mb-2">精选</p>
            <h3 className="text-4xl font-semibold">内容精选</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-[28px] bg-[#f6f6f6] p-8 hover:scale-[1.02] transition">
              <h4 className="text-xl font-semibold">AI 工具测评</h4>
              <p className="text-sm text-gray-600 mt-3">最新 AI 工具深度体验报告。</p>
            </div>
            <div className="rounded-[28px] bg-[#f6f6f6] p-8 hover:scale-[1.02] transition">
              <h4 className="text-xl font-semibold">行业资讯</h4>
              <p className="text-sm text-gray-600 mt-3">AI 行业最新动态与趋势分析。</p>
            </div>
            <div className="rounded-[28px] bg-[#f6f6f6] p-8 hover:scale-[1.02] transition">
              <h4 className="text-xl font-semibold">社区产品案例</h4>
              <p className="text-sm text-gray-600 mt-3">成员用 AI 做出来的真实产品。</p>
            </div>
          </div>
          <div className="mt-10">
            <Link href="/feed">
              <button className="bg-black text-white px-8 py-3 rounded-full">查看全部内容 →</button>
            </Link>
          </div>
        </section>

        {/* 大字品牌区 */}
        <section className="h-[60vh] flex items-center justify-center bg-black text-white">
          <h1 className="text-[120px] font-semibold tracking-tight">AI Forge</h1>
        </section>

      </main>
    </>
  )
}
