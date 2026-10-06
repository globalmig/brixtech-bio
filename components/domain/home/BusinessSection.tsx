'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

import { BUSINESS_CATEGORIES } from '@/constants/home';

function getSlidesToShow(width: number) {
  if (width < 480) return 1;
  if (width < 768) return 2;
  if (width < 1024) return 3;
  if (width < 1280) return 4;
  return 3;
}

export default function BusinessSection() {
  const sliderRef = useRef<Slider>(null);
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [isCenterMode, setIsCenterMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      setSlidesToShow(getSlidesToShow(width));
      setIsCenterMode(width >= 1280);
      setIsMobile(width < 1024);
    };
    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  return (
    <section className="bg-primary-5 pb-10">
      <div className="mx-auto w-full max-w-(--width-app-canvas) px-5 pt-16 md:px-8 md:pt-20 canvas:px-0 lg:pt-28">
        <div className="mb-10 flex items-end justify-between lg:mb-12">
          <div>
            <p className="text-small text-primary mb-4 lg:mb-8 font-bold tracking-widest">
              BUSINESS
            </p>
            <h2 className="text-h3 mb-5 lg:text-[3rem] lg:leading-14">
             하나로 이어지는 <br className='lg:hidden'/>바이오 비즈니스
            </h2>
            <p className="text-[1rem] lg:text-[1.5rem] leading-6 lg:leading-8 text-primary-4">
              5가지 핵심 사업 영역의 유기적인 시너지를 통해 <br className='hidden lg:block'/>지속가능한 미래 바이오 시장을 선도합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[2340px] px-5 pb-16 md:px-8 md:pb-20 lg:px-0 lg:pb-28">
        <div className="relative">
          <Slider
          className="business-slider"
            ref={sliderRef}
            dots={true}
            arrows={false}
            infinite
            speed={500}
            slidesToShow={slidesToShow}
            slidesToScroll={1}
            centerMode={isCenterMode}
            centerPadding={isCenterMode ? '12%' : '0px'}
            autoplay={isMobile}
            autoplaySpeed={3000}
            pauseOnHover
          >
            {BUSINESS_CATEGORIES.map((category) => (
              <div key={category.title} className="group px-2">
                <div className="border-gray-300 bg-bg-default overflow-hidden rounded-2xl border">
                  <div className="relative aspect-5/4 w-full overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-3 p-5">
                    <div>
                      <span className="text-h6 block lg:text-h4">
                        {category.title}
                      </span>
                      <p className="text-small lg:text-h5 font-normal text-text-info mt-1 line-clamp-2 min-h-15 lg:h-20 lg:mt-4">
                        {category.description}
                      </p>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-1 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    >
                      <path
                        d="M3 13L13 3M13 3H5M13 3V11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          <div className="hidden absolute inset-x-0 top-[36%] mx-auto lg:flex -translate-y-1/2 items-center justify-between w-[75%]">
            <button
              type="button"
              aria-label="이전 카테고리"
              onClick={() => sliderRef.current?.slickPrev()}
              className="relative size-12 -translate-x-1/2 cursor-pointer sm:size-16"
            >
              <Image src="/icons/business-prev.svg" alt="이전 카테고리" fill />
            </button>
            <button
              type="button"
              aria-label="다음 카테고리"
              onClick={() => sliderRef.current?.slickNext()}
              className="relative size-12 translate-x-1/2 cursor-pointer sm:size-16"
            >
              <Image src="/icons/business-next.svg" alt="다음 카테고리" fill />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
