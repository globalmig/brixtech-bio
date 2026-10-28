import type { ReactNode } from 'react';

interface HeroBannerProps {
  eyebrow: string;
  title: string;
  description?: string;
  imageAlt: string;
  imageSrc: string;
  overlay?: boolean;
  children?: ReactNode;
}

export default function HeroBanner({
  eyebrow,
  title,
  description,
  imageAlt,
  imageSrc,
  overlay = true,
  children,
}: HeroBannerProps) {
  return (
    <div className="relative flex min-h-96 w-full flex-col items-center justify-center overflow-hidden bg-gray-200 py-16 text-center lg:min-h-130 lg:py-24">
      {imageSrc ? (
        <div
          role="img"
          aria-label={imageAlt}
          className="absolute inset-0 bg-cover bg-center bg-scroll lg:bg-fixed"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      ) : null}
      {overlay ? <div className="absolute inset-0 bg-black/35" aria-hidden /> : null}

      <div className="relative z-10 w-full px-5">
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
        {children ? (
          <div className="mx-auto mt-12 w-full max-w-360 text-left lg:mt-16">{children}</div>
        ) : null}
      </div>
    </div>
  );
}
