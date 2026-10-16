'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';

import { BRAND_SHOWCASE_PRODUCT } from '@/constants/home';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SLIDE_INTERVAL_MS = 4000;

function ArrowRightIcon({ className = 'text-text-default' }: { className?: string }) {
  return (
    <svg
      width="32"
      height="10"
      viewBox="0 0 32 10"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M0 5H31M31 5L26 1M31 5L26 9"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function DesignBrandSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % BRAND_SHOWCASE_PRODUCT.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const product = BRAND_SHOWCASE_PRODUCT[activeIndex];

  return (
    <section className='border-b '>
      <div className="lg:hidden">
        <div className="mx-auto w-full max-w-(--width-app-canvas) px-[4%] py-15 md:px-8 canvas:px-0">
          <div>
            <p className="text-small mb-4 font-bold">
              BRAND & PRODUCTS
            </p>
            <h2 className="text-h4 mb-5 lg:text-h2">
              우리의 일상에 더해지는
              <br />
              건강한 변화
            </h2>
            <p className="text-[1rem] leading-6 mb-10 text-[#555]">
              건강을 위한 기능성 제품부터 반려동물과 환경을 위한 다양한
              솔루션까지 생활 가까이에서 새로운 가능성을 만들어갑니다.
            </p>
            <Link
              href="#"
              className="text-small group mb-6 inline-flex items-center gap-4 font-bold"
            >
              BRAND STORY
              <ArrowRightIcon />
            </Link>
          </div>

          <Slider
            dots={false}
            arrows={false}
            infinite
            autoplay
            autoplaySpeed={SLIDE_INTERVAL_MS}
            speed={600}
            pauseOnHover={false}
          >
            {BRAND_SHOWCASE_PRODUCT.map((item, index) => (
              <div key={`mo-slide-${index}`}>
                <div className="relative aspect-4/5 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>

                <div className="mt-6">
                  <p className="text-small text-black mb-1 font-bold">
                    {item.brand}
                  </p>
                  <p className="text-h5 text-black mb-4 font-bold">
                    {item.name}
                  </p>
                  <p className="text-small text-[#555] whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="bg-bg-default hidden lg:block">
        <div className="mx-auto flex w-full max-w-(--width-app-canvas) items-center justify-between px-5 py-15 md:px-8 canvas:px-0 lg:py-30">
          <div className="max-w-xl shrink-0">
            <p className="text-small text-black mb-4 font-bold lg:mb-8">
              BRAND & PRODUCTS
            </p>
            <h2 className="text-h3 text-black mb-5 lg:text-h1">
              우리의 일상에 더해지는
              <br />
              건강한 변화
            </h2>
            <p className="text-[1rem] leading-6 text-[#555] mb-10 lg:mb-20">
              건강을 위한 기능성 제품부터
              <br />
              반려동물과 환경을 위한 다양한 솔루션까지
              <br />
              생활 가까이에서 새로운 가능성을 만들어갑니다.
            </p>
            <Link
              href="#"
              className="text-small text-black group inline-flex items-center gap-4 font-bold"
            >
              BRAND STORY
              <ArrowRightIcon />
            </Link>
          </div>

          <div className="flex items-end gap-8">
            <div
              key={`pc-image-${activeIndex}`}
              className="animate-fade-left relative h-180 w-120 shrink-0 overflow-hidden"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="568px"
                className="object-bottom object-cover"
              />
            </div>
            <div key={`pc-info-${activeIndex}`} className="animate-fade-right w-48 shrink-0">
              <p className="text-small text-black mb-1 font-bold">
                {product.brand}
              </p>
              <p className="text-h5 text-black mb-4 font-bold">
                {product.name}
              </p>
              <p className="text-small text-[#555] whitespace-pre-line lg:text-[1rem]">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
