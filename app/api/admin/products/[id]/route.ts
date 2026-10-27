import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { requireAdminUser } from '@/lib/admin/api-auth';
import { productPayloadSchema } from '@/lib/admin/schemas/product';
import {
  saveFeaturesAndNutrients,
  toFriendlyProductError,
} from '@/lib/admin/server/products';
import { getProductById } from '@/lib/products';
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
  const product = await getProductById(id);

  if (!product) {
    return NextResponse.json({ error: '제품을 찾을 수 없습니다.' }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const { id } = await params;
  const json = await request.json().catch(() => null);
  const parsed = productPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? '입력값을 확인해주세요.' },
      { status: 400 }
    );
  }
  const input = parsed.data;

  const admin = createAdminClient();
  const { error } = await admin
    .from('products')
    .update({
      slug: input.slug,
      name: input.name,
      thumbnail: input.thumbnail || null,
      description: input.description || null,
      weight: input.weight || null,
      feeding_target: input.feedingTarget || null,
      recommended_target: input.recommendedTarget || null,
      ingredients: input.ingredients || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: toFriendlyProductError(error) }, { status: 500 });
  }

  await saveFeaturesAndNutrients(admin, id, input.features, input.nutrients);

  revalidatePath('/brand', 'layout');
  revalidatePath('/');
  revalidatePath(`/admin/brands/${input.brandId}/products`);
  revalidatePath('/admin/products');

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

  const { id } = await params;
  const brandId = new URL(request.url).searchParams.get('brandId') ?? '';

  const admin = createAdminClient();

  const { data: product } = await admin
    .from('products')
    .select('thumbnail')
    .eq('id', id)
    .single();

  const { error } = await admin.from('products').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (product?.thumbnail) {
    const path = extractAdminUploadPath(product.thumbnail);
    if (path) {
      await admin.storage.from(ADMIN_UPLOADS_BUCKET).remove([path]);
    }
  }

  revalidatePath('/brand', 'layout');
  revalidatePath('/');
  if (brandId) revalidatePath(`/admin/brands/${brandId}/products`);
  revalidatePath('/admin/products');

  return NextResponse.json({ ok: true });
}
