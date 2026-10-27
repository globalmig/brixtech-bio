import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { requireAdminUser } from '@/lib/admin/api-auth';
import { newsPayloadSchema } from '@/lib/admin/schemas/news';
import { sanitizeNewsContent } from '@/lib/admin/server/news';
import { getNewsById } from '@/lib/news';
import { createAdminClient } from '@/lib/supabase/admin';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const news = await getNewsById(id);

  if (!news) {
    return NextResponse.json({ error: '소식을 찾을 수 없습니다.' }, { status: 404 });
  }

  return NextResponse.json({ news });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const { id } = await params;
  const json = await request.json().catch(() => null);
  const parsed = newsPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? '입력값을 확인해주세요.' },
      { status: 400 }
    );
  }

  const title = parsed.data.title;
  const content = sanitizeNewsContent(parsed.data.content);

  const admin = createAdminClient();
  const { error } = await admin
    .from('news')
    .update({ title, content, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath('/news');
  revalidatePath(`/news/${id}`);
  revalidatePath('/admin/news');

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const { id } = await params;
  const admin = createAdminClient();
  const { error } = await admin.from('news').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath('/news');
  revalidatePath('/admin/news');

  return NextResponse.json({ ok: true });
}
