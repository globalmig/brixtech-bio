export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  external?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'ABOUT',
    href: '/about',
    children: [
      { label: '기업소개', href: '/about' },
      { label: '비전', href: '/about/vision' },
      { label: '오시는길', href: '/about/location' },
    ],
  },
  {
    label: 'TECH',
    href: '/tech',
    children: [
      { label: '스피루리나 소개', href: '/tech' },
      { label: '배양 기술', href: '/tech/cultivation' },
      { label: '원료화 및 제품화 과정', href: '/tech/process' },
    ],
  },
  {
    label: 'BUSINESS',
    href: '/business',
    children: [
      { label: '건강기능식품', href: '/business/supplements' },
      { label: '화장품', href: '/business/cosmetics' },
      { label: '반려동물 푸드', href: '/business/pet-food' },
      { label: '스마트팜', href: '/business/smart-farm' },
    ],
  },
  {
    label: 'BRAND',
    href: '/brand',
    children: [
      { label: '브랜드 소개', href: '/brand' },
      { label: '제품 소개', href: '/brand/products' },
    ],
  },
  {
    label: 'NEWS',
    href: '/news',
    children: [
      { label: '기업 소식', href: '/news' },
      { label: '사업 제휴 및 제품 문의', href: '/news/inquiry' },
    ],
  },
  // TODO: 실제 자사몰 URL로 교체 필요 (자사몰 오픈 시 버튼 활성화)
  { label: '자사몰 바로가기', href: '#', external: true },
];

/**
 * 헤더에만 노출하는 내부 검토용 메뉴입니다.
 * 운영 중인 메인페이지(NAV_ITEMS)와는 별도로, /design 시안을 확인하는 용도로만 사용합니다.
 * 시안이 컨펌되면 이 메뉴와 /design 라우트를 제거하고 해당 디자인을 실제 메인페이지에 반영합니다.
 */
export const DESIGN_REVIEW_ITEM: NavItem = { label: 'DESIGN', href: '/design' };
