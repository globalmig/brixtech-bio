import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { requireAdminUser } from '@/lib/admin/api-auth';
import { businessCategoryCreateSchema } from '@/lib/admin/schemas/business';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * /admin/business에서 새 사업 카테고리를 추가합니다. 카테고리는 더 이상 고정
 * 5종이 아니라 business_pages의 행 자체이므로, 여기서 바로 행을 생성합니다.
 * (리드 문구/블록은 비워두고, 이어서 편집 페이지에서 채우는 흐름입니다.)
 */
export async function POST(request: Request) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const json = await request.json().catch(() => null);
  const parsed = businessCategoryCreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? '입력값을 확인해주세요.' },
      { status: 400 }
    );
  }
  const input = parsed.data;

  const admin = createAdminClient();

  const { count } = await admin
    .from('business_pages')
    .select('id', { count: 'exact', head: true });

  const { error } = await admin.from('business_pages').insert({
    category: input.category,
    title: input.title,
    title_en: input.titleEn || null,
    lead: '',
    sort_order: count ?? 0,
  });

  if (error) {
    const isDuplicate = error.code === '23505';
    return NextResponse.json(
      { error: isDuplicate ? '이미 사용 중인 슬러그입니다.' : error.message },
      { status: isDuplicate ? 409 : 500 }
    );
  }

  revalidatePath('/admin/business');
  revalidatePath('/', 'layout');

  return NextResponse.json({ ok: true, category: input.category });
}
