import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

/**
 * 요청자(관리자)의 로그인 세션을 쿠키에서 읽는 클라이언트입니다.
 * Server Component, Server Action, Route Handler에서 `auth.getUser()`로 로그인 여부를 확인할 때 사용합니다.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component에서 호출된 경우 쿠키를 쓸 수 없습니다. proxy.ts가 세션 갱신을 담당합니다.
          }
        },
      },
    }
  );
}
