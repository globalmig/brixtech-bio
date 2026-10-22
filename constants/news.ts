export interface NewsItem {
  id: number;
  title: string;
  content?: string;
  date: string;
}

export const NEWS_ITEMS: NewsItem[] = Array.from({ length: 35 }, (_, index) => {
  const id = 35 - index;
  return {
    id,
    title: '기업 소식 제목입니다.',
    content: '기업 소식 컨텐츠입니다.',
    date: '2026.00.00',
  };
});
