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
      <PageIntro eyebrow="BUSINESS" title={title}/>
      <div className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <div className="border-gray-300 border-b pb-10 lg:pb-12">
          <p className="text-small text-black mb-4 font-bold lg:mb-8">BUSINESS</p>
          <h2 className="text-h4 lg:text-h2 text-black mb-5">{title}</h2>
          <p className="text-body text-gray-750">{lead}</p>
        </div>
        {children}
      </div>
    </>
  );
}
