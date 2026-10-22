import Image from 'next/image';
import type { ReactNode } from 'react';

interface MediaTextRowProps {
  imageAlt: string;
  reverse?: boolean;
  children: ReactNode;
}

export default function MediaTextRow({ imageAlt, reverse = false, children }: MediaTextRowProps) {
  return (
    <div
      className={`flex flex-col gap-8 lg:items-start lg:gap-16 ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
    >
      <div className="lg:flex-1">{children}</div>

      <div className="relative aspect-4/5 w-full overflow-hidden bg-gray-100 lg:w-[38%] lg:shrink-0">
        <Image
          src="/#"
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 38vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
