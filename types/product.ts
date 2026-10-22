export interface BrandProductSpec {
  label: string;
  value: string;
  /** true면 강조 색상(text-primary-4)으로 표시합니다. */
  accent?: boolean;
}

export interface BrandProductNutrient {
  label: string;
  value: string;
}

export interface BrandProduct {
  /** DB 기준 불변 식별자. 관리자 페이지에서 제품을 참조/수정할 때 이 값을 사용합니다. */
  id: string;
  /** 소속 브랜드의 Brand['id']. */
  brandId: string;
  /** 공개 페이지 URL(/brand/[brand]/[slug])에 쓰이는 값. 관리자 페이지에서 수정 가능합니다. */
  slug: string;
  name: string;
  description: string;
  image: string;
  specs: BrandProductSpec[];
  features: string[];
  ingredients: string;
  /** 한 행에 좌/우로 나란히 표시할 성분 2개씩 묶어서 전달합니다. 홀수개면 마지막 행의 두 번째 칸은 null. */
  nutrients: [BrandProductNutrient, BrandProductNutrient | null][];
}

export type ProductStatus = 'active' | 'coming-soon';

/** 제품 카드 UI용 뷰모델. BrandProduct(원본 데이터)를 화면에 맞게 가공한 결과입니다. */
export interface ProductItem {
  id: string;
  status: ProductStatus;
  image?: string;
  brand?: string;
  name?: string;
  description?: string;
  href?: string;
}
