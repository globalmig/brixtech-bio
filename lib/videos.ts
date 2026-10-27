import { createPublicClient } from '@/lib/supabase/public';
import type { Video } from '@/types/video';

interface VideoRow {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail: string | null;
  category: Video['category'];
  published_at: string;
  created_at: string;
  updated_at: string;
}

const SELECT_COLUMNS =
  'id, title, description, video_url, thumbnail, category, published_at, created_at, updated_at';

function fromRow(row: VideoRow): Video {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    videoUrl: row.video_url,
    thumbnail: row.thumbnail,
    category: row.category,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getVideoList(): Promise<Video[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('videos')
    .select(SELECT_COLUMNS)
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as VideoRow[]).map(fromRow);
}

export async function getVideoById(id: string): Promise<Video | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('videos')
    .select(SELECT_COLUMNS)
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data ? fromRow(data as VideoRow) : null;
}
