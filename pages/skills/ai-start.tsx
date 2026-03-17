import Head from 'next/head'
import Link from 'next/link'
import { useMemo, useState } from 'react'

const options = [
  { key: 'writing', label: '写作/内容创作' },
  { key: 'coding', label: '编程/开发' },
  { key: 'design', label: '设计/视觉' },
  { key: 'research', label: '调研/学习' },
]

const toolMap: Record<string, string[]> = {
  writing: ['ChatGPT / Claude：写作框架与润色', 'Notion AI：文档整理与总结', 'Perplexity：检索与事实核对'],
  coding: ['ChatGPT / Claude：代码生成与重构', 'GitHub Copilot：IDE 实时代码建议', 'Cursor：AI 代码工作流'],
  design: ['Midjourney：风格图像生成', 'Canva AI：海报/社媒图设计', 'Figma AI：界面草图与文案建议'],
  research: ['Perplexity：快速调研', 'ChatGPT：结构化提问与总结', 'NotebookLM：资料问答与归纳'],
}

export default function AIStartPage() {
  const [selected, setSelected] = useState('writing')
  const recommendations = useMemo(() => toolMap[selected] ?? [], [selected])

  return (
    <>
      <Head>
        <title>AI 启动助手 · AI Forge</title>
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
            <h2 className="text-3xl font-semibold">AI 启动助手</h2>
            <p className="mt-3 text-gray-600">不知道从哪里开始？先选择你的目标场景，系统会给出工具组合建议。</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
              <div className="rounded-[24px] bg-[#f7f7f7] p-5">
                <p className="mb-3 text-sm text-gray-500">你当前最想做什么？</p>
                <div className="space-y-3">
                  {options.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setSelected(item.key)}
                      className={`w-full rounded-[16px] px-4 py-3 text-left text-sm transition ${selected === item.key ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] bg-[#fafafa] p-6">
                <h3 className="text-xl font-semibold">推荐工具清单</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700">
                  {recommendations.map((item) => (
                    <li key={item} className="rounded-[16px] bg-white p-4">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
