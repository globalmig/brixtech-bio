import NewsForm from '@/components/domain/admin/NewsForm';

export default function NewNewsPage() {
  return (
    <div className="mx-auto w-full max-w-360">
      <h1 className="text-h3 mb-6">새 소식 등록</h1>
      <div className="rounded-2xl border border-gray-350 bg-white p-6">
        <NewsForm submitLabel="등록" />
      </div>
    </div>
  );
}
