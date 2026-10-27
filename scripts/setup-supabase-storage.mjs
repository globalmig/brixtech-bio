// 관리자 업로드용 Supabase Storage 버킷을 한 번만 만드는 스크립트
import { createClient } from '@supabase/supabase-js';

const BUCKET = 'admin-uploads';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    '환경변수 NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY가 필요합니다.'
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const ALLOWED_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
  'video/quicktime',
];

const { data: buckets, error: listError } = await supabase.storage.listBuckets();

if (listError) {
  console.error('버킷 목록 조회 실패:', listError.message);
  process.exit(1);
}

if (buckets.some((bucket) => bucket.name === BUCKET)) {
  const { error: updateError } = await supabase.storage.updateBucket(BUCKET, {
    public: true,
    fileSizeLimit: '8MB',
    allowedMimeTypes: ALLOWED_MIME_TYPES,
  });

  if (updateError) {
    console.error('버킷 설정 갱신 실패:', updateError.message);
    process.exit(1);
  }

  console.log(`"${BUCKET}" 버킷이 이미 존재해 설정만 갱신했습니다. (allowedMimeTypes 적용)`);
  process.exit(0);
}

const { error: createError } = await supabase.storage.createBucket(BUCKET, {
  public: true,
  fileSizeLimit: '8MB', // 무료 플랜 저장용량/트래픽을 아끼기 위한 상한(영상 업로드 폼의 8MB 제한과 일치)
  allowedMimeTypes: ALLOWED_MIME_TYPES,
});

if (createError) {
  console.error('버킷 생성 실패:', createError.message);
  process.exit(1);
}

console.log(`"${BUCKET}" 버킷을 생성했습니다. (public, MIME 화이트리스트 적용)`);
