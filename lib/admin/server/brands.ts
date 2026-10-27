/** Postgres 에러를 관리자가 이해할 수 있는 한국어 문구로 변환합니다. */
export function toFriendlyBrandError(error: {
  code?: string;
  message: string;
}): string {
  if (error.code === '23505') {
    return '이미 사용 중인 슬러그입니다. 다른 슬러그를 입력해주세요.';
  }
  return error.message;
}
