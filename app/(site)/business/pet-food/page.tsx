import type { Metadata } from 'next';

import BusinessPageTemplate from '@/components/domain/business/BusinessPageTemplate';
import ReviewDisclaimer from '@/components/domain/business/ReviewDisclaimer';
import { Badge } from '@/components/common/Badge';
import BulletList from '@/components/domain/page/BulletList';
import InfoTable from '@/components/domain/page/InfoTable';
import PageSection from '@/components/domain/page/PageSection';

export const metadata: Metadata = {
  title: '반려동물 푸드 | BRIXTECHBIO',
};

export default function BusinessPetFoodPage() {
  return (
    <BusinessPageTemplate
      title="반려동물 푸드"
      lead="기능성 미세조류 원료로 만드는 즉석 수제 펫푸드, 도그원샷을 만나보세요."
    >
      <PageSection>
        <h2 className="text-h5 lg:text-h4 text-primary-2 mb-5 font-bold">
          도그원샷
        </h2>
        <p className="text-text-sub text-[0.95rem] leading-6">
          반려동물의 피부와 피모 건강을 위한 수제 펫푸드가 곧 출시됩니다. 자세한 제품 정보는
          출시와 함께 공개됩니다.
        </p>
        <p className="text-text-info mt-3 text-[0.85rem] italic">
          시각자료 : 패키지 디자인이 확정되면 제품컷 사진을 메인으로, 확정 전까지는
          &quot;출시 예정&quot; 텍스트 배너로 대체 (도그원샷 상세 스펙·이미지는 현재 자료 없음,
          확보 필요)
        </p>
      </PageSection>

      <PageSection title="왜 피부 건강인가">
        <p className="text-text-sub text-[0.95rem] leading-6">
          반복되는 가려움과 피부 손상은 2차 세균·효모 감염, 만성 외이염으로 이어질 수 있어
          보호자에게 꾸준한 관리 부담을 줍니다. 도그원샷은 피부·피모 컨디션 관리를 중심에 둔
          고단백 사료를 일상 급여용으로, 저알러지·습식 제품을 보완 선택지로 제공합니다.
        </p>
      </PageSection>

      <PageSection title="제품 라인업">
        <p className="text-text-sub text-[0.95rem] leading-6">
          기능성 미세조류 원료로 만드는 즉석 수제 펫푸드 3종(츄르·소시지·육포)을 함께
          선보입니다.
        </p>
        <p className="text-text-info mt-3 text-[0.85rem] italic">
          시각자료 : 츄르·소시지·육포 3종을 나란히 보여주는 제품 라인업 사진 (현재 실사진 없음,
          확보 필요)
        </p>
      </PageSection>

      <PageSection title="반려동물 변화 사례">
        <ReviewDisclaimer />
        <InfoTable
          rows={[
            { label: '1일차', value: '귀 주변 피부 발적과 긁는 행동 관찰' },
            { label: '2일차', value: '완화 효과와 식욕 증진' },
            { label: '4일차', value: '긁는 행동 감소' },
            { label: '6일차', value: '80% 개선' },
            { label: '8일차', value: '긁는 행동 소실' },
            { label: '10일차', value: '100% 개선' },
          ]}
        />
        <p className="text-text-info mt-3 text-[0.85rem] italic">
          시각자료 : 위 표의 1일차와 10일차 상태를 나란히 놓은 반려동물 피부 Before/After 비교
          사진을 표 위(또는 좌우)에 배치 (현재 실사진 없음, 확보 필요)
        </p>
      </PageSection>

      <PageSection title="앞으로의 계획">
        <BulletList items={['AI 연동 펫푸드 시스템 개발과 프랜차이즈 확장을 준비하고 있습니다.']} />
      </PageSection>
    </BusinessPageTemplate>
  );
}
