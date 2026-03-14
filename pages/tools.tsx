import Head from "next/head";
import Link from "next/link";

const tools = [
  {
    name: "ChatGPT",
    desc: "AI conversation assistant",
    url: "https://chat.openai.com"
  },
  {
    name: "Midjourney",
    desc: "AI image generation",
    url: "https://www.midjourney.com"
  },
  {
    name: "Runway",
    desc: "AI video creation tools",
    url: "https://runwayml.com"
  },
  {
    name: "Perplexity",
    desc: "AI search engine",
    url: "https://www.perplexity.ai"
  }
];

export default function ToolsPage() {
  return (
    <>
      <Head>
        <title>AI Tools Directory</title>
      </Head>

      <main className="min-h-screen bg-slate-950 text-white px-6 py-16">
        <div className="max-w-5xl mx-auto">

          <Link href="/" className="text-slate-400 hover:text-white">
            ← Back
          </Link>

          <h1 className="text-4xl font-bold mt-6 mb-10">
            AI Tools Directory
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {tools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                className="p-6 rounded-xl bg-slate-900 hover:bg-slate-800"
              >
                <h2 className="text-2xl font-semibold mb-2">
                  {tool.name}
                </h2>

                <p className="text-slate-400">
                  {tool.desc}
                </p>

              </a>
            ))}

          </div>

        </div>
      </main>
    </>
  );
}
