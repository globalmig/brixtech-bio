/** 서버/클라이언트 양쪽에서 공유하는 Storage 상수. 환경변수나 비밀키를 쓰지 않아 어디서든 import해도 안전합니다. */
export const ADMIN_UPLOADS_BUCKET = 'admin-uploads';

/**
 * admin-uploads 버킷이 허용하는 MIME 타입. Supabase Storage 버킷 설정(allowedMimeTypes)과
 * 반드시 동일하게 유지하세요 — 버킷 쪽이 최종 방어선이고, 아래 EXT 매핑은 업로드 URL
 * 발급 시점에 명백히 잘못된 확장자를 조기에 걸러내기 위한 보조 검증입니다.
 */
export const ADMIN_UPLOAD_ALLOWED_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
  'video/quicktime',
] as const;

const EXT_TO_MIME: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
};

/** 파일 확장자가 허용된 업로드 타입인지 확인합니다. */
export function isAllowedUploadExtension(ext: string): boolean {
  return ext.toLowerCase() in EXT_TO_MIME;
}

/**
 * Storage 공개 URL에서 버킷 내부 경로만 추출합니다. 브랜드/제품/영상 삭제 시
 * 연결된 파일을 함께 정리(orphan 방지)하는 데 사용합니다. 패턴이 다르면 null.
 */
export function extractAdminUploadPath(publicUrl: string): string | null {
  const marker = `/object/public/${ADMIN_UPLOADS_BUCKET}/`;
  const index = publicUrl.indexOf(marker);
  if (index === -1) return null;
  return publicUrl.slice(index + marker.length);
}
