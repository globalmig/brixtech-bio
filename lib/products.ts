import { getBrand, getBrands } from '@/lib/brands';
import { createPublicClient } from '@/lib/supabase/public';
import type { Brand } from '@/types/brand';
import type {
  BrandProduct,
  BrandProductNutrient,
  BrandProductSpec,
  ProductItem,
} from '@/types/product';

interface ProductFeatureRow {
  label: string;
  sort_order: number;
}

interface ProductNutrientRow {
  label: string;
  value: string;
  sort_order: number;
}

interface ProductRow {
  id: string;
  brand_id: string;
  slug: string;
  name: string;
  thumbnail: string | null;
  description: string | null;
  weight: string | null;
  feeding_target: string | null;
  recommended_target: string | null;
  ingredients: string | null;
  is_active: boolean;
  product_features: ProductFeatureRow[];
  product_nutrients: ProductNutrientRow[];
}

const SELECT_COLUMNS = `
  id, brand_id, slug, name, thumbnail, description,
  weight, feeding_target, recommended_target, ingredients, is_active,
  product_features ( label, sort_order ),
  product_nutrients ( label, value, sort_order )
`;

function pairNutrients(
  rows: ProductNutrientRow[]
): [BrandProductNutrient, BrandProductNutrient | null][] {
  const sorted = [...rows].sort((a, b) => a.sort_order - b.sort_order);
  const pairs: [BrandProductNutrient, BrandProductNutrient | null][] = [];

  for (let i = 0; i < sorted.length; i += 2) {
    pairs.push([
      { label: sorted[i].label, value: sorted[i].value },
      sorted[i + 1]
        ? { label: sorted[i + 1].label, value: sorted[i + 1].value }
        : null,
    ]);
  }

  return pairs;
}

function fromRow(row: ProductRow): BrandProduct {
  const specs: BrandProductSpec[] = [];
  if (row.weight) specs.push({ label: '중량', value: row.weight });
  if (row.feeding_target) {
    specs.push({
      label: '급여 대상 (연령)',
      value: row.feeding_target,
      accent: true,
    });
  }
  if (row.recommended_target) {
    specs.push({
      label: '권장 대상',
      value: row.recommended_target,
      accent: true,
    });
  }

  return {
    id: row.id,
    brandId: row.brand_id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? '',
    image: row.thumbnail ?? '',
    specs,
    features: [...row.product_features]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((feature) => feature.label),
    ingredients: row.ingredients ?? '',
    nutrients: pairNutrients(row.product_nutrients),
    isActive: row.is_active,
  };
}

export async function getProductsByBrand(
  brandId: string
): Promise<BrandProduct[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('products')
    .select(SELECT_COLUMNS)
    .eq('brand_id', brandId)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data as unknown as ProductRow[]).map(fromRow);
}

export async function getProductById(
  id: string
): Promise<BrandProduct | undefined> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('products')
    .select(SELECT_COLUMNS)
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data ? fromRow(data as unknown as ProductRow) : undefined;
}

export async function getBrandProduct(
  brandSlug: string,
  productSlug: string
): Promise<{ brand: Brand; product: BrandProduct } | undefined> {
  const brand = await getBrand(brandSlug);
  if (!brand) return undefined;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('products')
    .select(SELECT_COLUMNS)
    .eq('brand_id', brand.id)
    .eq('slug', productSlug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) throw error;
  return data ? { brand, product: fromRow(data as unknown as ProductRow) } : undefined;
}

export async function getAllProductsWithBrand(): Promise<
  { brand: Brand; product: BrandProduct }[]
> {
  const brands = await getBrands();
  const brandById = new Map(brands.map((brand) => [brand.id, brand]));

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('products')
    .select(SELECT_COLUMNS)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) throw error;

  return (data as unknown as ProductRow[])
    .map((row) => {
      const brand = brandById.get(row.brand_id);
      return brand ? { brand, product: fromRow(row) } : null;
    })
    .filter((item): item is { brand: Brand; product: BrandProduct } => item !== null);
}

/** 관리자 "제품 관리" 화면용. 활성/비활성 여부와 상관없이 전체 브랜드의 제품을 가져옵니다. */
export async function getAllProductsForAdmin(): Promise<
  { brand: Brand; product: BrandProduct }[]
> {
  const brands = await getBrands();
  const brandById = new Map(brands.map((brand) => [brand.id, brand]));

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('products')
    .select(SELECT_COLUMNS)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data as unknown as ProductRow[])
    .map((row) => {
      const brand = brandById.get(row.brand_id);
      return brand ? { brand, product: fromRow(row) } : null;
    })
    .filter((item): item is { brand: Brand; product: BrandProduct } => item !== null);
}

function toProductItem(brand: Brand, product: BrandProduct): ProductItem {
  return {
    id: product.id,
    status: 'active',
    image: product.image,
    brand: brand.name.toUpperCase(),
    name: product.name,
    href: `/brand/${brand.slug}/${product.slug}`,
  };
}

function comingSoonItems(prefix: string, count: number): ProductItem[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-coming-soon-${index + 1}`,
    status: 'coming-soon',
  }));
}

/** 특정 브랜드의 제품 라인업(등록된 제품 + Coming Soon 자리)을 반환합니다. */
export async function getBrandLineup(brand: Brand): Promise<ProductItem[]> {
  const products = await getProductsByBrand(brand.id);
  const visibleProducts = products.filter((product) => product.isActive);

  return [
    ...visibleProducts.map((product) => toProductItem(brand, product)),
    ...comingSoonItems(brand.slug, brand.comingSoonCount ?? 0),
  ];
}

/** 홈 화면 등에 노출할 대표 제품 목록. 등록된 제품을 모아 limit만큼 채우고, 모자라면 Coming Soon으로 채웁니다. */
export async function getFeaturedProducts(limit = 3): Promise<ProductItem[]> {
  const all = await getAllProductsWithBrand();
  const active = all
    .slice(0, limit)
    .map(({ brand, product }) => toProductItem(brand, product));

  return [
    ...active,
    ...comingSoonItems('featured', Math.max(0, limit - active.length)),
  ];
}
