import Image from 'next/image';

import { COMPANY_FEATURES, COMPANY_STATS } from '@/constants/home';

export default function OurCompanySection() {
  return (
    <section className="mx-auto w-full max-w-(--width-app-canvas) px-5 py-16 md:px-8 md:py-20 canvas:px-0 lg:pt-28 lg:pb-12">
      <div className="grid gap-10 lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-215 lg:shrink-0">
          <p className="text-small text-primary mb-4 font-bold tracking-widest lg:mb-8">
            OUR COMPANY
          </p>
          <h2 className="text-h3 mb-5 whitespace-pre-line lg:text-[3rem] lg:leading-14">
            {'미세조류에서 시작해\n지속가능한 바이오 산업을 만들어갑니다.'}
          </h2>
          <p className="text-[1rem] lg:text-[1.5rem] leading-6 lg:leading-8 text-primary-4 mb-10 lg:mb-20">
            브릭스텍바이오는 미세조류 기반 기능성 원료와 <br className='hidden lg:block'/>친환경 바이오 응용 제품을 개발합니다.
          </p>

          <div className="flex justify-center lg:justify-start">
            {COMPANY_STATS.map((stat, index) => (
              <article
                key={stat.label}
                className={
                  index > 0
                    ? 'border-gray-400 ml-4 border-l-2 border-dashed pl-4 sm:ml-15 sm:pl-15'
                    : ''
                }
              >
                <p className="text-h3 lg:text-h1 text-center">{stat.value}</p>
                <p className="text-small lg:text-[1.2rem] text-text-info mt-3 text-center lg:mt-6">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative aspect-4/3 w-full lg:w-150 overflow-hidden rounded-2xl">
          <Image
            src="/images/home-our-company.png"
            alt="브릭스텍바이오 미세조류"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3 lg:mt-16 lg:gap-5 border-gray-400 border rounded-2xl p-6 lg:py-10">
        {COMPANY_FEATURES.map((feature, index) => (
          <div
            key={feature.title}
            className={`flex min-w-0 items-start gap-3
              ${index > 0
                ? 'border-gray-400 border-t border-dashed pt-6 sm:border-t-0 sm:border-l-2 sm:pt-0 sm:pl-5'
                : ''}`
            }
          >
            <div className="bg-primary flex h-11 w-11 lg:h-12 lg:w-12 shrink-0 items-center justify-center rounded-full">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={24}
                height={24}
                aria-hidden
                className="h-5 w-5 lg:h-6 lg:w-6"
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-h5 text-primary-2 mb-1">{feature.title}</h3>
              <p className="text-text-info lg:text-base break-keep">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
