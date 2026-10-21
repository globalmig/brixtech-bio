import Image from 'next/image';

interface HeroBannerProps {
  eyebrow: string;
  title: string;
  description?: string;
  imageAlt: string;
}

export default function HeroBanner({ eyebrow, title, description, imageAlt }: HeroBannerProps) {
  return (
    <div className="relative flex h-96 w-full items-center justify-center overflow-hidden bg-gray-200 text-center lg:h-128">
      <Image src="/#" alt={imageAlt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/45" aria-hidden />

      <div className="relative z-10 px-5">
        <p className="text-small mb-4 font-bold tracking-[0.2em] text-white/80 uppercase">
          {eyebrow}
        </p>
        <h2 className="text-h4 lg:text-h2 mb-5 font-bold whitespace-pre-line text-white">
          {title}
        </h2>
        {description ? (
          <p className="text-body mx-auto max-w-xl whitespace-pre-line text-white/85">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
