import type { Metadata } from 'next';

import BusinessPageTemplate from '@/components/domain/business/BusinessPageTemplate';
import PageSection from '@/components/domain/page/PageSection';

export const metadata: Metadata = {
  title: '공기정화기 | BRIXTECHBIO',
};

export default function BusinessAirPurificationPage() {
  return (
    <BusinessPageTemplate
      title="공기정화기"
      lead="미세조류 기반 친환경 탄소 저감 및 바이오 공기정화 시스템을 구현합니다."
    >
      <PageSection title="미세조류 기반 바이오 공기정화">
        <p className="text-text-sub text-[0.95rem] leading-6">
          미세조류의 탄소 흡수 능력을 활용한 공기정화 시스템을 준비하고 있습니다. 제품 상세
          정보와 시각자료는 출시 일정에 맞춰 공개됩니다.
        </p>
        <p className="text-text-info mt-3 text-[0.85rem] italic">
          시각자료 : 제품 상세 스펙·이미지 확정 전까지는 &quot;출시 예정&quot; 텍스트 배너로
          대체 (현재 실사진·스펙 없음, 확보 필요)
        </p>
      </PageSection>
    </BusinessPageTemplate>
  );
}
