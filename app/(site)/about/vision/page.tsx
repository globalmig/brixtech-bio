import type { Metadata } from 'next';

import BulletList from '@/components/domain/page/BulletList';
import PageIntro from '@/components/domain/page/PageIntro';
import PageSection from '@/components/domain/page/PageSection';
import RoadmapGrid from '@/components/domain/page/RoadmapGrid';

export const metadata: Metadata = {
  title: '비전 | BRIXTECHBIO',
};

export default function AboutVisionPage() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT"
        title="비전"
        lead="기후위기·에너지위기·식량위기는 상호 연결된 복합 위기이며, 미세조류는 이를 동시에 해결할 수 있는 차세대 바이오 플랫폼입니다."
      />

      <div className="mx-auto w-full max-w-(--width-app-canvas) px-5 md:px-8 canvas:px-0">
        <PageSection title="왜 미세조류인가">
          <BulletList
            items={[
              '빠른 생장 — 일반 식물 대비 바이오매스 생산률이 5~10배 높습니다.',
              '뛰어난 CO2 활용 능력 — 태양에너지 이용효율 25배, 이산화탄소 고정능력 15배입니다.',
              '풍부한 고부가성분 — 단백질·비타민·미네랄·항산화물질·색소를 함유합니다.',
              '비농지 배양 — 식량작물과 경작지를 두고 경쟁하지 않습니다.',
              '염수·고알칼리 환경(바닷물 대비 염분 6~7배, pH 8.5~11.5)에서도 안정적으로 생존하는 배양 적응성을 가지고 있습니다.',
            ]}
          />
        </PageSection>

        <PageSection title="국제기구가 주목하는 원료">
          <BulletList
            items={[
              "WHO(2019)는 'Alternative food and feed products'에서 영양이 풍부한 식품 자원으로 소개했습니다.",
              '미국 FDA(2012)는 GRAS 등재 심사에서 특정 용도의 사용에 이의 없음(no questions) 입장을 밝혔습니다.',
              '건조중량 기준 단백질 55~70%, 탄수화물 15~20%, 지질 5%, 미네랄 7%로 구성되어 있습니다.',
              '소화흡수율 95%, 항산화·항염 작용에 대한 연구 결과가 보고되어 있습니다.',
            ]}
          />
        </PageSection>

        <PageSection title="사업 로드맵">
          <RoadmapGrid
            items={[
              {
                period: '2026 · 1년차',
                description:
                  '스피루리나 자체 대량생산 체계 구축, 건강기능식품·화장품 시제품 생산 및 판매',
              },
              {
                period: '2~3년차',
                description:
                  '고기능성 화장품·바디케어 개발, 즉석 수제 펫푸드 개발, AI연동 펫푸드·프랜차이즈 확장, 도시 스마트팜 테스트베드 구축, 가정용 공기정화기 개발',
              },
              {
                period: '4~5년차',
                description: '미세조류 유래 화장품 원료 자체 개발, 바이오스티뮬런트 농법 스마트팜 확장',
              },
            ]}
          />
        </PageSection>
      </div>
    </>
  );
}
