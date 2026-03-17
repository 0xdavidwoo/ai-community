import Head from 'next/head'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export default function EvaluatePage() {
  const [project, setProject] = useState('做一个给跨境卖家自动生成商品详情页的 AI SaaS')

  const score = useMemo(() => {
    const len = project.trim().length
    if (len < 10) return 62
    if (len < 25) return 74
    if (len < 45) return 83
    return 88
  }, [project])

  return (
    <>
      <Head>
        <title>项目评估 · AI Forge</title>
      </Head>
      <main className="min-h-screen bg-[#f3f3f3] text-black">
        <div className="flex flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-14 md:py-8">
          <h1 className="text-xl font-semibold">AI Forge · 造物社</h1>
          <div className="flex flex-wrap gap-6 text-sm md:gap-10">
            <Link href="/feed">内容精选</Link>
            <Link href="/skills">工具</Link>
            <a href="#">项目</a>
            <a href="#">社区</a>
          </div>
          <Link href="/login">
            <button className="w-fit rounded-full bg-black px-6 py-2 text-sm text-white">加入</button>
          </Link>
        </div>

        <section className="px-6 pb-16 md:px-14">
          <Link href="/skills" className="mb-6 inline-block text-sm text-gray-600 hover:text-black">← 返回 /skills</Link>

          <div className="rounded-[32px] bg-white p-6 md:p-10">
            <h2 className="text-3xl font-semibold">项目评估</h2>
            <p className="mt-3 text-gray-600">输入项目描述，系统将从需求强度、差异化和商业化路径给出创业潜力评分。</p>

            <textarea
              value={project}
              onChange={(event) => setProject(event.target.value)}
              className="mt-6 min-h-[120px] w-full rounded-[24px] border border-gray-200 bg-[#fafafa] p-4 text-sm outline-none focus:border-black"
              placeholder="输入你的项目描述..."
            />

            <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_2fr]">
              <div className="rounded-[24px] bg-black p-6 text-white">
                <p className="text-sm text-white/70">综合评分</p>
                <p className="mt-2 text-5xl font-semibold">{score}</p>
                <p className="mt-3 text-sm text-white/80">/ 100</p>
              </div>

              <div className="rounded-[24px] bg-[#fafafa] p-6">
                <h3 className="text-xl font-semibold">建议</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700">
                  <li>• 先聚焦一个细分用户群（如中腰部商家），缩短验证周期。</li>
                  <li>• 明确可量化价值指标（转化率、生产效率），作为核心卖点。</li>
                  <li>• 采用“免费试用 + 专业版订阅”策略，降低初次使用门槛。</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
