import Link from 'next/link';

import type { VideoItem } from '@/types/video';

export type { VideoItem };

interface VideoListProps {
  items: VideoItem[];
  /** 현재 페이지 첫 항목에 매길 번호(내림차순). 검색/페이지네이션은 VideoBrowser가 관리합니다. */
  startNumber: number;
}

/** 리스트형 "모양"만 담당하는 컴포넌트. 검색/필터/페이지네이션 상태는 상위(VideoBrowser)가 공통으로 관리합니다. */
export default function VideoList({ items, startNumber }: VideoListProps) {
  return (
    <div className="border-text-default border-t-2">
      <div className="text-text-default text-[1.2rem] grid grid-cols-[3.5rem_1fr_6rem] items-center border-b border-gray-300 py-8 text-center font-semibold sm:grid-cols-[5rem_1fr_9rem]">
        <span>No</span>
        <span>제목</span>
        <span>날짜</span>
      </div>

      {items.length === 0 ? (
        <p className="text-text-sub py-16 text-center text-[0.95rem]">등록된 영상이 없습니다.</p>
      ) : (
        items.map((item, index) => (
          <Link
            key={item.id}
            href={`/about/video/${item.id}`}
            className="grid grid-cols-[3.5rem_1fr_6rem] items-center border-b border-gray-200 py-7.5 text-base transition-colors hover:bg-gray-50 sm:grid-cols-[5rem_1fr_9rem]"
          >
            <span className="text-primary text-center font-medium">{startNumber - index}</span>
            <span className="text-text-default text-[1.2rem] truncate px-2">{item.title}</span>
            <span className="text-text-info text-center">{item.date}</span>
          </Link>
        ))
      )}
    </div>
  );
}
