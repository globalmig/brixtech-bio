import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { requireAdminUser } from '@/lib/admin/api-auth';
import { videoPayloadSchema } from '@/lib/admin/schemas/video';
import { getVideoById } from '@/lib/videos';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  ADMIN_UPLOADS_BUCKET,
  extractAdminUploadPath,
} from '@/lib/supabase/storage';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const video = await getVideoById(id);

  if (!video) {
    return NextResponse.json({ error: '영상을 찾을 수 없습니다.' }, { status: 404 });
  }

  return NextResponse.json({ video });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const { id } = await params;
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
  const { error } = await admin
    .from('videos')
    .update({
      title: input.title,
      description: input.description || null,
      video_url: input.videoUrl,
      thumbnail: input.thumbnail || null,
      category: input.category,
      published_at: input.publishedAt || new Date().toISOString().slice(0, 10),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath('/about/video');
  revalidatePath(`/about/video/${id}`);
  revalidatePath('/admin/videos');

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const { id } = await params;
  const admin = createAdminClient();

  const { data: video } = await admin
    .from('videos')
    .select('video_url, thumbnail')
    .eq('id', id)
    .single();

  const { error } = await admin.from('videos').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (video) {
    const paths = [video.video_url, video.thumbnail]
      .filter((url): url is string => Boolean(url))
      .map(extractAdminUploadPath)
      .filter((path): path is string => Boolean(path));

    if (paths.length > 0) {
      await admin.storage.from(ADMIN_UPLOADS_BUCKET).remove(paths);
    }
  }

  revalidatePath('/about/video');
  revalidatePath('/admin/videos');

  return NextResponse.json({ ok: true });
}
