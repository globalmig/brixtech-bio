import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { requireAdminUser } from '@/lib/admin/api-auth';
import { brandFormSchema } from '@/lib/admin/schemas/brand';
import { toFriendlyBrandError } from '@/lib/admin/server/brands';
import { getBrandById } from '@/lib/brands';
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
  const brand = await getBrandById(id);

  if (!brand) {
    return NextResponse.json({ error: '브랜드를 찾을 수 없습니다.' }, { status: 404 });
  }

  return NextResponse.json({ brand });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const { id } = await params;
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
  const { error } = await admin
    .from('brands')
    .update({
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
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: toFriendlyBrandError(error) }, { status: 500 });
  }

  revalidatePath('/brand', 'layout');
  revalidatePath('/');
  revalidatePath('/admin/brands');

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const { id } = await params;
  const admin = createAdminClient();

  const { data: brand } = await admin
    .from('brands')
    .select('logo, logo_white, bg_image, banner_image')
    .eq('id', id)
    .single();

  const { error } = await admin.from('brands').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (brand) {
    const paths = [brand.logo, brand.logo_white, brand.bg_image, brand.banner_image]
      .filter((url): url is string => Boolean(url))
      .map(extractAdminUploadPath)
      .filter((path): path is string => Boolean(path));

    if (paths.length > 0) {
      await admin.storage.from(ADMIN_UPLOADS_BUCKET).remove(paths);
    }
  }

  revalidatePath('/brand', 'layout');
  revalidatePath('/');
  revalidatePath('/admin/brands');

  return NextResponse.json({ ok: true });
}
