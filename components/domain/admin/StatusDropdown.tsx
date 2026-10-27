'use client';

import { useTransition } from 'react';

import { cn } from '@/lib/utils';

interface StatusDropdownProps {
  isActive: boolean;
  onChange: (isActive: boolean) => void | Promise<void>;
  activeLabel?: string;
  inactiveLabel?: string;
  className?: string;
}

/** 관리자 화면 전체에서 공유하는 활성화 상태 토글. '활성화 | 숨김' 텍스트 중 현재 상태를 굵게 강조합니다. */
export default function StatusDropdown({
  isActive,
  onChange,
  activeLabel = '활성화',
  inactiveLabel = '숨김',
  className,
}: StatusDropdownProps) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (nextActive: boolean) => {
    if (nextActive === isActive) return;
    startTransition(() => {
      void onChange(nextActive);
    });
  };

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <button
        type="button"
        disabled={isPending}
        onClick={(event) => {
          event.stopPropagation();
          handleChange(true);
        }}
        className={cn(
          'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
          isActive ? 'font-bold text-primary' : 'text-text-info'
        )}
      >
        {activeLabel}
      </button>
      <span className="text-text-info">|</span>
      <button
        type="button"
        disabled={isPending}
        onClick={(event) => {
          event.stopPropagation();
          handleChange(false);
        }}
        className={cn(
          'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
          !isActive ? 'font-bold text-primary' : 'text-text-info'
        )}
      >
        {inactiveLabel}
      </button>
    </div>
  );
}
