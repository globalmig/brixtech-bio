'use client';

import Image from 'next/image';
import Slider from 'react-slick';

import { Button } from '@/components/common/Button';
import { HERO_SLIDES } from '@/constants/home';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function HeroSection() {
  return (
    <section className="relative h-180 w-full overflow-hidden lg:h-225">
      <Slider
        dots={false}
        arrows={false}
        infinite
        autoplay
        autoplaySpeed={5000}
        speed={800}
        fade
        pauseOnHover={false}
      >
        {HERO_SLIDES.map((src) => (
          <div key={src} className="relative h-180 lg:h-225">
            <Image src={src} alt="메인 배너 이미지" width={2560} height={900} className="w-full h-full object-cover" />
          </div>
        ))}
      </Slider>

      <div
      data-aos="fade-up"
          data-aos-delay="300"
      className="absolute inset-x-0 top-1/4 mx-auto w-full max-w-(--width-app-canvas) px-5 text-white md:px-8 lg:bottom-1/2 canvas:px-0">
        <p className="lg:text-h5 mb-10 font-semibold">
          MICROALGAE BIO PLATFORM
        </p>
        <h1
          className="text-h3 mb-5 lg:text-[3.5rem] lg:leading-16 lg:mb-10 font-semibold whitespace-pre-line"
        >
          {'기술에서 브랜드까지,\n하나의 흐름으로.'}
        </h1>
        <p
          className="lg:text-h3 font-normal text-white mb-10 lg:mb-20"
        >
          스피루리나 배양을 기반으로 원료·제품·유통을 연결합니다.
        </p>
        <Button
          size={{ base: 'small', md: 'medium', lg: 'large' }}
          variant="blur"
        >
          기술 알아보기
        </Button>
      </div>
    </section>
  );
}
