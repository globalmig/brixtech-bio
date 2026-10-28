import { z } from 'zod';

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
