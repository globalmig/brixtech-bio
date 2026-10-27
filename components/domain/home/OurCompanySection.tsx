'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function OurCompanySection() {
  const spirulinaVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (spirulinaVideoRef.current) {
      spirulinaVideoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section className="relative w-full py-15 lg:py-30">
      <div className="mx-auto w-full max-w-(--width-app-canvas) px-[4%] md:px-8 canvas:px-0">
        <p className="text-small text-black mb-4 flex items-center gap-3 font-bold lg:mb-8">
          OUR COMPANY
        </p>
        <h2 className="text-h4 text-black mb-5 whitespace-pre-line lg:text-h2">
          {'미세조류에서 시작해\n지속가능한 바이오 산업을 만들어갑니다.'}
        </h2>
        <p className="text-body text-gray-750 mb-10 lg:mb-20">
          브릭스텍바이오는 미세조류 기반 기능성 원료와<br />친환경 바이오 응용
          제품을 개발합니다.
        </p>
      </div>

      <div className="mt-20 w-full lg:mt-40">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-8">
          <div className="px-[4%] md:px-8 lg:hidden">
            <h3 className="text-h4 text-black mb-2">BIO INNOVATION</h3>
            <p className="text-small text-gray-750">
              미세조류의 특성과 활용 가능성을 바탕으로 건강과 환경을 아우르는 다양한 바이오 응용 분야를 탐색합니다.
            </p>
          </div>

          <div className="shrink-0 lg:flex-[1.7]">
            <Image
              src="/images/home-innovation.png"
              alt="BIO INNOVATION"
              width={800}
              height={1000}
              className="aspect-3/4 w-full object-cover lg:aspect-auto lg:h-full"
            />
          </div>

          <div className="flex min-w-0 flex-col gap-10 lg:flex-3 lg:gap-0">
            <div className="hidden px-[4%] md:px-8 lg:block lg:px-0">
              <h3 className="text-h4 text-black mb-2 lg:mb-4">
                BIO INNOVATION
              </h3>
              <p className="text-small text-gray-750 lg:text-base">
                미세조류의 특성과 활용 가능성을 바탕으로 건강과 환경을{' '}
                <br className="hidden lg:inline" />
                아우르는 다양한 바이오 응용 분야를 탐색합니다.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:mt-32 lg:flex-row lg:items-end lg:gap-8">
              <div className="min-w-0 px-[4%] md:px-8 lg:flex-1 lg:px-0 lg:text-right">
                <h3 className="text-h4 text-black mb-2 lg:mb-4">
                  SPIRULINA
                </h3>
                <p className="text-small text-gray-750 lg:text-base">
                  스피루리나의 생육 환경을 체계적으로 관리하고
                  <br className="hidden lg:inline" />
                  안정적인 배양 기술을 바탕으로지
                  <br className="hidden lg:inline" />
                  속적인 원료 생산 기반을 마련합니다.
                </p>
              </div>

              <video
                ref={spirulinaVideoRef}
                src="/videos/스피루리나.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="aspect-4/5 w-full shrink-0 object-cover lg:w-[45%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
