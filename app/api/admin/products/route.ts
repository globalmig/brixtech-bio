import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { requireAdminUser } from '@/lib/admin/api-auth';
import { productPayloadSchema } from '@/lib/admin/schemas/product';
import {
  saveFeaturesAndNutrients,
  toFriendlyProductError,
} from '@/lib/admin/server/products';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  const auth = await requireAdminUser();
  if (auth.response) return auth.response;

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
  const { count } = await admin
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('brand_id', input.brandId);

  const { data: product, error } = await admin
    .from('products')
    .insert({
      brand_id: input.brandId,
      slug: input.slug,
      name: input.name,
      thumbnail: input.thumbnail || null,
      description: input.description || null,
      weight: input.weight || null,
      feeding_target: input.feedingTarget || null,
      recommended_target: input.recommendedTarget || null,
      ingredients: input.ingredients || null,
      sort_order: count ?? 0,
    })
    .select('id')
    .single();

  if (error || !product) {
    return NextResponse.json(
      { error: error ? toFriendlyProductError(error) : '제품 등록에 실패했습니다.' },
      { status: 500 }
    );
  }

  await saveFeaturesAndNutrients(admin, product.id, input.features, input.nutrients);

  revalidatePath('/brand', 'layout');
  revalidatePath('/');
  revalidatePath(`/admin/brands/${input.brandId}/products`);
  revalidatePath('/admin/products');

  return NextResponse.json({ id: product.id }, { status: 201 });
}
