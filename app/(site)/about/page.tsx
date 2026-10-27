import type { Metadata } from 'next';
import Image from 'next/image';

import BusinessCoreValues from '@/components/domain/about/BusinessCoreValues';
import HeroBanner from '@/components/domain/page/HeroBanner';
import PageIntro from '@/components/domain/page/PageIntro';

export const metadata: Metadata = {
  title: '기업소개 | BRIXTECHBIO',
};

const COMPETENCY_ITEMS = [
  {
    title: '특허 기반 배양기술',
    label: 'PATENTED TECHNOLOGY',
    description: '관련 특허 11건을 기반으로 안정적인 배양 기술을 보유하고 있습니다.',
  },
  {
    title: '저비용·저에너지 시스템',
    label: 'LOW-COST ENERGY',
    description: '저비용·저에너지 대량배양 시스템으로 생산 효율을 높입니다.',
  },
  {
    title: '통합 사업화 구조',
    label: 'INTEGRATED STRUCTURE',
    description: '배양부터 원료화·제품화까지 이어지는 통합 사업화 구조를 갖추고 있습니다.',
  },
  {
    title: '다각화된 제품군',
    label: 'DIVERSE PORTFOLIO',
    description: '건강기능식품·화장품·펫푸드·공기정화기·스마트팜 등 다양한 제품을 선보입니다.',
  },
  {
    title: '전문 인력 구성',
    label: 'EXPERT TEAM',
    description: '기술·운영·재무·유통 전문 인력이 하나의 팀으로 함께합니다.',
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
                바이오혁신기업입니다. 전라남도 나주의 자체 연구실에서 마이크로 알지를 직접 배양하며,
                특허 기반 배양기술(관련 특허 11건)과 저비용·저에너지 대량배양 시스템을 바탕으로
                배양부터 원료화·제품화까지 이어지는 통합 사업화 구조를 갖추고 있습니다.
              </p>
              <p className="text-[1rem] leading-7 text-gray-750">
                고순도 마이크로 알지 원료는 건강기능식품과 화장품을 비롯해 반려동물 푸드, 공기정화기,
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
            브릭스텍바이오는 자체 배양·정제 기술로 생산한 고순도 마이크로 알지 원료를 기반으로,<br/>
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

          <div className="grid grid-cols gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8 lg:gap-y-0">
            {COMPETENCY_ITEMS.map((item) => (
              <article key={item.title}>
                <p className="text-h5 lg:text-h4 text-black mb-2 font-bold">{item.title}</p>
                <p className="text-base font-semibold text-text-sub mb-6">{item.label}</p>
                <div className="mb-6 border-t border-gray-300 lg:mb-8" />
                <p className="text-body text-text-sub leading-6">{item.description}</p>
              </article>
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
