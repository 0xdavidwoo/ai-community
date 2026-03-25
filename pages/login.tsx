import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) {
      setMessage('Supabase 未配置，请稍后再试。');
      return;
    }

    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({ phone: phoneNumber });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setCodeSent(true);
    setMessage('验证码已发送，请查收短信。');
    setLoading(false);
  };

  const handleVerifyCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) {
      setMessage('Supabase 未配置，请稍后再试。');
      return;
    }

    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: verificationCode,
      type: 'sms'
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    await router.push('/');
  };

  return (
    <>
      <Head>
        <title>Login | AI Forge</title>
        <meta name="description" content="Phone login for AI Forge (造物社) platform" />
      </Head>
      <main className="min-h-screen bg-[#f3f3f3] px-4 py-10 text-slate-900 sm:px-6">
        <section className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold">Phone Login</h1>
          <p className="mt-2 text-sm text-slate-600">请输入手机号并使用验证码登录。</p>

          <form className="mt-6 space-y-4" onSubmit={handleSendCode}>
            <label className="block text-sm font-medium text-slate-700" htmlFor="phone">
              手机号
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+8613812345678"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none ring-indigo-500 transition focus:ring-2"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              disabled={loading || codeSent}
              required
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
              disabled={loading || codeSent}
            >
              {loading && !codeSent ? '发送中...' : '发送验证码'}
            </button>
          </form>

          {codeSent && (
            <form className="mt-4 space-y-4" onSubmit={handleVerifyCode}>
              <label className="block text-sm font-medium text-slate-700" htmlFor="code">
                6位验证码
              </label>
              <input
                id="code"
                name="code"
                type="text"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                placeholder="123456"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none ring-indigo-500 transition focus:ring-2"
                value={verificationCode}
                onChange={(event) => setVerificationCode(event.target.value)}
                disabled={loading}
                required
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black/85"
                disabled={loading}
              >
                {loading ? '验证中...' : '验证登录'}
              </button>
            </form>
          )}

          {message ? <p className="mt-4 text-sm text-slate-600">{message}</p> : null}

          <Link href="/" className="mt-6 inline-block text-sm font-medium text-indigo-700 hover:text-indigo-600">
            ← Back to feed
          </Link>
        </section>
      </main>
    </>
  );
}
