import Image from 'next/image';
import Link from 'next/link';

interface BrandShowcaseCardProps {
  href: string;
  image: string;
  logo: string;
  logoAlt: string;
  description: string;
}

export default function BrandShowcaseCard({
  href,
  image,
  logo,
  logoAlt,
  description,
}: BrandShowcaseCardProps) {
  return (
    <Link
      href={href}
      className="group relative block aspect-square w-full overflow-hidden border border-gray-750"
    >
      <Image
        src={image}
        alt={logoAlt}
        fill
        sizes="(min-width: 1024px) 34vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="relative flex aspect-459/158 w-40 items-center justify-center lg:w-56">
          {logo ? (
            <Image src={logo} alt={logoAlt} fill sizes="240px" className="object-contain" />
          ) : (
            <span className="text-h4 lg:text-h3 font-bold text-white">{logoAlt}</span>
          )}
        </div>
        <p className="text-small lg:text-[1rem] leading-6 whitespace-pre-line text-white">
          {description}
        </p>
      </div>
    </Link>
  );
}
