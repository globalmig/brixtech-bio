'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Slider from 'react-slick';

import { HERO_SLIDES } from '@/constants/home';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative h-180 w-full overflow-hidden lg:h-230">
      <Slider
        dots={false}
        arrows={false}
        infinite
        autoplay
        autoplaySpeed={5000}
        speed={800}
        pauseOnHover={false}
        afterChange={setActiveIndex}
      >
        {HERO_SLIDES.map((src) => (
          <div key={src} className="relative h-180 lg:h-230">
            <Image src={src} alt="메인 배너 이미지" width={2560} height={900} className="w-full h-full object-cover" />
          </div>
        ))}
      </Slider>

      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="text-white text-center absolute inset-x-0 top-[35%] mx-auto w-full max-w-(--width-app-canvas) px-5 md:px-8 lg:bottom-1/2 canvas:px-0">
        <h1
          className="text-h3 mb-5 lg:text-h1 lg:mb-5 font-semibold whitespace-pre-line"
        >
          End-to-End Spirulina Innovation.
        </h1>
        <p
          className="lg:text-h5 font-normal mb-10 lg:mb-15"
        >
          미세조류 배양부터 원료, 완제품, 유통까지 <br className='lg:hidden'/>하나의 흐름으로 연결합니다.
        </p>
        <Link
          href="/tech"
          className="text-small lg:text-base group inline-flex items-center gap-4"
        >
          기술 알아보기
          <ArrowRightIcon className='text-white' />
        </Link>
      </div>

      <div
        className="absolute inset-x-0 bottom-10 z-10 mx-auto flex w-full max-w-200 items-center gap-2 px-5 md:px-8 lg:bottom-16 canvas:px-0"
        aria-hidden
      >
        {HERO_SLIDES.map((src, index) => (
          <span
            key={src}
            className={`h-px flex-1 rounded-full transition-colors duration-500 ${
              index === activeIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
