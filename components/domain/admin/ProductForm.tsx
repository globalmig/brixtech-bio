'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import {
  productFormFieldsSchema,
  type ProductFormFields,
} from '@/lib/admin/schemas/product';
import type { BrandProduct } from '@/types/product';

import { AdminButton as Button } from '@/components/domain/admin/AdminButton';
import AdminMessageDialog from '@/components/domain/admin/AdminMessageDialog';
import ImageUploadField from '@/components/domain/admin/ImageUploadField';

interface ProductFormProps {
  initialProduct?: BrandProduct;
  brandId: string;
  /** 수정 대상 제품 id. 없으면 새 제품 등록으로 동작합니다. */
  productId?: string;
  submitLabel: string;
}

interface NutrientRow {
  label: string;
  value: string;
}

function initialNutrientRows(product?: BrandProduct): NutrientRow[] {
  if (!product) return [{ label: '', value: '' }];

  const rows = product.nutrients.flatMap(([first, second]) =>
    second ? [first, second] : [first]
  );

  return rows.length > 0 ? rows : [{ label: '', value: '' }];
}

function findSpec(product: BrandProduct | undefined, label: string) {
  return product?.specs.find((spec) => spec.label === label)?.value ?? '';
}

function parseFeatures(raw: string): string[] {
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ProductForm({
  initialProduct,
  brandId,
  productId,
  submitLabel,
}: ProductFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState(initialProduct?.image ?? '');
  const [featuresText, setFeaturesText] = useState(
    initialProduct?.features.join(', ') ?? ''
  );
  const [nutrients, setNutrients] = useState<NutrientRow[]>(() =>
    initialNutrientRows(initialProduct)
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormFields>({
    resolver: zodResolver(productFormFieldsSchema),
    defaultValues: {
      name: initialProduct?.name ?? '',
      slug: initialProduct?.slug ?? '',
      description: initialProduct?.description ?? '',
      weight: findSpec(initialProduct, '중량'),
      feedingTarget: findSpec(initialProduct, '급여 대상 (연령)'),
      recommendedTarget: findSpec(initialProduct, '권장 대상'),
      ingredients: initialProduct?.ingredients ?? '',
    },
  });

  const updateNutrient = (
    index: number,
    key: keyof NutrientRow,
    value: string
  ) => {
    setNutrients((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [key]: value } : row))
    );
  };

  const addNutrient = () =>
    setNutrients((prev) => [...prev, { label: '', value: '' }]);

  const removeNutrient = (index: number) =>
    setNutrients((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev
    );

  const onSubmit = async (values: ProductFormFields) => {
    setSubmitError('');

    const payload = {
      ...values,
      brandId,
      thumbnail,
      features: parseFeatures(featuresText),
      nutrients: nutrients.filter(
        (row) => row.label.trim() !== '' && row.value.trim() !== ''
      ),
    };

    const response = await fetch(
      productId ? `/api/admin/products/${productId}` : '/api/admin/products',
      {
        method: productId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setSubmitError(data.error ?? '저장에 실패했습니다.');
      return;
    }

    setSuccessMessage(productId ? '수정 완료되었습니다.' : '등록되었습니다.');
  };

  const handleSuccessClose = () => {
    setSuccessMessage(null);
    router.push(`/admin/brands/${brandId}/products`);
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full max-w-2xl flex-col [&>*+*]:mt-5"
    >
      <div>
        <label className="text-small mb-2 block font-semibold">
          제품명
        </label>
        <Input
          {...register('name')}
          placeholder="예: 도그원샷"
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
          제품 페이지 주소에 쓰이는 영문 식별자입니다. (예: 이 값이
          &quot;dog-oneshot&quot;이면 주소는 /brand/브랜드슬러그/dog-oneshot)
          영문 소문자, 숫자, 하이픈(-)만 사용하고, 등록 후 바꾸면 기존
          링크가 깨지니 신중하게 정하세요.
        </p>
        <Input
          {...register('slug')}
          placeholder="예: dog-oneshot"
          state={errors.slug ? 'error' : 'default'}
        />
        {errors.slug && (
          <p className="text-small text-system-alert mt-1">{errors.slug.message}</p>
        )}
      </div>

      <ImageUploadField
        label="썸네일"
        name="thumbnail"
        folder="products"
        defaultValue={thumbnail}
        onChange={setThumbnail}
        hint="제품 목록/상세에 정사각형으로 꽉 채워 노출됩니다. 1:1 비율, 1000x1000px 이상, 2MB 이하 권장"
      />

      <div>
        <label className="text-small mb-2 block font-semibold">
          제품 소개
        </label>
        <Textarea {...register('description')} placeholder="제품 소개글" />
      </div>

      <div>
        <label className="text-small mb-2 block font-semibold">중량</label>
        <Input {...register('weight')} placeholder="예: 4kg" />
      </div>

      <div>
        <label className="text-small mb-2 block font-semibold">
          급여 대상
        </label>
        <Input
          {...register('feedingTarget')}
          placeholder="예: 12개월 이상"
        />
      </div>

      <div>
        <label className="text-small mb-2 block font-semibold">
          권장 대상
        </label>
        <Input
          {...register('recommendedTarget')}
          placeholder="예: 만성장병증 등의 소화기 질환"
        />
      </div>

      <div>
        <label className="text-small mb-2 block font-semibold">
          제품특징{' '}
          <span className="text-text-info font-normal">
            (콤마로 구분해서 입력하세요)
          </span>
        </label>
        <Textarea
          value={featuresText}
          onChange={(event) => setFeaturesText(event.target.value)}
          placeholder="예: 저지방 설계로 소화기 건강에 도움, 프리바이오틱스 성분 강화"
          rows={4}
        />
      </div>

      <div>
        <label className="text-small mb-2 block font-semibold">
          원재료명
        </label>
        <Textarea
          {...register('ingredients')}
          placeholder="원재료명을 입력하세요"
          rows={4}
        />
      </div>

      <div>
        <label className="text-small mb-2 block font-semibold">
          등록 성분량
        </label>
        <div className="flex flex-col gap-2">
          {nutrients.map((row, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={row.label}
                onChange={(event) =>
                  updateNutrient(index, 'label', event.target.value)
                }
                placeholder="예: 조단백질"
                className="flex-1"
              />
              <Input
                value={row.value}
                onChange={(event) =>
                  updateNutrient(index, 'value', event.target.value)
                }
                placeholder="예: 22.5% 이상"
                className="flex-1"
              />
              <Button
                type="button"
                variant="danger"
                size="small"
                onClick={() => removeNutrient(index)}
                className="shrink-0"
              >
                삭제
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="small"
          onClick={addNutrient}
          className="mt-3"
        >
          + 성분 추가
        </Button>
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
