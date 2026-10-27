import { createBrowserClient } from '@/lib/supabase/client';
import { ADMIN_UPLOADS_BUCKET } from '@/lib/supabase/storage';

/**
 * 서명 URL을 발급받아(/api/admin/upload-url) 파일을 Supabase Storage로 직접 업로드합니다.
 * 파일 바이트가 우리 서버(Vercel 함수)를 거치지 않으므로 함수 요청 용량/시간 제한과 무관하게 동작하고,
 * 용량 제한은 Storage 버킷 설정(한 곳)에서만 관리합니다.
 */
export async function uploadViaSignedUrl(
  file: File | Blob,
  folder: string,
  filename: string
): Promise<string> {
  const urlResponse = await fetch('/api/admin/upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folder, filename }),
  });
  const urlData = await urlResponse.json();

  if (!urlResponse.ok) {
    throw new Error(urlData.error ?? '업로드 URL 발급에 실패했습니다.');
  }

  const supabase = createBrowserClient();
  const { error: uploadError } = await supabase.storage
    .from(ADMIN_UPLOADS_BUCKET)
    .uploadToSignedUrl(urlData.path, urlData.token, file, {
      contentType: file.type || 'application/octet-stream',
    });

  if (uploadError) {
    throw new Error(uploadError.message || '업로드에 실패했습니다.');
  }

  return supabase.storage.from(ADMIN_UPLOADS_BUCKET).getPublicUrl(urlData.path).data.publicUrl;
}
