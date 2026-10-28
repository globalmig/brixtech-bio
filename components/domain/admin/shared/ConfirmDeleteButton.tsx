'use client';

import { useState, type ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/common/Dialog';

import { AdminButton as Button } from '@/components/domain/admin/shared/AdminButton';

interface ConfirmDeleteButtonProps {
  /** 확인 다이얼로그에서 "삭제"를 눌렀을 때 실행할 작업(서버 액션 또는 로컬 상태 변경 모두 가능) */
  onConfirm: () => void | Promise<void>;
  /** 되돌릴 수 없는 작업임을 알리는 안내 문구 */
  confirmMessage: string;
  className?: string;
  children: ReactNode;
  /** 아이콘만 표시하는 등 children에 글자가 없을 때 스크린 리더용으로 전달 */
  ariaLabel?: string;
  /** 다이얼로그의 "삭제" 버튼 색상. 기본값은 위험(danger)을 뜻하는 빨강이며, 필요한 곳에서만 primary로 바꿉니다. */
  confirmVariant?: 'danger' | 'primary';
}

/**
 * 관리자 화면 전체에서 공유하는 삭제 확인 버튼. 되돌릴 수 없는 작업(브랜드/제품/
 * 뉴스/영상 삭제, 블록 제거 등) 앞에 항상 이 컴포넌트를 거치게 해 오클릭으로
 * 데이터가 사라지는 것을 막습니다.
 */
export default function ConfirmDeleteButton({
  onConfirm,
  confirmMessage,
  className,
  children,
  ariaLabel,
  confirmVariant = 'danger',
}: ConfirmDeleteButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={ariaLabel}
        className={className}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-100">
          <DialogHeader title={confirmMessage} />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              취소
            </Button>
            <Button
              type="button"
              variant={confirmVariant}
              onClick={() => {
                setOpen(false);
                void onConfirm();
              }}
            >
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
