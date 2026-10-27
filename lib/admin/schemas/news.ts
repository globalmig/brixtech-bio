import { z } from 'zod';

export const newsPayloadSchema = z.object({
  title: z.string().trim().min(1, '제목과 내용을 입력해주세요.'),
  content: z.string().trim().min(1, '제목과 내용을 입력해주세요.'),
});

export type NewsPayload = z.infer<typeof newsPayloadSchema>;
