import VideoForm from '@/components/domain/admin/VideoForm';

export default function NewVideoPage() {
  return (
    <div className="mx-auto w-full max-w-360">
      <h1 className="text-h3 mb-6">새 영상 등록</h1>
      <div className="rounded-2xl border border-gray-350 bg-white p-6">
        <VideoForm submitLabel="등록" />
      </div>
    </div>
  );
}
