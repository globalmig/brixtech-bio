import Image from 'next/image';

import { PROCESS_STEPS } from '@/constants/home';

const PROCESS_TONES = [
  { bg: 'bg-primary-2', text: 'text-white', divider: 'border-gray-400' },
  { bg: 'bg-primary-2/70', text: 'text-white', divider: 'border-gray-400' },
  { bg: 'bg-primary/70', text: 'text-white', divider: 'border-white' },
  { bg: 'bg-primary/50', text: 'text-white', divider: 'border-white' },
  { bg: 'bg-primary/20', text: 'text-primary-3', divider: 'border-primary-4' },
];

export default function TechnologySection() {
  return (
    <section className="mx-auto w-full max-w-(--width-app-canvas) px-5 py-16 md:px-8 md:py-20 canvas:px-0 lg:py-32">
      <p className="text-small text-primary mb-4 font-bold tracking-widest lg:mb-8">
        TECHNOLOGY
      </p>
      <h2 className="text-h2 mb-5 whitespace-pre-line lg:text-[3rem] lg:leading-14">
        {'스피루리나 배양 기술을\n사업의 출발점으로'}
      </h2>
      <p className="text-[1rem] lg:text-[1.5rem] leading-6 lg:leading-8 text-primary-4 mb-10 lg:mb-25 whitespace-pre-line">
        {'5가지 핵심 사업 영역의 유기적인 시너지를 통해\n지속가능한 미래 바이오 시장을 선도합니다.'}
      </p>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:flex lg:items-center lg:justify-end lg:gap-0">
        {PROCESS_STEPS.map((step, index) => {
          const tone = PROCESS_TONES[index];
          return (
            <div
              key={step.title}
              className={`flex flex-col items-center text-center ${index > 0 ? 'lg:-ml-5' : ''}`}
            >
              <div
                className={`${tone.bg} ${tone.text} flex aspect-square w-full max-w-36 flex-col items-center justify-center gap-2 rounded-full p-6 lg:max-w-60 lg:min-w-60`}
              >
                <Image src={step.icon} alt={step.title} width={36} height={36} aria-hidden />
                <span className="text-h6">{step.title}</span>
                <p className={`${tone.divider} w-10`} />
                <p className="text-small py-2 lg:py-5 border-t-[1.5px] border-dashed">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
