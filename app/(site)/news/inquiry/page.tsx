import type { Metadata } from 'next';

import InquiryForm from '@/components/domain/news/InquiryForm';
import PageIntro from '@/components/domain/page/PageIntro';

export const metadata: Metadata = {
  title: '사업 제휴 및 제품 문의 | BRIXTECHBIO',
};

export default function NewsInquiryPage() {
  return (
    <>
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
