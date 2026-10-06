import Image from 'next/image';

import { PROCESS_STEPS } from '@/constants/home';

const PROCESS_TONES = [
  { bg: 'bg-primary-2', text: 'text-white', divider: 'border-gray-400' },
  { bg: 'bg-primary-2/70', text: 'text-white', divider: 'border-gray-400' },
  { bg: 'bg-primary/70', text: 'text-white', divider: 'border-white' },
  { bg: 'bg-primary/50', text: 'text-white', divider: 'border-white' },
  { bg: 'bg-primary/20', text: 'text-primary-3', divider: 'border-primary-3' },
];

export default function TechnologySection() {
  return (
    <section className="mx-auto w-full max-w-(--width-app-canvas) px-5 py-16 md:px-8 md:py-20 canvas:px-0 lg:py-32">
      <p data-aos="fade-up" className="text-small text-primary mb-4 font-bold tracking-widest lg:mb-8">
        TECHNOLOGY
      </p>
      <h2
        data-aos="fade-up"
        data-aos-delay="300"
        className="text-h3 mb-5 whitespace-pre-line lg:text-[3rem] lg:leading-14"
      >
        {'스피루리나 배양 기술을\n사업의 출발점으로'}
      </h2>
      <p
        data-aos="fade-up"
        data-aos-delay="400"
        className="text-[1rem] lg:text-[1.5rem] leading-6 lg:leading-8 text-primary-4 mb-10 lg:mb-25"
      >
        5가지 핵심 사업 영역의 유기적인 시너지를 통해 <br className='hidden lg:block'/>지속가능한 미래 바이오 시장을 선도합니다.
      </p>

      <div className="flex flex-col gap-6 sm:grid sm:grid-cols-3 lg:flex lg:flex-row lg:items-center lg:justify-end lg:gap-0">
        {PROCESS_STEPS.map((step, index) => {
          const tone = PROCESS_TONES[index];
          return (
            <div
              key={step.title}
              data-aos="fade-up"
              data-aos-delay={index * 300}
              className={`flex flex-col items-center text-center ${index > 0 ? '-mt-9 lg:mt-0 lg:-ml-5' : ''}`}
            >
              <div
                className={`${tone.bg} ${tone.text} flex h-55 w-55 shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-full p-6 sm:h-36 sm:w-36 lg:h-62 lg:w-62`}
              >
                <Image src={step.icon} alt={step.title} width={38} height={38} aria-hidden />
                <span className="text-h6 lg:text-h4">{step.title}</span>
                <p className={`${tone.divider} text-small lg:text-h6 font-normal py-2 lg:py-5 border-t-[1.5px] border-dashed`}>{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
