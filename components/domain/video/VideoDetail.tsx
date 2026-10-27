import { PrevNextNav } from '@/components/common/PrevNextNav';
import type { VideoItem } from '@/types/video';

interface VideoDetailProps {
  item: VideoItem;
  prevItem?: VideoItem;
  nextItem?: VideoItem;
}

export default function VideoDetail({ item, prevItem, nextItem }: VideoDetailProps) {
  return (
    <div>
      <div className="border-b border-gray-350 pb-8">
        <h1 className="text-primary-2 text-h4 lg:text-h3 font-bold">{item.title}</h1>
        <p className="text-primary-4 mt-3">{item.date}</p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl max-w-200 lg:mx-auto lg:mt-15">
        <video
          key={item.id}
          controls
          preload="none"
          poster={item.thumbnail ?? undefined}
          className="aspect-video w-full"
        >
          <source src={item.videoUrl} />
        </video>
      </div>

      {item.content ? (
        <h2 className="min-h-50 py-10 whitespace-pre-line lg:py-15">
          {item.content}
        </h2>
      ) : null}

      <PrevNextNav
        className="mt-10 lg:mt-15"
        prevHref={prevItem ? `/about/video/${prevItem.id}` : undefined}
        prevTitle={prevItem?.title}
        nextHref={nextItem ? `/about/video/${nextItem.id}` : undefined}
        nextTitle={nextItem?.title}
      />
    </div>
  );
}
