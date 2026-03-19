export default function Home() {
  return (
    <main className="bg-[#f3f3f3] text-black">

      {/* NAVBAR */}

      <div className="flex justify-between items-center px-14 py-8">
        <h1 className="text-xl font-semibold">AI Forge</h1>

        <div className="flex gap-10 text-sm">
          <a>Experiments</a>
          <a>Projects</a>
          <a>Tools</a>
          <a>Community</a>
        </div>

        <button className="bg-black text-white px-6 py-2 rounded-full text-sm">
          Join
        </button>
      </div>



      {/* HERO + CARD GRID */}

      <section className="px-14 pb-16 grid md:grid-cols-3 gap-6 auto-rows-[260px]">

        <div className="md:col-span-2 row-span-2 rounded-[40px] bg-[#ff6b6b] text-white p-12 flex flex-col justify-between">

          <div>

            <h2 className="text-6xl font-semibold leading-tight">
              Build AI
              <br/>
              Products
              <br/>
              Together
            </h2>

            <p className="mt-6 max-w-md text-white/90">
              Discover tools, collaborate with builders,
              and launch real AI experiments.
            </p>

          </div>

          <button className="bg-white text-black px-6 py-3 rounded-full w-fit">
            Start Exploring
          </button>

        </div>


        <div className="rounded-[32px] overflow-hidden relative group">

          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">
              AI Experiments
            </h3>
          </div>

        </div>


        <div className="rounded-[32px] bg-[#ffd93d] p-8 flex flex-col justify-between">

          <h3 className="text-2xl font-semibold">
            Discover AI Tools
          </h3>

          <p className="text-sm">
            Explore powerful AI tools used by
            creators and developers.
          </p>

        </div>


        <div className="rounded-[32px] overflow-hidden relative group row-span-2">

          <img
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">
              Builder Projects
            </h3>
          </div>

        </div>


        <div className="rounded-[32px] bg-[#6bcb77] p-8 flex flex-col justify-between">

          <h3 className="text-2xl font-semibold">
            Community
          </h3>

          <p className="text-sm">
            Join builders creating AI startups
            and side projects.
          </p>

        </div>


        <div className="rounded-[32px] overflow-hidden relative group">

          <img
            src="https://images.unsplash.com/photo-1677442135136-760c813028c0?auto=format&fit=crop&w=1200&q=80"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">
              Weekly Sessions
            </h3>
          </div>

        </div>

      </section>



      {/* EXPERIMENTS */}

      <section className="px-14 py-20 bg-white">

        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-2">Featured</p>
          <h3 className="text-4xl font-semibold">Experiments</h3>
        </div>


        <div className="grid md:grid-cols-2 gap-6">

          <div className="rounded-[36px] overflow-hidden bg-[#f6f6f6]">

            <img
              src="https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=1200&q=80"
              className="w-full h-[300px] object-cover"
            />

            <div className="p-8">

              <h4 className="text-3xl font-semibold">
                AI Podcast Generator
              </h4>

              <p className="mt-3 text-gray-600 max-w-lg">
                Turn daily AI news into audio episodes
                with scripts, voices and publishing.
              </p>

            </div>

          </div>


          <div className="grid gap-6">

            <div className="rounded-[32px] bg-[#c7e8ff] p-8 min-h-[200px] flex flex-col justify-between">

              <h4 className="text-2xl font-semibold">
                AI Research Assistant
              </h4>

              <p className="text-sm text-gray-700">
                Summarize articles and produce
                structured research notes.
              </p>

            </div>


            <div className="rounded-[32px] bg-[#ffe08a] p-8 min-h-[200px] flex flex-col justify-between">

              <h4 className="text-2xl font-semibold">
                AI Video Creator
              </h4>

              <p className="text-sm text-gray-700">
                Generate short videos from
                prompts and scripts.
              </p>

            </div>

          </div>

        </div>

      </section>



      {/* AI TOOLS */}

      <section className="px-14 py-20">

        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-2">Explore</p>
          <h3 className="text-4xl font-semibold">AI Tools</h3>
        </div>


        <div className="grid md:grid-cols-3 gap-6">

          <div className="rounded-[28px] bg-white p-8 hover:scale-[1.02] transition shadow-sm">

            <h4 className="text-xl font-semibold">
              ChatGPT
            </h4>

            <p className="text-sm text-gray-600 mt-3">
              AI assistant for writing,
              coding and research.
            </p>

          </div>


          <div className="rounded-[28px] bg-white p-8 hover:scale-[1.02] transition shadow-sm">

            <h4 className="text-xl font-semibold">
              Midjourney
            </h4>

            <p className="text-sm text-gray-600 mt-3">
              Generate high quality AI images.
            </p>

          </div>


          <div className="rounded-[28px] bg-white p-8 hover:scale-[1.02] transition shadow-sm">

            <h4 className="text-xl font-semibold">
              Cursor
            </h4>

            <p className="text-sm text-gray-600 mt-3">
              AI powered coding environment.
            </p>

          </div>

        </div>

      </section>



      {/* HUGE BRAND */}

      <section className="h-[80vh] flex items-center justify-center bg-black text-white">

        <h1 className="text-[180px] font-semibold tracking-tight">
          AI Forge
        </h1>

      </section>

    </main>
  )
}
{/* MORE EXPERIMENTS */}

<section className="px-14 py-24 bg-[#f6f6f6]">

  <div className="mb-10">
    <p className="text-sm text-gray-500 mb-2">More</p>
    <h3 className="text-4xl font-semibold">Experiments</h3>
  </div>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="rounded-[32px] bg-[#ffe08a] p-8 min-h-[200px] flex flex-col justify-between">
      <h4 className="text-2xl font-semibold">AI Agent Builder</h4>
      <p className="text-sm">Create autonomous AI workflows.</p>
    </div>

    <div className="rounded-[32px] bg-[#c7e8ff] p-8 min-h-[200px] flex flex-col justify-between">
      <h4 className="text-2xl font-semibold">AI Research Lab</h4>
      <p className="text-sm">Analyze papers and generate insights.</p>
    </div>

    <div className="rounded-[32px] bg-[#ffd1dc] p-8 min-h-[200px] flex flex-col justify-between">
      <h4 className="text-2xl font-semibold">AI Video Studio</h4>
      <p className="text-sm">Turn prompts into short videos.</p>
    </div>

  </div>

</section>


{/* BUILDER PROJECTS */}

<section className="px-14 py-24 bg-white">

  <div className="mb-10">
    <p className="text-sm text-gray-500 mb-2">Community</p>
    <h3 className="text-4xl font-semibold">Builder Projects</h3>
  </div>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="rounded-[36px] overflow-hidden bg-[#f6f6f6]">

      <img
        src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
        className="w-full h-[280px] object-cover"
      />

      <div className="p-8">

        <h4 className="text-3xl font-semibold">
          AI Podcast Builder
        </h4>

        <p className="mt-3 text-gray-600 max-w-lg">
          Automatically generate podcast scripts, voices and publish episodes.
        </p>

      </div>

    </div>



    <div className="rounded-[36px] overflow-hidden bg-[#f6f6f6]">

      <img
        src="https://images.unsplash.com/photo-1677442135136-760c813028c0?auto=format&fit=crop&w=1200&q=80"
        className="w-full h-[280px] object-cover"
      />

      <div className="p-8">

        <h4 className="text-3xl font-semibold">
          AI Tool Navigator
        </h4>

        <p className="mt-3 text-gray-600 max-w-lg">
          Discover and compare the best AI tools for productivity.
        </p>

      </div>

    </div>

  </div>

</section>

