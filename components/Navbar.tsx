import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import supabase from '../lib/supabaseClient'

const navLinks = [
  { href: '/feed', label: '内容精选' },
  { href: '/skills', label: 'Skills' },
  { href: '/tools', label: '工具' },
  { href: '/#community', label: '社区' },
]

export default function Navbar() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const syncSession = async () => {
      if (!supabase) {
        setIsLoggedIn(false)
        return
      }

      const { data } = await supabase.auth.getSession()
      setIsLoggedIn(Boolean(data.session))
    }

    void syncSession()

    if (!supabase) return
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const isActive = (href: string) => {
    if (href === '/#community') return false
    if (href === '/') return router.pathname === '/'
    return router.pathname === href || router.pathname.startsWith(`${href}/`)
  }

  const entryLink = isLoggedIn ? { href: '/profile', label: '我的' } : { href: '/login', label: '加入' }
  const mobileLinks = [...navLinks, entryLink]

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 sm:px-10 lg:px-14">
        <Link href="/" className="text-xl font-semibold text-black">
          AI Forge · 造物社
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'font-semibold text-black' : 'text-gray-600 transition hover:text-black'}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={entryLink.href}
          className="hidden rounded-full bg-black px-6 py-2 text-sm text-white transition hover:bg-black/85 md:inline-flex"
        >
          {entryLink.label}
        </Link>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-2xl leading-none text-black md:hidden"
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center md:hidden">
          <button
            type="button"
            className="absolute right-6 top-6 text-4xl leading-none text-black"
            aria-label="关闭菜单"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>

          <nav className="flex flex-col items-center gap-8 text-3xl font-semibold text-black">
            {mobileLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={link.label === entryLink.label ? 'rounded-full bg-black px-8 py-3 text-white' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
