import type { Metadata } from 'next';

import PageIntro from '@/components/domain/page/PageIntro';
import PageSection from '@/components/domain/page/PageSection';

export const metadata: Metadata = {
  title: '브랜드 소개 | BRIXTECHBIO',
};

export default function BrandPage() {
  return (
    <>
      <PageIntro eyebrow="BRAND" title="브랜드 소개" lead="生(생) — 생명력에서 시작하는 건강" />

      <div className="mx-auto w-full max-w-(--width-app-canvas) px-5 md:px-8 canvas:px-0">
        {/* docs/gitignore/사진자료/미세조류.JPG */}
        <PageSection>
          <p className="text-text-sub text-[0.95rem] leading-6">
            스피루리나와 우리 농산물로 만든 농축액에서 시작된 생각입니다. 당신께 드리는 첫 번째
            선물이라는 마음으로, 생명력과 건강을 전합니다.
          </p>
          <p className="text-text-info mt-3 text-[0.85rem] italic">
            시각자료 : 농축액 제품소개서 표지의 &quot;生&quot; 브랜드 비주얼 또는 미세조류
            클로즈업 사진 — 브랜드 철학 문장과 함께 감성적인 전면 이미지로 배치
          </p>
        </PageSection>
      </div>
    </>
  );
}
