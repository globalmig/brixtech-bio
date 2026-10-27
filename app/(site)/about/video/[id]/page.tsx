import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import VideoDetail from '@/components/domain/video/VideoDetail';
import PageIntro from '@/components/domain/page/PageIntro';
import { getVideoList } from '@/lib/videos';
import { toVideoItem } from '@/types/video';

interface VideoDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: VideoDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const videoList = await getVideoList();
  const item = videoList.find((video) => video.id === id);

  return {
    title: item ? `${item.title} | BRIXTECHBIO` : '홍보 영상 | BRIXTECHBIO',
  };
}

export default async function VideoDetailPage({ params }: VideoDetailPageProps) {
  const { id } = await params;
  const videoList = await getVideoList();
  const index = videoList.findIndex((video) => video.id === id);

  if (index === -1) {
    notFound();
  }

  const item = toVideoItem(videoList[index]);
  const prevItem = videoList[index + 1] && toVideoItem(videoList[index + 1]);
  const nextItem = videoList[index - 1] && toVideoItem(videoList[index - 1]);

  return (
    <>
      <PageIntro eyebrow="ABOUT" title="홍보 영상" />

      <section className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <VideoDetail item={item} prevItem={prevItem} nextItem={nextItem} />
      </section>
    </>
  );
}
