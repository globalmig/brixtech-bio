import type { Metadata } from 'next';
import Image from 'next/image';

import BusinessCoreValues from '@/components/domain/about/BusinessCoreValues';
import HeroBanner from '@/components/domain/page/HeroBanner';
import PageIntro from '@/components/domain/page/PageIntro';

export const metadata: Metadata = {
  title: '기업소개 | BRIXTECHBIO',
};

function PatentIcon({ className }: { className?: string }) {
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
      <circle cx="24" cy="17" r="9" />
      <path d="M20 16.5l2.5 2.5L28 13.5" />
      <path d="M18.5 24.5 15 36l9-4 9 4-3.5-11.5" />
    </svg>
  );
}

function EnergyIcon({ className }: { className?: string }) {
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
      <path d="M24 9c7 1 12 6 12 13 0 9-7 15-16 15-1.3 0-2.5-.1-3.7-.4C17 29 19 19 24 9Z" />
      <path d="M15.5 36C19 27 23 19 31 13" opacity="0.5" />
      <path d="M26 16l-6 9h4.5l-2 8 7-10h-4.5l1-7Z" />
    </svg>
  );
}

function IntegrationIcon({ className }: { className?: string }) {
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

function PortfolioIcon({ className }: { className?: string }) {
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
      <rect x="7" y="7" width="15" height="15" rx="3.5" />
      <rect x="26" y="7" width="15" height="15" rx="3.5" opacity="0.75" />
      <rect x="7" y="26" width="15" height="15" rx="3.5" opacity="0.75" />
      <rect x="26" y="26" width="15" height="15" rx="3.5" opacity="0.5" />
    </svg>
  );
}

function TeamIcon({ className }: { className?: string }) {
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
      <circle cx="18" cy="16" r="6" />
      <path d="M8 39c0-7.2 4.5-11.5 10-11.5s10 4.3 10 11.5" />
      <circle cx="32" cy="19" r="5" opacity="0.6" />
      <path d="M24.5 39c.5-5.8 3.9-9.5 7.8-9.5 4.4 0 8 4.1 8.7 9.5" opacity="0.6" />
    </svg>
  );
}

const ORBIT_DURATION = 28;

