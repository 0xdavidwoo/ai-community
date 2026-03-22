import Head from 'next/head'
import Link from 'next/link'

import Navbar from '../components/Navbar'

const TOOLS = [
  { name: 'ChatGPT', description: 'AI 写作、编程、问答助手', link: 'https://chat.openai.com', tag: '对话' },
  { name: 'Claude', description: '长文档分析和代码生成', link: 'https://claude.ai', tag: '对话' },
  { name: 'Midjourney', description: '高质量 AI 图像生成', link: 'https://midjourney.com', tag: '图像' },
  { name: 'Cursor', description: 'AI 驱动的编程开发环境', link: 'https://cursor.sh', tag: '编程' },
  { name: 'Perplexity', description: 'AI 实时搜索引擎', link: 'https://perplexity.ai', tag: '搜索' },
  { name: 'Runway', description: 'AI 视频生成和编辑', link: 'https://runwayml.com', tag: '视频' },
  { name: 'Notion AI', description: '文档写作和整理助手', link: 'https://notion.so', tag: '效率' },
  { name: 'ElevenLabs', description: 'AI 语音克隆和合成', link: 'https://elevenlabs.io', tag: '音频' },
  { name: 'Vercel v0', description: 'AI 生成前端 UI 组件', link: 'https://v0.dev', tag: '编程' },
]

type Tool = { name: string; description: string; link: string; tag: string }

export default function ToolsPage() {
  return (
    <>
      <Head>
        <title>AI 工具目录 · AI Forge</title>
        <meta name="description" content="社区常用 AI 工具收录" />
      </Head>
      <main className="min-h-screen bg-[#f3f3f3] text-black">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 py-12">
          <p className="text-sm text-gray-400 mb-2">探索</p>
          <h1 className="text-4xl font-semibold mb-2">AI 工具目录</h1>
          <p className="text-gray-500 mb-10">收录社区常用的 AI 产品，点击跳转官网体验。</p>
          <div className="grid md:grid-cols-3 gap-4">
            {TOOLS.map((tool: Tool) => (
              <a key={tool.name} href={tool.link} target="_blank" rel="noreferrer" className="block bg-white rounded-[24px] p-6 hover:shadow-md transition group">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold group-hover:text-[#ff6b6b] transition">{tool.name}</h2>
                  <span className="text-xs px-2 py-1 rounded-full bg-[#f3f3f3] text-gray-500">{tool.tag}</span>
                </div>
                <p className="text-sm text-gray-500">{tool.description}</p>
                <p className="mt-4 text-xs text-gray-400 group-hover:text-[#ff6b6b] transition">访问 →</p>
              </a>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
