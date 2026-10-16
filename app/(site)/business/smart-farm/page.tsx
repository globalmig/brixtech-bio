import type { Metadata } from 'next';

import BusinessPageTemplate from '@/components/domain/business/BusinessPageTemplate';
import BulletList from '@/components/domain/page/BulletList';
import PageSection from '@/components/domain/page/PageSection';
import RoadmapGrid from '@/components/domain/page/RoadmapGrid';

export const metadata: Metadata = {
  title: '스마트팜 | BRIXTECHBIO',
};

export default function BusinessSmartFarmPage() {
  return (
    <BusinessPageTemplate
      title="스마트팜"
      lead="미세조류 기반 비료로 키운 딸기와 토마토를, 가까운 매장에서 만나보세요."
    >
      <PageSection title="미세조류 기반 바이오 농법">
        <p className="text-text-sub text-[0.95rem] leading-6">
          비농지에서도 자생하는 미세조류 배양 기술을 농업 영역으로 확장했습니다. 일반적인
          스마트팜이 온도·습도 같은 환경 관리에 집중한다면, 브릭스텍바이오는 여기에 미세조류
          기반 비료를 더해 당도와 식감까지 관리합니다.
        </p>
        <p className="text-text-info mt-3 text-[0.85rem] italic">
          시각자료 : 도시형 스마트팜 시설 사진 (현재 실사진 없음, 확보 필요)
        </p>
      </PageSection>

      <PageSection title="재배 경쟁력">
        <BulletList
          items={[
            '딸기·벼 — 비료 공급 시 착과와 꽃봉오리가 늘고, 당도·과즙·식감이 개선되는 것을 확인했습니다.',
            '포도 — 영양 부족으로 시들어가던 포도나무가 비료 공급 약 2주 만에 회복되었습니다.',
            '파프리카 — 발아 수량 2배 이상, 성장 속도 30% 이상 빠른 결과를 확인했습니다.',
          ]}
        />
        <p className="text-text-info mt-3 text-[0.85rem] italic">
          시각자료 : 포도나무가 비료 공급 약 2주 만에 회복된 사례는 Before/After 비교 사진으로
          보여주면 효과적(화장품·반려동물 푸드와 마찬가지로 효과를 눈으로 보여줄 수 있는 지점).
          딸기·파프리카도 재배 전후 비교컷 권장 — 실제 촬영 사진 없음, 확보 필요
        </p>
      </PageSection>

      <PageSection title="매장과 납품">
        <p className="text-text-sub text-[0.95rem] leading-6">
          약 6평 소형 매장에서 시식 후 소포장·묶음 구매가 가능하며, 예약 주문과 픽업을
          운영합니다. 인근 카페·베이커리·식당에는 발주량에 맞춰 수확·배송합니다. 시범 운영
          성과에 따라 지역별 매장을 확대할 계획입니다.
        </p>
        <p className="text-text-info mt-3 text-[0.85rem] italic">
          시각자료 : 약 6평 소형 매장의 실제 운영 사진 (현재 실사진 없음, 확보 필요)
        </p>
      </PageSection>

      <PageSection title="추진 계획">
        <RoadmapGrid
          items={[
            {
              period: '2~3년차',
              description: '도시 스마트팜 테스트베드 구축과 딸기·토마토 직거래 매장 시범 운영',
            },
            { period: '4~5년차', description: '바이오스티뮬런트 농법 기반 스마트팜 확장' },
          ]}
        />
      </PageSection>
    </BusinessPageTemplate>
  );
}
