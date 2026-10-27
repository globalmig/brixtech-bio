import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { requireAdminUser } from '@/lib/admin/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';

const reorderPayloadSchema = z.object({
  order: z.array(z.string()).min(1),
});

/**
 * 관리자 BUSINESS 목록에서 드래그로 바꾼 카테고리 순서를 저장합니다. 카테고리는
 * 더 이상 고정 목록이 아니므로, 전달된 order가 현재 존재하는 카테고리들과 정확히
 * 일치하는 경우에만 sort_order를 갱신합니다.
 */
export async function PATCH(request: Request) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const json = await request.json().catch(() => null);
  const parsed = reorderPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: '입력값을 확인해주세요.' }, { status: 400 });
  }

  const order = parsed.data.order;
  if (new Set(order).size !== order.length) {
    return NextResponse.json({ error: '카테고리 목록이 올바르지 않습니다.' }, { status: 400 });
  }

  const admin = createAdminClient();

  const { data: existingRows, error: fetchError } = await admin
    .from('business_pages')
    .select('category');

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const existingCategories = new Set((existingRows ?? []).map((row) => row.category));
  const isSameSet =
    order.length === existingCategories.size && order.every((slug) => existingCategories.has(slug));

  if (!isSameSet) {
    return NextResponse.json({ error: '카테고리 목록이 올바르지 않습니다.' }, { status: 400 });
  }

  const { error } = await admin.from('business_pages').upsert(
    order.map((category, index) => ({ category, sort_order: index })),
    { onConflict: 'category' }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath('/admin/business');
  revalidatePath('/', 'layout');

  return NextResponse.json({ ok: true });
}
