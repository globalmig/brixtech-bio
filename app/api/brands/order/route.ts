import { NextResponse } from 'next/server';

import { getBrands } from '@/lib/brands';

/**
 * 헤더의 BRAND 하위 메뉴가 관리자에서 추가/삭제/순서 변경한 브랜드 목록을
 * 그대로 따라가도록, 클라이언트 컴포넌트인 Header에서 불러오는 공개 전용
 * 엔드포인트입니다. 변경사항이 바로 반영되어야 하므로 라우트 캐시를 쓰지 않습니다.
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  const brands = await getBrands();
  return NextResponse.json({
    brands: brands.map((brand) => ({ slug: brand.slug, name: brand.name })),
  });
}
