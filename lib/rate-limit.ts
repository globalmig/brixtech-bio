import { headers } from 'next/headers';

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/**
 * 메모리 기반 고정 윈도우(fixed window) 레이트 리미터입니다.
 *
 * 한계: Vercel 등 서버리스 환경에서는 인스턴스마다 메모리가 분리되고 콜드스타트 시
 * 초기화되므로 "완벽한" 제한은 아닙니다. 로그인 브루트포스/문의폼 스팸처럼 단일
 * 인스턴스 수준의 대략적인 억제만으로 충분한 경우에 쓰고, 더 강한 보장이 필요하면
 * Upstash Redis 등 외부 저장소 기반 리미터로 교체하세요.
 */
export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}

/** 요청자의 IP를 추정합니다(Vercel 등 프록시 뒤에서는 x-forwarded-for의 첫 값). */
export async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwardedFor = headerList.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return headerList.get('x-real-ip') ?? 'unknown';
}
