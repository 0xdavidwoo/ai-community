import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function ProfilePage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!supabase) {
        await router.replace('/login');
        return;
      }

      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        await router.replace('/login');
        return;
      }

      setPhone(data.user.phone || '未绑定手机号');
      setLoading(false);
    };

    void fetchUser();
  }, [router]);

  const handleSignOut = async () => {
    if (!supabase) {
      await router.push('/');
      return;
    }

    await supabase.auth.signOut();
    await router.push('/');
  };

  return (
    <>
      <Head>
        <title>Profile | AI Forge</title>
        <meta name="description" content="Personal center for AI Forge (造物社) members" />
      </Head>
      <main className="min-h-screen bg-[#f3f3f3] px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
        <section className="mx-auto max-w-3xl rounded-2xl bg-white p-6 sm:p-8">
          <h1 className="text-2xl font-bold">Personal Center</h1>
          <p className="mt-2 text-sm text-slate-600">查看账号信息并管理登录状态。</p>

          <div className="mt-6 rounded-xl bg-slate-100 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Phone</p>
            <p className="mt-2 text-xl font-semibold">{loading ? '加载中...' : phone}</p>
          </div>

          <button
            type="button"
            className="mt-6 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black/85"
            onClick={handleSignOut}
            disabled={loading}
          >
            退出登录
          </button>

          <Link href="/" className="mt-8 inline-block text-sm font-medium text-indigo-700 hover:text-indigo-600">
            ← Back to feed
          </Link>
        </section>
      </main>
    </>
  );
}
