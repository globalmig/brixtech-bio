import type { Metadata } from 'next';

import BusinessPageTemplate from '@/components/domain/business/BusinessPageTemplate';
import CustomerReviews from '@/components/domain/business/CustomerReviews';
import BulletList from '@/components/domain/page/BulletList';
import PageSection from '@/components/domain/page/PageSection';

export const metadata: Metadata = {
  title: '건강기능식품 | BRIXTECHBIO',
};

export default function BusinessSupplementsPage() {
  return (
    <BusinessPageTemplate
      title="건강기능식품"
      lead="고순도 스피루리나 원료로 만든, 브릭스텍바이오의 핵심 건강기능식품 라인입니다."
    >
      <p className="text-text-info pt-10 text-[0.85rem] italic">
        시각자료 : 페이지 상단에 농축액·스틱 등 제품 패키지 실물 사진 배치 (현재 실사진 없음,
        확보 필요)
      </p>

      <PageSection title="핵심 효능">
        <BulletList
          items={[
            '면역력과 면역 반응 강화에 도움을 줍니다.',
            '심장 건강과 콜레스테롤 관리에 도움을 줍니다.',
            '소화 기능 개선에 도움을 줍니다.',
            '자연스러운 해독 작용을 지원합니다.',
            '항산화 작용 — 전 세계 과학자들의 40년 이상 연구를 기반으로 합니다.',
          ]}
        />
      </PageSection>

      <PageSection title="섭취 가이드">
        <BulletList
          items={[
            '일반 권장 — 1일 1포',
            '처음 섭취하실 때 — 아침 2포, 저녁 1포',
            '다이어트 목적 — 아침 2포, 저녁 2포로 식사 대용',
          ]}
        />
      </PageSection>

      <PageSection title="고객 후기">
        <CustomerReviews
          reviews={[
            {
              quote:
                '지인 선물용으로 샀는데 제가 먼저 먹게 됐어요. 농축액은 양이 넉넉해서 아침저녁으로 든든하게 챙겨 먹기 좋고, 스틱 타입은 휴대가 간편해서 생각날 때마다 먹기 좋아요. 꾸준히 먹어볼게요!',
              context: '선물용으로 구매 후 직접 섭취',
            },
            {
              quote:
                '처음에는 효과를 잘 못 느꼈는데, 꾸준히 먹다 보니 아침에 속이 편해지고 컨디션이 자연스럽게 좋아지는 느낌이에요. 저한테 잘 맞는 것 같아요.',
              context: '2개월째 섭취',
            },
            {
              quote:
                '농축액만 먹다가 스틱 제품도 같이 먹기 시작했는데, 휴대하기도 편하고 먹기도 편해서 몸이 더 가벼워진 느낌이에요.',
              context: '농축액과 함께 섭취',
            },
            {
              quote:
                '아직은 챙겨줘야 먹지만, 잘 받아먹는 걸 보니 맛이 괜찮은가 봐요. 항상 배송도 빠르고 신선하게 보내주셔서 믿고 먹이고 있습니다.',
              context: '자녀에게 섭취',
            },
            {
              quote:
                '딸 건강 생각해서 먹이기 시작했는데, 꾸준히 챙겨 먹더니 컨디션이 좋아진 것 같다고 하네요. 좋다는 건 알았지만 직접 효과를 보니 더 믿음이 가요.',
              context: '모녀가 함께 섭취',
            },
          ]}
        />
      </PageSection>
    </BusinessPageTemplate>
  );
}
