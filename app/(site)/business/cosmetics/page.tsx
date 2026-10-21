import type { Metadata } from 'next';

import BusinessPageTemplate from '@/components/domain/business/BusinessPageTemplate';
import CustomerReviews from '@/components/domain/business/CustomerReviews';
import BulletList from '@/components/domain/page/BulletList';
import PageSection from '@/components/domain/page/PageSection';
import RoadmapGrid from '@/components/domain/page/RoadmapGrid';

export const metadata: Metadata = {
  title: '화장품 | BRIXTECHBIO',
};

export default function BusinessCosmeticsPage() {
  return (
    <BusinessPageTemplate
      title="화장품"
      lead="피코시아닌·베타카로틴·클로로필, 미세조류 유래 3대 활성성분을 담은 바이오 스킨케어입니다."
    >
      <p className="text-text-info pt-10 text-[0.85rem] italic">
        시각자료 : 페이지 상단에 화장품 라인업 전체컷 사진 배치 (현재 실사진 없음, 확보 필요)
      </p>

      <PageSection title="핵심 성분과 효능">
        <BulletList
          items={[
            '피코시아닌 — 강력한 항산화 작용으로 노화 신호를 완화하고, 피부 자극이 적습니다.',
            '베타카로틴 — 적은 양으로도 충분한 보습력을 제공하며, 끈적임 없이 산뜻하게 흡수됩니다.',
            '클로로필 — 노폐물 배출을 돕고 피부 진정과 세포 재생에 도움을 줍니다.',
          ]}
        />
      </PageSection>

      <PageSection title="출시 계획">
        <RoadmapGrid
          items={[
            {
              year: '2027',
              yearLabel: '2 ~ 3년차',
              description: ['고기능성 화장품 및 바디케어 라인 출시'],
            },
            {
              year: '2029',
              yearLabel: '4 ~ 5년차',
              description: ['미세조류 유래 천연 화장품 원료 자체 개발'],
            },
          ]}
        />
      </PageSection>

      <PageSection title="고객 후기">
        <CustomerReviews />
        <p className="text-text-info mt-3 text-[0.85rem] italic">
          시각자료 : 피부 사용 전후(Before/After) 비교 사진 — 화장품은 효과를 눈으로 보여줄 수
          있는 유일한 사업이므로 이 섹션이 가장 적합한 위치. 실제 사용자 촬영본이 없다면
          임상·관능평가용 모델 사진으로 대체 검토 (현재 실사진 없음, 확보 필요)
        </p>
      </PageSection>
    </BusinessPageTemplate>
  );
}
