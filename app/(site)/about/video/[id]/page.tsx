import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import VideoDetail from '@/components/domain/video/VideoDetail';
import PageIntro from '@/components/domain/page/PageIntro';
import BreadcrumbJsonLd from '@/components/common/BreadcrumbJsonLd';
import JsonLd from '@/components/common/JsonLd';
import { getVideoList } from '@/lib/videos';
import { toVideoItem } from '@/types/video';

const BASE_URL = 'https://www.brixtech-bio.co.kr';

interface VideoDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: VideoDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const videoList = await getVideoList();
  const item = videoList.find((video) => video.id === id);

  return {
    title: item ? `${item.title} | BRIXTECHBIO` : '홍보 영상 | BRIXTECHBIO',
    alternates: {
      canonical: `/about/video/${id}`,
    },
  };
}

export default async function VideoDetailPage({ params }: VideoDetailPageProps) {
  const { id } = await params;
  const videoList = await getVideoList();
  const index = videoList.findIndex((video) => video.id === id);

  if (index === -1) {
    notFound();
  }

  const videoRow = videoList[index];
  const item = toVideoItem(videoRow);
  const prevItem = videoList[index + 1] && toVideoItem(videoList[index + 1]);
  const nextItem = videoList[index - 1] && toVideoItem(videoList[index - 1]);

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: videoRow.title,
    url: `${BASE_URL}/about/video/${id}`,
    datePublished: videoRow.createdAt,
    dateModified: videoRow.updatedAt,
  };

  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: '홈', path: '/' },
          { name: '기업소개', path: '/about' },
          { name: '홍보 영상', path: '/about/video' },
          { name: item.title, path: `/about/video/${id}` },
        ]}
      />
      <PageIntro eyebrow="ABOUT" title="홍보 영상" lastCrumb={item.title} />

      <section className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <VideoDetail item={item} prevItem={prevItem} nextItem={nextItem} />
      </section>
    </>
  );
}
