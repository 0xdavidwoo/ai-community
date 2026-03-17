import Head from 'next/head'
import Link from 'next/link'

const SKILLS = [
  {
    slug: 'ai-start',
    title: 'AI 启动助手',
    description: '不知道从哪里开始？告诉我你想做什么，我帮你选最合适的 AI 工具组合。',
    color: '#ff6b6b',
    emoji: '🚀',
  },
  {
    slug: 'ai-builder',
    title: 'AI 产品构建器',
    description: '输入一个想法，生成完整的产品方案、技术栈建议和开发路线图。',
    color: '#ffd93d',
    emoji: '🏗️',
  },
  {
    slug: 'evaluate',
    title: '项目评估',
    description: '输入你的项目描述，获得市场潜力、竞争分析和可行性评分。',
    color: '#6bcb77',
    emoji: '📊',
  },
  {
    slug: 'business',
    title: '商业模式分析',
    description: '分析你的产品商业模式，找出收入来源、目标用户和核心竞争优势。',
    color: '#c7e8ff',
    emoji: '💼',
  },
  {
    slug: 'website',
    title: '网站生成器',
    description: '输入品牌名和描述，生成完整的网站结构、文案和设计建议。',
    color: '#ffd1dc',
    emoji: '🌐',
  },
  {
    slug: 'content',
    title: '内容策略助手',
    description: '分析你的目标受众，生成内容日历、选题方向和传播策略。',
    color: '#e8d5ff',
    emoji: '✍️',
  },
]

export default function SkillsPage() {
  return (
    <>
      <Head>
        <title>Skills · AI Forge</title>
        <meta name="description" content="AI Forge 技能工具箱" />
      </Head>
      <main className="min-h-screen bg-[#f3f3f3] text-black">
        <div className="flex justify-between items-center px-14 py-8 bg-white border-b border-gray-100">
          <Link href="/" className="text-xl font-semibold">AI Forge · 造物社</Link>
          <div className="flex gap-10 text-sm">
            <Link href="/feed">内容精选</Link>
            <Link href="/tools">工具</Link>
            <Link href="/skills" className="font-semibold">Skills</Link>
            <a href="#">社区</a>
          </div>
          <Link href="/login">
            <button className="bg-black text-white px-6 py-2 rounded-full text-sm">加入</button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12">
          <p className="text-sm text-gray-400 mb-2">工具箱</p>
          <h1 className="text-4xl font-semibold mb-2">Skills</h1>
          <p className="text-gray-500 mb-10">选择一个技能，让 AI 帮你完成具体任务。</p>

          <div className="grid md:grid-cols-3 gap-4">
            {SKILLS.map((skill) => (
              <Link
                key={skill.slug}
                href={`/skills/${skill.slug}`}
                className="block bg-white rounded-[24px] p-6 hover:shadow-md transition group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ backgroundColor: skill.color }}
                >
                  {skill.emoji}
                </div>
                <h2 className="text-lg font-semibold group-hover:text-[#ff6b6b] transition">{skill.title}</h2>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{skill.description}</p>
                <p className="mt-4 text-xs text-gray-400 group-hover:text-[#ff6b6b] transition">开始使用 →</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
