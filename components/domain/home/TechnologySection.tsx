'use client';

import { useEffect, useRef, useState } from 'react';

import { PROCESS_STEPS } from '@/constants/home';

const NUMBER_SLOT_MS = 1800;

export default function TechnologySection() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const node = stepsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % PROCESS_STEPS.length);
    }, NUMBER_SLOT_MS);

    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section>
      <div className="mx-auto w-full max-w-(--width-app-canvas) px-[4%] py-15 md:px-8 canvas:px-0 lg:py-30">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          <div className="lg:flex-1">
            <p className="text-small text-black mb-4 flex items-center gap-3 font-bold lg:mb-8">
              TECHNOLOGY
            </p>
            <h2 className="text-h4 text-black mb-5 whitespace-pre-line lg:text-h2">
              {'스피루리나 배양 기술을\n사업의 출발점으로'}
            </h2>
            <p className="text-[1rem] leading-6 text-black/50 mb-10 lg:mb-25">
              5가지 핵심 사업 영역의 유기적인 시너지를 통해<br /> 지속가능한 미래
              바이오 시장을 선도합니다.
            </p>

            <div className="relative aspect-3/4 w-full max-w-100 overflow-hidden">
              <video
                src="/images/미세조류 영상.mp4"
                poster="/images/미세조류_영상_poster.jpg"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div ref={stepsRef} className="border-t border-black lg:w-200">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.title}
                className="border-divider-default relative isolate gap-6 overflow-hidden border-b py-8 lg:flex lg:items-center lg:justify-between"
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute left-0 top-1/3 -z-10 -translate-y-1/2 text-[3.5rem] leading-none font-bold text-black italic select-none transition-all duration-1000 ease-out ${visible && activeIndex === index ? 'opacity-15' : 'opacity-0'}`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={`select-none transition-all duration-1000 ease-out ${visible && activeIndex === index ? 'translate-x-4 pt-5' : 'translate-x-0 pt-0'}`}>
                  <h3 className={"text-h5 lg:text-h4 text-black mb-2"}>{step.title}</h3>
                  <p className="text-small lg:text-base text-black/50">
                    {step.label}
                  </p>
                </div>
                <p className="text-small lg:text-base shrink-0 mt-4 lg:mt-0 lg:text-right text-black/50">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
