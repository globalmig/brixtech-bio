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
    ],
  },
  {
    label: 'BUSINESS',
    href: '/business',
    children: [
      { label: '건강기능식품', href: '/business/supplements' },
      { label: '화장품', href: '/business/cosmetics' },
      { label: '반려동물 푸드', href: '/business/pet-food' },
      { label: '공기정화기', href: '/business/air-purification' },
      { label: '스마트팜', href: '/business/smart-farm' },
    ],
  },
  {
    label: 'BRAND',
    href: '/brand',
    children: [
      { label: '브랜드 전체보기', href: '/brand' },
      { label: 'spione', href: '/brand/spione' },
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
