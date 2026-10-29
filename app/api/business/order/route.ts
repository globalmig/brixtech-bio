import { NextResponse } from 'next/server';

import { getOrderedBusinessCategories } from '@/lib/business';

/**
 * 헤더의 BUSINESS 하위 메뉴가 관리자에서 추가/삭제/순서 변경한 사업 카테고리
 * 목록을 그대로 따라가도록, 클라이언트 컴포넌트인 Header에서 불러오는 공개
 * 전용 엔드포인트입니다. 변경사항이 바로 반영되어야 하므로 라우트 캐시를 쓰지 않습니다.
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  const categories = await getOrderedBusinessCategories();
  return NextResponse.json({
    categories: categories.map((category) => ({
      slug: category.slug,
      label: category.label,
    })),
  });
}
