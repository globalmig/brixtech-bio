import { z } from 'zod';

export const BUSINESS_CATEGORY_SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const businessCategoryCreateSchema = z.object({
  category: z
    .string()
    .trim()
    .min(1, '슬러그를 입력해주세요.')
    .regex(
      BUSINESS_CATEGORY_SLUG_PATTERN,
      '슬러그는 영문 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다.'
    ),
  title: z.string().trim().min(1, '이름을 입력해주세요.'),
  titleEn: z.string().trim().default(''),
});

export type BusinessCategoryCreateInput = z.infer<typeof businessCategoryCreateSchema>;

const BACKGROUND_COLOR_VALUES = [
  'none',
  'primary-2',
  '#f5f5f5',
  '#F4F1E9',
  '#F6F9EF',
] as const;

export const businessSectionPayloadSchema = z.object({
  title: z.string().trim().default(''),
  titleEn: z.string().trim().default(''),
  image: z.string().trim().default(''),
  note: z.string().trim().default(''),
  lead: z.string().trim().default(''),
  backgroundColor: z.enum(BACKGROUND_COLOR_VALUES).default('none'),
  hidden: z.boolean().default(false),
  type: z.string().min(1),
  data: z.unknown(),
});

export const businessPagePayloadSchema = z.object({
  title: z.string().trim().min(1, '제목과 리드 문구를 입력해주세요.'),
  titleEn: z.string().trim().default(''),
  lead: z.string().trim().min(1, '제목과 리드 문구를 입력해주세요.'),
  sections: z.array(businessSectionPayloadSchema).default([]),
});

export type BusinessPagePayload = z.infer<typeof businessPagePayloadSchema>;
