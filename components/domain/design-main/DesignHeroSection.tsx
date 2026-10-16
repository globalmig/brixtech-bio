'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

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

export default function DesignHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section className="relative h-180 w-full overflow-hidden lg:h-225">
      <video
        ref={videoRef}
        src="/images/배양관_전경.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="h-180 w-full object-cover lg:h-225"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-180 w-full bg-linear-to-b from-black/80 to-transparent lg:h-225"
      />

      <div
      data-aos="fade-up"
          data-aos-delay="300"
      className="text-white absolute inset-x-0 top-1/4 mx-auto w-full max-w-(--width-app-canvas) px-5 md:px-8 lg:bottom-1/2 canvas:px-0">
        <p className="text-small lg:text-base mb-10 font-semibold">
          MICROALGAE BIO PLATFORM
        </p>
        <h1
          className="text-h3 mb-5 lg:text-h1 lg:mb-10 font-semibold whitespace-pre-line"
        >
          {'기술에서 브랜드까지,\n하나의 흐름으로.'}
        </h1>
        <p
          className="lg:text-h5 font-normal mb-10 lg:mb-20"
        >
          스피루리나 배양을 기반으로<br className='lg:hidden'/> 원료·제품·유통을 연결합니다.
        </p>
        <Link
          href="#"
          className="text-small lg:text-base group inline-flex items-center gap-4 font-bold"
        >
          기술 알아보기
          <ArrowRightIcon className='text-white'/>
        </Link>
      </div>
    </section>
  );
}
