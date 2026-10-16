import Image from 'next/image';
import Link from 'next/link';

interface PageIntroProps {
  eyebrow: string;
  title: string;
  lead?: string;
}

export default function PageIntro({ eyebrow, title, lead }: PageIntroProps) {
  return (
    <div className='border-b border-b-[#ccc]'>
      <div className="bg-white pt-32 pb-14 text-center md:pt-40 md:pb-16">
        <div className="mx-auto w-full max-w-(--width-app-canvas) px-5 md:px-8 canvas:px-0">
          <h1 className="text-h3 lg:text-[2.75rem]/[1.3] text-text-default font-bold">
            {title}
          </h1>
          <div className="text-text-sub mt-5 flex items-center justify-center gap-2 text-sm font-semibold">
            <Link href="/" aria-label="홈">
              <Image src="/icons/home.svg" alt="홈으로 이동" width={16} height={16} />
            </Link>
            <Image src="/icons/chevron-right.svg" alt="화살표" width={16} height={16} aria-hidden />
            <span>{eyebrow}</span>
            <Image src="/icons/chevron-right.svg" alt="화살표" width={16} height={16} aria-hidden />
            <span>{title}</span>
          </div>
          {lead ? (
            <p className="text-text-info mx-auto mt-5 max-w-2xl">{lead}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
