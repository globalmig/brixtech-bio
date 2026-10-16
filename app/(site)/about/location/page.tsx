import type { Metadata } from 'next';

import PageIntro from '@/components/domain/page/PageIntro';
import PageSection from '@/components/domain/page/PageSection';

export const metadata: Metadata = {
  title: '오시는길 | BRIXTECHBIO',
};

export default function AboutLocationPage() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT"
        title="오시는길"
        lead="서울 사무소와 전남 나주 Lab을 운영하고 있습니다. 방문 전 미리 연락 주시면 자세히 안내해드리겠습니다."
      />

      <div className="mx-auto w-full max-w-(--width-app-canvas) px-5 md:px-8 canvas:px-0">
        <PageSection title="서울 사무소">
          <p className="text-text-sub text-[0.95rem] leading-6">
            서울시 강남대로 101안길 13, B1~4F
          </p>
          <p className="text-text-info mt-3 text-[0.85rem] italic">
            시각자료 : 네이버/카카오 지도 API 임베드로 서울 사무소 실제 위치 표시
          </p>
        </PageSection>

        <PageSection title="Lab. 연구실">
          <p className="text-text-sub text-[0.95rem] leading-6">
            전남 나주시 빛가람로 737, 203호·303호
          </p>
          {/* docs/gitignore/사진자료/배양관 탱크 제어 장치를 연결한 설비 전경.JPG */}
          <p className="text-text-info mt-3 text-[0.85rem] italic">
            시각자료 : 나주 Lab 지도 임베드 + 실제 배양 설비 사진
          </p>
        </PageSection>

        <PageSection title="연락처">
          <p className="text-text-sub text-[0.95rem] leading-6">대표번호 02-6242-6584</p>
          <p className="text-text-info mt-1 text-[0.95rem] leading-6">
            이메일 안내는 준비 중입니다.
          </p>
        </PageSection>
      </div>
    </>
  );
}
