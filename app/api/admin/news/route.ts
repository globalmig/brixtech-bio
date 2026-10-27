import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { requireAdminUser } from '@/lib/admin/api-auth';
import { newsPayloadSchema } from '@/lib/admin/schemas/news';
import { sanitizeNewsContent } from '@/lib/admin/server/news';
import { getNewsList } from '@/lib/news';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  const newsList = await getNewsList();
  return NextResponse.json({ newsList });
}

export async function POST(request: Request) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

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
  const { data: news, error } = await admin
    .from('news')
    .insert({ title, content })
    .select('id')
    .single();

  if (error || !news) {
    return NextResponse.json(
      { error: error?.message ?? '소식 등록에 실패했습니다.' },
      { status: 500 }
    );
  }

  revalidatePath('/news');
  revalidatePath('/admin/news');

  return NextResponse.json({ id: news.id }, { status: 201 });
}
