import type { Metadata } from 'next';

import InquiryForm from '@/components/domain/news/InquiryForm';
import PageIntro from '@/components/domain/page/PageIntro';
import BreadcrumbJsonLd from '@/components/common/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: '사업 제휴 및 제품 문의 | BRIXTECHBIO',
  alternates: {
    canonical: '/news/inquiry',
  },
};

export default function NewsInquiryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: '홈', path: '/' },
          { name: '기업 소식', path: '/news' },
          { name: '사업 제휴 및 제품 문의', path: '/news/inquiry' },
        ]}
      />
      <PageIntro
        eyebrow="NEWS"
        title="사업 제휴 및 제품 문의"
      />

      <section className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <InquiryForm />
      </section>
    </>
  );
}
