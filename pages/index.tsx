import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Basic Next.js Project</title>
        <meta name="description" content="A basic Next.js project structure." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to Your Next.js App</h1>
          <p className="text-lg text-slate-300">Your basic project structure is ready.</p>
          <nav>
            <Link
              href="/tools"
              className="inline-flex rounded-md bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400"
            >
              Explore AI Tools Directory
            </Link>
          </nav>
        </div>
      </main>
    </>
  );
}
