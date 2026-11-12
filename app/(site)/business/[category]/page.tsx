import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BusinessPageTemplate from '@/components/domain/business/BusinessPageTemplate';
import BusinessSectionRenderer from '@/components/domain/business/BusinessSectionRenderer';
import BreadcrumbJsonLd from '@/components/common/BreadcrumbJsonLd';
import JsonLd from '@/components/common/JsonLd';
import { getBusinessPage, getOrderedBusinessCategories } from '@/lib/business';

const BASE_URL = 'https://www.brixtech-bio.co.kr';

interface BusinessCategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getOrderedBusinessCategories();
  return categories.map((item) => ({ category: item.slug }));
}

export async function generateMetadata({
  params,
}: BusinessCategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const page = await getBusinessPage(category);
  return {
    title: page ? `${page.title} | BRIXTECHBIO` : 'BRIXTECHBIO',
    alternates: {
      canonical: `/business/${category}`,
    },
  };
}

export default async function BusinessCategoryPage({
  params,
}: BusinessCategoryPageProps) {
  const { category } = await params;

  const page = await getBusinessPage(category);

  if (!page || !page.isActive) notFound();

  const visibleSections = page.sections.filter((section) => !section.hidden);

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    url: `${BASE_URL}/business/${category}`,
    dateModified: page.updatedAt,
  };

  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: '홈', path: '/' },
          { name: '사업 영역', path: '/business' },
          { name: page.title, path: `/business/${category}` },
        ]}
      />
      <BusinessPageTemplate
        title={page.title}
        titleEn={page.titleEn}
        lead={page.lead}
        leadHidden={page.leadHidden}
      >
        {visibleSections.map((section) => (
          <BusinessSectionRenderer key={section.id} section={section} />
        ))}
      </BusinessPageTemplate>
    </>
  );
}
