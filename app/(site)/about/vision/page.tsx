import type { Metadata } from 'next';
import Image from 'next/image';

import ContactSection from '@/components/domain/home/ContactSection';
import HeroBanner from '@/components/domain/page/HeroBanner';
import PageIntro from '@/components/domain/page/PageIntro';
import RoadmapGrid from '@/components/domain/page/RoadmapGrid';

export const metadata: Metadata = {
  title: '비전 | BRIXTECHBIO',
};

function FlaskIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M19 7h10" />
      <path d="M21 7v9.5L11.5 33a4 4 0 0 0 3.5 6h18a4 4 0 0 0 3.5-6L27 16.5V7" />
      <path d="M15.5 28h17" />
    </svg>
  );
}

function ConversionIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M9 10h30l-10.5 14.5v13L19.5 41v-16.5L9 10Z" />
    </svg>
  );
}

function PackageIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M8.5 16.5 24 8l15.5 8.5v15L24 40 8.5 31.5v-15Z" />
      <path d="M8.5 16.5 24 25l15.5-8.5" />
      <path d="M24 25v15" />
    </svg>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="5" y="15" width="21" height="15" rx="1.5" />
      <path d="M26 20h8l6 6.5V30h-14" />
      <circle cx="14" cy="34" r="3.2" />
      <circle cx="33" cy="34" r="3.2" />
    </svg>
  );
}

function PlatformIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="24" cy="10" r="3.4" />
      <circle cx="12" cy="31" r="3.4" />
      <circle cx="36" cy="31" r="3.4" />
      <path d="M21.8 13 14.5 27.5" />
      <path d="M26.2 13 33.5 27.5" />
      <path d="M15.8 31h16.4" />
    </svg>
  );
}

const PROCESS_PHASES = [
  {
    title: '배양',
    description: '자체 배양 시스템으로 고순도 미세조류를 대량 배양합니다.',
    Icon: FlaskIcon,
  },
  {
    title: '원료화',
    description: '분말·추출물·배양액 등 고기능 원료로 표준화합니다.',
    Icon: ConversionIcon,
  },
  {
    title: '제품화',
    description: '건강기능식품·화장품·펫푸드·공기정화기·스마트팜 등 다양한 제품을 개발합니다.',
    Icon: PackageIcon,
  },
  {
    title: '유통',
    description: '자체몰·유통사·해외 파트너를 통해 안정적으로 공급합니다.',
    Icon: TruckIcon,
  },
  {
    title: '플랫폼화',
    description: '하나의 브랜드로 연결합니다.',
    Icon: PlatformIcon,
  },
];

const WHY_MICROALGAE_FEATURES = [
  {
    title: '빠른 생장',
    label: 'CULTIVATION',
    description: '일반 식물 대비 바이오매스 생산률이 5~10배 높습니다.',
  },
  {
    title: '뛰어난 CO2 활용 능력',
    label: 'CO2 EFFICIENCY',
    description: '태양에너지 이용효율 25배, 이산화탄소 고정능력 15배입니다.',
  },
  {
    title: '풍부한 고부가성분',
    label: 'NUTRITION',
    description: '단백질·비타민·미네랄·항산화물질·색소를 함유합니다.',
  },
  {
    title: '비농지 배양',
    label: 'LAND-FREE',
    description: '식량작물과 경작지를 두고 경쟁하지 않습니다.',
  },
  {
    title: '염수·고알칼리 적응성',
    label: 'ADAPTABILITY',
    description: '바닷물 대비 염분 6~7배, pH 8.5~11.5 환경에서도 안정적으로 생존합니다.',
  },
];

