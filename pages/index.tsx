import Link from 'next/link'

import Navbar from '../components/Navbar'

const skillCards = [
  {
    href: '/skills/ai-start',
    emoji: '🚀',
    title: 'AI Start',
    description: '快速梳理从想法到落地的 AI 项目启动路径。',
  },
  {
    href: '/skills/ai-builder',
    emoji: '🛠️',
    title: 'AI Builder',
    description: '为产品原型、自动化流程和功能搭建提供方法。',
  },
  {
    href: '/skills/evaluate',
    emoji: '📊',
    title: 'Evaluate',
    description: '建立评估标准，验证模型、提示词和工作流效果。',
  },
  {
    href: '/skills/business',
    emoji: '💼',
    title: 'Business',
    description: '把 AI 能力转成业务价值、服务方案和增长机会。',
  },
  {
    href: '/skills/website',
    emoji: '🌐',
    title: 'Website',
    description: '搭建官网、落地页与清晰的信息架构。',
  },
  {
    href: '/skills/content',
    emoji: '✍️',
    title: 'Content',
    description: '生成选题、内容框架与多渠道发布素材。',
  },
]

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#f3f3f3] text-black">
      <Navbar />

      <section className="grid gap-6 px-6 pb-16 pt-8 sm:px-14 md:auto-rows-[210px] md:grid-cols-3 lg:auto-rows-[220px]">
        <div className="flex min-h-[320px] flex-col justify-between rounded-[40px] bg-[#ff6b6b] p-8 text-white sm:p-12 md:col-span-2 md:row-span-2 md:min-h-0">
          <div>
            <h2 className="text-4xl font-semibold leading-tight sm:text-6xl">
              Build AI
              <br />
              Products
              <br />
              Together
            </h2>

            <p className="mt-6 max-w-md text-white/90">
              Discover tools, collaborate with builders, and launch real AI
              experiments.
            </p>
          </div>

          <button className="mt-8 w-fit rounded-full bg-white px-6 py-3 text-black">
            Start Exploring
          </button>
        </div>

        <div className="group relative min-h-[260px] overflow-hidden rounded-[32px] md:row-span-2 md:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            alt="AI Experiments"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">AI Experiments</h3>
          </div>
        </div>

        <div className="flex min-h-[220px] flex-col justify-between rounded-[32px] bg-[#ffd93d] p-8 md:min-h-0">
          <h3 className="text-2xl font-semibold">Discover AI Tools</h3>

          <p className="text-sm">
            Explore powerful AI tools used by creators and developers.
          </p>
        </div>

        <div id="community" className="flex min-h-[220px] flex-col justify-between rounded-[32px] bg-[#6bcb77] p-8 md:min-h-0">
          <h3 className="text-2xl font-semibold">Community</h3>

          <p className="text-sm">
            Join builders creating AI startups and side projects.
          </p>
        </div>

        <div className="group relative min-h-[280px] overflow-hidden rounded-[32px] md:row-span-2 md:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            alt="Builder Projects"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">Builder Projects</h3>
          </div>
        </div>

        <div className="group relative min-h-[220px] overflow-hidden rounded-[32px] md:col-span-2 md:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1677442135136-760c813028c0?auto=format&fit=crop&w=1200&q=80"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            alt="Weekly Sessions"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">Weekly Sessions</h3>
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-20 text-white sm:px-14">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-white/60">Featured Skills</p>
            <h3 className="mt-2 text-4xl font-semibold">Skills 工具箱</h3>
          </div>

          <p className="max-w-2xl text-sm text-white/70">
            从启动项目到业务落地，挑选最常用的六个 skill 入口，直接进入对应页面开始使用。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {skillCards.map((skill) => (
            <Link
              key={skill.href}
              href={skill.href}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10"
            >
              <div className="text-3xl">{skill.emoji}</div>
              <h4 className="mt-4 text-2xl font-semibold">{skill.title}</h4>
              <p className="mt-3 text-sm leading-6 text-white/70">
                {skill.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:px-14">
        <div className="mb-10">
          <p className="mb-2 text-sm text-gray-500">Featured</p>
          <h3 className="text-4xl font-semibold">Experiments</h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-[36px] bg-[#f6f6f6]">
            <div className="group relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=1200&q=80"
                className="h-[300px] w-full object-cover transition duration-500 group-hover:scale-105"
                alt="AI Podcast Generator"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-3xl font-semibold">AI Podcast Generator</h4>
              </div>
            </div>

            <div className="p-8">
              <p className="max-w-lg text-gray-600">
                Turn daily AI news into audio episodes with scripts, voices and
                publishing.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="flex min-h-[200px] flex-col justify-between rounded-[32px] bg-[#c7e8ff] p-8">
              <h4 className="text-2xl font-semibold">AI Research Assistant</h4>

              <p className="text-sm text-gray-700">
                Summarize articles and produce structured research notes.
              </p>
            </div>

            <div className="flex min-h-[200px] flex-col justify-between rounded-[32px] bg-[#e8d5ff] p-8">
              <h4 className="text-2xl font-semibold">Prompt Testing Lab</h4>

              <p className="text-sm text-gray-700">
                Compare prompts, evaluate outputs and iterate with your team.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
