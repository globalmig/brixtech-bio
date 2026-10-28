'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/common/Input';
import { newsPayloadSchema } from '@/lib/admin/schemas/news';
import type { News } from '@/types/news';

import { AdminButton as Button } from '@/components/domain/admin/shared/AdminButton';
import AdminMessageDialog from '@/components/domain/admin/shared/AdminMessageDialog';

const RichTextEditor = dynamic(
  () => import('@/components/domain/admin/shared/RichTextEditor'),
  { ssr: false }
);

interface TitleFields {
  title: string;
}

const titleFieldsSchema = newsPayloadSchema.pick({ title: true });

interface NewsFormProps {
  initialNews?: News;
  /** 수정 대상 소식 id. 없으면 새 소식 등록으로 동작합니다. */
  newsId?: string;
  submitLabel: string;
}

export default function NewsForm({
  initialNews,
  newsId,
  submitLabel,
}: NewsFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TitleFields>({
    resolver: zodResolver(titleFieldsSchema),
    defaultValues: { title: initialNews?.title ?? '' },
  });

  const handleFormSubmit = handleSubmit(async ({ title }, event) => {
    setSubmitError('');

    const formElement = event?.target as HTMLFormElement;
    const content = String(
      new FormData(formElement).get('content') ?? ''
    ).trim();

    const parsed = newsPayloadSchema.safeParse({ title, content });
    if (!parsed.success) {
      setSubmitError(parsed.error.issues[0]?.message ?? '입력값을 확인해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        newsId ? `/api/admin/news/${newsId}` : '/api/admin/news',
        {
          method: newsId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed.data),
        }
      );
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitError(data.error ?? '저장에 실패했습니다.');
        return;
      }

      setSuccessMessage(newsId ? '수정 완료되었습니다.' : '등록되었습니다.');
    } finally {
      setIsSubmitting(false);
    }
  });

  const handleSuccessClose = () => {
    setSuccessMessage(null);
    router.push('/admin/news');
    router.refresh();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto flex w-full max-w-3xl flex-col [&>*+*]:mt-5"
    >
      <div>
        <label className="text-small mb-2 block font-semibold">제목</label>
        <Input
          {...register('title')}
          placeholder="제목을 입력하세요"
          state={errors.title ? 'error' : 'default'}
        />
        {errors.title && (
          <p className="text-small text-system-alert mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-small mb-1 block font-semibold">내용</label>
        <p className="text-small text-text-info mb-2">
          본문에 삽입하는 이미지는 가로 1200px 내외, 2MB 이하로 최적화해서
          올려주세요. 용량이 크면 페이지 로딩이 느려집니다.
        </p>
        <RichTextEditor
          name="content"
          folder="news"
          defaultValue={initialNews?.content}
          placeholder="내용을 입력하세요"
        />
      </div>

      {submitError && <p className="text-system-alert">{submitError}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '저장 중...' : submitLabel}
        </Button>
      </div>

      <AdminMessageDialog
        message={successMessage}
        onClose={handleSuccessClose}
      />
    </form>
  );
}
