import VideoShowcaseCard from '@/components/domain/video/VideoShowcaseCard';
import type { VideoItem } from '@/types/video';

interface VideoGalleryProps {
  items: VideoItem[];
}

export default function VideoGallery({ items }: VideoGalleryProps) {
  if (items.length === 0) {
    return (
      <div className="px-[4%] py-20 lg:px-6 lg:py-28 text-center">
        등록된 영상이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 px-[4%] lg:grid-cols-3 lg:px-6">
      {items.map((item) => (
        <VideoShowcaseCard
          key={item.id}
          href={`/about/video/${item.id}`}
          thumbnail={item.thumbnail}
          title={item.title}
          date={item.date}
          content={item.content}
        />
      ))}
    </div>
  );
}
