'use client';

import { useEffect, useRef, useState } from 'react';

import { PROCESS_STEPS } from '@/constants/home';

const LABEL_DELAY = 150;
const NUMBER_SLOT_MS = 900;

export default function DesignTechnologySection() {
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
    <section className="bg-primary-2">
      <div className="mx-auto w-full max-w-(--width-app-canvas) px-[4%] py-15 md:px-8 canvas:px-0 lg:py-30">
        <div className="flex flex-col gap-12 lg:gap-20">
          <div className="lg:max-w-2xl" data-aos="fade-up">
            <p className="text-small text-white mb-4 flex items-center gap-3 font-bold lg:mb-8">
              TECHNOLOGY
            </p>
            <h2 className="text-h4 text-white mb-5 whitespace-pre-line lg:text-h2">
              {'스피루리나 배양 기술을\n사업의 출발점으로'}
            </h2>
            <p className="text-[1rem] leading-6 text-white mb-10 lg:mb-0">
              5가지 핵심 사업 영역의 유기적인 시너지를 통해<br/> 지속가능한 미래
              바이오 시장을 선도합니다.
            </p>
          </div>

          <div ref={stepsRef}>
            <div className="border-t border-white lg:hidden">
              {PROCESS_STEPS.map((step, index) => {
                const labelDelay = index * LABEL_DELAY;
                return (
                  <div
                    key={step.title}
                    className="border-divider-default/50 relative gap-6 border-b py-8"
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[5rem] leading-none font-bold text-white italic select-none transition-opacity duration-500 ease-out ${visible && activeIndex === index ? 'opacity-70' : 'opacity-0'}`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div
                      style={{ transitionDelay: `${labelDelay}ms` }}
                      className={`relative pl-16 transition-all duration-500 ease-out ${visible ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}`}
                    >
                      <h3 className="text-h5 text-white mb-2">{step.title}</h3>
                      <p className="text-small text-white">{step.label}</p>
                    </div>
                    <p className="text-small lg:text-base shrink-0 mt-4 text-white/80">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="hidden lg:grid lg:grid-cols-5 lg:gap-x-10">
              {PROCESS_STEPS.map((step, index) => {
                const labelDelay = index * LABEL_DELAY;
                return (
                  <div key={step.title} className="relative">
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute left-0 top-0 text-[5rem] leading-none font-bold text-white italic select-none transition-opacity duration-500 ease-out ${visible && activeIndex === index ? 'opacity-40' : 'opacity-0'}`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div
                      style={{ transitionDelay: `${labelDelay}ms` }}
                      className={`relative pl-10 transition-all duration-500 ease-out ${visible ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}`}
                    >
                      <p className="text-small text-white mb-3">{step.title}</p>
                      <h3 className="text-h4 text-white mb-4 font-bold">
                        {step.label}
                      </h3>
                    </div>
                    <div className="border-b border-white/40" />
                    <p className="text-small text-white mt-6">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
