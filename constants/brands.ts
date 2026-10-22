import type { Brand } from '@/types/brand';

export const BRANDS: Brand[] = [
  {
    id: 'brd_spione',
    slug: 'spione',
    name: 'Spione',
    category: 'PET FOOD',
    businessCategory: '반려동물 푸드',
    logo: '/images/brand/spione-logo-black.png',
    logoWhite: '/images/brand/spione-logo-white.png',
    bgImage: '/images/brand/spione-bg.png',
    bannerImage: '/images/brand/spione-brand-banner.png',
    tagline: '반려동물의 건강을 위한 프리미엄 기능성 펫푸드',
    cardDescription: '반려동물의 건강을 위한\n프리미엄 기능성 펫푸드',
    comingSoonCount: 2,
  },
];

/** /brand 개요 페이지의 카테고리 필터 목록 (ALL 제외) */
export const BRAND_BUSINESS_CATEGORIES = ['건강기능식품', '화장품', '반려동물 푸드', '스마트팜'];

export function getBrand(slug: string): Brand | undefined {
  return BRANDS.find((brand) => brand.slug === slug);
}
