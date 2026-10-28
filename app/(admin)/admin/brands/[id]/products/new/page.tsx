import { notFound } from 'next/navigation';

import ProductForm from '@/components/domain/admin/brands/ProductForm';
import { getBrandById } from '@/lib/brands';

interface NewProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function NewProductPage({
  params,
}: NewProductPageProps) {
  const { id } = await params;
  const brand = await getBrandById(id);

  if (!brand) notFound();

  return (
    <div className="mx-auto w-full max-w-360">
      <h1 className="text-h3 mb-6">{brand.name} - 새 제품 등록</h1>
      <div className="rounded-2xl border border-gray-350 bg-white p-6">
        <ProductForm brandId={id} submitLabel="등록" />
      </div>
    </div>
  );
}
