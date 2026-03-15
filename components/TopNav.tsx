import Link from 'next/link'

export default function TopNav() {
  return (
    <div className="flex justify-between items-center px-14 py-8">
      <h1 className="text-xl font-semibold">AI Forge · 造物社</h1>
      <div className="flex gap-10 text-sm">
        <Link href="/feed">内容精选</Link>
        <Link href="/tools">工具</Link>
        <Link href="/evaluate">项目</Link>
        <Link href="/business">社区</Link>
      </div>
      <Link href="/login">
        <button className="bg-black text-white px-6 py-2 rounded-full text-sm">加入</button>
      </Link>
    </div>
  )
}
