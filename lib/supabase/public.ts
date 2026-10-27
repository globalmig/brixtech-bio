import { createClient } from '@supabase/supabase-js';

/**
 * 쿠키 없이 anon 키만 쓰는 클라이언트입니다. 공개 페이지에서 읽기 전용으로 사용하세요
 * (RLS가 각 테이블의 select만 허용합니다). 로그인 세션 확인이나 쓰기 작업에는 쓰지 마세요.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
