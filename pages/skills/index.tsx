import Head from 'next/head'
import Link from 'next/link'

const skills = [
  {
    title: 'AI 启动助手',
    description: '回答“我该用什么 AI 工具”，基于场景给出起步建议。',
    href: '/skills/ai-start',
  },
  {
    title: 'AI 产品构建器',
    description: '输入一个点子，快速生成产品定位、功能模块和路线图。',
    href: '/skills/ai-builder',
  },
  {
    title: '项目评估',
    description: '用结构化维度评估项目创业潜力，输出评分与改进建议。',
    href: '/skills/evaluate',
  },
  {
    title: '商业模式分析',
    description: '梳理收入来源、目标用户与竞争优势，明确商业闭环。',
    href: '/skills/business',
  },
  {
    title: '网站生成器',
    description: '输入品牌名和描述，生成网站结构与内容建议。',
    href: '/skills/website',
  },
  {
    title: '技能组合器',
    description: '组合多个 Skill 形成完整工作流，适合团队协作场景。',
    href: '/feed',
  },
]

export default function SkillsIndexPage() {
  return (
    <>
      <Head>
        <title>Skills · AI Forge</title>
        <meta name="description" content="AI Forge Skills 工具总览" />
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
          <Link href="/skills" className="mb-6 inline-block text-sm text-gray-600 hover:text-black">
            ← 返回 /skills
          </Link>

          <div className="rounded-[32px] bg-white p-6 md:p-10">
            <div className="mb-8">
              <p className="text-sm text-gray-500">Skills</p>
              <h2 className="mt-2 text-3xl font-semibold md:text-4xl">AI 能力模块总览</h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {skills.map((skill) => (
                <div key={skill.title} className="flex min-h-[220px] flex-col justify-between rounded-[24px] border border-gray-100 bg-[#fafafa] p-6">
                  <div>
                    <h3 className="text-xl font-semibold">{skill.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{skill.description}</p>
                  </div>
                  <Link href={skill.href} className="mt-6 inline-flex w-fit rounded-full bg-black px-5 py-2 text-sm text-white">
                    进入
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
