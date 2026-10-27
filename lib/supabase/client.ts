import { createClient } from '@supabase/supabase-js';

/**
 * 브라우저(관리자 업로드 폼)에서 Storage에 직접 올릴 때 쓰는 anon 키 클라이언트입니다.
 * 실제 쓰기 권한은 서버가 발급한 서명 업로드 URL(token)이 부여하므로, 이 클라이언트에 별도 로그인 세션은 필요 없습니다.
 * 서비스 롤 키는 여기 들어오면 안 됩니다 — 절대 이 파일에서 쓰지 마세요.
 */
export function createBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
