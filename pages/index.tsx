export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#f3f3f3] text-black">
      {/* NAVBAR */}
      <div className="flex items-center justify-between px-6 py-8 sm:px-14">
        <h1 className="text-xl font-semibold">AI Forge</h1>

        <div className="hidden gap-10 text-sm sm:flex">
          <a href="/feed">内容精选</a>
          <a href="/skills">Skills</a>
          <a href="/tools">工具</a>
          <a href="#">社区</a>
        </div>

        <button className="rounded-full bg-black px-6 py-2 text-sm text-white">
          Join
        </button>
      </div>

      {/* HERO + CARD GRID */}
      <section className="grid auto-rows-[260px] gap-6 px-6 pb-16 md:grid-cols-3 sm:px-14">
        <div className="row-span-2 flex flex-col justify-between rounded-[40px] bg-[#ff6b6b] p-8 text-white sm:p-12 md:col-span-2">
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

          <button className="w-fit rounded-full bg-white px-6 py-3 text-black">
            Start Exploring
          </button>
        </div>

        <div className="group relative overflow-hidden rounded-[32px]">
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            alt="AI Experiments"
          />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">AI Experiments</h3>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[32px] bg-[#ffd93d] p-8">
          <h3 className="text-2xl font-semibold">Discover AI Tools</h3>

          <p className="text-sm">
            Explore powerful AI tools used by creators and developers.
          </p>
        </div>

        <div className="group relative overflow-hidden rounded-[32px] md:row-span-2">
          <img
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            alt="Builder Projects"
          />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">Builder Projects</h3>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[32px] bg-[#6bcb77] p-8">
          <h3 className="text-2xl font-semibold">Community</h3>

          <p className="text-sm">
            Join builders creating AI startups and side projects.
          </p>
        </div>

        <div className="group relative overflow-hidden rounded-[32px]">
          <img
            src="https://images.unsplash.com/photo-1677442135136-760c813028c0?auto=format&fit=crop&w=1200&q=80"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            alt="Weekly Sessions"
          />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">Weekly Sessions</h3>
          </div>
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
            <img
              src="https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=1200&q=80"
              className="h-[300px] w-full object-cover"
              alt="AI Podcast Generator"
            />

            <div className="p-8">
              <h4 className="text-3xl font-semibold">AI Podcast Generator</h4>

              <p className="mt-3 max-w-lg text-gray-600">
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
            <img
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
              className="h-[280px] w-full object-cover"
              alt="AI Podcast Builder"
            />

            <div className="p-8">
              <h4 className="text-3xl font-semibold">AI Podcast Builder</h4>

              <p className="mt-3 max-w-lg text-gray-600">
                Automatically generate podcast scripts, voices and publish
                episodes.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[36px] bg-[#f6f6f6]">
            <img
              src="https://images.unsplash.com/photo-1677442135136-760c813028c0?auto=format&fit=crop&w=1200&q=80"
              className="h-[280px] w-full object-cover"
              alt="AI Tool Navigator"
            />

            <div className="p-8">
              <h4 className="text-3xl font-semibold">AI Tool Navigator</h4>

              <p className="mt-3 max-w-lg text-gray-600">
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
