import { notFound } from 'next/navigation';

import ProductForm from '@/components/domain/admin/ProductForm';
import { getBrandById } from '@/lib/brands';
import { getProductById } from '@/lib/products';

interface EditProductPageProps {
  params: Promise<{ id: string; productId: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id, productId } = await params;
  const [brand, product] = await Promise.all([
    getBrandById(id),
    getProductById(productId),
  ]);

  if (!brand || !product) notFound();

  return (
    <div className="mx-auto w-full max-w-360">
      <h1 className="text-h3 mb-6">{brand.name} - 제품 수정</h1>
      <div className="rounded-2xl border border-gray-350 bg-white p-6">
        <ProductForm
          initialProduct={product}
          brandId={id}
          productId={productId}
          submitLabel="수정"
        />
      </div>
    </div>
  );
}
