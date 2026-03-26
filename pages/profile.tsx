import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'
import supabase from '../lib/supabaseClient'

type UserProfile = {
  email: string
  createdAt: string
}

function formatRegisterTime(isoDate?: string) {
  if (!isoDate) return '未知'
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      if (!supabase) {
        await router.replace('/login')
        return
      }

      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) {
        await router.replace('/login')
        return
      }

      setProfile({
        email: data.user.email || '未绑定邮箱',
        createdAt: formatRegisterTime(data.user.created_at)
      })
      setLoading(false)
    }

    void fetchUser()
  }, [router])

  const handleSignOut = async () => {
    if (!supabase) {
      await router.push('/')
      return
    }

    await supabase.auth.signOut()
    await router.push('/')
  }

  return (
    <>
      <Head>
        <title>个人中心 · AI Forge</title>
        <meta name="description" content="AI Forge 用户个人中心" />
      </Head>
      <main className="min-h-screen bg-[#f3f3f3] text-black">
        <Navbar />

        <section className="mx-auto max-w-3xl px-6 py-12">
          <div className="rounded-[24px] bg-white p-7 sm:p-8">
            <h1 className="text-3xl font-semibold">个人中心</h1>
            <p className="mt-2 text-sm text-gray-500">查看你的账号信息并管理登录状态。</p>

            <div className="mt-8 grid gap-4">
              <div className="rounded-2xl bg-[#f3f3f3] p-5">
                <p className="text-xs text-gray-500">邮箱</p>
                <p className="mt-2 text-lg font-semibold">{loading ? '加载中...' : profile?.email}</p>
              </div>

              <div className="rounded-2xl bg-[#f3f3f3] p-5">
                <p className="text-xs text-gray-500">注册时间</p>
                <p className="mt-2 text-lg font-semibold">{loading ? '加载中...' : profile?.createdAt}</p>
              </div>
            </div>

            <button
              type="button"
              className="mt-8 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleSignOut}
              disabled={loading}
            >
              退出登录
            </button>

            <div>
              <Link href="/" className="mt-8 inline-block text-sm font-medium text-indigo-700 hover:text-indigo-600">
                ← 返回首页
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
