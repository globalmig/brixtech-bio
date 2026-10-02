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
          <p className="text-small mb-4 font-bold tracking-widest lg:mb-8">
            CONTACT
          </p>
          <h2 className="text-h2 mb-5 font-semibold whitespace-pre-line lg:text-[3rem] lg:leading-14">
            {'미세조류 바이오 기술 및\n사업 협력에 대해 문의주세요.'}
          </h2>
          <p className="text-[1rem] text-white/80 mb-10 lg:text-[1.5rem]">
            브릭스텍바이오가 함께하겠습니다.
          </p>
        </div>

        <Link href="/contact" aria-label="문의하기" className="shrink-0">
          <Image
            src="/images/contact.svg"
            alt="문의페이지로 이동"
            width={480}
            height={144}
            className="h-16 w-auto sm:h-20 lg:h-24"
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
