import type { Metadata } from 'next';

import BulletList from '@/components/domain/page/BulletList';
import InfoTable from '@/components/domain/page/InfoTable';
import PageIntro from '@/components/domain/page/PageIntro';
import PageSection from '@/components/domain/page/PageSection';

export const metadata: Metadata = {
  title: '기업소개 | BRIXTECHBIO',
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT"
        title="기업소개"
        lead="미세조류 기반 기능성 원료 및 친환경 바이오 응용제품 개발을 통해 인류의 건강과 지속가능한 미래를 만들어가는 바이오혁신기업입니다."
      />

      <div className="mx-auto w-full max-w-(--width-app-canvas) px-5 md:px-8 canvas:px-0">
        {/* docs/gitignore/사진자료/배양관 탱크 제어 장치를 연결한 설비 전경.JPG */}
        <p className="text-text-info pt-6 text-[0.85rem] italic">
          시각자료 : 배양 현장 또는 미세조류 클로즈업 사진을 히어로 배경으로 사용
        </p>

        <PageSection title="회사 개요">
          <InfoTable
            rows={[
              { label: '회사명', value: '브릭스텍바이오(주)' },
              { label: '주소', value: '전라남도 나주시 빛가람로 737, 203호' },
              { label: '임직원 수', value: '총 5명' },
              {
                label: '주요사업',
                value: '건강기능식품 · 화장품 · 반려동물사료 · 공기정화기 · 스마트팜',
              },
            ]}
          />
        </PageSection>

        <PageSection title="브릭스텍바이오만의 경쟁력">
          <BulletList
            items={[
              '특허 기반 미세조류 배양기술 역량(배양 관련 특허 11건)을 보유하고 있습니다.',
              '저비용·저에너지 대량배양 시스템을 자체 개발했습니다.',
              '배양부터 원료화·제품화까지 이어지는 통합 사업화 구조를 갖추고 있습니다.',
              '건강기능식품·화장품·펫푸드·공기정화기·스마트팜으로 제품군을 넓혀가고 있습니다.',
              '기술·운영·재무·유통 전문 인력으로 구성된 실행형 팀이 함께합니다.',
            ]}
          />
          {/* docs/gitignore/사진자료/보급형 미세조류 생산설비1~8.JPG 중 선택 */}
          <p className="text-text-info mt-4 text-[0.85rem] italic">
            시각자료 : 실제 생산설비 현장 사진
          </p>
        </PageSection>
      </div>
    </>
  );
}
