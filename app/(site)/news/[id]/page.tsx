import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import NewsDetail from '@/components/domain/news/NewsDetail';
import PageIntro from '@/components/domain/page/PageIntro';
import { NEWS_ITEMS } from '@/constants/news';

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = NEWS_ITEMS.find((news) => news.id === Number(id));

  return {
    title: item ? `${item.title} | BRIXTECHBIO` : '기업 소식 | BRIXTECHBIO',
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const index = NEWS_ITEMS.findIndex((news) => news.id === Number(id));

  if (index === -1) {
    notFound();
  }

  const item = NEWS_ITEMS[index];
  const prevItem = NEWS_ITEMS[index + 1];
  const nextItem = NEWS_ITEMS[index - 1];

  return (
    <>
      <PageIntro eyebrow="NEWS" title="기업 소식" />

      <section className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <NewsDetail item={item} prevItem={prevItem} nextItem={nextItem} />
      </section>
    </>
  );
}
