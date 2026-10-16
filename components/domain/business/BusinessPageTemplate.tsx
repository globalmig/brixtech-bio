import type { ReactNode } from 'react';

import PageIntro from '@/components/domain/page/PageIntro';

interface BusinessPageTemplateProps {
  title: string;
  lead: string;
  children: ReactNode;
}

/**
 * Business 하위 4개 페이지(건강기능식품/화장품/반려동물 푸드/스마트팜)가 공유하는 레이아웃입니다.
 * 콘텐츠만 교체해 새 사업 항목이 추가될 때도 같은 틀을 재사용합니다.
 */
export default function BusinessPageTemplate({
  title,
  lead,
  children,
}: BusinessPageTemplateProps) {
  return (
    <>
      <PageIntro eyebrow="BUSINESS" title={title} lead={lead} />
      <div className="mx-auto w-full max-w-(--width-app-canvas) px-5 md:px-8 canvas:px-0">
        {children}
      </div>
    </>
  );
}
