import Link from 'next/link';

import { AdminButton as Button } from '@/components/domain/admin/AdminButton';
import AdminVideoList from '@/components/domain/admin/AdminVideoList';
import { getVideoList } from '@/lib/videos';

export default async function AdminVideosListPage() {
  const videoList = await getVideoList();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-h3">영상 콘텐츠 관리</h1>
        <Button render={<Link href="/admin/videos/new" />} size="medium">
          새 영상 등록
        </Button>
      </div>

      <AdminVideoList videoList={videoList} />
    </div>
  );
}
