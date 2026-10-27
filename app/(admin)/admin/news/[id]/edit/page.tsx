import Link from 'next/link';
import { notFound } from 'next/navigation';

import NewsForm from '@/components/domain/admin/NewsForm';
import { getNewsById } from '@/lib/news';

interface EditNewsPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditNewsPage({ params }: EditNewsPageProps) {
  const { id } = await params;
  const news = await getNewsById(id);

  if (!news) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-360">
      <Link href="/admin/news" className="hover:underline">
        ← 기업 소식 목록으로 이동
      </Link>
      <h1 className="text-h3 mt-6 mb-6">소식 수정</h1>
      <div className="rounded-2xl border border-gray-350 bg-white p-6">
        <NewsForm initialNews={news} newsId={id} submitLabel="수정" />
      </div>
    </div>
  );
}
