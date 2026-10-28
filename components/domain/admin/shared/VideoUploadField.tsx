'use client';

import Image from 'next/image';
import { useState, type ChangeEvent } from 'react';

import { FileUpload, FileUploadItem } from '@/components/common/FileUpload';

import { uploadViaSignedUrl } from '@/lib/admin/upload';

interface VideoUploadFieldProps {
  label: string;
  /** 영상 공개 URL이 담길 hidden input의 name */
  name: string;
  /** 섬네일 이미지 URL이 담길 hidden input의 name */
  thumbnailName: string;
  folder: string;
  defaultValue?: string | null;
  defaultThumbnail?: string | null;
}

const THUMBNAIL_CAPTURE_SECONDS = 1;
const MAX_VIDEO_BYTES = 8 * 1_000_000; // 8MB. 무료 Supabase 플랜의 저장용량/트래픽을 아끼기 위한 상한.

/** 브라우저에서 영상 파일의 한 프레임을 캡처해 JPG Blob으로 반환합니다. 실패하면 null. */
function captureThumbnail(file: File): Promise<Blob | null> {
  return new Promise((resolve) => {
    const videoEl = document.createElement('video');
    videoEl.preload = 'metadata';
    videoEl.muted = true;
    videoEl.playsInline = true;

    const objectUrl = URL.createObjectURL(file);
    videoEl.src = objectUrl;

    const cleanup = () => URL.revokeObjectURL(objectUrl);

    videoEl.addEventListener('loadedmetadata', () => {
      videoEl.currentTime = Math.min(
        THUMBNAIL_CAPTURE_SECONDS,
        (videoEl.duration || THUMBNAIL_CAPTURE_SECONDS) / 2
      );
    });

    videoEl.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = videoEl.videoWidth;
      canvas.height = videoEl.videoHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx || canvas.width === 0 || canvas.height === 0) {
        cleanup();
        resolve(null);
        return;
      }

      ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          cleanup();
          resolve(blob);
        },
        'image/jpeg',
        0.8
      );
    });

    videoEl.addEventListener('error', () => {
      cleanup();
      resolve(null);
    });
  });
}

/**
 * 관리자 영상 업로드 필드. 영상을 올리면 자동으로 프레임을 캡처해 가벼운 섬네일 이미지를
 * 함께 생성·업로드합니다(용량이 큰 영상 파일을 갤러리 썸네일로 그대로 쓰지 않기 위함).
 * 자동 캡처 결과가 마음에 들지 않으면 아래에서 섬네일만 직접 교체할 수 있습니다.
 */
export default function VideoUploadField({
  label,
  name,
  thumbnailName,
  folder,
  defaultValue,
  defaultThumbnail,
}: VideoUploadFieldProps) {
  const [videoUrl, setVideoUrl] = useState(defaultValue ?? '');
  const [thumbnailUrl, setThumbnailUrl] = useState(defaultThumbnail ?? '');
  const [isUploading, setIsUploading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState('');

  const handleVideoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_VIDEO_BYTES) {
      setError(
        `영상 용량은 8MB 이하만 업로드할 수 있습니다. (현재 ${(file.size / 1_000_000).toFixed(1)}MB) 더 짧게 자르거나 압축해서 다시 올려주세요.`
      );
      event.target.value = '';
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const uploadedVideoUrl = await uploadViaSignedUrl(file, folder, file.name);
      setVideoUrl(uploadedVideoUrl);

      setIsUploading(false);
      setIsCapturing(true);

      const thumbnailBlob = await captureThumbnail(file);
      if (thumbnailBlob) {
        const uploadedThumbnailUrl = await uploadViaSignedUrl(
          thumbnailBlob,
          `${folder}-thumbnails`,
          `${file.name.replace(/\.[^.]+$/, '')}.jpg`
        );
        setThumbnailUrl(uploadedThumbnailUrl);
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : '업로드에 실패했습니다.'
      );
    } finally {
      setIsUploading(false);
      setIsCapturing(false);
      event.target.value = '';
    }
  };

  const handleThumbnailReplace = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');

    try {
      const uploadedThumbnailUrl = await uploadViaSignedUrl(
        file,
        `${folder}-thumbnails`,
        file.name
      );
      setThumbnailUrl(uploadedThumbnailUrl);
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

  const removeVideo = () => {
    setVideoUrl('');
    setThumbnailUrl('');
  };

  const busy = isUploading || isCapturing;

  return (
    <div>
      <label className="text-small mb-2 block font-semibold">{label}</label>
      <input type="hidden" name={name} value={videoUrl} />
      <input type="hidden" name={thumbnailName} value={thumbnailUrl} />

      {videoUrl ? (
        <div className="flex items-start gap-3">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-gray-350 bg-gray-100">
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-small text-text-info">
                {isCapturing ? '캡처 중...' : '썸네일 없음'}
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <FileUploadItem
              label={videoUrl.split('/').pop() ?? label}
              onRemove={removeVideo}
            />

            <label className="text-small text-text-info inline-flex cursor-pointer items-center gap-1 hover:text-gray-900">
              썸네일 직접 교체
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                disabled={busy}
                onChange={handleThumbnailReplace}
              />
            </label>
          </div>
        </div>
      ) : (
        <FileUpload
          title={
            isUploading
              ? '업로드 중...'
              : isCapturing
                ? '섬네일 생성 중...'
                : '클릭하거나 드래그해서 등록하세요'
          }
          description="MP4, WEBM, MOV 지원 · 8MB 이하 · 등록 시 섬네일이 자동 생성됩니다"
          accept="video/mp4,video/webm,video/quicktime"
          disabled={busy}
          onChange={handleVideoChange}
          state={error ? 'error' : 'default'}
        />
      )}
      {error && <p className="mt-2 text-system-alert">{error}</p>}
    </div>
  );
}
