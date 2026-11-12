import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import NewsDetail from '@/components/domain/news/NewsDetail';
import PageIntro from '@/components/domain/page/PageIntro';
import BreadcrumbJsonLd from '@/components/common/BreadcrumbJsonLd';
import JsonLd from '@/components/common/JsonLd';
import { getNewsList } from '@/lib/news';
import { toNewsItem } from '@/types/news';
import { htmlToSummary } from '@/lib/utils';

const BASE_URL = 'https://www.brixtech-bio.co.kr';

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const newsList = await getNewsList();
  const item = newsList.find((news) => news.id === id);

  return {
    title: item ? `${item.title} | BRIXTECHBIO` : '기업 소식 | BRIXTECHBIO',
    alternates: {
      canonical: `/news/${id}`,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const newsList = await getNewsList();
  const index = newsList.findIndex((news) => news.id === id);

  if (index === -1) {
    notFound();
  }

  const newsRow = newsList[index];
  const item = toNewsItem(newsRow);
  const prevItem = newsList[index + 1] && toNewsItem(newsList[index + 1]);
  const nextItem = newsList[index - 1] && toNewsItem(newsList[index - 1]);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: newsRow.title,
    description: htmlToSummary(newsRow.content),
    datePublished: newsRow.createdAt,
    dateModified: newsRow.updatedAt,
    author: {
      '@type': 'Organization',
      name: '브릭스텍바이오',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: '브릭스텍바이오',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/og_image.png`,
      },
    },
    mainEntityOfPage: `${BASE_URL}/news/${id}`,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: '홈', path: '/' },
          { name: '기업 소식', path: '/news' },
          { name: item.title, path: `/news/${id}` },
        ]}
      />
      <PageIntro eyebrow="NEWS" title="기업 소식" lastCrumb={item.title} />

      <section className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <NewsDetail item={item} prevItem={prevItem} nextItem={nextItem} />
      </section>
    </>
  );
}
