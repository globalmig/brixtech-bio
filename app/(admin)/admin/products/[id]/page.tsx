import { notFound } from 'next/navigation';

import { getBrandById } from '@/lib/brands';
import { getProductById } from '@/lib/products';

import AdminProductDetail from '@/components/domain/admin/AdminProductDetail';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const brand = await getBrandById(product.brandId);
  if (!brand) notFound();

  return <AdminProductDetail brand={brand} product={product} />;
}
