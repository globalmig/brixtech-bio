import Link from 'next/link';

import { getBrands } from '@/lib/brands';

import { AdminButton as Button } from '@/components/domain/admin/shared/AdminButton';
import AdminBrandList from '@/components/domain/admin/brands/AdminBrandList';

export default async function AdminBrandsListPage() {
  const brands = await getBrands();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-h3">브랜드 관리</h1>
          <p className="text-text-info mt-1 text-sm">
            등록된 브랜드 목록을 확인하고, 드래그하여 노출 순서를 변경할 수 있습니다.
          </p>
        </div>
        <Button render={<Link href="/admin/brands/new" />} size="medium">
          새 브랜드 등록
        </Button>
      </div>

      <AdminBrandList brands={brands} />
    </div>
  );
}
