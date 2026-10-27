import { createPublicClient } from '@/lib/supabase/public';
import type { Brand } from '@/types/brand';

interface BrandRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  business_category: string;
  logo: string | null;
  logo_white: string | null;
  bg_image: string | null;
  banner_image: string | null;
  tagline: string | null;
  card_description: string | null;
  coming_soon_count: number;
}

const SELECT_COLUMNS =
  'id, slug, name, category, business_category, logo, logo_white, bg_image, banner_image, tagline, card_description, coming_soon_count';

function fromRow(row: BrandRow): Brand {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    businessCategory: row.business_category,
    logo: row.logo ?? '',
    logoWhite: row.logo_white ?? '',
    bgImage: row.bg_image ?? '',
    bannerImage: row.banner_image ?? '',
    tagline: row.tagline ?? '',
    cardDescription: row.card_description ?? '',
    comingSoonCount: row.coming_soon_count,
  };
}

export async function getBrands(): Promise<Brand[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('brands')
    .select(SELECT_COLUMNS)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data as BrandRow[]).map(fromRow);
}

export async function getBrand(slug: string): Promise<Brand | undefined> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('brands')
    .select(SELECT_COLUMNS)
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data ? fromRow(data as BrandRow) : undefined;
}

export async function getBrandById(id: string): Promise<Brand | undefined> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('brands')
    .select(SELECT_COLUMNS)
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data ? fromRow(data as BrandRow) : undefined;
}
