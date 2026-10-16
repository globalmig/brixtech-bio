import type { Metadata } from 'next';

import { Badge } from '@/components/common/Badge';
import BulletList from '@/components/domain/page/BulletList';
import PageIntro from '@/components/domain/page/PageIntro';
import PageSection from '@/components/domain/page/PageSection';

export const metadata: Metadata = {
  title: '제품 소개 | BRIXTECHBIO',
};

export default function BrandProductsPage() {
  return (
    <>
      <PageIntro
        eyebrow="BRAND"
        title="제품 소개"
        lead="스피루리나 농축액부터 새롭게 선보이는 도그원샷까지."
      />

      <div className="mx-auto w-full max-w-(--width-app-canvas) px-5 md:px-8 canvas:px-0">
        <PageSection title="제품 카테고리">
          <BulletList items={['건강기능식품', '화장품', '반려동물 푸드', '스마트팜']} />
        </PageSection>

        <PageSection title="대표 제품">
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-text-default text-[0.98rem] font-semibold">
                스피루리나 농축액 &quot;生&quot;
              </p>
              <p className="text-text-sub mt-1 text-[0.9rem] leading-6">
                스피루리나와 우리 농산물로 만든 건강 농축액입니다.
              </p>
            </div>
            <div>
              <p className="text-text-default text-[0.98rem] font-semibold">
                도그원샷
              </p>
              <p className="text-text-sub mt-1 text-[0.9rem] leading-6">
                반려동물을 위한 수제 펫푸드로, 출시를 앞두고 있습니다.
              </p>
            </div>
          </div>
          <p className="text-text-info mt-3 text-[0.85rem] italic">
            시각자료 : 농축액 &quot;生&quot;과 도그원샷(확정 전까지는 &quot;출시 예정&quot;
            배너) 제품컷을 나란히 배치
          </p>
        </PageSection>
      </div>
    </>
  );
}
