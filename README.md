codex/build-complete-mvp-for-ai-community-platform
# AI Community MVP

Next.js + Tailwind MVP featuring:

- Homepage feed with category filters, article cards, editor summaries, bookmarking, and load-more pagination
- Article detail page (`/article/[id]`)
- Login page (`/login`) with Supabase auth
- Profile page (`/profile`) with bookmarks and read history
- Mobile-first responsive layout

## Setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Add environment variables
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
3. Run dev server
   ```bash
   npm run dev
   ```

## Suggested Supabase tables

```sql
create table bookmarks (
  user_id uuid not null,
  article_id text not null,
  created_at timestamptz default now(),
  primary key (user_id, article_id)
);

create table read_history (
  user_id uuid not null,
  article_id text not null,
  read_at timestamptz default now(),
  primary key (user_id, article_id)
);

# AI Forge (造物社) Content Aggregation MVP

This project is a mobile-first MVP built with **Next.js + Tailwind CSS**, structured as the **AI Forge (造物社)** content platform (not a tools directory).

## Pages

- `/` homepage feed with category filters, article cards, and load more
- `/article/[id]` article detail page
- `/profile` personal center page
- `/login` 邮箱 Magic Link 登录页

## Supabase setup

The codebase includes a lightweight Supabase REST helper in `lib/supabase.ts`.
To connect real data, configure:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Supabase Dashboard → Authentication → URL Configuration → `Site URL` 设置为 `https://www.aiforge.im`（用于邮箱登录回跳）

## Local development

```bash
npm install
npm run dev
 main
```
