'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Input } from '@/components/common/Input';
import Pagination from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { cn } from '@/lib/utils';
import type { Brand } from '@/types/brand';
import type { BrandProduct } from '@/types/product';

import ConfirmDeleteButton from '@/components/domain/admin/shared/ConfirmDeleteButton';
import StatusDropdown from '@/components/domain/admin/shared/StatusDropdown';

const ITEMS_PER_PAGE = 10;
const ROW_GRID = 'grid-cols-[3.5rem_1fr_8rem_9rem_6rem_6rem] gap-4';

export interface AdminProductWithBrand {
  brand: Brand;
  product: BrandProduct;
}

interface AdminAllProductsListProps {
  items: AdminProductWithBrand[];
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
  brand: Brand;
  product: BrandProduct;
  onDelete: () => Promise<void>;
  onSetActive: (isActive: boolean) => Promise<void>;
}

function ProductRow({ brand, product, onDelete, onSetActive }: ProductRowProps) {
  return (
    <div
      className={cn(
        'grid items-center border-b border-gray-200 px-5 py-3 last:border-b-0',
        ROW_GRID
      )}
    >
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
      <span className="truncate text-text-info">{brand.name}</span>
      <a
        href={`/brand/${brand.slug}/${product.slug}`}
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
          href={`/admin/brands/${brand.id}/products/${product.id}/edit`}
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

export default function AdminAllProductsList({
  items,
}: AdminAllProductsListProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const filteredItems = useMemo(() => {
    const term = keyword.trim().toLowerCase();
    if (!term) return items;
    return items.filter(
      ({ brand, product }) =>
        product.name.toLowerCase().includes(term) ||
        brand.name.toLowerCase().includes(term)
    );
  }, [items, keyword]);

  const { currentPage, currentItems, totalCount, onPageChange } =
    usePagination(filteredItems, ITEMS_PER_PAGE);

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
              placeholder="제품명 또는 브랜드명으로 검색"
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
        </div>

        <div
          className={cn(
            'grid items-center border-b border-gray-350 bg-gray-50 px-5 py-3 font-semibold',
            ROW_GRID
          )}
        >
          <span />
          <span>제품명</span>
          <span>브랜드명</span>
          <span>슬러그</span>
          <span>활성화</span>
          <span className="text-right">관리</span>
        </div>

        {currentItems.length === 0 ? (
          <p className="text-text-info py-10 text-center">
            {keyword.trim() ? '검색 결과가 없습니다.' : '등록된 제품이 없습니다.'}
          </p>
        ) : (
          currentItems.map(({ brand, product }) => (
            <ProductRow
              key={product.id}
              brand={brand}
              product={product}
              onDelete={async () => {
                await deleteProduct(product.id, brand.id);
                router.refresh();
              }}
              onSetActive={async (isActive) => {
                await setProductActive(product.id, brand.id, isActive);
                router.refresh();
              }}
            />
          ))
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
