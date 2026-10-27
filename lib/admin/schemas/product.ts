import { z } from 'zod';

import { SLUG_PATTERN } from './brand';

export const nutrientInputSchema = z.object({
  label: z.string().trim().min(1),
  value: z.string().trim().min(1),
});

export const productPayloadSchema = z.object({
  brandId: z.string().trim().min(1, '브랜드 정보가 올바르지 않습니다.'),
  name: z.string().trim().min(1, '제품명과 슬러그를 입력해주세요.'),
  slug: z
    .string()
    .trim()
    .min(1, '제품명과 슬러그를 입력해주세요.')
    .regex(
      SLUG_PATTERN,
      '슬러그는 영문 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다.'
    ),
  thumbnail: z.string().trim().default(''),
  description: z.string().trim().default(''),
  weight: z.string().trim().default(''),
  feedingTarget: z.string().trim().default(''),
  recommendedTarget: z.string().trim().default(''),
  ingredients: z.string().trim().default(''),
  features: z.array(z.string().trim().min(1)).default([]),
  nutrients: z.array(nutrientInputSchema).default([]),
});

export type ProductPayload = z.infer<typeof productPayloadSchema>;

/**
 * 제품 폼의 텍스트 입력 필드만 다루는 스키마(RHF resolver용).
 * 썸네일(이미지 업로드)·기능·성분은 별도 로컬 상태로 관리되어 제출 시 합쳐집니다.
 */
export const productFormFieldsSchema = productPayloadSchema.pick({
  name: true,
  slug: true,
  description: true,
  weight: true,
  feedingTarget: true,
  recommendedTarget: true,
  ingredients: true,
});

export type ProductFormFields = z.input<typeof productFormFieldsSchema>;
