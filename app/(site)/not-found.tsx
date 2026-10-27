import Link from 'next/link';

import { Button } from '@/components/common/Button';

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-(--width-app-canvas) flex-col items-center px-5 py-40 text-center md:px-8 canvas:px-0">
      <p className="text-h1 font-bold text-primary">404</p>
      <h1 className="text-h4 mt-4 font-bold">페이지를 찾을 수 없습니다.</h1>
      <p className="text-body text-text-info mt-3">
        요청하신 페이지가 삭제되었거나 주소가 변경되었습니다.
      </p>
      <Button render={<Link href="/" />} size="large" className="mt-10">
        홈으로 이동
      </Button>
    </div>
  );
}
