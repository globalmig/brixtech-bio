import type { createAdminClient } from '@/lib/supabase/admin';

interface NutrientInput {
  label: string;
  value: string;
}

/** Postgres 에러를 관리자가 이해할 수 있는 한국어 문구로 변환합니다. */
export function toFriendlyProductError(error: {
  code?: string;
  message: string;
}): string {
  if (error.code === '23505') {
    return '이미 같은 브랜드 안에 사용 중인 슬러그입니다. 다른 슬러그를 입력해주세요.';
  }
  return error.message;
}

export async function saveFeaturesAndNutrients(
  admin: ReturnType<typeof createAdminClient>,
  productId: string,
  features: string[],
  nutrients: NutrientInput[]
) {
  await admin.from('product_features').delete().eq('product_id', productId);
  await admin.from('product_nutrients').delete().eq('product_id', productId);

  if (features.length > 0) {
    await admin.from('product_features').insert(
      features.map((label, index) => ({
        product_id: productId,
        label,
        sort_order: index,
      }))
    );
  }

  if (nutrients.length > 0) {
    await admin.from('product_nutrients').insert(
      nutrients.map((nutrient, index) => ({
        product_id: productId,
        label: nutrient.label,
        value: nutrient.value,
        sort_order: index,
      }))
    );
  }
}
