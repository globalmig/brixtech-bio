import { Button } from '@/components/common/Button';
import { NEWS_LIST } from '@/constants/home';
import Link from 'next/link';

export default function NewsSection() {
  return (
    <section className="mx-auto w-full max-w-(--width-app-canvas) px-5 py-16 md:px-8 md:py-20 canvas:px-0 lg:py-28">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <p className="text-small text-primary mb-4 font-bold tracking-widest lg:mb-8">
            NEWS
          </p>
          <h2 className="text-h3 mb-10 lg:mb-20 whitespace-pre-line lg:text-[3rem] lg:leading-14">
            {'브릭스텍바이오의\n새로운 소식을 전합니다.'}
          </h2>
          <Button
            size={{ base: 'small', md: 'medium', lg: 'large' }}
          >소식 더보기</Button>
        </div>

        <ul className="border-primary-2 border-t-2">
          {NEWS_LIST.map((news, index) => (
            <li key={index}>
              <Link
                href="#"
                className="border-gray-300 flex items-center justify-between border-b py-3.75 lg:py-7"
              >
                <span className="text-h6 lg:text-h5 line-clamp-1">{news.title}</span>
                <span className="text-xs lg:text-small text-text-info shrink-0 pl-4">
                  {news.date}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
