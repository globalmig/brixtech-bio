import { randomUUID } from 'node:crypto';

import { NextResponse } from 'next/server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import {
  ADMIN_UPLOADS_BUCKET,
  isAllowedUploadExtension,
} from '@/lib/supabase/storage';

/**
 * 관리자 전용 "서명된 업로드 URL" 발급 엔드포인트. 파일 바이트는 이 서버를 거치지 않고
 * 브라우저가 Supabase Storage로 직접 전송합니다
 * 로그인 세션을 확인한 뒤 Service Role 클라이언트로 1회용 업로드 토큰을 발급해 반환합니다.
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const folder = String(body?.folder ?? 'misc').replace(/[^a-z0-9-]/gi, '');
  const filename = String(body?.filename ?? 'file');
  const ext = (filename.split('.').pop() ?? '').toLowerCase();

  if (!ext || !isAllowedUploadExtension(ext)) {
    return NextResponse.json(
      { error: '허용되지 않는 파일 형식입니다.' },
      { status: 400 }
    );
  }

  const path = `${folder || 'misc'}/${Date.now()}-${randomUUID()}.${ext}`;

  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from(ADMIN_UPLOADS_BUCKET)
    .createSignedUploadUrl(path);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ path: data.path, token: data.token });
}
