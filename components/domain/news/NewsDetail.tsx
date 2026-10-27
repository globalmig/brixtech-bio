import { PrevNextNav } from '@/components/common/PrevNextNav';
import type { NewsItem } from '@/types/news';

interface NewsDetailProps {
  item: NewsItem;
  prevItem?: NewsItem;
  nextItem?: NewsItem;
}

export default function NewsDetail({ item, prevItem, nextItem }: NewsDetailProps) {
  return (
    <div>
      <div className="border-b border-gray-350 pb-8">
        <h1 className="text-primary-2 text-h4 lg:text-h3 font-bold">{item.title}</h1>
        <p className="text-primary-4 mt-3">{item.date}</p>
      </div>

      <div
        className="min-h-50 py-10 leading-7 lg:py-15 [&_a]:text-primary [&_a]:underline [&_h2]:text-h5 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:font-bold [&_h3]:text-h6 [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-bold [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: item.content ?? '' }}
      />

      <PrevNextNav
        className="mt-10 lg:mt-15"
        prevHref={prevItem ? `/news/${prevItem.id}` : undefined}
        prevTitle={prevItem?.title}
        nextHref={nextItem ? `/news/${nextItem.id}` : undefined}
        nextTitle={nextItem?.title}
      />
    </div>
  );
}
