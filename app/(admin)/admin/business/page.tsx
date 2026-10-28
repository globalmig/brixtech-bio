import { getAllBusinessPages } from '@/lib/business';

import AdminBusinessList from '@/components/domain/admin/business/AdminBusinessList';

export default async function AdminBusinessListPage() {
  const pages = await getAllBusinessPages();

  const items = pages
    .map((page) => ({ slug: page.category, label: page.title, page }))
    .sort((a, b) => a.page.sortOrder - b.page.sortOrder);

  return (
    <div>
      <h1 className="text-h3 mb-6">BUSINESS 페이지 관리</h1>
      <AdminBusinessList items={items} />
    </div>
  );
}
