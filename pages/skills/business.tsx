import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function BusinessPage() {
  const [product, setProduct] = useState('一个 AI 客服知识库机器人')

  return (
    <>
      <Head>
        <title>商业模式分析 · AI Forge</title>
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
            <h2 className="text-3xl font-semibold">商业模式分析</h2>
            <p className="mt-3 text-gray-600">分析产品的商业模式，快速梳理收入来源、目标用户和竞争优势。</p>

            <input
              value={product}
              onChange={(event) => setProduct(event.target.value)}
              className="mt-6 w-full rounded-[24px] border border-gray-200 bg-[#fafafa] p-4 text-sm outline-none focus:border-black"
              placeholder="输入要分析的产品..."
            />

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <div className="rounded-[24px] bg-[#fafafa] p-6">
                <h3 className="text-lg font-semibold">收入来源</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li>• 订阅费（按座席/调用量）</li>
                  <li>• 企业定制部署服务</li>
                  <li>• 高级分析报表增值包</li>
                </ul>
              </div>

              <div className="rounded-[24px] bg-[#fafafa] p-6">
                <h3 className="text-lg font-semibold">目标用户</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li>• 中大型电商团队</li>
                  <li>• SaaS 与互联网客服部门</li>
                  <li>• 需要多语言支持的出海品牌</li>
                </ul>
              </div>

              <div className="rounded-[24px] bg-[#fafafa] p-6">
                <h3 className="text-lg font-semibold">竞争优势</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li>• 与业务系统深度集成能力</li>
                  <li>• 行业模板可快速上线</li>
                  <li>• 人工兜底 + AI 协同闭环</li>
                </ul>
              </div>
            </div>

            <p className="mt-8 rounded-[24px] bg-black p-4 text-sm text-white">当前分析对象：{product || '未填写产品名称'}</p>
          </div>
        </section>
      </main>
    </>
  )
}
