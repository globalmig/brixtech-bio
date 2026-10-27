/**
 * business_pages.category 값입니다. 과거에는 5종으로 고정된 유니언 타입이었지만,
 * 관리자가 /admin/business에서 카테고리를 자유롭게 추가/삭제할 수 있게 되면서
 * 더 이상 코드에서 전체 목록을 알 수 없습니다. 실제 등록된 카테고리 목록은
 * lib/business.ts의 getAllBusinessCategories/getOrderedBusinessCategories로
 * DB에서 조회하세요.
 */
export type BusinessCategory = string;

export type BusinessSectionBackground =
  | 'none'
  | 'primary-2'
  | '#f5f5f5'
  | '#F4F1E9'
  | '#F6F9EF';

export const BUSINESS_SECTION_BACKGROUNDS: {
  value: BusinessSectionBackground;
  label: string;
}[] = [
  { value: 'none', label: '없음 (기본 배경)' },
  { value: 'primary-2', label: '프라이머리 (진한 그린, 텍스트 자동 흰색)' },
  { value: '#f5f5f5', label: '라이트 그레이 (#f5f5f5)' },
  { value: '#F4F1E9', label: '베이지 (#F4F1E9)' },
  { value: '#F6F9EF', label: '라이트 그린 (#F6F9EF)' },
];

export type BusinessBlockType =
  | 'paragraph'
  | 'bulletList'
  | 'roadmapGrid'
  | 'infoTable'
  | 'customerReviews'
  | 'heroBanner'
  | 'imageText'
  | 'featureGrid'
  | 'beforeAfter'
  | 'processSteps';

export interface ParagraphContent {
  text: string;
}

export interface BulletListContent {
  items: string[];
}

export interface RoadmapGridItem {
  year: string;
  yearLabel?: string;
  description: string[];
}

export interface RoadmapGridContent {
  items: RoadmapGridItem[];
}

export interface InfoTableRow {
  label: string;
  value: string;
}

export interface InfoTableContent {
  rows: InfoTableRow[];
  showDisclaimer?: boolean;
}

export interface CustomerReview {
  quote: string;
  context?: string;
  /** 갤러리형(display: 'gallery')일 때 카드 위에 노출되는 사진 */
  image?: string;
}

/** 'text'는 인용문 카드 목록, 'gallery'는 사진이 있는 카드 그리드로 보여줍니다. 기본값은 'text'. */
export type CustomerReviewsDisplay = 'text' | 'gallery';

export interface CustomerReviewsContent {
  reviews: CustomerReview[];
  display?: CustomerReviewsDisplay;
}

export interface HeroBannerContent {
  imageAlt?: string;
}

export interface ImageTextContent {
  body: string;
  imagePosition: 'left' | 'right';
}

export interface FeatureGridItem {
  title: string;
  label: string;
  description: string;
}

export interface FeatureGridContent {
  items: FeatureGridItem[];
}

export interface BeforeAfterItem {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export interface BeforeAfterContent {
  /** 최소 2개 이상의 변화 사례를 담습니다. */
  items: BeforeAfterItem[];
}

export interface ProcessStep {
  image: string;
  label: string;
  description: string;
}

export interface ProcessStepsContent {
  steps: ProcessStep[];
}

export type BusinessSectionContent =
  | { type: 'paragraph'; data: ParagraphContent }
  | { type: 'bulletList'; data: BulletListContent }
  | { type: 'roadmapGrid'; data: RoadmapGridContent }
  | { type: 'infoTable'; data: InfoTableContent }
  | { type: 'customerReviews'; data: CustomerReviewsContent }
  | { type: 'heroBanner'; data: HeroBannerContent }
  | { type: 'imageText'; data: ImageTextContent }
  | { type: 'featureGrid'; data: FeatureGridContent }
  | { type: 'beforeAfter'; data: BeforeAfterContent }
  | { type: 'processSteps'; data: ProcessStepsContent };

export interface BusinessSection {
  id: string;
  title: string | null;
  /** 제목 위에 작게 표시되는 영문 라벨 (예: SMART FARM). 비워두면 블록 타입별 기본값으로 대체됩니다. */
  titleEn: string | null;
  image: string | null;
  /** 블록 배경색. null/'none'이면 기본 배경(흰색)을 사용합니다. */
  backgroundColor: BusinessSectionBackground | null;
  /** 블록 내용 아래에 작은 이탤릭체로 표시되는 보조 설명 (시각자료 안내 등). 모든 블록 타입에 공통 적용됩니다. */
  note: string | null;
  /** 제목 아래에 표시되는 리드 문구. 비워두면 블록 타입별 기본값으로 대체됩니다. */
  lead: string | null;
  /** true면 공개 페이지에서 숨겨집니다(관리자 화면에서는 계속 보이고 편집 가능). */
  hidden: boolean;
  sortOrder: number;
  content: BusinessSectionContent;
}

export interface BusinessPage {
  id: string;
  category: BusinessCategory;
  title: string;
  /** 제목 위에 작게 표시되는 영문 라벨 (예: PET FOOD). 비워두면 기본값(BUSINESS)이 표시됩니다. */
  titleEn: string | null;
  lead: string;
  /** false면 실제 사이트에서 숨겨집니다(관리자 화면에서는 계속 보이고 편집 가능). */
  isActive: boolean;
  /** 관리자 목록과 헤더 BUSINESS 하위 메뉴에서의 노출 순서 (오름차순) */
  sortOrder: number;
  sections: BusinessSection[];
}
