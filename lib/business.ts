import { createPublicClient } from '@/lib/supabase/public';
import type {
  BusinessCategory,
  BusinessPage,
  BusinessSection,
  BusinessSectionBackground,
  BusinessSectionContent,
} from '@/types/business';

interface BusinessSectionRow {
  id: string;
  title: string | null;
  title_en: string | null;
  image: string | null;
  note: string | null;
  lead: string | null;
  background_color: string | null;
  hidden: boolean;
  block_type: string;
  sort_order: number;
  content: unknown;
}

interface BusinessPageRow {
  id: string;
  category: string;
  title: string;
  title_en: string | null;
  lead: string;
  is_active: boolean;
  lead_hidden: boolean;
  sort_order: number;
  business_sections: BusinessSectionRow[];
}

const SELECT_COLUMNS = `
  id, category, title, title_en, lead, is_active, lead_hidden, sort_order,
  business_sections ( id, title, title_en, image, note, lead, background_color, hidden, block_type, sort_order, content )
`;

function fromRow(row: BusinessPageRow): BusinessPage {
  const sections = [...row.business_sections]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(
      (section): BusinessSection => ({
        id: section.id,
        title: section.title,
        titleEn: section.title_en,
        image: section.image,
        backgroundColor: section.background_color as BusinessSectionBackground | null,
        note: section.note,
        lead: section.lead,
        hidden: section.hidden,
        sortOrder: section.sort_order,
        content: {
          type: section.block_type,
          data: section.content,
        } as BusinessSectionContent,
      })
    );

  return {
    id: row.id,
    category: row.category as BusinessCategory,
    title: row.title,
    titleEn: row.title_en,
    lead: row.lead,
    isActive: row.is_active,
    leadHidden: row.lead_hidden,
    sortOrder: row.sort_order,
    sections,
  };
}

export async function getBusinessPage(
  category: BusinessCategory
): Promise<BusinessPage | undefined> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('business_pages')
    .select(SELECT_COLUMNS)
    .eq('category', category)
    .maybeSingle();

  if (error) throw error;
  return data ? fromRow(data as unknown as BusinessPageRow) : undefined;
}

/**
 * /admin/business 목록에서 쓰는 전체 카테고리(페이지) 목록입니다. 카테고리는 더 이상
 * 고정 5종이 아니라 business_pages의 행 자체이므로, 숨김 여부와 상관없이 전부 반환합니다.
 */
export async function getAllBusinessPages(): Promise<BusinessPage[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('business_pages')
    .select(SELECT_COLUMNS)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return (data ?? []).map((row) => fromRow(row as unknown as BusinessPageRow));
}

/**
 * 헤더의 BUSINESS 하위 메뉴에서 쓰는, 노출 상태인 카테고리만 정렬된 목록입니다.
 */
export async function getOrderedBusinessCategories(): Promise<
  { slug: BusinessCategory; label: string; sortOrder: number }[]
> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('business_pages')
    .select('category, title, sort_order, is_active')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    slug: row.category as BusinessCategory,
    label: row.title as string,
    sortOrder: row.sort_order as number,
  }));
}

/**
 * BrandForm의 "사업 카테고리" 선택지입니다. 숨김 카테고리도 브랜드에 태그할 수 있어야
 * 하므로 isActive와 무관하게 전부 반환하고, 영문 라벨(titleEn)이 비어있으면 슬러그를
 * 대문자로 바꿔 eyebrow 기본값으로 씁니다.
 */
export async function getBusinessCategoryOptions(): Promise<
  { label: string; eyebrow: string }[]
> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('business_pages')
    .select('category, title, title_en, sort_order')
    .order('sort_order', { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    label: row.title as string,
    eyebrow:
      (row.title_en as string | null)?.trim() ||
      (row.category as string).toUpperCase().replace(/-/g, ' '),
  }));
}
