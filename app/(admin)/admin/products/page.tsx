import { getAllProductsForAdmin } from '@/lib/products';

import AdminAllProductsList from '@/components/domain/admin/products/AdminAllProductsList';

export default async function AdminProductsListPage() {
  const items = await getAllProductsForAdmin();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-h3">제품 관리</h1>
      </div>

      <AdminAllProductsList items={items} />
    </div>
  );
}
