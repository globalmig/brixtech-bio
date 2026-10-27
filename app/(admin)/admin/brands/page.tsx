import Link from 'next/link';

import { getBrands } from '@/lib/brands';

import { AdminButton as Button } from '@/components/domain/admin/AdminButton';
import AdminBrandList from '@/components/domain/admin/AdminBrandList';

export default async function AdminBrandsListPage() {
  const brands = await getBrands();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-h3">브랜드 관리</h1>
        <Button render={<Link href="/admin/brands/new" />} size="medium">
          새 브랜드 등록
        </Button>
      </div>

      <AdminBrandList brands={brands} />
    </div>
  );
}
