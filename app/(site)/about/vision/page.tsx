import type { Metadata } from 'next';
import Image from 'next/image';
import HeroBanner from '@/components/domain/page/HeroBanner';
import PageIntro from '@/components/domain/page/PageIntro';
import RoadmapGrid from '@/components/domain/page/RoadmapGrid';
import BreadcrumbJsonLd from '@/components/common/BreadcrumbJsonLd';
import { PROCESS_PHASES, WHY_MICROALGAE_FEATURES } from '@/constants/about';

export const metadata: Metadata = {
  title: '비전 | BRIXTECHBIO',
  alternates: {
    canonical: '/about/vision',
  },
};

export default function AboutVisionPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: '홈', path: '/' },
          { name: '기업소개', path: '/about' },
          { name: '비전', path: '/about/vision' },
        ]}
      />
      <PageIntro eyebrow="ABOUT" title="비전" />

      <HeroBanner
        id="hero-vision"
        eyebrow="VISION"
        title={'스피루리나 배양 기술을\n사업의 출발점으로'}
        description="5가지 핵심 사업 영역의 유기적인 시너지를 통해 지속가능한 미래 바이오 시장을 선도합니다."
        imageAlt="미세조류 연구 및 배양 현장 이미지"
        imageSrc='/images/about/about-vision-banner.webp'
      />

      <div className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <section className="py-10 lg:py-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            <div className="lg:w-[42%] lg:shrink-0">
              <p className="text-small text-black mb-4 font-bold lg:mb-8">VISION</p>
              <h2 id="why-microalgae" className="text-h4 lg:text-h2 text-black mb-5">왜 미세조류인가요?</h2>
              <p>
                미세조류는 빠르게 성장하고 적은 자원으로도 높은 생산성을 내며, 단백질·비타민·항산화물질
                등 다양한 고부가 성분을 함유하고 있습니다. 식량작물과 경작지를 두고 경쟁하지 않으면서도
                염수·고알칼리 환경에서 안정적으로 생존하는 배양 적응성을 바탕으로, 지속가능한 바이오
                산업의 핵심 원료로 주목받고 있습니다.
              </p>
            </div>

            <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100 lg:flex-1">
              <Image
                src="/images/about/vision2.webp"
                alt="미세조류"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-10 grid grid-cols gap-x-6 gap-y-10 sm:grid-cols-3 lg:my-30 lg:grid-cols-5 lg:gap-x-8 lg:gap-y-0">
            {WHY_MICROALGAE_FEATURES.map((feature) => (
              <article key={feature.title}>
                <p className="text-h5 lg:text-h4 text-black mb-2 font-bold">
                  {feature.title}
                </p>
                <p className="text-base font-semibold text-text-sub mb-6">{feature.label}</p>
                <div className="mb-6 border-t border-gray-300 lg:mb-8" />
                <p className="text-body text-text-sub leading-6">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10 lg:pb-10">
          <div className="flex flex-col gap-10 lg:flex-row-reverse lg:justify-between lg:gap-16">
            <div className="lg:w-[50%] lg:shrink-0">
              <p className="text-small text-black mb-4 font-bold lg:mb-8">VISION</p>
              <h2 id="global-recognition" className="text-h4 lg:text-h2 text-black mb-5">국제기구가 주목하는 원료</h2>
              <p>
                WHO(2019)는 'Alternative food and feed products'에서 영양이 풍부한 식품 자원으로
                소개했으며, 미국 FDA(2012)는 GRAS 등재 심사에서 특정 용도의 사용에 이의 없음(no
                questions) 입장을 밝혔습니다. 건조중량 기준 단백질 55~70%, 탄수화물 15~20%, 지질 5%,
                미네랄 7%로 구성되어 있으며, 소화흡수율 95%, 항산화·항염 작용에 대한 연구 결과가
                보고되어 있습니다.
              </p>
            </div>

            <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100 lg:w-150">
              <Image
                src="/images/about/vision1.webp"
                alt="국제기구 인증 및 원료 표준화"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </div>

      <section className="px-[3%] py-15 canvas:px-0 canvas:py-30 bg-[#F6F9EF]">
        <div className="mx-auto w-full max-w-360">
          <p className="text-small text-black mb-4 font-bold lg:mb-8">TECHNOLOGY</p>
          <h2 id="value-moment" className="text-h4 lg:text-h2 text-black mb-5">미세조류가 가치가 되는 순간</h2>
          <p className="text-body mb-10 max-w-2xl lg:mb-16">
            분말·추출물·배양액 등 고기능 원료로 표준화하며, 건강기능식품·화장품·펫푸드·바이오스티뮬런트로
            제품화됩니다. 완제품뿐 아니라 바이오·화장품·식품 분야의 외부 파트너에게 미세조류 소재를
            직접 개발·공급하는 B2B 원료 공급도 함께 추진합니다.
          </p>
        </div>

        {/* <div className="bg-[#F6F9EF]">
          <div className="grid w-full grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-gray-300">
            {PROCESS_PHASES.map((phase) => (
              <div
                key={phase.title}
                className="flex flex-col items-center gap-3 px-4 py-10 text-center lg:px-6"
              >
                <span className="bg-[#E9EFDA] text-primary-2 flex size-14 items-center justify-center rounded-full lg:size-16">
                  <phase.Icon className="size-6 lg:size-7" />
                </span>
                <p className="text-h5 lg:text-h4 text-text-default font-bold">{phase.title}</p>
                <p className="text-text-sub text-[1rem] leading-6">{phase.description}</p>
              </div>
            ))}
          </div>
        </div> */}

        <div className="mx-auto w-full max-w-360 px-[3%] canvas:px-0">
          <div className="grid grid-cols gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8 lg:gap-y-0">
            {PROCESS_PHASES.map((phase) => (
              <article key={phase.title}>
                <p className="text-h5 lg:text-h4 text-black mb-2 font-bold">{phase.title}</p>
                <p className="text-base font-semibold text-text-sub mb-6">{phase.label}</p>
                <div className="mb-6 border-t border-gray-300 lg:mb-8" />
                <p className="text-body text-text-sub leading-6">{phase.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-20 lg:pb-30">
        <section className="py-10 lg:py-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
            <div className="lg:w-[42%] lg:shrink-0">
              <p className="text-small text-black mb-4 font-bold lg:mb-8">ROADMAP</p>
              <h2 id="roadmap" className="text-h4 lg:text-h2 text-black mb-5">사업 로드맵</h2>
              <p className="text-body mb-10 max-w-2xl lg:mb-16">
                2026년 대량생산 체계 구축을 시작으로, <br/> 2029년까지 화장품·펫푸드·스마트팜 전 영역의
                기술을 단계적으로 고도화합니다.
              </p>
            </div>

            <div className="lg:w-[50%]">
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
