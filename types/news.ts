/** DB(news 테이블) 원본 row. 관리자 페이지에서 소식을 참조/수정할 때 이 타입을 사용합니다. */
export interface News {
  id: string;
  title: string;
  /** Quill 에디터가 생성하는 HTML 문자열입니다. */
  content: string;
  createdAt: string;
  updatedAt: string;
}

/** 공개 목록/상세 UI용 뷰모델. News(원본 데이터)를 화면에 맞게 가공한 결과입니다. */
export interface NewsItem {
  id: string;
  title: string;
  content?: string;
  /** 등록일(createdAt)을 그대로 표시합니다. 별도로 게시일을 입력받지 않습니다. */
  date: string;
}

export function toNewsItem(news: News): NewsItem {
  return {
    id: news.id,
    title: news.title,
    content: news.content,
    date: news.createdAt.slice(0, 10),
  };
}
