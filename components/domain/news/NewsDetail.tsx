import Link from 'next/link';

import type { NewsItem } from '@/constants/news';

interface NewsDetailProps {
  item: NewsItem;
  prevItem?: NewsItem;
  nextItem?: NewsItem;
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

export default function NewsDetail({ item, prevItem, nextItem }: NewsDetailProps) {
  return (
    <div>
      <div className="border-b border-gray-350 pb-8">
        <h1 className="text-primary-2 text-h4 lg:text-h3 font-bold">{item.title}</h1>
        <p className="text-primary-4 mt-3">{item.date}</p>
      </div>

      <h2 className="min-h-50 py-10 whitespace-pre-line lg:py-15">
        {item.content}
      </h2>

      <div className="mt-10 grid grid-cols-2 overflow-hidden rounded-[20px] border border-gray-350 lg:mt-15">
        <div className="border-r border-dashed border-gray-350 px-6 py-6 lg:px-10">
          {prevItem ? (
            <Link href={`/news/${prevItem.id}`} className="group block">
              <div className="text-primary inline-flex items-center gap-1 font-semibold">
                <ChevronLeftIcon />
                <span className='text-black'>이전 글</span>
              </div>
              <p className="mt-2 truncate text-gray-750">
                {prevItem.title}
              </p>
            </Link>
          ) : (
            <div>
              <div className="text-primary inline-flex items-center gap-1 font-semibold">
                <ChevronLeftIcon/>
                <span className='text-black'>이전 글</span>
              </div>
              <p className="mt-2 text-gray-750">이전 글이 없습니다.</p>
            </div>
          )}
        </div>

        <div className="px-6 py-6 text-right lg:px-10">
          {nextItem ? (
            <Link href={`/news/${nextItem.id}`} className="group block">
              <div className="text-primary inline-flex items-center gap-1 font-semibold">
                <span className='text-black'>다음 글</span>
                <ChevronRightIcon />
              </div>
              <p className="mt-2 truncate text-gray-750">
                {nextItem.title}
              </p>
            </Link>
          ) : (
            <div>
              <div className="text-primary inline-flex items-center gap-1 font-semibold">
                <span className='text-black'>다음 글</span>
                <ChevronRightIcon />
              </div>
              <p className="mt-2 text-gray-750">다음 글이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
