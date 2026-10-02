export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
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
  { label: 'CONTACT', href: '/contact' },
];
