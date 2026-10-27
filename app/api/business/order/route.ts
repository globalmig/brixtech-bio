import { NextResponse } from 'next/server';

import { getOrderedBusinessCategories } from '@/lib/business';

/**
 * 헤더의 BUSINESS 하위 메뉴가 관리자에서 드래그로 정한 카테고리 순서를 그대로
 * 따라가도록, 클라이언트 컴포넌트인 Header에서 불러오는 공개 전용 엔드포인트입니다.
 * 순서를 바꾸면 바로 반영되어야 하므로 라우트 캐시를 쓰지 않습니다.
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  const categories = await getOrderedBusinessCategories();
  return NextResponse.json({ categories });
}
