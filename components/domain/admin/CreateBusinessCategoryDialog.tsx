'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

import { Input } from '@/components/common/Input';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/common/Dialog';

import { AdminButton as Button } from '@/components/domain/admin/AdminButton';

interface CreateBusinessCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * /admin/business 카테고리 목록 상단의 "+ 카테고리 추가" 버튼이 여는 다이얼로그입니다.
 * 슬러그/이름만 받아 business_pages에 바로 행을 생성하고, 리드 문구·블록은 이어서
 * 편집 페이지에서 채우도록 그 페이지로 이동시킵니다.
 */
export default function CreateBusinessCategoryDialog({
  open,
  onOpenChange,
}: CreateBusinessCategoryDialogProps) {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetFields = () => {
    setCategory('');
    setTitle('');
    setTitleEn('');
    setError('');
  };

  const handleCancel = () => {
    resetFields();
    onOpenChange(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const response = await fetch('/api/admin/business', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, title, titleEn }),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(data.error ?? '추가에 실패했습니다.');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    resetFields();
    onOpenChange(false);
    router.push(`/admin/business/${data.category}/edit`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-100">
        <DialogHeader title="새 카테고리 추가" />
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
          <DialogBody className="flex flex-col gap-4">
            <div>
              <label className="text-small mb-2 block font-semibold">
                슬러그 (URL)
              </label>
              <Input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="예: smart-farm"
              />
              <p className="text-small text-text-info mt-1">
                /business/주소에 쓰입니다. 영문 소문자, 숫자, 하이픈(-)만 사용하세요.
              </p>
            </div>
            <div>
              <label className="text-small mb-2 block font-semibold">이름</label>
              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="예: 스마트팜"
              />
            </div>
            <div>
              <label className="text-small mb-2 block font-semibold">
                영문 라벨 (선택)
              </label>
              <Input
                value={titleEn}
                onChange={(event) => setTitleEn(event.target.value.toUpperCase())}
                placeholder="예: SMART FARM"
              />
            </div>
            {error ? <p className="text-small text-system-alert">{error}</p> : null}
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '추가 중...' : '추가'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
