import type { Metadata } from 'next';

import BulletList from '@/components/domain/page/BulletList';
import PageIntro from '@/components/domain/page/PageIntro';
import PageSection from '@/components/domain/page/PageSection';

export const metadata: Metadata = {
  title: '원료화 및 제품화 과정 | BRIXTECHBIO',
};

export default function TechProcessPage() {
  return (
    <>
      <PageIntro
        eyebrow="TECH"
        title="원료화 및 제품화 과정"
        lead="배양부터 원료화, 제품화까지 이어지는 통합 사업화 구조를 갖추고 있습니다."
      />

      <div className="mx-auto w-full max-w-(--width-app-canvas) px-5 md:px-8 canvas:px-0">
        <PageSection title="사업화 5단계">
          <BulletList
            items={[
              '배양 — 자체 배양 시스템으로 고순도 미세조류를 대량 배양합니다.',
              '원료화 — 분말·추출물·배양액 등 고기능 원료로 표준화합니다.',
              '제품화 — 건강기능식품·화장품·펫푸드·공기정화기·스마트팜 등 다양한 제품을 개발합니다.',
              '유통 — 자체몰·유통사·해외 파트너를 통해 안정적으로 공급합니다.',
              '플랫폼화 — 하나의 브랜드로 연결합니다.',
            ]}
          />
        </PageSection>

        <PageSection title="원료 표준화">
          <p className="text-text-sub text-[0.95rem] leading-6">
            분말·추출물·배양액 등 고기능 원료로 표준화하며, 건강기능식품·화장품·펫푸드·바이오스티뮬런트로
            제품화됩니다. 완제품뿐 아니라 바이오·화장품·식품 분야의 외부 파트너에게 미세조류 소재를
            직접 개발·공급하는 B2B 원료 공급도 함께 추진합니다.
          </p>
          {/* 배양액 단계는 docs/gitignore/사진자료/저장탱크.JPG 활용 가능, 분말·추출물 샘플은 실물 사진 확보 필요 */}
          <p className="text-text-info mt-3 text-[0.85rem] italic">
            시각자료 : 분말·추출물·배양액 등 원료 형태별 샘플 사진을 나란히 배치
          </p>
        </PageSection>

        <PageSection title="유통 전략">
          <BulletList
            items={[
              '온라인 — 네이버스마트스토어, 쿠팡·11번가, 자사몰 정기구독, SNS·인플루언서 마케팅',
              '오프라인 — 지역 총판·대리점, 건강검진센터·약국·건강식품전문매장, 동물병원·펫샵, 피부관리샵·올리브영',
              '해외 — 동남아·일본·미국 및 아마존 입점',
            ]}
          />
        </PageSection>
      </div>
    </>
  );
}
