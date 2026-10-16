import Image from 'next/image';

export default function DesignCompanySection() {
  return (
    <section className="relative mx-auto w-full max-w-(--width-app-canvas) px-[4%] py-15 md:px-8 canvas:px-0 lg:py-30">


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

      <div className="mt-20 lg:mt-40">
        <div className="flex items-start gap-4 lg:gap-8">
          <div className="flex-[1.7]">
            <div className="relative aspect-3/4 w-[85%] overflow-hidden">
              <Image
                src="/images/배양기술.png"
                alt="배양기술"
                fill
                sizes="(min-width: 1024px) 30vw, 48vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-3 min-w-0">
            <p className="text-small text-black mb-2 font-bold">BIO INNOVATION</p>
            <h3 className="text-h4 text-black mb-2 lg:mb-4">
              바이오 기술로 넓혀가는 새로운 가능성
            </h3>
            <p className="text-small text-[#555] lg:text-base">
              미세조류의 특성과 활용 가능성을 바탕으로 건강과 환경을 아우르는 다양한 바이오 영역을 함께 모색합니다. <br/>기능성 원료부터 친환경 바이오 응용까지 폭넓은 관점에서 새로운 활용 방향을 탐구하고, <br/>일상과 산업에 기여할 수 있는 가치를 만들어갑니다.
            </p>
          </div>
        </div>

        <div className="mt-48 flex items-start gap-4 lg:mt-[-41.5px] lg:gap-8">
          <div className="flex-[1.7]" aria-hidden />

          <div className="flex items-end gap-4 min-w-0 lg:gap-8">
            <div className="text-right flex-1 min-w-0">
              <p className="text-small text-black mb-2 font-bold">SPIRULINA</p>
              <h3 className="text-h4 text-black mb-2 lg:mb-4">
                미세조류의 가능성을 키우는 배양 기술
              </h3>
              <p className="text-small text-[#555] lg:text-base">
                스피루리나의 생육 환경을 체계적으로 관리하고 <br/>안정적인 배양 기술을 바탕으로 건강한 바이오 원료 생산의 기반을 마련합니다.<br/>미세조류의 특성을 이해하고 지속적인 배양 환경을 구축해 원료가 지닌 가치를 높여갑니다.
              </p>
            </div>

            <div className="relative aspect-4/5 w-[45%] shrink-0 overflow-hidden">
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
        </div>
      </div>
    </section>
  );
}
