# AI Community Content Aggregation MVP

This project is a mobile-first MVP built with **Next.js + Tailwind CSS**, structured as an AI community content platform (not a tools directory).

## Pages

- `/` homepage feed with category filters, article cards, and load more
- `/article/[id]` article detail page
- `/profile` personal center page
- `/login` phone login page

## Supabase setup

The codebase includes a lightweight Supabase REST helper in `lib/supabase.ts`.
To connect real data, configure:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Local development

```bash
npm install
npm run dev
```
