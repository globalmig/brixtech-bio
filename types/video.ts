export type VideoCategory = 'company' | 'product';

/** 공개/관리자 페이지에서 공통으로 사용하는 영상 분류 옵션. */
export const VIDEO_CATEGORIES: { value: VideoCategory; label: string }[] = [
  { value: 'company', label: '기업 소개' },
  { value: 'product', label: '제품 소개' },
];

export function getVideoCategoryLabel(category: string): string {
  return (
    VIDEO_CATEGORIES.find((option) => option.value === category)?.label ?? category
  );
}

/** DB(videos 테이블) 원본 row. 관리자 페이지에서 영상을 참조/수정할 때 이 타입을 사용합니다. */
export interface Video {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  thumbnail: string | null;
  category: VideoCategory;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

/** 공개 목록(갤러리/리스트)·상세 UI용 뷰모델. Video(원본 데이터)를 화면에 맞게 가공한 결과입니다. */
export interface VideoItem {
  id: string;
  title: string;
  content?: string;
  date: string;
  thumbnail?: string | null;
  videoUrl: string;
  category: VideoCategory;
}

export function toVideoItem(video: Video): VideoItem {
  return {
    id: video.id,
    title: video.title,
    content: video.description ?? undefined,
    date: video.publishedAt,
    thumbnail: video.thumbnail,
    videoUrl: video.videoUrl,
    category: video.category,
  };
}
