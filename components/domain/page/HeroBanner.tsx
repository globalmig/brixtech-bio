import Image from 'next/image';

interface HeroBannerProps {
  eyebrow: string;
  title: string;
  description?: string;
  imageAlt: string;
  imageSrc: string;
}

export default function HeroBanner({ eyebrow, title, description, imageAlt, imageSrc }: HeroBannerProps) {
  return (
    <div className="relative flex h-96 w-full items-center justify-center overflow-hidden bg-gray-200 text-center lg:h-130">
      {imageSrc ? (
        <Image src={imageSrc} alt={imageAlt} fill sizes="100vw" className="object-cover" />
      ) : null}
      <div className="absolute inset-0 bg-black/35" aria-hidden />

      <div className="relative z-10 px-5">
        <p className="text-small mb-4 font-bold text-white uppercase">
          {eyebrow}
        </p>
        <h2 className="text-h4 lg:text-h1 mb-5 font-bold whitespace-pre-line text-white">
          {title}
        </h2>
        {description ? (
          <p className="text-body mx-auto max-w-180 text-white">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
