import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function AIStartPage() {
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
      body: JSON.stringify({ skill: 'ai-start', input }),
    })
    const data = await res.json()
    setResult(data.result || data.error)
    setLoading(false)
  }

  return (
    <>
      <Head><title>AI 启动助手 · AI Forge</title></Head>
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
          <div className="mt-6 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-[#ff6b6b]">🚀</div>
          <h1 className="mt-4 text-4xl font-semibold">AI 启动助手</h1>
          <p className="mt-2 text-gray-500">告诉我你想做什么，我帮你推荐最合适的 AI 工具组合。</p>
          <div className="mt-8 bg-white rounded-[24px] p-6">
            <label className="block text-sm font-medium mb-2">你想做什么？</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="例如：我想做一个 AI 播客，每天自动生成内容..."
              className="w-full border border-gray-200 rounded-xl p-4 text-sm h-32 resize-none outline-none focus:border-black transition"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 bg-black text-white px-8 py-3 rounded-full text-sm disabled:opacity-50"
            >
              {loading ? '分析中...' : '获取建议 →'}
            </button>
          </div>
          {result && (
            <div className="mt-6 bg-white rounded-[24px] p-6">
              <p className="text-sm font-medium mb-3">AI 建议</p>
              <p className="text-sm text-gray-700 leading-8 whitespace-pre-line">{result}</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
