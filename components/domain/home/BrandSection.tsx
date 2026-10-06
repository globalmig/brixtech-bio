import Image from 'next/image';

import { Button } from '@/components/common/Button';

export default function BrandSection() {
  return (
    <section className="relative overflow-hidden h-200 lg:h-auto">
      <div className="absolute inset-0">
        <Image
          src="/images/home-brand-banner-2.png"
          alt="브릭스텍바이오 브랜드 소개"
          fill
          sizes="100vw"
          className="hidden lg:block object-cover"
          aria-hidden
        />
        <Image
          src="/images/home-brand-banner-2-mo.png"
          alt="브릭스텍바이오 브랜드 소개"
          fill
          sizes="100vw"
          className="lg:hidden object-cover"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto w-full max-w-(--width-app-canvas) px-5 py-20 md:px-8 md:py-28 canvas:px-0 lg:py-36">
        <div className="max-w-md lg:max-w-xl">
          <p className="text-small text-white mb-4 font-bold tracking-widest lg:mb-8">
            BRAND & PRODUCTS
          </p>
          <h2 className="text-white text-h3 mb-5 lg:text-[3rem] lg:leading-14">
            우리의 일상에 더해지는<br/>건강한 변화
          </h2>
          <p className="text-[1rem] lg:text-[1.5rem] leading-6 lg:leading-8 text-white/80 mb-10 lg:mb-20">
            건강을 위한 기능성 제품부터 <br className='hidden lg:block'/>반려동물과 환경을 위한 다양한 솔루션까지 <br className='hidden lg:block'/>생활 가까이에서 새로운 가능성을 만들어갑니다.
          </p>
          <Button
            size={{ base: 'small', md: 'medium', lg: 'large' }}
            variant="blur"
          >
          자세히 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
