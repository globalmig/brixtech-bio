import { z } from 'zod';

export const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const brandFormSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, '슬러그를 입력해주세요.')
    .regex(
      SLUG_PATTERN,
      '슬러그는 영문 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다.'
    ),
  name: z.string().trim().min(1, '브랜드명을 입력해주세요.'),
  category: z.string().trim().default(''),
  businessCategory: z.string().trim().default(''),
  logo: z.string().trim().default(''),
  logoWhite: z.string().trim().default(''),
  bgImage: z.string().trim().default(''),
  bannerImage: z.string().trim().default(''),
  tagline: z.string().trim().default(''),
  cardDescription: z.string().trim().default(''),
  comingSoonCount: z.number().int().min(0).default(0),
});

export type BrandFormValues = z.input<typeof brandFormSchema>;
export type BrandPayload = z.output<typeof brandFormSchema>;
