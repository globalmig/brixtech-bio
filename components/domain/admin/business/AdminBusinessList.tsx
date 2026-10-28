'use client';

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { BusinessCategory, BusinessPage } from '@/types/business';

import Pagination from '@/components/common/Pagination';
import { useIsClient } from '@/hooks/useIsClient';
import { usePagination } from '@/hooks/usePagination';

import ConfirmDeleteButton from '@/components/domain/admin/shared/ConfirmDeleteButton';
import { GripIcon, TrashIcon } from '@/components/domain/admin/shared/icons';
import StatusDropdown from '@/components/domain/admin/shared/StatusDropdown';

const ITEMS_PER_PAGE = 12;
const GRID_COLS = 'grid-cols-[2rem_1fr_6rem_8rem_12rem]';

type BusinessListItem = { slug: BusinessCategory; label: string; page: BusinessPage };

interface AdminBusinessListProps {
  items: BusinessListItem[];
}

async function setBusinessPageActive(category: BusinessCategory, isActive: boolean) {
  const response = await fetch(`/api/admin/business/${category}/active`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isActive }),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error ?? '변경에 실패했습니다.');
  }
}

async function deleteBusinessPage(category: BusinessCategory) {
  const response = await fetch(`/api/admin/business/${category}`, { method: 'DELETE' });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error ?? '삭제에 실패했습니다.');
  }
}

async function saveBusinessOrder(order: BusinessCategory[]) {
  const response = await fetch('/api/admin/business/reorder', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order }),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error ?? '순서 변경에 실패했습니다.');
  }
}

interface SortableRowProps {
  item: BusinessListItem;
  /**
   * 최초 렌더(서버 렌더 및 하이드레이션 이전 클라이언트 첫 렌더)에서는 false로 두어
   * dnd-kit이 드래그 핸들에 붙이는 속성/스타일을 아예 그리지 않습니다. dnd-kit의
   * useSortable은 내부적으로 전역 카운터 기반 id를 쓰는 부분이 있어, 마운트 전 프레임에
   * 적용하면 서버와 클라이언트의 첫 렌더 결과가 달라져 하이드레이션 경고가 발생합니다.
   */
  dragEnabled: boolean;
  onToggleActive: (isActive: boolean) => Promise<void>;
  onDelete: () => Promise<void>;
}

function SortableRow({ item, dragEnabled, onToggleActive, onDelete }: SortableRowProps) {
  const { slug, label, page } = item;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: slug });

  return (
    <div
      ref={setNodeRef}
      style={
        dragEnabled
          ? { transform: CSS.Transform.toString(transform), transition }
          : undefined
      }
      className={`grid ${GRID_COLS} items-center border-b border-gray-200 px-5 py-3 last:border-b-0 ${
        dragEnabled && isDragging ? 'relative z-10 bg-white shadow-md' : ''
      }`}
    >
      <button
        type="button"
        {...(dragEnabled ? attributes : null)}
        {...(dragEnabled ? listeners : null)}
        aria-label="순서 변경"
        className="cursor-grab touch-none text-text-info active:cursor-grabbing"
      >
        <GripIcon />
      </button>

      <Link
        href={`/admin/business/${slug}/edit`}
        className="hover:text-primary-2 hover:underline"
      >
        {label}
      </Link>

      <span className="text-text-info">{page.sections.length}</span>

      <StatusDropdown
        isActive={page.isActive}
        onChange={onToggleActive}
        className="w-full"
      />

      <div className="flex items-center justify-end gap-4">
        <Link
          href={`/admin/business/${slug}/edit`}
          className="font-semibold text-primary-2 hover:underline"
        >
          편집
        </Link>
        <ConfirmDeleteButton
          onConfirm={onDelete}
          confirmMessage={`"${label}" 카테고리를 삭제하시겠습니까? 작성된 블록이 모두 사라지며 되돌릴 수 없습니다.`}
          className="cursor-pointer text-text-info hover:text-system-alert"
          ariaLabel={`${label} 카테고리 삭제`}
        >
          <TrashIcon />
        </ConfirmDeleteButton>
      </div>
    </div>
  );
}

export default function AdminBusinessList({ items }: AdminBusinessListProps) {
  const router = useRouter();
  const [orderedItems, setOrderedItems] = useState(items);
  const isMounted = useIsClient();

  const { currentPage, currentItems, totalCount, onPageChange } =
    usePagination(orderedItems, ITEMS_PER_PAGE);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = orderedItems.findIndex((item) => item.slug === active.id);
    const newIndex = orderedItems.findIndex((item) => item.slug === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const previous = orderedItems;
    const next = arrayMove(orderedItems, oldIndex, newIndex);
    setOrderedItems(next);

    try {
      await saveBusinessOrder(next.map((item) => item.slug));
      router.refresh();
    } catch {
      setOrderedItems(previous);
    }
  };

  // router.refresh()는 서버 컴포넌트가 받는 items prop만 새로 가져올 뿐, 이미 마운트된
  // 이 클라이언트 컴포넌트의 orderedItems 상태를 다시 초기화하지는 않습니다. 그래서 화면에
  // 바로 반영하려면 API 호출 결과에 맞춰 orderedItems를 직접 갱신(낙관적 업데이트)해야 합니다.
  const handleToggleActive = async (slug: BusinessCategory, isActive: boolean) => {
    const previous = orderedItems;
    setOrderedItems((current) =>
      current.map((item) =>
        item.slug === slug ? { ...item, page: { ...item.page, isActive } } : item
      )
    );

    try {
      await setBusinessPageActive(slug, isActive);
      router.refresh();
    } catch {
      setOrderedItems(previous);
    }
  };

  const handleDelete = async (slug: BusinessCategory) => {
    const previous = orderedItems;
    setOrderedItems((current) => current.filter((item) => item.slug !== slug));

    try {
      await deleteBusinessPage(slug);
      router.refresh();
    } catch {
      setOrderedItems(previous);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-350 bg-white">
      <div className="flex items-center justify-between border-b border-gray-350 px-5 py-4">
        <h2 className="font-semibold">카테고리 목록</h2>
        <span className="text-small text-text-info rounded-full bg-gray-100 px-3 py-1">
          Total: {totalCount}
        </span>
      </div>

      <div
        className={`grid ${GRID_COLS} items-center border-b border-gray-350 bg-gray-50 px-5 py-3 font-semibold`}
      >
        <span aria-hidden />
        <span>카테고리</span>
        <span>섹션 수</span>
        <span>페이지 활성화</span>
        <span className="text-right">관리</span>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={currentItems.map((item) => item.slug)}
          strategy={verticalListSortingStrategy}
        >
          {currentItems.map((item) => (
            <SortableRow
              key={item.slug}
              item={item}
              dragEnabled={isMounted}
              onToggleActive={(isActive) => handleToggleActive(item.slug, isActive)}
              onDelete={() => handleDelete(item.slug)}
            />
          ))}
        </SortableContext>
      </DndContext>

      {totalCount > ITEMS_PER_PAGE && (
        <div className="px-5 py-4">
          <Pagination
            key={totalCount}
            totalCount={totalCount}
            itemsPerPage={ITEMS_PER_PAGE}
            initialPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
