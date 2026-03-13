const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export async function fetchSupabaseArticles() {
  if (!isSupabaseConfigured) {
    return null;
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/articles?select=*`, {
    headers: {
      apikey: supabaseAnonKey as string,
      Authorization: `Bearer ${supabaseAnonKey}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Supabase articles');
  }

  return response.json();
}
