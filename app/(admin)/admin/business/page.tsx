import { getAllBusinessPages } from '@/lib/business';

import AdminBusinessList from '@/components/domain/admin/business/AdminBusinessList';

export default async function AdminBusinessListPage() {
  const pages = await getAllBusinessPages();

  const items = pages
    .map((page) => ({ slug: page.category, label: page.title, page }))
    .sort((a, b) => a.page.sortOrder - b.page.sortOrder);

  return (
    <div>
      <h1 className="text-h3">BUSINESS 페이지 관리</h1>
      <p className="text-text-info mb-6 mt-1 text-sm">
        BUSINESS 메뉴에 노출되는 사업 페이지 목록입니다. 드래그하여 노출 순서를 변경할 수 있습니다.
      </p>
      <AdminBusinessList items={items} />
    </div>
  );
}
