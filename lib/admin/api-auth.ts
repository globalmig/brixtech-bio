import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/lib/supabase/auth';

/** Route Handler 공용 인증 가드. 세션이 없으면 401 응답을 반환합니다. */
export async function requireAdminUser() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      ),
    };
  }

  return { user, response: null };
}
