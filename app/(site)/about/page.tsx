import type { Metadata } from 'next';
import Image from 'next/image';
import { Fragment } from 'react';

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

const COMPETENCY_ITEMS = [
  {
    title: '특허 기반 배양기술',
    subtitle: 'Patented Technology',
    Icon: PatentIcon,
    size: 'size-48',
    iconSize: 'size-12',
  },
  {
    title: '저비용·저에너지 시스템',
    subtitle: 'Low-cost Energy',
    Icon: EnergyIcon,
    size: 'size-56',
    iconSize: 'size-12',
  },
  {
    title: '통합 사업화 구조',
    subtitle: 'Integrated Structure',
    Icon: IntegrationIcon,
    size: 'size-48',
    iconSize: 'size-12',
  },
  {
    title: '다각화된 제품군',
    subtitle: 'Diverse Portfolio',
    Icon: PortfolioIcon,
    size: 'size-48',
    iconSize: 'size-11',
  },
  {
    title: '전문 인력 구성',
    subtitle: 'Expert Team',
    Icon: TeamIcon,
    size: 'size-60',
    iconSize: 'size-12',
  },
];

const COMPETENCY_CONNECTORS = ['+', '+', '+', '→'];

function CompetencyConnector({ symbol }: { symbol: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1 canvas:flex-row canvas:gap-1" aria-hidden>
      <span className="h-6 w-px border-l border-dashed border-primary-4/40 canvas:h-px canvas:w-5 canvas:border-t canvas:border-l-0" />
      <span className="border-primary-4/50 text-primary-4 flex size-8 shrink-0 items-center justify-center rounded-full border border-dashed text-[0.9rem] font-semibold">
        {symbol}
      </span>
      <span className="h-6 w-px border-l border-dashed border-primary-4/40 canvas:h-px canvas:w-5 canvas:border-t canvas:border-l-0" />
    </div>
  );
}

function CompetencyCircle({
  item,
  isFinal,
}: {
  item: (typeof COMPETENCY_ITEMS)[number];
  isFinal: boolean;
}) {
  return (
    <div
      className={`flex ${item.size} shrink-0 flex-col items-center justify-center gap-3 rounded-full px-6 text-center ${
        isFinal ? 'bg-primary-2' : 'border-primary-4/25 border bg-white'
      }`}
    >
      <item.Icon className={`${item.iconSize} ${isFinal ? 'text-white' : 'text-primary-2'}`} />
      <div>
        <p
          className={`text-[1rem] leading-tight font-semibold whitespace-nowrap ${
            isFinal ? 'text-white' : 'text-text-default'
          }`}
        >
          {item.title}
        </p>
        <p
          className={`mt-1.5 text-[0.7rem] tracking-wide whitespace-nowrap uppercase ${
            isFinal ? 'text-white/70' : 'text-text-sub'
          }`}
        >
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="ABOUT" title="기업소개" />

      <HeroBanner
        eyebrow="OUR COMPANY"
        title={'미세조류에서 시작해\n지속가능한 바이오 산업을 만들어갑니다.'}
        description="브릭스텍바이오는 미세조류 기반 기능성 원료와 친환경 바이오 응용 제품을 개발합니다."
        imageAlt="배양 현장 또는 미세조류 클로즈업 사진"
        imageSrc='/images/about/about-banner.png'
      />

      <div className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30 lg:pb-10">
        <section className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="lg:w-[42%] lg:shrink-0">
            <p className="text-small text-black mb-4 font-bold lg:mb-8">ABOUT</p>
            <h2 className="text-h4 lg:text-h2 text-black mb-5">
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

          <div className="relative aspect-[745.06/880.43] w-full lg:w-150 overflow-hidden bg-gray-100">
            <Image
              src="/images/about/company.png"
              alt="브릭스텍바이오 인사말"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </section>
      </div>

      <div className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30 lg:pb-10">
        <section className="py-10 lg:py-12">
          <div className="flex flex-col gap-10 lg:flex-row-reverse lg:justify-between lg:gap-16">
            <div className="lg:w-[45%] lg:shrink-0">
              <p className="text-small text-black mb-4 font-bold lg:mb-8">FACILITY</p>
              <h2 className="text-h4 lg:text-h2 text-black mb-8">
                미세조류가 자라나는
                <br />
                배양 현장을 영상으로
              </h2>
              <p className="text-[1rem] leading-7 text-gray-750">
                브릭스텍바이오의 자체 배양시설은 폐쇄형 광생물반응기(PBR)로<br/> 배양액의 pH·온도·광량을
                정밀 제어해 균주 순도와 생산 수율을 관리합니다.<br/>수확 이후에는 저온 건조와 정제
                공정을 거쳐 고순도 원료로 완성됩니다.
              </p>
            </div>

            <div className="relative aspect-6/4 w-full overflow-hidden bg-gray-100 lg:w-200">
              <video
                src="/videos/배양관_전경.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              >
                브라우저가 video 태그를 지원하지 않습니다.
              </video>
            </div>
          </div>
        </section>
      </div>

      <section className="py-15 canvas:py-30 lg:pb-0">
        <div className="mx-auto w-full max-w-360 px-[3%] canvas:px-0">
          <p className="text-small text-black mb-4 font-bold lg:mb-8">BUSINESS</p>
          <h2 className="text-h4 lg:text-h2 text-black mb-5">주요 사업 영역</h2>
          <p className="text-body mb-10 text-gray-750 lg:mb-20">
            브릭스텍바이오는 자체 배양·정제 기술로 생산한 고순도 스피루리나 원료를 기반으로,<br/>
            건강기능식품·화장품·반려동물 푸드·공기정화기·스마트팜 5개 사업 영역에 적용하고
            있습니다.
          </p>
        </div>

        <BusinessCoreValues />
      </section>

      <div className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30 lg:pb-0">
        <section className="py-10 lg:py-12">
          <p className="text-small text-black mb-4 font-bold lg:mb-8">COMPETENCY</p>
          <h2 className="text-h4 lg:text-h2 text-black mb-5">경쟁력</h2>
          <p className="text-body mb-10 text-gray-750 lg:mb-20">
            빠른 확장보다 본질에 집중해 온 시간이 브릭스텍바이오의 경쟁력이 되었습니다.
            <br />
            특허로 쌓은 배양 기술부터 저비용·저에너지 시스템, 배양부터 제품화까지 이어지는 통합
            구조까지 우직하게 쌓아온 역량을 소개합니다.
          </p>

          <div className="flex flex-col items-center gap-3 py-4 canvas:flex-row canvas:flex-wrap canvas:justify-center canvas:gap-x-0 canvas:gap-y-10">
            {COMPETENCY_ITEMS.map((item, index) => (
              <Fragment key={item.title}>
                <CompetencyCircle item={item} isFinal={index === COMPETENCY_ITEMS.length - 1} />
                {index < COMPETENCY_ITEMS.length - 1 ? (
                  <CompetencyConnector symbol={COMPETENCY_CONNECTORS[index]} />
                ) : null}
              </Fragment>
            ))}
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
          <p className="text-[1rem] leading-7 text-gray-750">
            작은 미세조류에서 시작해 사람과 환경이 함께 건강해지는 내일을 만들어가겠습니다.
          </p>
        </div>
      </section>
    </>
  );
}
