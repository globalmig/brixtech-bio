'use client';

import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import { useState, type ChangeEvent } from 'react';

import { FileUpload, FileUploadItem } from '@/components/common/FileUpload';

import { uploadViaSignedUrl } from '@/lib/admin/upload';

/**
 * 업로드가 서버를 거치지 않고 브라우저 → Storage로 직접 전송되므로(서명 URL 방식),
 * SVG에 스크립트가 들어있어도 서버에서 걸러낼 기회가 없습니다. 그래서 svg만
 * 업로드 직전에 브라우저에서 직접 sanitize해 안전한 마크업만 올라가도록 합니다.
 */
async function sanitizeIfSvg(file: File): Promise<File | Blob> {
  if (file.type !== 'image/svg+xml' && !file.name.toLowerCase().endsWith('.svg')) {
    return file;
  }

  const raw = await file.text();
  const clean = DOMPurify.sanitize(raw, { USE_PROFILES: { svg: true, svgFilters: true } });
  return new Blob([clean], { type: 'image/svg+xml' });
}

interface ImageUploadFieldProps {
  label: string;
  name: string;
  folder: string;
  defaultValue?: string | null;
  /** 권장 비율·사이즈·용량 등을 안내하는 보조 설명 */
  hint?: string;
  /** 업로드/삭제로 URL이 바뀔 때마다 호출됩니다. 부모가 자체 상태로 값을 직렬화해야 할 때 사용하세요. */
  onChange?: (url: string) => void;
}

/**
 * 관리자 폼 공용 이미지 업로드 필드. 파일을 고르면 서명 URL을 통해 Storage로 직접 업로드하고,
 * 반환된 공개 URL을 hidden input(name)에 담아 폼 제출 시 함께 전송합니다.
 */
export default function ImageUploadField({
  label,
  name,
  folder,
  defaultValue,
  hint,
  onChange,
}: ImageUploadFieldProps) {
  const [url, setUrl] = useState(defaultValue ?? '');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  // defaultValue는 보통 한 번만 쓰이는 초기값이지만, 관리자 폼에서 같은 필드 자리에
  // 여러 항목(블록)을 번갈아 선택할 때는 이 컴포넌트가 리마운트되지 않고 재사용될 수
  // 있습니다. 그때도 전환된 항목의 실제 값을 보여주도록, 렌더링 중에 이전 defaultValue와
  // 비교해 바뀌었으면 즉시 동기화합니다(이펙트가 아니라 렌더링 중 상태 보정 패턴).
  const [syncedDefaultValue, setSyncedDefaultValue] = useState(defaultValue ?? '');
  if ((defaultValue ?? '') !== syncedDefaultValue) {
    setSyncedDefaultValue(defaultValue ?? '');
    setUrl(defaultValue ?? '');
    setError('');
  }

  const updateUrl = (next: string) => {
    setUrl(next);
    onChange?.(next);
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');

    try {
      const safeFile = await sanitizeIfSvg(file);
      const url = await uploadViaSignedUrl(safeFile, folder, file.name);
      updateUrl(url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : '업로드에 실패했습니다.'
      );
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div>
      <label className="text-small mb-1 block font-semibold">{label}</label>
      {hint && <p className="text-small text-text-info mb-2">{hint}</p>}
      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="flex items-center gap-3">
          <Image
            src={url}
            alt=""
            width={80}
            height={80}
            className="size-20 shrink-0 rounded-lg border border-gray-350 bg-gray-50 object-contain"
          />
          <FileUploadItem
            className="flex-1"
            label={url.split('/').pop() ?? label}
            onRemove={() => updateUrl('')}
          />
        </div>
      ) : (
        <FileUpload
          title={isUploading ? '업로드 중...' : '클릭하거나 드래그해서 등록하세요'}
          description="PNG, JPG, WEBP, SVG 지원"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          disabled={isUploading}
          onChange={handleChange}
          state={error ? 'error' : 'default'}
        />
      )}
      {error && <p className="mt-2 text-system-alert">{error}</p>}
    </div>
  );
}
