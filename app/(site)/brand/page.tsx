import type { Metadata } from 'next';

import BrandGallery from '@/components/domain/brand/BrandGallery';
import PageIntro from '@/components/domain/page/PageIntro';
import { BRAND_BUSINESS_CATEGORIES, BRANDS } from '@/constants/brands';

export const metadata: Metadata = {
  title: '브랜드 소개 | BRIXTECHBIO',
};

export default function BrandPage() {
  return (
    <>
      <PageIntro eyebrow="BRAND" title="브랜드 소개" />

      <section className="py-15 canvas:py-30">
        <div className="mx-auto w-full max-w-360 px-[3%] canvas:px-0">
          <p className="text-small text-black mb-4 font-bold lg:mb-8">BRAND &amp; PRODUCTS</p>
          <h2 className="text-h4 lg:text-h2 text-black mb-5">다양한 브랜드를 만나보세요</h2>
          <p className="text-body mb-10 text-gray-750 lg:mb-20">
            건강기능식품, 화장품, 반려동물 푸드, 스마트팜까지
            <br />
            브릭스텍바이오가 선보이는 브랜드와 제품을 소개합니다.
          </p>
        </div>

        <BrandGallery brands={BRANDS} categories={BRAND_BUSINESS_CATEGORIES} />
      </section>
    </>
  );
}