export default function AboutVisionPage() {
  return (
    <>
      <PageIntro eyebrow="ABOUT" title="비전" />

      <HeroBanner
        eyebrow="VISION"
        title={'스피루리나 배양 기술을\n사업의 출발점으로'}
        description="5가지 핵심 사업 영역의 유기적인 시너지를 통해 지속가능한 미래 바이오 시장을 선도합니다."
        imageAlt="미세조류 연구 및 배양 현장 이미지"
      />

      <div className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <section className="py-10 lg:py-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            <div className="lg:w-[42%] lg:shrink-0">
              <p className="text-small text-black mb-4 font-bold lg:mb-8">VISION</p>
              <h2 className="text-h4 lg:text-h2 text-black mb-8 lg:mb-16">왜 미세조류인가요?</h2>
              <p className="text-[1rem] leading-7 text-gray-750">
                미세조류는 빠르게 성장하고 적은 자원으로도 높은 생산성을 내며, 단백질·비타민·항산화물질
                등 다양한 고부가 성분을 함유하고 있습니다. 식량작물과 경작지를 두고 경쟁하지 않으면서도
                염수·고알칼리 환경에서 안정적으로 생존하는 배양 적응성을 바탕으로, 지속가능한 바이오
                산업의 핵심 원료로 주목받고 있습니다.
              </p>
            </div>

            <div className="relative aspect-4/5 w-full overflow-hidden bg-gray-100 lg:flex-1">
              <Image
                src="/#"
                alt="미세조류 클로즈업 이미지"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5 lg:gap-x-8 lg:gap-y-0">
            {WHY_MICROALGAE_FEATURES.map((feature) => (
              <div key={feature.title}>
                <p className="text-h5 lg:text-h4 text-black mb-3 font-bold lg:mb-4">
                  {feature.title}
                </p>
                <p className="text-body text-text-sub mb-6 lg:mb-8">{feature.label}</p>
                <div className="mb-6 border-t border-gray-300 lg:mb-8" />
                <p className="text-body text-text-sub leading-6">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 lg:py-12">
          <div className="flex flex-col gap-10 lg:flex-row-reverse lg:items-start lg:gap-16">
            <div className="lg:w-[42%] lg:shrink-0">
              <p className="text-small text-black mb-4 font-bold lg:mb-8">VISION</p>
              <h2 className="text-h4 lg:text-h2 text-black mb-8">국제기구가 주목하는 원료</h2>
              <p className="text-[1rem] leading-7 text-gray-750">
                WHO(2019)는 'Alternative food and feed products'에서 영양이 풍부한 식품 자원으로
                소개했으며, 미국 FDA(2012)는 GRAS 등재 심사에서 특정 용도의 사용에 이의 없음(no
                questions) 입장을 밝혔습니다. 건조중량 기준 단백질 55~70%, 탄수화물 15~20%, 지질 5%,
                미네랄 7%로 구성되어 있으며, 소화흡수율 95%, 항산화·항염 작용에 대한 연구 결과가
                보고되어 있습니다.
              </p>
            </div>

            <div className="relative aspect-4/5 w-full overflow-hidden bg-gray-100 lg:flex-1">
              <Image
                src="/#"
                alt="국제기구 인증 및 원료 표준화 이미지"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </div>

      <section className="py-15 canvas:py-30">
        <div className="mx-auto w-full max-w-360 px-[3%] canvas:px-0">
          <p className="text-small text-black mb-4 font-bold lg:mb-8">TECH</p>
          <h2 className="text-h4 lg:text-h2 text-black mb-5">원료 표준화 &amp; 사업화 단계</h2>
          <p className="text-body mb-10 max-w-2xl text-gray-750 lg:mb-16">
            분말·추출물·배양액 등 고기능 원료로 표준화하며, 건강기능식품·화장품·펫푸드·바이오스티뮬런트로
            제품화됩니다. 완제품뿐 아니라 바이오·화장품·식품 분야의 외부 파트너에게 미세조류 소재를
            직접 개발·공급하는 B2B 원료 공급도 함께 추진합니다.
          </p>
        </div>

        <div className="bg-gray-50">
          <div className="mx-auto grid w-full max-w-360 grid-cols-2 px-[3%] sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-gray-300 canvas:px-0">
            {PROCESS_PHASES.map((phase) => (
              <div
                key={phase.title}
                className="flex flex-col items-center gap-3 px-4 py-10 text-center lg:px-6"
              >
                <span className="bg-white text-primary ring-primary/10 shadow-primary/15 flex size-14 items-center justify-center rounded-full shadow-lg ring-1 lg:size-16">
                  <phase.Icon className="size-6 lg:size-7" />
                </span>
                <p className="text-h6 text-text-default font-bold">{phase.title}</p>
                <p className="text-text-sub text-[0.85rem] leading-5">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <section className="py-10 lg:py-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            <div className="lg:w-[42%] lg:shrink-0">
              <p className="text-small text-black mb-4 font-bold lg:mb-8">ROADMAP</p>
              <h2 className="text-h4 lg:text-h2 text-black mb-8 lg:mb-16">사업 로드맵</h2>
              <p className="text-body mb-10 max-w-2xl text-gray-750 lg:mb-16">
                Contents
              </p>
            </div>

            <div className="lg:flex-1">
              <RoadmapGrid
                items={[
                  {
                    year: '2026',
                    yearLabel: '1년차',
                    description: [
                      '스피루리나 자체 대량생산 체계 구축',
                      '건강기능식품·화장품 시제품 생산 및 판매',
                    ],
                  },
                  {
                    year: '2027',
                    yearLabel: '2 ~ 3년차',
                    description: [
                      '고기능성 화장품·바디케어 개발',
                      '즉석 수제 펫푸드 개발',
                      'AI연동 펫푸드·프랜차이즈 확장',
                      '도시 스마트팜 테스트베드 구축',
                      '가정용 공기정화기 개발',
                    ],
                  },
                  {
                    year: '2029',
                    yearLabel: '4 ~ 5년차',
                    description: [
                      '미세조류 유래 화장품 원료 자체 개발',
                      '바이오스티뮬런트 농법 스마트팜 확장',
                    ],
                  },
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
