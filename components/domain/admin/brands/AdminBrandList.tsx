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
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Input } from '@/components/common/Input';
import Pagination from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { cn } from '@/lib/utils';
import type { Brand } from '@/types/brand';

import ConfirmDeleteButton from '@/components/domain/admin/shared/ConfirmDeleteButton';
import { GripIcon } from '@/components/domain/admin/shared/icons';

const ITEMS_PER_PAGE = 10;
const ROW_GRID = 'grid-cols-[1.5rem_9rem_1fr_13rem] gap-4';

interface AdminBrandListProps {
  brands: Brand[];
}

async function deleteBrand(id: string) {
  const response = await fetch(`/api/admin/brands/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error ?? '삭제에 실패했습니다.');
  }
}

async function reorderBrands(orderedIds: string[]) {
  await fetch('/api/admin/brands/reorder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderedIds }),
  });
}

interface BrandRowProps {
  brand: Brand;
  draggable: boolean;
  onDelete: () => Promise<void>;
}

function BrandRow({ brand, draggable, onDelete }: BrandRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: brand.id, disabled: !draggable });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        'grid items-center border-b border-gray-200 px-5 py-3 last:border-b-0',
        ROW_GRID,
        isDragging && 'relative z-10 bg-white shadow-md'
      )}
    >
      {draggable ? (
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label="순서 변경"
          className="shrink-0 cursor-grab touch-none text-text-info active:cursor-grabbing"
        >
          <GripIcon />
        </button>
      ) : (
        <span />
      )}

      <Link
        href={`/admin/brands/${brand.id}/products`}
        className="group flex items-center gap-3 overflow-hidden"
      >
        <span className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-gray-350 bg-gray-50">
          {brand.logo ? (
            <Image
              src={brand.logo}
              alt=""
              fill
              sizes="48px"
              className="object-contain"
            />
          ) : null}
        </span>
        <span className="truncate group-hover:text-primary-2 group-hover:underline">
          {brand.name}
        </span>
      </Link>
      <span className="text-text-info truncate">{brand.businessCategory}</span>
      <div className="flex items-center justify-end gap-4">
        <Link
          href={`/admin/brands/${brand.id}/edit`}
          className="font-semibold text-primary-2 hover:underline"
        >
          브랜드 정보 수정
        </Link>
        <ConfirmDeleteButton
          onConfirm={onDelete}
          confirmMessage={`"${brand.name}" 브랜드를 삭제하시겠습니까? 삭제 시 소속된 제품도 모두 함께 삭제되며 되돌릴 수 없습니다.`}
          className="cursor-pointer text-text-info hover:text-system-alert hover:underline"
        >
          삭제
        </ConfirmDeleteButton>
      </div>
    </div>
  );
}

export default function AdminBrandList({ brands }: AdminBrandListProps) {
  const router = useRouter();
  const [items, setItems] = useState(brands);
  const [prevBrands, setPrevBrands] = useState(brands);
  const [keyword, setKeyword] = useState('');

  if (brands !== prevBrands) {
    setPrevBrands(brands);
    setItems(brands);
  }

  const isFiltering = keyword.trim() !== '';

  const filteredItems = useMemo(() => {
    const term = keyword.trim().toLowerCase();
    if (!term) return items;
    return items.filter(
      (brand) =>
        brand.name.toLowerCase().includes(term) ||
        brand.businessCategory.toLowerCase().includes(term)
    );
  }, [items, keyword]);

  const { currentPage, currentItems, totalCount, onPageChange } =
    usePagination(filteredItems, ITEMS_PER_PAGE);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = currentItems.findIndex((brand) => brand.id === active.id);
    const newIndex = currentItems.findIndex((brand) => brand.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedPage = arrayMove(currentItems, oldIndex, newIndex);
    const pageOffset = (currentPage - 1) * ITEMS_PER_PAGE;
    const nextItems = [...items];
    nextItems.splice(pageOffset, reorderedPage.length, ...reorderedPage);

    setItems(nextItems);
    void reorderBrands(nextItems.map((brand) => brand.id));
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-350 bg-white">
        <div className="flex items-center justify-between border-b border-gray-350 px-5 py-4">
          <h2 className="font-semibold">브랜드 목록</h2>
          <span className="text-small text-text-info rounded-full bg-gray-100 px-3 py-1">
            Total: {totalCount}
          </span>
        </div>

        <div className="flex flex-col gap-2 border-b border-gray-350 px-5 py-4">
          <div className="w-full max-w-80">
            <Input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="브랜드명 또는 사업 카테고리로 검색"
              size="small"
              icon={
                <Image
                  src="/icons/search.svg"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden
                />
              }
            />
          </div>
          {isFiltering && (
            <p className="text-small text-text-info">
              검색 중에는 순서 변경이 비활성화됩니다. 검색어를 지우면 드래그로
              순서를 바꿀 수 있습니다.
            </p>
          )}
        </div>

        <div
          className={cn(
            'grid items-center border-b border-gray-350 bg-gray-50 px-5 py-3 font-semibold',
            ROW_GRID
          )}
        >
          <span />
          <span>브랜드명</span>
          <span>Business</span>
          <span className="text-right">관리</span>
        </div>

        {currentItems.length === 0 ? (
          <p className="text-text-info py-10 text-center">
            {isFiltering
              ? '검색 결과가 없습니다.'
              : '등록된 브랜드가 없습니다.'}
          </p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={currentItems.map((brand) => brand.id)}
              strategy={verticalListSortingStrategy}
            >
              {currentItems.map((brand) => (
                <BrandRow
                  key={brand.id}
                  brand={brand}
                  draggable={!isFiltering}
                  onDelete={async () => {
                    await deleteBrand(brand.id);
                    router.refresh();
                  }}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>

      <div className="px-5 py-4">
        <Pagination
          key={filteredItems.length}
          totalCount={totalCount}
          itemsPerPage={ITEMS_PER_PAGE}
          initialPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>

    </>
  );
}
