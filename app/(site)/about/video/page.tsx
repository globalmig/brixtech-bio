import type { Metadata } from 'next';

import VideoBrowser from '@/components/domain/video/VideoBrowser';
import PageIntro from '@/components/domain/page/PageIntro';
import BreadcrumbJsonLd from '@/components/common/BreadcrumbJsonLd';
import { getVideoList } from '@/lib/videos';
import { toVideoItem } from '@/types/video';

export const metadata: Metadata = {
  title: '홍보 영상 | BRIXTECHBIO',
  alternates: {
    canonical: '/about/video',
  },
};

export default async function AboutVideoPage() {
  const videoList = await getVideoList();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: '홈', path: '/' },
          { name: '기업소개', path: '/about' },
          { name: '홍보 영상', path: '/about/video' },
        ]}
      />
      <PageIntro eyebrow="ABOUT" title="홍보 영상" />

      <section className="py-15 canvas:py-30">
        <VideoBrowser items={videoList.map(toVideoItem)} />
      </section>
    </>
  );
}
