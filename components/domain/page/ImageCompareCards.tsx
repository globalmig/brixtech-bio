import Image from 'next/image';
import type { ReactNode } from 'react';

interface ImageCompareCardItem {
  image: string;
  title: string;
  rows?: string[];
  description?: ReactNode[];
}

interface ImageCompareCardsProps {
  items: ImageCompareCardItem[];
}

function CompareArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      aria-hidden
      className={className}
    >
      <circle cx="24" cy="24" r="24" className="fill-primary-2" />
      <path
        d="M21 16L29 24L21 32"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function ImageCompareCards({ items }: ImageCompareCardsProps) {
  return (
    <div className="flex flex-col gap-10 lg:w-270 lg:flex-row lg:mx-auto lg:justify-between">
      {items.flatMap((item, index) => {
        const card = (
          <div key={`card-${index}`} className="text-center lg:w-117 lg:shrink-0">
            <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="border-primary-2 mt-8 border-t-2" />
            <p className="text-h5 lg:text-h4 text-black mt-7 font-bold">{item.title}</p>
            {item.rows ? (
              <ul className="mt-6">
                {item.rows.map((row, rowIndex) => (
                  <li
                    key={rowIndex}
                    className={`border-divider-default flex items-center justify-center border-b py-4 lg:py-5 ${
                      rowIndex === 0 ? 'border-t-primary-2 border-t' : ''
                    }`}
                  >
                    <span className="text-body text-text-default lg:text-h6 font-normal">
                      {row}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
            {item.description ? (
              <>
                <div className="border-t-primary-2 mt-7 border-t" />
                <div className="mt-8 flex flex-col gap-1">
                  {item.description.map((line, lineIndex) => (
                    <p key={lineIndex} className="text-text-sub">
                      {line}
                    </p>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        );

        if (index === 0) return [card];

        return [
          <div
            key={`arrow-${index}`}
            className="flex shrink-0 items-center justify-center lg:w-12 lg:items-start"
          >
            <CompareArrowIcon className="rotate-90 lg:mt-[151.5px] lg:rotate-0" />
          </div>,
          card,
        ];
      })}
    </div>
  );
}
