import Link from 'next/link';

import { NEWS_LIST } from '@/constants/home';

export default function DesignNewsSection() {
  return (
    <section className="mx-auto w-full max-w-(--width-app-canvas) px-[4%] py-15 md:px-8 canvas:px-0 lg:py-30">
      <p className="text-small text-black mb-4 font-bold lg:mb-8">
        NEWS
      </p>
      <h2 className="text-h4 text-black mb-10 whitespace-pre-line lg:mb-20 lg:text-h2">
        {'브릭스텍바이오의\n새로운 소식을 전합니다.'}
      </h2>

      <Link
        href="#"
        className="group inline-flex items-center gap-3"
      >
        <span className="text-small text-black font-bold">VIEW ALL</span>
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
      </Link>

      <ul className="border-divider-strong mt-10 border-t lg:mt-14">
        {NEWS_LIST.map((news, index) => (
          <li key={index}>
            <Link
              href="#"
              className="border-divider-default flex items-center justify-between border-b py-5 lg:py-[27.5px]"
            >
              <span className="text-h6 text-black line-clamp-1 lg:text-h5">
                {news.title}
              </span>
              <span className="text-xs text-[#555] shrink-0 pl-6 lg:text-small">
                {news.date}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
