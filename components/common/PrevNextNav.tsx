import Link from 'next/link';

interface PrevNextNavProps {
  prevHref?: string;
  prevTitle?: string;
  nextHref?: string;
  nextTitle?: string;
  className?: string;
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path
        d="M10 4L6 8L10 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PrevNextNav({
  prevHref,
  prevTitle,
  nextHref,
  nextTitle,
  className = '',
}: PrevNextNavProps) {
  return (
    <div
      className={`grid grid-cols-1 overflow-hidden rounded-[20px] border border-gray-350 lg:grid-cols-2 ${className}`}
    >
      <div className="border-b border-dashed border-gray-350 px-6 py-6 lg:border-r lg:border-b-0 lg:px-10">
        {prevHref ? (
          <Link href={prevHref} className="group block">
            <div className="text-primary inline-flex items-center gap-1 font-semibold">
              <ChevronLeftIcon />
              <span className="text-black">이전 글</span>
            </div>
            <p className="mt-2 truncate text-gray-750">{prevTitle}</p>
          </Link>
        ) : (
          <div>
            <div className="text-primary inline-flex items-center gap-1 font-semibold">
              <ChevronLeftIcon />
              <span className="text-black">이전 글</span>
            </div>
            <p className="mt-2 text-gray-750">이전 글이 없습니다.</p>
          </div>
        )}
      </div>

      <div className="px-6 py-6 text-left lg:px-10 lg:text-right">
        {nextHref ? (
          <Link href={nextHref} className="group block">
            <div className="text-primary inline-flex items-center gap-1 font-semibold">
              <span className="text-black">다음 글</span>
              <ChevronRightIcon />
            </div>
            <p className="mt-2 truncate text-gray-750">{nextTitle}</p>
          </Link>
        ) : (
          <div>
            <div className="text-primary inline-flex items-center gap-1 font-semibold">
              <span className="text-black">다음 글</span>
              <ChevronRightIcon />
            </div>
            <p className="mt-2 text-gray-750">다음 글이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
