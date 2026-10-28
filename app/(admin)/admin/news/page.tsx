import Link from 'next/link';

import { AdminButton as Button } from '@/components/domain/admin/shared/AdminButton';
import AdminNewsList from '@/components/domain/admin/news/AdminNewsList';
import { getNewsList } from '@/lib/news';

export default async function AdminNewsListPage() {
  const newsList = await getNewsList();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-h3">기업 소식 관리</h1>
        <Button render={<Link href="/admin/news/new" />} size="medium">
          새 소식 등록
        </Button>
      </div>

      <AdminNewsList newsList={newsList} />
    </div>
  );
}
