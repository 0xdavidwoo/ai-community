import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

const META: Record<string, {title: string; desc: string; placeholder: string; emoji: string; color: string}> = {
  'ai-builder': {title: 'AI 产品构建器', desc: '输入一个想法，生成完整的产品方案。', placeholder: '例如：我想做一个帮助用户管理时间的 AI 应用...', emoji: '🏗️', color: '#ffd93d'},
  'evaluate': {title: '项目评估', desc: '输入项目描述，获得市场潜力和可行性分析。', placeholder: '例如：我在做一个面向中小企业的 AI 客服工具...', emoji: '📊', color: '#6bcb77'},
  'business': {title: '商业模式分析', desc: '分析你的产品商业模式和变现路径。', placeholder: '例如：我的产品是一个 AI 写作助手，面向自媒体创作者...', emoji: '💼', color: '#c7e8ff'},
  'website': {title: '网站生成器', desc: '输入品牌信息，生成完整的网站方案。', placeholder: '例如：品牌名：造物社，定位：AI 创业者社区...', emoji: '🌐', color: '#ffd1dc'},
  'content': {title: '内容策略助手', desc: '生成内容日历、选题方向和传播策略。', placeholder: '例如：我的产品是 AI 工具导航，目标用户是 AI 爱好者...', emoji: '✍️', color: '#e8d5ff'},
}

export default function SkillPage() {
  const slug = 'content'
  const meta = META[slug]
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!input.trim()) return
    setLoading(true)
    setResult('')
    const res = await fetch('/api/skill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skill: slug, input }),
    })
    const data = await res.json()
    setResult(data.result || data.error)
    setLoading(false)
  }

  return (
    <>
      <Head><title>{meta.title} · AI Forge</title></Head>
      <main className="min-h-screen bg-[#f3f3f3] text-black">
        <div className="flex justify-between items-center px-14 py-8 bg-white border-b border-gray-100">
          <Link href="/" className="text-xl font-semibold">AI Forge · 造物社</Link>
          <div className="flex gap-10 text-sm">
            <Link href="/feed">内容精选</Link>
            <Link href="/tools">工具</Link>
            <Link href="/skills" className="font-semibold">Skills</Link>
          </div>
          <Link href="/login"><button className="bg-black text-white px-6 py-2 rounded-full text-sm">加入</button></Link>
        </div>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <Link href="/skills" className="text-sm text-gray-400 hover:text-black transition">← 返回 Skills</Link>
          <div className="mt-6 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{backgroundColor: meta.color}}>{meta.emoji}</div>
          <h1 className="mt-4 text-4xl font-semibold">{meta.title}</h1>
          <p className="mt-2 text-gray-500">{meta.desc}</p>
          <div className="mt-8 bg-white rounded-[24px] p-6">
            <label className="block text-sm font-medium mb-2">描述你的情况</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={meta.placeholder}
              className="w-full border border-gray-200 rounded-xl p-4 text-sm h-32 resize-none outline-none focus:border-black transition"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 bg-black text-white px-8 py-3 rounded-full text-sm disabled:opacity-50"
            >
              {loading ? '分析中...' : '开始分析 →'}
            </button>
          </div>
          {result && (
            <div className="mt-6 bg-white rounded-[24px] p-6">
              <p className="text-sm font-medium mb-3">AI 分析结果</p>
              <p className="text-sm text-gray-700 leading-8 whitespace-pre-line">{result}</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
