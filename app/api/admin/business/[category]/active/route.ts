import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { requireAdminUser } from '@/lib/admin/api-auth';
import { getBusinessPage } from '@/lib/business';
import { createAdminClient } from '@/lib/supabase/admin';

const activeSchema = z.object({ isActive: z.boolean() });

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const { category } = await params;
  const existingPage = await getBusinessPage(category);
  if (!existingPage) {
    return NextResponse.json({ error: '존재하지 않는 카테고리입니다.' }, { status: 404 });
  }

  const json = await request.json().catch(() => null);
  const parsed = activeSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from('business_pages')
    .update({ is_active: parsed.data.isActive })
    .eq('category', category);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath(`/business/${category}`);
  revalidatePath('/admin/business');

  return NextResponse.json({ ok: true });
}
