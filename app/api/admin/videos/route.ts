import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { requireAdminUser } from '@/lib/admin/api-auth';
import { videoPayloadSchema } from '@/lib/admin/schemas/video';
import { getVideoList } from '@/lib/videos';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  const videoList = await getVideoList();
  return NextResponse.json({ videoList });
}

export async function POST(request: Request) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const json = await request.json().catch(() => null);
  const parsed = videoPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? '입력값을 확인해주세요.' },
      { status: 400 }
    );
  }
  const input = parsed.data;

  const admin = createAdminClient();
  const { data: video, error } = await admin
    .from('videos')
    .insert({
      title: input.title,
      description: input.description || null,
      video_url: input.videoUrl,
      thumbnail: input.thumbnail || null,
      category: input.category,
      published_at: input.publishedAt || new Date().toISOString().slice(0, 10),
    })
    .select('id')
    .single();

  if (error || !video) {
    return NextResponse.json(
      { error: error?.message ?? '영상 등록에 실패했습니다.' },
      { status: 500 }
    );
  }

  revalidatePath('/about/video');
  revalidatePath('/admin/videos');

  return NextResponse.json({ id: video.id }, { status: 201 });
}
