
import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    '환경변수 NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY가 필요합니다.'
  );
  process.exit(1);
}

const BUCKET = 'admin-uploads';
const VIDEO_PATH = path.resolve('public/videos/미세조류-바이오매스.mp4');
const TITLE = '미세조류 바이오매스';

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const TARGET_LIMIT_BYTES = 45 * 1000 * 1000;

const tempDir = mkdtempSync(path.join(tmpdir(), 'video-seed-'));
const compressedPath = path.join(tempDir, 'compressed.mp4');
const thumbPath = path.join(tempDir, 'thumbnail.jpg');

try {
  execFileSync('ffmpeg', [
    '-y',
    '-i', VIDEO_PATH,
    '-vf', 'scale=-2:720',
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '28',
    '-c:a', 'aac',
    '-b:a', '96k',
    '-movflags', '+faststart',
    compressedPath,
  ], { stdio: 'inherit' });
} catch (ffmpegError) {
  console.error('영상 압축 실패:', ffmpegError.message);
  process.exit(1);
}

const videoBuffer = readFileSync(compressedPath);
const originalSize = statSync(VIDEO_PATH).size;
console.log(
  `압축 결과: ${(videoBuffer.byteLength / 1_000_000).toFixed(1)}MB (원본 대비 ${(
    (videoBuffer.byteLength / originalSize) *
    100
  ).toFixed(0)}%)`
);

if (videoBuffer.byteLength > TARGET_LIMIT_BYTES) {
  console.error(
    `압축 후에도 ${TARGET_LIMIT_BYTES / 1_000_000}MB를 초과합니다. CRF를 더 올리거나 해상도를 낮춰 다시 시도해주세요.`
  );
  process.exit(1);
}

const { data: bucket, error: bucketError } = await supabase.storage.getBucket(BUCKET);
if (bucketError) {
  console.error('버킷 조회 실패:', bucketError.message);
  process.exit(1);
}

if ((bucket.file_size_limit ?? 0) < videoBuffer.byteLength) {
  const { error: updateError } = await supabase.storage.updateBucket(BUCKET, {
    public: true,
    fileSizeLimit: '50MB',
  });
  if (updateError) {
    console.error('버킷 용량 제한 상향 실패:', updateError.message);
    process.exit(1);
  }
  console.log('버킷 용량 제한을 50MB로 상향했습니다.');
}

try {
  execFileSync('ffmpeg', [
    '-y',
    '-ss', '1',
    '-i', VIDEO_PATH,
    '-frames:v', '1',
    '-update', '1',
    '-q:v', '2',
    thumbPath,
  ], { stdio: 'inherit' });
} catch (ffmpegError) {
  console.error('섬네일 캡처 실패:', ffmpegError.message);
  process.exit(1);
}

const thumbnailBuffer = readFileSync(thumbPath);
rmSync(tempDir, { recursive: true, force: true });

const videoFileName = `${Date.now()}-${randomUUID()}.mp4`;
const videoStoragePath = `videos/${videoFileName}`;
const { error: videoUploadError } = await supabase.storage
  .from(BUCKET)
  .upload(videoStoragePath, videoBuffer, {
    contentType: 'video/mp4',
    upsert: false,
  });

if (videoUploadError) {
  console.error('영상 업로드 실패:', videoUploadError.message);
  process.exit(1);
}

const thumbFileName = `${Date.now()}-${randomUUID()}.jpg`;
const thumbStoragePath = `videos-thumbnails/${thumbFileName}`;
const { error: thumbUploadError } = await supabase.storage
  .from(BUCKET)
  .upload(thumbStoragePath, thumbnailBuffer, {
    contentType: 'image/jpeg',
    upsert: false,
  });

if (thumbUploadError) {
  console.error('섬네일 업로드 실패:', thumbUploadError.message);
  process.exit(1);
}

const videoUrl = supabase.storage.from(BUCKET).getPublicUrl(videoStoragePath).data.publicUrl;
const thumbnailUrl = supabase.storage.from(BUCKET).getPublicUrl(thumbStoragePath).data.publicUrl;

const { error: insertError } = await supabase.from('videos').insert({
  title: TITLE,
  description: '브릭스텍바이오의 미세조류 바이오매스 생산 공정을 소개하는 영상입니다.',
  video_url: videoUrl,
  thumbnail: thumbnailUrl,
});

if (insertError) {
  console.error('videos 테이블 등록 실패:', insertError.message);
  process.exit(1);
}

console.log('예시 영상 등록 완료:', { videoUrl, thumbnailUrl });
