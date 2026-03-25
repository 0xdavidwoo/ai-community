import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMagicLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) {
      setMessage('Supabase 未配置，请稍后再试。');
      return;
    }

    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://www.aiforge.im'
      }
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage('登录链接已发送到你的邮箱，请查收');
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>邮箱登录 | AI Forge</title>
        <meta name="description" content="Email Magic Link login for AI Forge (造物社) platform" />
      </Head>
      <main className="min-h-screen bg-[#f3f3f3] px-4 py-10 text-slate-900 sm:px-6">
        <section className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold">邮箱登录</h1>
          <p className="mt-2 text-sm text-slate-600">请输入邮箱地址，我们将发送 Magic Link 供你登录。</p>

          <form className="mt-6 space-y-4" onSubmit={handleSendMagicLink}>
            <label className="block text-sm font-medium text-slate-700" htmlFor="email">
              邮箱地址
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none ring-indigo-500 transition focus:ring-2"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading}
              required
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black/85"
              disabled={loading}
            >
              {loading ? '发送中...' : '发送登录链接'}
            </button>
          </form>

          {message ? <p className="mt-4 text-sm text-slate-600">{message}</p> : null}

          <Link href="/" className="mt-6 inline-block text-sm font-medium text-indigo-700 hover:text-indigo-600">
            ← 返回首页
          </Link>
        </section>
      </main>
    </>
  );
}
