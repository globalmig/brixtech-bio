'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/common/Dialog';

import { AdminButton as Button } from '@/components/domain/admin/AdminButton';

interface AdminMessageDialogProps {
  /** null이면 다이얼로그가 닫힌 상태입니다. */
  message: string | null;
  onClose: () => void;
}

/**
 * 관리자 화면 전체에서 공유하는 단순 안내 다이얼로그. 등록/수정 완료 등
 * "확인" 한 번으로 닫히는 결과 메시지를 표시할 때 사용합니다.
 */
export default function AdminMessageDialog({
  message,
  onClose,
}: AdminMessageDialogProps) {
  return (
    <Dialog
      open={message !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="w-100">
        <DialogHeader title={message} />
        <DialogFooter>
          <Button type="button" onClick={onClose}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
