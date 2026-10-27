import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { requireAdminUser } from '@/lib/admin/api-auth';
import { brandFormSchema } from '@/lib/admin/schemas/brand';
import { toFriendlyBrandError } from '@/lib/admin/server/brands';
import { getBrands } from '@/lib/brands';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  const brands = await getBrands();
  return NextResponse.json({ brands });
}

export async function POST(request: Request) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const json = await request.json().catch(() => null);
  const parsed = brandFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? '입력값을 확인해주세요.' },
      { status: 400 }
    );
  }
  const input = parsed.data;

  const admin = createAdminClient();
  const { count } = await admin
    .from('brands')
    .select('id', { count: 'exact', head: true });

  const { data: brand, error } = await admin
    .from('brands')
    .insert({
      slug: input.slug,
      name: input.name,
      category: input.category,
      business_category: input.businessCategory,
      logo: input.logo || null,
      logo_white: input.logoWhite || null,
      bg_image: input.bgImage || null,
      banner_image: input.bannerImage || null,
      tagline: input.tagline || null,
      card_description: input.cardDescription || null,
      coming_soon_count: input.comingSoonCount,
      sort_order: count ?? 0,
    })
    .select('id')
    .single();

  if (error || !brand) {
    return NextResponse.json(
      { error: error ? toFriendlyBrandError(error) : '브랜드 등록에 실패했습니다.' },
      { status: 500 }
    );
  }

  revalidatePath('/brand', 'layout');
  revalidatePath('/');
  revalidatePath('/admin/brands');

  return NextResponse.json({ id: brand.id }, { status: 201 });
}
