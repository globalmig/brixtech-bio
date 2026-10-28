import type { Metadata } from 'next';
import Image from 'next/image';
import FaqAccordion from '@/components/domain/page/FaqAccordion';
import PageIntro from '@/components/domain/page/PageIntro';
import RoadmapGrid from '@/components/domain/page/RoadmapGrid';
import HeroBanner from '@/components/domain/page/HeroBanner';
import {
  ACTIVE_INGREDIENTS,
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  NUTRITION_ARCS,
  NUTRITION_FACTS,
  NUTRITION_STYLE,
} from '@/constants/tech';

export const metadata: Metadata = {
  title: '스피루리나 소개 | BRIXTECHBIO',
};

export default function TechPage() {
  return (
    <>
      <PageIntro
        eyebrow="TECH"
        title="스피루리나 소개"
      />

      <HeroBanner
              eyebrow="SPIRULINA"
              title={'스피루리나란?'}
              description="지구상에서 가장 오래된 생명체 중 하나로, 65% 이상의 풍부한 식물성 단백질과 필수 5대
              영양소를 포함한 700여 종의 영양소를 함유하고 있습니다. 청록색 다세포 조류로 맨눈으로는
              보이지 않으며, 알칼리성 염호에서 자생합니다. 1927년 독일 과학자에 의해 처음
              명명되었습니다."
              imageAlt="스피루리나 이미지"
              imageSrc='/images/tech/tech-spirulina-banner2.png'
            />

        <section className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 lg:pt-30">
           <p className="text-small mb-4 font-bold">
              ACTIVE INGREDIENT
            </p>
            <h2 className="text-h4 mb-5 lg:text-h2">
              3대 핵심 활성 성분
            </h2>
            <p className="text-body mb-10 lg:mb-25 text-gray-750">
              스피루리나를 특별하게 만드는 3가지 핵심 활성
              성분이 항산화와 보습, 세포 재생에 이르는 피부 건강을 다각도로 책임집니다.
            </p>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:gap-x-15 lg:gap-y-0">
            {ACTIVE_INGREDIENTS.map((ingredient) => (
              <article key={ingredient.title}>
                <p className="text-h5 lg:text-h4 text-black mb-2 font-bold">{ingredient.title}</p>
                <p className="text-base font-semibold text-text-sub mb-6">{ingredient.label}</p>
                <div className="mb-6 border-t border-gray-300 lg:mb-8" />
                <p className="text-body text-text-sub leading-6">{ingredient.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 lg:py-30">
          <p className="text-small mb-4 font-bold">NUTRITION</p>
          <h2 className="text-h4 mb-5 lg:text-h2">영양 성분</h2>
          <p className="text-body mb-10 lg:mb-16 text-gray-750">
            단백질과 필수아미노산, 비타민, 미네랄, 지방산까지.<br/> 스피루리나 한 스푼에 담긴 50여
            종의 영양소를 6가지 카테고리로 체계화하여,<br/> 고순도 원료가 지닌 영양학적 가치를
            과학적 데이터로 증명합니다.
          </p>

          <div className="relative mx-auto hidden aspect-3/2 w-full max-w-340 lg:block">
            <svg
              viewBox="0 0 100 66.667"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                d={NUTRITION_ARCS.left}
                fill="none"
                stroke="var(--color-primary-4)"
                strokeWidth="0.35"
                strokeOpacity="0.6"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={NUTRITION_ARCS.right}
                fill="none"
                stroke="var(--color-primary-4)"
                strokeWidth="0.35"
                strokeOpacity="0.6"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={NUTRITION_ARCS.top}
                fill="none"
                stroke="var(--color-primary-4)"
                strokeWidth="0.35"
                strokeOpacity="0.6"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="absolute top-1/2 left-1/2 aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/images/tech/영양성분.png"
                alt="스피루리나 영양 성분 제품 이미지"
                fill
                sizes="340px"
                className="object-contain"
              />
            </div>

            {NUTRITION_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${fact.position.y}%`, left: `${fact.position.x}%` }}
              >
                <div
                  className={`relative z-10 flex size-40 shrink-0 flex-col items-center justify-center rounded-full text-center shadow-sm ${NUTRITION_STYLE[fact.style]}`}
                >
                  <span className="text-[1.3rem] leading-tight font-bold">{fact.count}</span>
                  <span className="text-[0.95rem] leading-tight font-semibold">{fact.label}</span>
                </div>

                {fact.caption === 'below' ? (
                  <div className="absolute top-full left-1/2 mt-3 w-45 -translate-x-1/2 text-center">
                    <p className="text-text-sub text-[1rem] leading-6">{fact.detail}</p>
                  </div>
                ) : fact.caption === 'outer-left' ? (
                  <div className="absolute top-1/2 right-full mr-3 w-45 -translate-y-1/2 text-right">
                    <p className="text-text-sub text-[1rem] leading-6">{fact.detail}</p>
                  </div>
                ) : (
                  <div className="absolute top-1/2 left-full ml-3 w-48 -translate-y-1/2 text-left">
                    <p className="text-text-sub text-[1rem] leading-6">{fact.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 모바일/태블릿: 이미지 + 그리드 */}
          <div className="lg:hidden">
            <div className="relative mx-auto mb-10 aspect-square w-full max-w-64">
              <Image
                src="/images/tech/영양성분.png"
                alt="스피루리나 영양 성분 제품 이미지"
                fill
                sizes="256px"
                className="object-contain"
              />
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {NUTRITION_FACTS.map((fact) => (
                <div key={fact.label} className="flex flex-col items-center gap-2 text-center">
                  <span
                    className={`flex size-24 flex-col items-center justify-center rounded-full text-center shadow-sm ${NUTRITION_STYLE[fact.style]}`}
                  >
                    <span className="text-base leading-tight font-bold">{fact.count}</span>
                    <span className="text-small leading-tight font-semibold">{fact.label}</span>
                  </span>
                  <span className="text-text-sub text-[0.78rem] leading-5">{fact.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-[#F6F9EF]">
          <section className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
            <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
              <div className="lg:w-[42%] lg:shrink-0">
                <p className="text-small text-black mb-4 font-bold lg:mb-8">RECOGNITION</p>
                <h2 className="text-h4 lg:text-h2 text-black mb-5">국제 공인 연혁</h2>
                <p className="text-body mb-10 max-w-2xl text-gray-750 lg:mb-16">
                  스피루리나는 한 기업의 주장이 아니라, UN·FAO·미국 FDA·WHO 등 국제기구가 지난
                  수십 년에 걸쳐 안전성과 영양 가치를 공식적으로 인정해온 식품입니다. 1974년,
                  미래 식량으로 지목된 이후 반복적으로 이어진 국제적 공인의 흐름을 통해,
                  스피루리나가 왜 신뢰할 수 있는 원료인지를 보여드립니다.
                </p>
              </div>

              <div className="lg:w-[50%]">
                <RoadmapGrid
                  items={[
                    {
                      year: '1974',
                      description: [
                        'UN, 인류에게 가장 이상적인 음식',
                        'FAO, 미래 최고의 음식',
                      ],
                    },
                    {
                      year: '1981',
                      description: [
                        '미국 FDA, 부작용 없는 건강하고 안전한 제품 인증',
                      ],
                    },
                    {
                      year: '1992',
                      description: [
                        'WHO, 21세기의 건강한 제품',
                      ],
                    },
                  ]}
                />
              </div>
            </div>
          </section>
        </div>

        <section className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
           <p className="text-small mb-4 font-bold">
              FAQ
            </p>
          <h2 className="text-h4 lg:text-h2 text-black mb-5">스피루리나가 더 궁금하신가요?</h2>
          <p className="text-text-sub text-[0.95rem] leading-6 mb-12 lg:mb-20">
            섭취 방법부터 활용 분야까지, 건강기능식품·화장품·반려동물 푸드·스마트팜 분야별 궁금증을 모았습니다.
          </p>
          <FaqAccordion items={FAQ_ITEMS} categories={FAQ_CATEGORIES} itemsPerPage={5} />
        </section>
    </>
  );
}
