import Link from 'next/link';
import { PropsWithChildren } from 'react';

type AppShellProps = PropsWithChildren<{ title: string }>;

export default function AppShell({ title, children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-surface px-4 py-6 text-slate-100 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="text-xs uppercase tracking-wide text-indigo-300">
              AI Community
            </Link>
            <h1 className="text-2xl font-semibold">{title}</h1>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm text-slate-300">
            <Link href="/" className="hover:text-white">
              Feed
            </Link>
            <Link href="/profile" className="hover:text-white">
              Profile
            </Link>
            <Link href="/login" className="hover:text-white">
              Login
            </Link>
          </nav>
        </header>
        {children}
      </div>
    </main>
  );
}
