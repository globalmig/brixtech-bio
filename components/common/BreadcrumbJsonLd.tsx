import JsonLd from './JsonLd';

const BASE_URL = 'https://www.brixtech-bio.co.kr';

export interface BreadcrumbItem {
  name: string;
  /** 사이트 루트 기준 경로 (예: '/about') */
  path: string;
}

export default function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };

  return <JsonLd data={breadcrumbJsonLd} />;
}
