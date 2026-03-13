import { supabase } from './supabaseClient';

const bookmarkKey = 'ai-community-bookmarks';
const readHistoryKey = 'ai-community-read-history';

const getLocalItems = (key: string) => {
  if (typeof window === 'undefined') return [] as string[];
  return JSON.parse(localStorage.getItem(key) ?? '[]') as string[];
};

const setLocalItems = (key: string, items: string[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(items));
};

const unique = (items: string[]) => [...new Set(items)];

export const getBookmarks = async (userId?: string) => {
  if (supabase && userId) {
    const { data, error } = await supabase.from('bookmarks').select('article_id').eq('user_id', userId);
    if (!error && data) return data.map((item) => item.article_id);
  }
  return getLocalItems(bookmarkKey);
};

export const toggleBookmark = async (articleId: string, userId?: string) => {
  const current = await getBookmarks(userId);
  const exists = current.includes(articleId);

  if (supabase && userId) {
    if (exists) {
      await supabase.from('bookmarks').delete().match({ user_id: userId, article_id: articleId });
    } else {
      await supabase.from('bookmarks').insert({ user_id: userId, article_id: articleId });
    }
  }

  const next = exists ? current.filter((id) => id !== articleId) : unique([...current, articleId]);
  setLocalItems(bookmarkKey, next);
  return next;
};

export const getReadHistory = async (userId?: string) => {
  if (supabase && userId) {
    const { data, error } = await supabase
      .from('read_history')
      .select('article_id, read_at')
      .eq('user_id', userId)
      .order('read_at', { ascending: false });
    if (!error && data) return data.map((item) => item.article_id);
  }
  return getLocalItems(readHistoryKey);
};

export const addToReadHistory = async (articleId: string, userId?: string) => {
  const current = await getReadHistory(userId);
  const next = unique([articleId, ...current]);

  if (supabase && userId) {
    await supabase
      .from('read_history')
      .upsert({ user_id: userId, article_id: articleId, read_at: new Date().toISOString() }, { onConflict: 'user_id,article_id' });
  }

  setLocalItems(readHistoryKey, next);
  return next;
};
