import { BRANDS, getBrand } from '@/constants/brands';
import type { Brand } from '@/types/brand';
import type { BrandProduct, ProductItem } from '@/types/product';

export const PRODUCTS: BrandProduct[] = [
  {
    id: 'prd_dog-oneshot',
    brandId: 'brd_spione',
    slug: 'dog-oneshot',
    name: '도그원샷',
    description: '반려동물의 피부와 피모 건강을 위한 수제 펫푸드입니다.',
    specs: [
      { label: '중량', value: '4kg' },
      { label: '급여 대상 (연령)', value: '12개월 이상', accent: true },
      { label: '권장 대상', value: '만성장병증 등의 소화기 질환', accent: true },
    ],
    features: [
      '소화기 안정성을 고려한 7.0%의 저지방 설계로 만성장병증으로 인한 증상 완화에 도움',
      '염증 완화를 돕는 평균 1,000달톤 이하의 가수분해 연어를 사용하여 식이성 알러지로 인한 소화기 및 위장관 건강에 도움',
      '프리바이오틱스 성분 강화로 마이크로바이옴 형성에 도움',
      '증상이 있는 반려견의 스트레스 케어를 돕기 위한 천연 성분인 가수분해 카제인, GABA, L-트립토판, L-테아닌 성분 강화',
    ],
    ingredients:
      '쌀, 가수분해대두단백, 가수분해연어, 정제닭기름, 천연항미제, 정제대두유, 아마종실, 정제어유(청어유), 비트펄프, 정제섬유소, 프리바이오틱스(치커리 이눌린, 프락토올리고당), 염화콜린, 인산칼슘, 탄산칼슘, 식염, 뷰티르산, 가수분해카제인(αS-카제인), L-트립토판, L-테아닌, GABA, L-카르니틴, 비타민제합제(비타민A,D3,E,B1,B2,B6,B12,비오틴,엽산,판토텐산,나이아신), 미량광물질류합제(철,구리,망간,아연,코발트,요오드,셀레늄), DL-메치오닌, 비타민C, 단백질분해효소, 탄닌, 클리놉틸로라이트, 금잔화추출물(루테인,지아잔틴), 유카추출물, 페뉴그릭추출물, 베리믹스(마키베리,아사이베리,아로니아), 천연항산화제(로즈마리,비타민E,구연산,플라보노이드) *위 사용 원료는 공장 사정에 따라 배합비율이 변경될 수 있음',
    nutrients: [
      [
        { label: '조단백질', value: '22.5% 이상' },
        { label: '조지방', value: '7.0% 이상' },
      ],
      [
        { label: '조섬유', value: '4.0% 이하' },
        { label: '조회분', value: '8.0% 이하' },
      ],
      [
        { label: '칼슘', value: '0.6% 이상' },
        { label: '인', value: '0.4% 이상' },
      ],
      [{ label: '수분', value: '12.0% 이하' }, null],
    ],
  },
];

export function getBrandProduct(
  brandSlug: string,
  productSlug: string
): { brand: Brand; product: BrandProduct } | undefined {
  const brand = getBrand(brandSlug);
  const product = brand && PRODUCTS.find((item) => item.brandId === brand.id && item.slug === productSlug);
  return brand && product ? { brand, product } : undefined;
}

function toProductItem(brand: Brand, product: BrandProduct): ProductItem {
  return {
    id: product.id,
    status: 'active',
    image: '#',
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
export function getBrandLineup(brand: Brand): ProductItem[] {
  const products = PRODUCTS.filter((product) => product.brandId === brand.id);

  return [
    ...products.map((product) => toProductItem(brand, product)),
    ...comingSoonItems(brand.slug, brand.comingSoonCount ?? 0),
  ];
}

/** 홈 화면 등에 노출할 대표 제품 목록. 등록된 제품을 모아 limit만큼 채우고, 모자라면 Coming Soon으로 채웁니다. */
export function getFeaturedProducts(limit = 3): ProductItem[] {
  const active = PRODUCTS.slice(0, limit)
    .map((product) => {
      const brand = BRANDS.find((item) => item.id === product.brandId);
      return brand ? toProductItem(brand, product) : null;
    })
    .filter((item): item is ProductItem => item !== null);

  return [...active, ...comingSoonItems('featured', Math.max(0, limit - active.length))];
}
