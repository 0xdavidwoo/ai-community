import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function AIBuilderPage() {
  const [idea, setIdea] = useState('一个帮助小红书博主批量生成选题和脚本的 AI 助手')

  return (
    <>
      <Head>
        <title>AI 产品构建器 · AI Forge</title>
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
            <h2 className="text-3xl font-semibold">AI 产品构建器</h2>
            <p className="mt-3 text-gray-600">输入一个想法，即可生成产品方案。下方采用工具仪表板布局展示关键模块。</p>

            <textarea
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              className="mt-6 min-h-[120px] w-full rounded-[24px] border border-gray-200 bg-[#fafafa] p-4 text-sm outline-none focus:border-black"
              placeholder="输入你的 AI 产品想法..."
            />

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              <div className="rounded-[24px] bg-[#fafafa] p-5 lg:col-span-2">
                <p className="text-xs text-gray-500">产品定位</p>
                <h3 className="mt-2 text-xl font-semibold">AI 内容增长助手</h3>
                <p className="mt-3 text-sm leading-6 text-gray-700">
                  围绕「{idea || '你的想法'}」构建“洞察 + 生成 + 分发”一体化体验，聚焦内容团队与独立创作者。
                </p>
              </div>
              <div className="rounded-[24px] bg-black p-5 text-white">
                <p className="text-xs text-white/70">MVP 周期</p>
                <p className="mt-2 text-3xl font-semibold">4 周</p>
                <p className="mt-3 text-sm text-white/80">第 1 周验证需求，第 2-3 周开发核心流程，第 4 周灰度上线。</p>
              </div>

              <div className="rounded-[24px] bg-[#fafafa] p-5">
                <p className="text-xs text-gray-500">核心功能</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  <li>• 选题建议与热度预测</li>
                  <li>• 一键生成脚本/封面文案</li>
                  <li>• 发布后的数据复盘建议</li>
                </ul>
              </div>
              <div className="rounded-[24px] bg-[#fafafa] p-5">
                <p className="text-xs text-gray-500">目标用户</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  <li>• 内容运营团队</li>
                  <li>• 自媒体与品牌主</li>
                  <li>• 个人创作者</li>
                </ul>
              </div>
              <div className="rounded-[24px] bg-[#fafafa] p-5">
                <p className="text-xs text-gray-500">增长策略</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  <li>• 社区共创模板</li>
                  <li>• 免费版拉新 + Pro 订阅</li>
                  <li>• 案例内容驱动自然增长</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
