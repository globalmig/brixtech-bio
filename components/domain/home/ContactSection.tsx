import Image from 'next/image';
import Link from 'next/link';

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/home-contact-banner.png"
        alt="문의하기 배너"
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div className="bg-primary-2/80 absolute inset-0" />

      <div className="relative mx-auto flex w-full max-w-(--width-app-canvas) flex-col items-start justify-between gap-10 px-5 py-20 text-white sm:flex-row sm:items-center md:px-8 md:py-28 canvas:px-0 lg:py-32">
        <div>
          <p data-aos="fade-up" className="text-small mb-4 font-bold tracking-widest lg:mb-8">
            CONTACT
          </p>
          <h2
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-h3 mb-5 font-semibold lg:text-[3rem] lg:leading-14"
          >
            미세조류 바이오 기술 및 <br/>사업 협력에 대해 문의주세요.
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-[1rem] text-white/80 mb-10 lg:text-[1.5rem]"
          >
            브릭스텍바이오가 함께하겠습니다.
          </p>
        </div>

        <Link
          href="/contact"
          aria-label="문의페이지로 이동"
          data-aos="fade-up"
          data-aos-delay="500"
          className="relative flex shrink-0 items-center"
        >
          <Image
            src="/images/contact.svg"
            alt="문의페이지로 이동"
            width={480}
            height={144}
            className="h-8 w-auto sm:h-10 lg:h-15"
            aria-hidden
          />

          <span
            aria-hidden
            className="border border-white absolute top-1/2 right-0 size-28 -translate-y-1/2 translate-x-1/2 rounded-full p-3 sm:size-30  lg:size-35"
          >
            <svg viewBox="0 0 100 100" className="animate-badge-spin size-full">
              <path
                id="contact-badge-path"
                d="M 2,50 a 48,48 0 1,0 96,0 a 48,48 0 1,0 -96,0"
                fill="none"
              />
              <text fontSize="11" fill="white" letterSpacing="1" textLength="302" lengthAdjust="spacing">
                <textPath href="#contact-badge-path" startOffset="0">
                  BRIXTECH BIO • BRIXTECH BIO •
                </textPath>
              </text>
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
