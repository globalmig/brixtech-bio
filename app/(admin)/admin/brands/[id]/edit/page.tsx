import { notFound } from 'next/navigation';

import BrandForm from '@/components/domain/admin/brands/BrandForm';
import { getBrandById } from '@/lib/brands';
import { getBusinessCategoryOptions } from '@/lib/business';

interface EditBrandPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBrandPage({ params }: EditBrandPageProps) {
  const { id } = await params;
  const [brand, categories] = await Promise.all([
    getBrandById(id),
    getBusinessCategoryOptions(),
  ]);

  if (!brand) notFound();

  return (
    <div className="mx-auto w-full max-w-360">
      <h1 className="text-h3 mb-6">브랜드 수정</h1>
      <div className="rounded-2xl border border-gray-350 bg-white p-6">
        <BrandForm
          initialBrand={brand}
          brandId={id}
          submitLabel="수정"
          categories={categories}
        />
      </div>
    </div>
  );
}
