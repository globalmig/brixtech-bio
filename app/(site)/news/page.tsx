import type { Metadata } from 'next';

import NewsList, { type NewsItem } from '@/components/domain/news/NewsList';
import PageIntro from '@/components/domain/page/PageIntro';

export const metadata: Metadata = {
  title: '기업 소식 | BRIXTECHBIO',
};

const NEWS_ITEMS: NewsItem[] = Array.from({ length: 35 }, (_, index) => {
  const id = 35 - index;
  return {
    id,
    title: '기업 소식 제목입니다.',
    content: '기업 소식 내용입니다.',
    date: '2026.00.00',
  };
});

export default function NewsPage() {
  return (
    <>
      <PageIntro eyebrow="NEWS" title="기업 소식" lead="브릭스텍바이오의 새로운 소식을 전합니다." />

      <section className="mx-auto w-full max-w-(--width-app-canvas) px-[4%] py-15 md:px-8 canvas:px-0 lg:py-30">
        <NewsList items={NEWS_ITEMS} />
      </section>
    </>
  );
}
