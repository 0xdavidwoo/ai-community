import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function WebsitePage() {
  const [brand, setBrand] = useState('NovaMind')
  const [description, setDescription] = useState('为中小团队提供自动化营销内容生成服务')

  return (
    <>
      <Head>
        <title>网站生成器 · AI Forge</title>
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
            <h2 className="text-3xl font-semibold">网站生成器</h2>
            <p className="mt-3 text-gray-600">输入品牌名称与描述，快速生成网站结构建议。</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                className="rounded-[24px] border border-gray-200 bg-[#fafafa] p-4 text-sm outline-none focus:border-black"
                placeholder="品牌名"
              />
              <input
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="rounded-[24px] border border-gray-200 bg-[#fafafa] p-4 text-sm outline-none focus:border-black"
                placeholder="品牌描述"
              />
            </div>

            <div className="mt-8 rounded-[24px] bg-[#fafafa] p-6">
              <h3 className="text-xl font-semibold">{brand || '你的品牌'} 网站结构建议</h3>
              <p className="mt-2 text-sm text-gray-600">定位：{description || '请填写品牌描述以生成建议。'}</p>

              <ol className="mt-5 space-y-3 text-sm text-gray-700">
                <li className="rounded-[16px] bg-white p-4"><strong>1. 首页：</strong>一句价值主张 + 核心 CTA（立即试用 / 预约演示）。</li>
                <li className="rounded-[16px] bg-white p-4"><strong>2. 产品页：</strong>核心功能模块、应用场景、前后对比效果。</li>
                <li className="rounded-[16px] bg-white p-4"><strong>3. 方案页：</strong>按行业拆分解决方案，降低理解成本。</li>
                <li className="rounded-[16px] bg-white p-4"><strong>4. 定价页：</strong>清晰展示套餐差异与常见问题。</li>
                <li className="rounded-[16px] bg-white p-4"><strong>5. 客户案例：</strong>展示真实增长数据与口碑证言。</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
