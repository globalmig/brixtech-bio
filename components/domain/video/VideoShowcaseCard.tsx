import Image from 'next/image';
import Link from 'next/link';

interface VideoShowcaseCardProps {
  href: string;
  thumbnail?: string | null;
  title: string;
  date: string;
  content?: string;
}

export default function VideoShowcaseCard({
  href,
  thumbnail,
  title,
  date,
  content,
}: VideoShowcaseCardProps) {
  return (
    <Link href={href} className="block w-full">
      <div className="relative aspect-video w-full overflow-hidden border border-gray-750 bg-gray-900">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="mt-4 lg:mt-6">
        <h5 className="text-h5 lg:text-h4">
          {title}
        </h5>
        <p className="mt-1 text-text-sub">{date}</p>
        {content ? (
          <p className="mt-3 line-clamp-2 text-gray-750 lg:mt-5">
            {content}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
