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

export default function ImageCompareCards({ items }: ImageCompareCardsProps) {
  return (
    <div className="flex flex-col gap-10 lg:w-250 lg:flex-row lg:mx-auto lg:justify-center lg:gap-8">
      {items.map((item, index) => (
        <div key={index} className="text-center lg:flex-1">
          <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="border-divider-default mt-8 border-t-2" />
          <p className="text-h5 lg:text-h4 text-black mt-5 font-bold">{item.title}</p>
          {item.rows ? (
            <ul className="border-divider-default mt-6 border-t-2">
              {item.rows.map((row, rowIndex) => (
                <li
                  key={rowIndex}
                  className="border-divider-default flex items-center justify-center border-b py-4 lg:py-5"
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
              <div className="border-divider-default mt-8 border-t" />
              <div className="mt-8 flex flex-col gap-1">
                {item.description.map((line, lineIndex) => (
                  <p key={lineIndex} className="text-text-sub text-[0.95rem] leading-6">
                    {line}
                  </p>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}
