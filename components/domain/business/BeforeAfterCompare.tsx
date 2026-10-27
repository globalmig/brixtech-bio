import Image from 'next/image';

interface BeforeAfterCompareProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterCompare({
  beforeImage,
  afterImage,
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER',
}: BeforeAfterCompareProps) {
  return (
    <div className="relative grid grid-cols-2 gap-0.5 overflow-hidden bg-gray-100">
      <div className="relative aspect-4/4.5">
        {beforeImage ? (
          <Image
            src={beforeImage}
            alt={beforeLabel}
            fill
            sizes="50vw"
            className="object-cover"
          />
        ) : null}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent"
        />
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:text-h4 font-bold text-white">
          {beforeLabel}
        </p>
      </div>

      <div className="relative aspect-4/4.5">
        {afterImage ? (
          <Image
            src={afterImage}
            alt={afterLabel}
            fill
            sizes="50vw"
            className="object-cover"
          />
        ) : null}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent"
        />
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:text-h4 font-bold text-white">
          {afterLabel}
        </p>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white/50 text-white"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
