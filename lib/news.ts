import { createPublicClient } from '@/lib/supabase/public';
import type { News } from '@/types/news';

interface NewsRow {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const SELECT_COLUMNS = 'id, title, content, created_at, updated_at';

function fromRow(row: NewsRow): News {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getNewsList(): Promise<News[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('news')
    .select(SELECT_COLUMNS)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as NewsRow[]).map(fromRow);
}

export async function getNewsById(id: string): Promise<News | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('news')
    .select(SELECT_COLUMNS)
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data ? fromRow(data as NewsRow) : null;
}
