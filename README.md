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
```
