import BrandForm from '@/components/domain/admin/brands/BrandForm';
import { getBusinessCategoryOptions } from '@/lib/business';

export default async function NewBrandPage() {
  const categories = await getBusinessCategoryOptions();

  return (
    <div className="mx-auto w-full max-w-360">
      <h1 className="text-h3 mb-6">새 브랜드 등록</h1>
      <div className="rounded-2xl border border-gray-350 bg-white p-6">
        <BrandForm submitLabel="등록" categories={categories} />
      </div>
    </div>
  );
}
