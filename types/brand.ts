export interface Brand {
  /** DB 기준 불변 식별자. 관리자 페이지에서 브랜드를 참조/수정할 때 이 값을 사용합니다. */
  id: string;
  /** 공개 페이지 URL(/brand/[slug])에 쓰이는 값. 관리자 페이지에서 수정 가능합니다. */
  slug: string;
  name: string;
  /** 브랜드 상세 히어로의 eyebrow (예: PET FOOD) */
  category: string;
  /** 브랜드 개요 페이지의 카테고리 필터와 매칭되는 비즈니스 카테고리 (예: 반려동물 푸드) */
  businessCategory: string;
  /** 히어로 배경용 어두운 톤 로고 */
  logo: string;
  /** 브랜드 소개 쇼케이스 카드 오버레이용 흰색 로고 */
  logoWhite: string;
  /** 브랜드 소개 쇼케이스 카드 배경 이미지 */
  bgImage: string;
  /** 브랜드 상세 히어로에 한 줄로 표시되는 태그라인 */
  tagline: string;
  /** 브랜드 소개 쇼케이스 카드에 표시되는 태그라인(줄바꿈 포함 가능) */
  cardDescription: string;
  /** 실제 제품 외에 추가로 보여줄 "Coming Soon" 자리 수 */
  comingSoonCount?: number;
}
