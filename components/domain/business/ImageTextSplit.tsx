import Image from 'next/image';

import {
  DEFAULT_IMAGE_ASPECT_RATIO,
  IMAGE_ASPECT_RATIO_OPTIONS,
} from '@/lib/business-block-defaults';
import type { ImageAspectRatio } from '@/types/business';

interface ImageTextSplitProps {
  eyebrow?: string;
  heading: string;
  lead?: string;
  body: string;
  imageSrc: string;
  imageAlt?: string;
  imagePosition: 'left' | 'right';
  aspectRatio?: ImageAspectRatio;
}

export default function ImageTextSplit({
  eyebrow,
  heading,
  lead,
  body,
  imageSrc,
  imageAlt,
  imagePosition,
  aspectRatio = DEFAULT_IMAGE_ASPECT_RATIO,
}: ImageTextSplitProps) {
  const aspectClassName =
    IMAGE_ASPECT_RATIO_OPTIONS.find((option) => option.value === aspectRatio)
      ?.imageClassName ?? 'aspect-6/4';
  return (
    <div
      className={`flex flex-col gap-10 lg:justify-between lg:gap-16 ${
        imagePosition === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}
    >
      <div className="lg:w-[45%] lg:shrink-0">
        <div className="mb-4">
          {eyebrow ? (
            <p className="text-small text-black mb-4 font-bold lg:mb-8">{eyebrow}</p>
          ) : null}
          <h2 className="text-h4 lg:text-h2 text-black mb-5 whitespace-pre-line">
            {heading}
          </h2>
          {lead ? (
            <p className="text-body text-gray-600 whitespace-pre-line">{lead}</p>
          ) : null}
        </div>
        <p className="text-[1rem] leading-7 whitespace-pre-line text-gray-750">
          {body}
        </p>
      </div>

      <div
        className={`relative ${aspectClassName} w-full overflow-hidden bg-gray-100 lg:w-150`}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? ''}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>
    </div>
  );
}
