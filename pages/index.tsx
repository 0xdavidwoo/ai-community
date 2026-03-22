import { useState } from 'react'

const navLinks = [
  { href: '/feed', label: '内容精选' },
  { href: '/skills', label: 'Skills' },
  { href: '/tools', label: '工具' },
  { href: '#', label: '社区' },
]

const mobileMenuLinks = [...navLinks, { href: '#join', label: '加入' }]

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
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="overflow-x-hidden bg-[#f3f3f3] text-black">
      {/* NAVBAR */}
      <div className="relative px-6 py-8 sm:px-14">
        <div className="flex items-center justify-between gap-4 md:hidden">
          <h1 className="text-xl font-semibold">AI Forge</h1>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-2xl leading-none"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? '×' : '☰'}
          </button>
        </div>

        <div className="hidden items-center justify-between gap-4 md:flex">
          <h1 className="text-xl font-semibold">AI Forge</h1>

          <div className="flex gap-10 text-sm">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <button
            id="join"
            className="rounded-full bg-black px-6 py-2 text-sm text-white"
          >
            Join
          </button>
        </div>

        {menuOpen && (
          <div className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center md:hidden">
            <button
              type="button"
              className="absolute right-6 top-8 text-4xl leading-none text-black"
              aria-label="关闭菜单"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>

            <nav className="flex flex-col items-center gap-8 text-3xl font-semibold">
              {mobileMenuLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* HERO + CARD GRID */}
      <section className="grid gap-6 px-6 pb-16 sm:px-14 md:auto-rows-[210px] md:grid-cols-3 lg:auto-rows-[220px]">
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

        <div className="flex min-h-[220px] flex-col justify-between rounded-[32px] bg-[#6bcb77] p-8 md:min-h-0">
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

      {/* SKILLS */}
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
            <a
              key={skill.href}
              href={skill.href}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10"
            >
              <div className="text-3xl">{skill.emoji}</div>
              <h4 className="mt-4 text-2xl font-semibold">{skill.title}</h4>
              <p className="mt-3 text-sm leading-6 text-white/70">
                {skill.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* EXPERIMENTS */}
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

            <div className="flex min-h-[200px] flex-col justify-between rounded-[32px] bg-[#ffe08a] p-8">
              <h4 className="text-2xl font-semibold">AI Video Creator</h4>

              <p className="text-sm text-gray-700">
                Generate short videos from prompts and scripts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI TOOLS */}
      <section className="px-6 py-20 sm:px-14">
        <div className="mb-10">
          <p className="mb-2 text-sm text-gray-500">Explore</p>
          <h3 className="text-4xl font-semibold">AI Tools</h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[28px] bg-white p-8 shadow-sm transition hover:scale-[1.02]">
            <h4 className="text-xl font-semibold">ChatGPT</h4>

            <p className="mt-3 text-sm text-gray-600">
              AI assistant for writing, coding and research.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-sm transition hover:scale-[1.02]">
            <h4 className="text-xl font-semibold">Midjourney</h4>

            <p className="mt-3 text-sm text-gray-600">
              Generate high quality AI images.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-sm transition hover:scale-[1.02]">
            <h4 className="text-xl font-semibold">Cursor</h4>

            <p className="mt-3 text-sm text-gray-600">
              AI powered coding environment.
            </p>
          </div>
        </div>
      </section>

      {/* MORE EXPERIMENTS */}
      <section className="bg-[#f6f6f6] px-6 py-24 sm:px-14">
        <div className="mb-10">
          <p className="mb-2 text-sm text-gray-500">More</p>
          <h3 className="text-4xl font-semibold">Experiments</h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex min-h-[200px] flex-col justify-between rounded-[32px] bg-[#ffe08a] p-8">
            <h4 className="text-2xl font-semibold">AI Agent Builder</h4>
            <p className="text-sm">Create autonomous AI workflows.</p>
          </div>

          <div className="flex min-h-[200px] flex-col justify-between rounded-[32px] bg-[#c7e8ff] p-8">
            <h4 className="text-2xl font-semibold">AI Research Lab</h4>
            <p className="text-sm">Analyze papers and generate insights.</p>
          </div>

          <div className="flex min-h-[200px] flex-col justify-between rounded-[32px] bg-[#ffd1dc] p-8">
            <h4 className="text-2xl font-semibold">AI Video Studio</h4>
            <p className="text-sm">Turn prompts into short videos.</p>
          </div>
        </div>
      </section>

      {/* BUILDER PROJECTS */}
      <section className="bg-white px-6 py-24 sm:px-14">
        <div className="mb-10">
          <p className="mb-2 text-sm text-gray-500">Community</p>
          <h3 className="text-4xl font-semibold">Builder Projects</h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-[36px] bg-[#f6f6f6]">
            <div className="group relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
                className="h-[280px] w-full object-cover transition duration-500 group-hover:scale-105"
                alt="AI Podcast Builder"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-3xl font-semibold">AI Podcast Builder</h4>
              </div>
            </div>

            <div className="p-8">
              <p className="max-w-lg text-gray-600">
                Automatically generate podcast scripts, voices and publish
                episodes.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[36px] bg-[#f6f6f6]">
            <div className="group relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1677442135136-760c813028c0?auto=format&fit=crop&w=1200&q=80"
                className="h-[280px] w-full object-cover transition duration-500 group-hover:scale-105"
                alt="AI Tool Navigator"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-3xl font-semibold">AI Tool Navigator</h4>
              </div>
            </div>

            <div className="p-8">
              <p className="max-w-lg text-gray-600">
                Discover and compare the best AI tools for productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HUGE BRAND */}
      <section className="flex h-[80vh] items-center justify-center bg-black px-6 text-white sm:px-14">
        <h1 className="text-center text-[60px] font-semibold leading-none tracking-tight sm:text-[120px] lg:text-[180px]">
          AI Forge
        </h1>
      </section>
    </main>
  )
}
