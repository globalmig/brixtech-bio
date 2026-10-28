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
import type { BrandProduct } from '@/types/product';

import ConfirmDeleteButton from '@/components/domain/admin/shared/ConfirmDeleteButton';
import { GripIcon } from '@/components/domain/admin/shared/icons';
import StatusDropdown from '@/components/domain/admin/shared/StatusDropdown';

const ITEMS_PER_PAGE = 10;
const ROW_GRID = 'grid-cols-[1.5rem_3.5rem_1fr_9rem_7rem_7rem] gap-4';

interface AdminProductListProps {
  brandId: string;
  brandSlug: string;
  products: BrandProduct[];
}

async function deleteProduct(id: string, brandId: string) {
  const response = await fetch(
    `/api/admin/products/${id}?brandId=${encodeURIComponent(brandId)}`,
    { method: 'DELETE' }
  );
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error ?? '삭제에 실패했습니다.');
  }
}

async function reorderProducts(brandId: string, orderedIds: string[]) {
  await fetch('/api/admin/products/reorder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ brandId, orderedIds }),
  });
}

async function setProductActive(
  id: string,
  brandId: string,
  isActive: boolean
) {
  const response = await fetch(`/api/admin/products/${id}/active`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ brandId, isActive }),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error ?? '변경에 실패했습니다.');
  }
}

interface ProductRowProps {
  brandId: string;
  brandSlug: string;
  product: BrandProduct;
  draggable: boolean;
  onDelete: () => Promise<void>;
  onSetActive: (isActive: boolean) => Promise<void>;
}

function ProductRow({
  brandId,
  brandSlug,
  product,
  draggable,
  onDelete,
  onSetActive,
}: ProductRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id, disabled: !draggable });

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
        href={`/admin/products/${product.id}`}
        className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-gray-350 bg-gray-50"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        ) : null}
      </Link>
      <Link
        href={`/admin/products/${product.id}`}
        className="truncate hover:text-primary-2 hover:underline"
      >
        {product.name}
      </Link>
      <a
        href={`/brand/${brandSlug}/${product.slug}`}
        target="_blank"
        rel="noreferrer"
        className="truncate text-text-info hover:text-primary-2 hover:underline"
      >
        {product.slug}
      </a>
      <StatusDropdown
        isActive={product.isActive}
        onChange={onSetActive}
        className="w-full"
      />
      <div className="flex items-center justify-end gap-4">
        <Link
          href={`/admin/brands/${brandId}/products/${product.id}/edit`}
          className="font-semibold text-primary-2 hover:underline"
        >
          수정
        </Link>
        <ConfirmDeleteButton
          onConfirm={onDelete}
          confirmMessage={`"${product.name}" 제품을 삭제하시겠습니까? 삭제 시 되돌릴 수 없습니다.`}
          className="cursor-pointer text-text-info hover:text-system-alert hover:underline"
        >
          삭제
        </ConfirmDeleteButton>
      </div>
    </div>
  );
}

export default function AdminProductList({
  brandId,
  brandSlug,
  products,
}: AdminProductListProps) {
  const router = useRouter();
  const [items, setItems] = useState(products);
  const [prevProducts, setPrevProducts] = useState(products);
  const [keyword, setKeyword] = useState('');

  if (products !== prevProducts) {
    setPrevProducts(products);
    setItems(products);
  }

  const isFiltering = keyword.trim() !== '';

  const filteredItems = useMemo(() => {
    const term = keyword.trim().toLowerCase();
    if (!term) return items;
    return items.filter((product) =>
      product.name.toLowerCase().includes(term)
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

    const oldIndex = currentItems.findIndex(
      (product) => product.id === active.id
    );
    const newIndex = currentItems.findIndex(
      (product) => product.id === over.id
    );
    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedPage = arrayMove(currentItems, oldIndex, newIndex);
    const pageOffset = (currentPage - 1) * ITEMS_PER_PAGE;
    const nextItems = [...items];
    nextItems.splice(pageOffset, reorderedPage.length, ...reorderedPage);

    setItems(nextItems);
    void reorderProducts(
      brandId,
      nextItems.map((product) => product.id)
    );
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-350 bg-white">
        <div className="flex items-center justify-between border-b border-gray-350 px-5 py-4">
          <h2 className="font-semibold">제품 목록</h2>
          <span className="text-small text-text-info rounded-full bg-gray-100 px-3 py-1">
            Total: {totalCount}
          </span>
        </div>

        <div className="flex flex-col gap-2 border-b border-gray-350 px-5 py-4">
          <div className="w-full max-w-80">
            <Input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="제품명으로 검색"
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
          <span />
          <span>제품명</span>
          <span>슬러그</span>
          <span>활성화</span>
          <span className="text-right">관리</span>
        </div>

        {currentItems.length === 0 ? (
          <p className="text-text-info py-10 text-center">
            {isFiltering ? '검색 결과가 없습니다.' : '등록된 제품이 없습니다.'}
          </p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={currentItems.map((product) => product.id)}
              strategy={verticalListSortingStrategy}
            >
              {currentItems.map((product) => (
                <ProductRow
                  key={product.id}
                  brandId={brandId}
                  brandSlug={brandSlug}
                  product={product}
                  draggable={!isFiltering}
                  onDelete={async () => {
                    await deleteProduct(product.id, brandId);
                    router.refresh();
                  }}
                  onSetActive={async (isActive) => {
                    await setProductActive(product.id, brandId, isActive);
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
