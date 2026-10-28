'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { brandFormSchema, type BrandFormValues } from '@/lib/admin/schemas/brand';
import type { Brand } from '@/types/brand';

import { AdminButton as Button } from '@/components/domain/admin/shared/AdminButton';
import AdminMessageDialog from '@/components/domain/admin/shared/AdminMessageDialog';
import ImageUploadField from '@/components/domain/admin/shared/ImageUploadField';

interface BrandFormProps {
  initialBrand?: Brand;
  /** 수정 대상 브랜드 id. 없으면 새 브랜드 등록으로 동작합니다. */
  brandId?: string;
  submitLabel: string;
  /** /admin/business에 등록된 사업 카테고리 목록. 선택 시 카테고리(eyebrow)를 자동으로 채웁니다. */
  categories: { label: string; eyebrow: string }[];
}

export default function BrandForm({
  initialBrand,
  brandId,
  submitLabel,
  categories,
}: BrandFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [images, setImages] = useState({
    logo: initialBrand?.logo ?? '',
    logoWhite: initialBrand?.logoWhite ?? '',
    bgImage: initialBrand?.bgImage ?? '',
    bannerImage: initialBrand?.bannerImage ?? '',
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormValues>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      slug: initialBrand?.slug ?? '',
      name: initialBrand?.name ?? '',
      category: initialBrand?.category ?? '',
      businessCategory: initialBrand?.businessCategory ?? '',
      tagline: initialBrand?.tagline ?? '',
      cardDescription: initialBrand?.cardDescription ?? '',
      comingSoonCount: initialBrand?.comingSoonCount ?? 0,
    },
  });

  const onSubmit = async (values: BrandFormValues) => {
    setSubmitError('');

    const response = await fetch(
      brandId ? `/api/admin/brands/${brandId}` : '/api/admin/brands',
      {
        method: brandId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, ...images }),
      }
    );
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setSubmitError(data.error ?? '저장에 실패했습니다.');
      return;
    }

    setSuccessMessage(brandId ? '수정 완료되었습니다.' : '등록되었습니다.');
  };

  const handleSuccessClose = () => {
    setSuccessMessage(null);
    router.push('/admin/brands');
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full max-w-2xl flex-col [&>*+*]:mt-5"
    >
      <div>
        <label className="text-small mb-2 block font-semibold">
          브랜드명
        </label>
        <Input
          {...register('name')}
          placeholder="예: Spione"
          state={errors.name ? 'error' : 'default'}
        />
        {errors.name && (
          <p className="text-small text-system-alert mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="text-small mb-1 block font-semibold">
          슬러그 (URL)
        </label>
        <p className="text-small text-text-info mb-2">
          브랜드 페이지 주소에 쓰이는 영문 식별자입니다. (예: 이 값이
          &quot;spione&quot;이면 주소는 /brand/spione) 영문 소문자, 숫자,
          하이픈(-)만 사용하고, 등록 후 바꾸면 기존 링크가 깨지니 신중하게
          정하세요.
        </p>
        <Input
          {...register('slug')}
          placeholder="예: spione"
          state={errors.slug ? 'error' : 'default'}
        />
        {errors.slug && (
          <p className="text-small text-system-alert mt-1">{errors.slug.message}</p>
        )}
      </div>

      <div>
        <label className="text-small mb-2 block font-semibold">
          사업 카테고리
        </label>
        <select
          {...register('businessCategory', {
            onChange: (event) => {
              const matched = categories.find(
                (item) => item.label === event.target.value
              );
              if (matched) setValue('category', matched.eyebrow);
            },
          })}
          className="h-11 w-full rounded-lg border border-gray-350 px-3"
        >
          <option value="">선택하세요</option>
          {categories.map((item) => (
            <option key={item.label} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-small mb-2 block font-semibold">
          카테고리 (eyebrow)
        </label>
        <p className="text-small text-text-info mb-2">
          사업 카테고리를 선택하면 자동으로 채워집니다. 필요하면 직접 수정할 수 있습니다.
        </p>
        <Input {...register('category')} placeholder="예: PET FOOD" />
      </div>

      <div>
        <label className="text-small mb-2 block font-semibold">
          태그라인
        </label>
        <Input
          {...register('tagline')}
          placeholder="브랜드 상세 히어로 한 줄 소개"
        />
      </div>

      <div>
        <label className="text-small mb-2 block font-semibold">
          카드 소개글
        </label>
        <Textarea
          {...register('cardDescription')}
          placeholder="브랜드 쇼케이스 카드에 표시할 소개글 (줄바꿈 가능)"
        />
      </div>

      <div>
        <label className="text-small mb-2 block font-semibold">
          Coming Soon 자리 수
        </label>
        <Input
          type="number"
          min={0}
          className="w-32"
          {...register('comingSoonCount', { valueAsNumber: true })}
        />
      </div>

      <ImageUploadField
        label="로고 (어두운 톤)"
        name="logo"
        folder="brands"
        defaultValue={images.logo}
        onChange={(url) => setImages((prev) => ({ ...prev, logo: url }))}
        hint="밝은 배경에 올라가는 가로형 로고. 투명 배경 PNG/SVG, 비율 약 459:158(2.9:1), 500KB 이하 권장"
      />
      <ImageUploadField
        label="로고 (화이트)"
        name="logoWhite"
        folder="brands"
        defaultValue={images.logoWhite}
        onChange={(url) => setImages((prev) => ({ ...prev, logoWhite: url }))}
        hint="어두운 배경(상세 배너)에 올라가는 가로형 로고. 투명 배경 PNG/SVG, 비율 약 459:158(2.9:1), 500KB 이하 권장"
      />
      <ImageUploadField
        label="쇼케이스 배경 이미지"
        name="bgImage"
        folder="brands"
        defaultValue={images.bgImage}
        onChange={(url) => setImages((prev) => ({ ...prev, bgImage: url }))}
        hint="브랜드 목록 카드에 정사각형으로 꽉 채워 노출됩니다. 1:1 비율, 800x800px 이상, 2MB 이하 권장"
      />
      <ImageUploadField
        label="상세 배너 이미지"
        name="bannerImage"
        folder="brands"
        defaultValue={images.bannerImage}
        onChange={(url) => setImages((prev) => ({ ...prev, bannerImage: url }))}
        hint="브랜드 상세 페이지 상단에 화면 전체 너비로 노출됩니다. 가로형(와이드), 1920x800px 이상, 2MB 이하 권장"
      />

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
