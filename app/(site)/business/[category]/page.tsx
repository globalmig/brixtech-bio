import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BusinessPageTemplate from '@/components/domain/business/BusinessPageTemplate';
import BusinessSectionRenderer from '@/components/domain/business/BusinessSectionRenderer';
import { getBusinessPage, getOrderedBusinessCategories } from '@/lib/business';

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
  return { title: page ? `${page.title} | BRIXTECHBIO` : 'BRIXTECHBIO' };
}

export default async function BusinessCategoryPage({
  params,
}: BusinessCategoryPageProps) {
  const { category } = await params;

  const page = await getBusinessPage(category);

  if (!page || !page.isActive) notFound();

  const visibleSections = page.sections.filter((section) => !section.hidden);

  return (
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
  );
}
