import Head from 'next/head';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | AI Forge</title>
        <meta name="description" content="Phone login for AI Forge (造物社) platform" />
      </Head>
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
        <section className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold">Phone Login</h1>
          <p className="mt-2 text-sm text-slate-600">Enter your phone number to receive a one-time verification code.</p>

          <form className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-slate-700" htmlFor="phone">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 555 000 1234"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none ring-indigo-500 transition focus:ring-2"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Send code
            </button>
          </form>

          <Link href="/" className="mt-6 inline-block text-sm font-medium text-indigo-700 hover:text-indigo-600">
            ← Back to feed
          </Link>
        </section>
      </main>
    </>
  );
}
