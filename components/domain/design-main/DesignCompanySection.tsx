import Image from 'next/image';

export default function DesignCompanySection() {
  return (
    <section className="mx-auto w-full max-w-(--width-app-canvas) px-[4%] py-15 md:px-8 canvas:px-0 lg:py-30">
      <div>
        <p className="text-small text-black mb-4 flex items-center gap-3 font-bold lg:mb-8">
          OUR COMPANY
        </p>
        <h2 className="text-h4 text-black mb-5 whitespace-pre-line lg:text-h2">
          {'미세조류에서 시작해\n지속가능한 바이오 산업을 만들어갑니다.'}
        </h2>
        <p className="text-[1rem] leading-6 text-[#555] mb-10 lg:mb-20">
          브릭스텍바이오는 미세조류 기반 기능성 원료와<br/>친환경 바이오 응용
          제품을 개발합니다.
        </p>
      </div>

      <div className="mt-20 grid grid-cols-[1.7fr_3fr] items-start gap-4 lg:mt-40 lg:gap-8">
        <div className="relative aspect-3/4 w-[85%] overflow-hidden">
          <Image
            src="/images/배양기술.png"
            alt="배양기술"
            fill
            sizes="(min-width: 1024px) 30vw, 48vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div>
            <p className="text-small text-black mb-2 font-bold">BIO INNOVATION</p>
            <h3 className="text-h4 text-black mb-2 lg:mb-4">
              바이오 기술로 넓혀가는 새로운 가능성
            </h3>
            <p className="text-small text-[#555] lg:text-base">
              미세조류의 특성과 활용 가능성을 바탕으로 건강과 환경을 아우르는<br/>
              다양한 바이오 영역을 함께 모색합니다.
            </p>
          </div>

          <div className="relative mt-48 ml-auto aspect-4/5 w-[76%] overflow-hidden lg:mt-86.25">
            <video
              src="/images/미세조류 영상.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-6 ml-auto w-[76%] lg:mt-8">
            <p className="text-small text-black mb-2 font-bold">SPIRULINA</p>
            <h3 className="text-h4 text-black mb-2 lg:mb-4">
              미세조류의 가능성을 키우는 배양 기술
            </h3>
            <p className="text-small text-[#555] lg:text-base">
              스피루리나의 생육 환경을 체계적으로 관리하고<br/> 안정적인 배양
              기술을 바탕으로 지속적인 원료 생산 기반을 마련합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
