import { z } from 'zod';

import { VIDEO_CATEGORIES, type VideoCategory } from '@/types/video';

const CATEGORY_VALUES = VIDEO_CATEGORIES.map((option) => option.value);

function isVideoCategory(value: string): value is VideoCategory {
  return CATEGORY_VALUES.includes(value as VideoCategory);
}

export const videoPayloadSchema = z.object({
  title: z.string().trim().min(1, '제목과 영상을 등록해주세요.'),
  description: z.string().trim().default(''),
  videoUrl: z.string().trim().min(1, '제목과 영상을 등록해주세요.'),
  thumbnail: z.string().trim().default(''),
  category: z
    .string()
    .refine(isVideoCategory, { message: '분류를 선택해주세요.' }),
  publishedAt: z.string().trim().default(''),
});

export type VideoPayload = z.infer<typeof videoPayloadSchema>;

/**
 * 영상 폼의 RHF 필드 스키마. videoUrl/thumbnail은 VideoUploadField가 자체 hidden
 * input으로 관리하므로 제출 시 FormData에서 읽어와 합칩니다.
 */
export const videoFormFieldsSchema = videoPayloadSchema.pick({
  title: true,
  description: true,
  category: true,
  publishedAt: true,
});

export type VideoFormFields = z.input<typeof videoFormFieldsSchema>;