const COMPETENCY_ITEMS = [
  {
    title: '특허 기반 배양기술',
    description: '특허 기반 미세조류 배양기술 역량(배양 관련 특허 11건)을 보유하고 있습니다.',
    Icon: PatentIcon,
  },
  {
    title: '저비용·저에너지 시스템',
    description: '저비용·저에너지 대량배양 시스템을 자체 개발했습니다.',
    Icon: EnergyIcon,
  },
  {
    title: '통합 사업화 구조',
    description: '배양부터 원료화·제품화까지 이어지는 통합 사업화 구조를 갖추고 있습니다.',
    Icon: IntegrationIcon,
  },
  {
    title: '다각화된 제품군',
    description: '건강기능식품·화장품·펫푸드·공기정화기·스마트팜으로 제품군을 넓혀가고 있습니다.',
    Icon: PortfolioIcon,
  },
  {
    title: '전문 인력 구성',
    description: '기술·운영·재무·유통 전문 인력으로 구성된 실행형 팀이 함께합니다.',
    Icon: TeamIcon,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="ABOUT" title="기업소개" />

      <HeroBanner
        eyebrow="OUR COMPANY"
        title={'미세조류에서 시작해\n지속가능한 바이오 산업을 만들어갑니다.'}
        description="브릭스텍바이오는 미세조류 기반 기능성 원료와 친환경 바이오 응용 제품을 개발합니다."
        imageAlt="배양 현장 또는 미세조류 클로즈업 사진"
      />

      <div className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <section className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          <div className="lg:w-[42%] lg:shrink-0">
            <p className="text-small text-black mb-4 font-bold lg:mb-8">ABOUT</p>
            <h2 className="text-h4 lg:text-h2 text-black mb-8">
              안녕하십니까,
              <br />
              브릭스텍바이오입니다.
            </h2>

            <div className="flex flex-col gap-6">
              <p className="text-[1rem] leading-7 text-gray-750">
                저희 브릭스텍바이오는 미세조류 기반 기능성 원료와 친환경 바이오 응용제품을 개발하는
                바이오혁신기업입니다. 전라남도 나주의 자체 연구실에서 스피루리나를 직접 배양하며,
                특허 기반 배양기술(관련 특허 11건)과 저비용·저에너지 대량배양 시스템을 바탕으로
                배양부터 원료화·제품화까지 이어지는 통합 사업화 구조를 갖추고 있습니다.
              </p>
              <p className="text-[1rem] leading-7 text-gray-750">
                고순도 스피루리나 원료는 건강기능식품과 화장품을 비롯해 반려동물 푸드, 공기정화기,
                스마트팜까지 다섯 가지 영역으로 확장되고 있으며, 기술·운영·재무·유통 전문 인력이 하나의
                팀으로 함께하고 있습니다.
              </p>
              <p className="text-[1rem] leading-7 text-gray-750">
                앞으로도 작은 미세조류의 가능성을 믿고, 사람과 환경이 함께 건강해지는 지속가능한
                바이오 산업을 만들어가겠습니다. 변함없는 관심과 성원 부탁드립니다. 감사합니다.
              </p>
            </div>
          </div>

          <div className="relative aspect-[745.06/880.43] w-full overflow-hidden bg-gray-100 lg:flex-1">
            <Image
              src="/#"
              alt="브릭스텍바이오 연구·배양 시설 전경 이미지"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </section>
      </div>

      <section className="py-15 canvas:py-30">
        <div className="mx-auto w-full max-w-360 px-[3%] canvas:px-0">
          <p className="text-small text-black mb-4 font-bold lg:mb-8">BUSINESS</p>
          <h2 className="text-h4 lg:text-h2 text-black mb-5">주요 사업 영역</h2>
          <p className="text-body mb-10 text-gray-750 lg:mb-20">
            작은 미세조류가 닿을 수 있는 자리마다, 브릭스텍바이오의 손길이 있습니다.
            <br />
            건강기능식품, 화장품, 반려동물 푸드, 공기정화기, 스마트팜 — 다섯 가지 영역은 하나의
            기술에서 가지를 뻗어 나간 이야기입니다.
          </p>
        </div>

        <BusinessCoreValues />
      </section>

      <div className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <section className="py-10 lg:py-12">
          <p className="text-small text-black mb-4 font-bold lg:mb-8">COMPETENCY</p>
          <h2 className="text-h4 lg:text-h2 text-black mb-5">경쟁력</h2>
          <p className="text-body mb-10 text-gray-750 lg:mb-20">
            빠른 확장보다 본질에 집중해 온 시간이 브릭스텍바이오의 경쟁력이 되었습니다.
            <br />
            특허로 쌓은 배양 기술부터 저비용·저에너지 시스템, 배양부터 제품화까지 이어지는 통합
            구조까지 — 우직하게 쌓아온 역량을 소개합니다.
          </p>

          <div className="relative mx-auto aspect-square w-full max-w-80 sm:max-w-96 lg:max-w-lg">
            <div
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,#ffffff,#F3FDE9_70%)]"
              aria-hidden
            />
            <div
              className="absolute inset-[8%] rounded-full border border-dashed border-primary/25"
              aria-hidden
            />

            {COMPETENCY_ITEMS.map((item, index) => {
              const delay = `${-(index * (ORBIT_DURATION / COMPETENCY_ITEMS.length))}s`;

              return (
                <div
                  key={item.title}
                  className="animate-orbit absolute inset-[8%]"
                  style={{ animationDelay: delay }}
                >
                  <div
                    className="animate-orbit-reverse absolute top-0 left-1/2 flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2.5 text-center lg:w-28"
                    style={{ animationDelay: delay }}
                  >
                    <span className="bg-white text-primary ring-primary/10 shadow-primary/15 flex size-16 items-center justify-center rounded-full shadow-lg ring-1 lg:size-20">
                      <item.Icon className="size-7 lg:size-8" />
                    </span>
                    <p className="text-text-sub text-[0.75rem] leading-4 font-semibold">
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="relative overflow-hidden bg-linear-to-b from-white to-[#F3FDE9] py-20 lg:py-32">
        <div className="relative mx-auto flex w-full max-w-360 flex-col items-center gap-4 px-[3%] text-center canvas:px-0">
          <p
            aria-hidden
            className="pointer-events-none text-center font-black whitespace-nowrap text-[3rem] text-[#E6F4D8]/50 uppercase sm:text-[5rem] lg:text-[135px]"
          >
            BRIXTECHBIO
          </p>

          <h2 className="text-h4 lg:text-h2 text-black">자연의 속도로, 꾸준히</h2>
          <p className="text-[1rem] max-w-md leading-7 text-gray-750">
            작은 미세조류에서 시작해 사람과 환경이 함께 건강해지는 내일을 만들어가겠습니다.
          </p>
        </div>
      </section>
    </>
  );
}
