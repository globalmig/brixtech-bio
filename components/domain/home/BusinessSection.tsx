import Image from 'next/image';
import Link from 'next/link';

import { BUSINESS_CATEGORIES } from '@/constants/home';

export default function BusinessSection() {
  return (
    <section className="w-full py-15 lg:py-30">
      <div className="mx-auto w-full max-w-(--width-app-canvas) px-[4%] md:px-8 canvas:px-0">
        <p className="text-small text-black mb-4 flex items-center gap-3 font-bold lg:mb-8">
          BUSINESS
        </p>
        <h2 className="text-h4 text-black mb-5 lg:text-h2">
          하나로 이어지는 <br/>바이오 비즈니스
        </h2>
        <p className="text-body text-gray-750">
          5가지 핵심 사업 영역의 유기적인 시너지를 통해<br/>
          지속가능한 미래 바이오 시장을 선도합니다.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-5 lg:gap-2 px-[4%] lg:px-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 xl:grid-cols-5">
        {BUSINESS_CATEGORIES.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group bg-bg-default relative block aspect-square overflow-hidden sm:aspect-3/4"
          >
            <Image
              src={category.image}
              alt={category.title}
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-black/0 transition-opacity duration-300 group-hover:opacity-0" />
            <span className="text-h4 absolute inset-x-0 bottom-0 p-5 font-semibold tracking-wide text-white uppercase transition-opacity duration-300 group-hover:opacity-0 lg:p-6">
              {category.label}
            </span>

            <div className="bg-primary-2 absolute inset-0 flex flex-col justify-end overflow-hidden p-6 text-white opacity-0 transition-all duration-500 ease-out transform-[translateY(100%)] group-hover:opacity-100 group-hover:transform-[translateY(0)] lg:p-8">
              <div>
                <p className="mb-3 text-base text-white">{category.title}</p>
                <p className="text-h4 font-semibold tracking-wide uppercase">
                  {category.label}
                </p>
                <p className="mt-4 text-small lg:text-base text-white">
                  {category.description}
                </p>
              </div>

              <span className="text-small text-base mt-[clamp(1.5rem,4vw,9.375rem)] flex items-center gap-3">
                VIEW MORE
                <svg
                  width="40"
                  height="10"
                  viewBox="0 0 40 10"
                  fill="none"
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M0 5H38M38 5L32 1M38 5L32 9"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
