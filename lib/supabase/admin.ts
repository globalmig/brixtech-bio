import { createClient } from '@supabase/supabase-js';

/**
 * Service Role 키를 쓰는 권한 클라이언트입니다. RLS를 우회하므로
 * 반드시 서버 코드에서, 그리고 관리자 로그인 세션을 확인한 뒤에만 사용하세요.
 * 절대 클라이언트 컴포넌트/브라우저로 전달하지 마세요.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
