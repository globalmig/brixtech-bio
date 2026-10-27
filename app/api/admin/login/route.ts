import { NextResponse } from 'next/server';

import { loginFormSchema } from '@/lib/admin/schemas/login';
import { getClientIp, isRateLimited } from '@/lib/rate-limit';
import { createClient } from '@/lib/supabase/server';

const LOGIN_LIMIT = 10;
const LOGIN_WINDOW_MS = 5 * 60 * 1000;

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = loginFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? '이메일과 비밀번호를 입력해주세요.' },
      { status: 400 }
    );
  }

  const ip = await getClientIp();
  if (isRateLimited(`login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS)) {
    return NextResponse.json(
      { error: '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.' },
      { status: 429 }
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return NextResponse.json(
      { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 }
    );
  }

  return NextResponse.json({ ok: true });
}
