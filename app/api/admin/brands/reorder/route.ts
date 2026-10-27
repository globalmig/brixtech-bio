import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { requireAdminUser } from '@/lib/admin/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';

const reorderSchema = z.object({
  orderedIds: z.array(z.string().trim().min(1)).min(1),
});

/** 관리자 목록에서 드래그로 바꾼 순서를 저장합니다. orderedIds는 화면에 보이는 새 순서 전체입니다. */
export async function POST(request: Request) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const json = await request.json().catch(() => null);
  const parsed = reorderSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
  }

  const admin = createAdminClient();
  const results = await Promise.all(
    parsed.data.orderedIds.map((id, index) =>
      admin.from('brands').update({ sort_order: index }).eq('id', id)
    )
  );

  const failed = results.find((result) => result.error);
  if (failed?.error) {
    return NextResponse.json({ error: failed.error.message }, { status: 500 });
  }

  revalidatePath('/brand', 'layout');
  revalidatePath('/');
  revalidatePath('/admin/brands');

  return NextResponse.json({ ok: true });
}
