'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import {
  videoFormFieldsSchema,
  videoPayloadSchema,
  type VideoFormFields,
} from '@/lib/admin/schemas/video';
import { VIDEO_CATEGORIES, type Video } from '@/types/video';

import { AdminButton as Button } from '@/components/domain/admin/shared/AdminButton';
import AdminMessageDialog from '@/components/domain/admin/shared/AdminMessageDialog';
import VideoUploadField from '@/components/domain/admin/shared/VideoUploadField';

interface VideoFormProps {
  initialVideo?: Video;
  /** 수정 대상 영상 id. 없으면 새 영상 등록으로 동작합니다. */
  videoId?: string;
  submitLabel: string;
}

export default function VideoForm({
  initialVideo,
  videoId,
  submitLabel,
}: VideoFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VideoFormFields>({
    resolver: zodResolver(videoFormFieldsSchema),
    defaultValues: {
      title: initialVideo?.title ?? '',
      description: initialVideo?.description ?? '',
      category: initialVideo?.category ?? VIDEO_CATEGORIES[0].value,
      publishedAt:
        initialVideo?.publishedAt ?? new Date().toISOString().slice(0, 10),
    },
  });

  const onSubmit = handleSubmit(async (values, event) => {
    setSubmitError('');

    const formElement = event?.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const videoUrl = String(formData.get('videoUrl') ?? '').trim();
    const thumbnail = String(formData.get('thumbnail') ?? '').trim();

    const parsed = videoPayloadSchema.safeParse({
      ...values,
      videoUrl,
      thumbnail,
    });
    if (!parsed.success) {
      setSubmitError(parsed.error.issues[0]?.message ?? '입력값을 확인해주세요.');
      return;
    }

    const response = await fetch(
      videoId ? `/api/admin/videos/${videoId}` : '/api/admin/videos',
      {
        method: videoId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      }
    );
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setSubmitError(data.error ?? '저장에 실패했습니다.');
      return;
    }

    setSuccessMessage(videoId ? '수정 완료되었습니다.' : '등록되었습니다.');
  });

  const handleSuccessClose = () => {
    setSuccessMessage(null);
    router.push('/admin/videos');
    router.refresh();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-2xl flex-col [&>*+*]:mt-5"
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
        <label className="text-small mb-2 block font-semibold">분류</label>
        <select
          {...register('category')}
          className="h-11 w-full rounded-lg border border-gray-350 px-3"
        >
          {VIDEO_CATEGORIES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-small mb-2 block font-semibold">게시일</label>
        <Input type="date" {...register('publishedAt')} />
      </div>

      <VideoUploadField
        label="영상"
        name="videoUrl"
        thumbnailName="thumbnail"
        folder="videos"
        defaultValue={initialVideo?.videoUrl}
        defaultThumbnail={initialVideo?.thumbnail}
      />

      <div>
        <label className="text-small mb-2 block font-semibold">설명</label>
        <Textarea
          {...register('description')}
          placeholder="영상 설명을 입력하세요"
          rows={10}
          className="min-h-60"
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
