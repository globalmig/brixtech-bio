import Link from 'next/link';
import { notFound } from 'next/navigation';

import VideoForm from '@/components/domain/admin/VideoForm';
import { getVideoById } from '@/lib/videos';

interface EditVideoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditVideoPage({ params }: EditVideoPageProps) {
  const { id } = await params;
  const video = await getVideoById(id);

  if (!video) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-360">
      <Link href="/admin/videos" className="hover:underline">
        ← 영상 콘텐츠 목록으로 이동
      </Link>
      <h1 className="text-h3 mt-6 mb-6">영상 수정</h1>
      <div className="rounded-2xl border border-gray-350 bg-white p-6">
        <VideoForm initialVideo={video} videoId={id} submitLabel="수정" />
      </div>
    </div>
  );
}
