import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { requireAdminUser } from '@/lib/admin/api-auth';
import { businessPagePayloadSchema } from '@/lib/admin/schemas/business';
import { getBusinessPage } from '@/lib/business';
import { createAdminClient } from '@/lib/supabase/admin';

interface RouteParams {
  params: Promise<{ category: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { category } = await params;
  const page = await getBusinessPage(category);
  return NextResponse.json({ page: page ?? null });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const { category } = await params;
  // 새 카테고리 생성은 POST /api/admin/business에서만 하고, 여기서는 이미 있는
  // 카테고리의 제목/리드/블록만 갱신합니다.
  const existingPage = await getBusinessPage(category);
  if (!existingPage) {
    return NextResponse.json({ error: '존재하지 않는 카테고리입니다.' }, { status: 404 });
  }

  const json = await request.json().catch(() => null);
  const parsed = businessPagePayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? '입력값을 확인해주세요.' },
      { status: 400 }
    );
  }
  const input = parsed.data;

  const admin = createAdminClient();

  const { data: page, error: upsertError } = await admin
    .from('business_pages')
    .upsert(
      {
        category,
        title: input.title,
        title_en: input.titleEn || null,
        lead: input.lead,
        lead_hidden: input.leadHidden,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'category' }
    )
    .select('id')
    .single();

  if (upsertError || !page) {
    return NextResponse.json(
      { error: upsertError?.message ?? '저장에 실패했습니다.' },
      { status: 500 }
    );
  }

  const { error: deleteError } = await admin
    .from('business_sections')
    .delete()
    .eq('business_page_id', page.id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  if (input.sections.length > 0) {
    const { error: insertError } = await admin.from('business_sections').insert(
      input.sections.map((section, index) => ({
        business_page_id: page.id,
        title: section.title || null,
        title_en: section.titleEn || null,
        image: section.image || null,
        note: section.note || null,
        lead: section.lead || null,
        background_color: section.backgroundColor,
        hidden: Boolean(section.hidden),
        block_type: section.type,
        sort_order: index,
        content: section.data,
      }))
    );

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
  }

  revalidatePath(`/business/${category}`);
  revalidatePath('/admin/business');

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const { category } = await params;
  const existingPage = await getBusinessPage(category);
  if (!existingPage) {
    return NextResponse.json({ error: '존재하지 않는 카테고리입니다.' }, { status: 404 });
  }

  const admin = createAdminClient();

  // business_sections는 business_pages를 on delete cascade로 참조하므로
  // 페이지 행만 지우면 하위 블록도 함께 삭제됩니다.
  const { error } = await admin.from('business_pages').delete().eq('category', category);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath(`/business/${category}`);
  revalidatePath('/admin/business');

  return NextResponse.json({ ok: true });
}
