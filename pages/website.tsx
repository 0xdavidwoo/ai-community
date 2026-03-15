import Head from 'next/head'
import Link from 'next/link'
import TopNav from '../components/TopNav'

export default function WebsitePage() {
  return (
    <>
      <Head>
        <title>网站生成器 · AI Forge</title>
        <meta name="description" content="快速生成可上线的网站页面与文案。" />
      </Head>

      <main className="min-h-screen bg-[#f3f3f3] text-black">
        <TopNav />

        <section className="px-14 pb-16">
          <div className="max-w-4xl rounded-[32px] bg-white p-10 shadow-sm">
            <p className="text-sm text-gray-500">网站生成器</p>
            <h1 className="mt-3 text-4xl font-semibold">几分钟生成你的产品官网</h1>
            <p className="mt-5 text-base text-gray-700 leading-7">
              输入产品定位与目标用户后，系统将自动生成首页结构、核心卖点文案和 CTA。
              你可以直接导出基础页面，快速完成 MVP 展示站点。
            </p>
            <Link href="/" className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm text-white">
              返回首页
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
