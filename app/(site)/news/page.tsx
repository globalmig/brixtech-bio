import type { Metadata } from 'next';

import NewsList from '@/components/domain/news/NewsList';
import PageIntro from '@/components/domain/page/PageIntro';
import { getNewsList } from '@/lib/news';
import { toNewsItem } from '@/types/news';

export const metadata: Metadata = {
  title: '기업 소식 | BRIXTECHBIO',
};

export default async function NewsPage() {
  const newsList = await getNewsList();

  return (
    <>
      <PageIntro eyebrow="NEWS" title="기업 소식" />

      <section className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <NewsList items={newsList.map(toNewsItem)} />
      </section>
    </>
  );
}
