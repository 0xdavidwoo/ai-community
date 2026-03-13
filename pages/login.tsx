import Head from 'next/head';
codex/build-complete-mvp-for-ai-community-platform
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import AppShell from '../components/AppShell';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Use your account to sync bookmarks and reading history.');

  const login = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) {
      setMessage('Supabase keys are missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage('Login successful. Redirecting to profile...');
    router.push('/profile');
  };

  const signup = async () => {
    if (!supabase) {
      setMessage('Supabase keys are missing.');
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : 'Signup complete. Check your inbox for verification.');
  };

  return (
    <>
      <Head>
        <title>Login | AI Community</title>
      </Head>
      <AppShell title="Login">
        <form onSubmit={login} className="mx-auto max-w-md space-y-4 rounded-xl border border-slate-800 bg-card p-5">
          <label className="block text-sm">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
            />
          </label>
          <div className="flex gap-3">
            <button type="submit" className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium hover:bg-indigo-400">
              Login
            </button>
            <button
              type="button"
              onClick={signup}
              className="rounded-md border border-slate-600 px-4 py-2 text-sm hover:border-indigo-300"
            >
              Create account
            </button>
          </div>
          <p className="text-sm text-slate-300">{message}</p>
        </form>
      </AppShell>

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
 main
    </>
  );
}
