import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getBrandById } from '@/lib/brands';
import { getProductsByBrand } from '@/lib/products';

import { AdminButton as Button } from '@/components/domain/admin/shared/AdminButton';
import AdminProductList from '@/components/domain/admin/brands/AdminProductList';

interface BrandProductsPageProps {
  params: Promise<{ id: string }>;
}

export default async function BrandProductsPage({
  params,
}: BrandProductsPageProps) {
  const { id } = await params;
  const brand = await getBrandById(id);

  if (!brand) notFound();

  const products = await getProductsByBrand(id);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin/brands"
            className="text-text-info hover:text-gray-900"
          >
            ← 브랜드 목록으로 이동
          </Link>
          <h1 className="text-h3 mt-6">{brand.name} 제품 관리</h1>
        </div>
        <Button
          render={<Link href={`/admin/brands/${id}/products/new`} />}
          size="medium"
        >
          새 제품 등록
        </Button>
      </div>

      <AdminProductList
        brandId={id}
        brandSlug={brand.slug}
        products={products}
      />
    </div>
  );
}
