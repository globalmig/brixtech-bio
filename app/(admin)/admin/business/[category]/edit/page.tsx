import Link from 'next/link';
import { notFound } from 'next/navigation';

import BusinessPageForm from '@/components/domain/admin/BusinessPageForm';
import { getBusinessPage } from '@/lib/business';

interface EditBusinessPageProps {
  params: Promise<{ category: string }>;
}

export default async function EditBusinessPage({
  params,
}: EditBusinessPageProps) {
  const { category } = await params;

  const page = await getBusinessPage(category);
  if (!page) notFound();

  return (
    <div className="mx-auto w-full max-w-360">
      <Link href="/admin/business" className="hover:underline">
        ← 페이지 목록으로 이동
      </Link>
      <h1 className="text-h3 mt-6 mb-6">{page.title} 편집</h1>
      <BusinessPageForm initialPage={page} category={category} />
    </div>
  );
}
