'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import type { Brand } from '@/types/brand';
import type { BrandProduct } from '@/types/product';

import { buttonVariants } from '@/components/common/Button';
import { AdminButton as Button } from '@/components/domain/admin/shared/AdminButton';
import ConfirmDeleteButton from '@/components/domain/admin/shared/ConfirmDeleteButton';
import StatusDropdown from '@/components/domain/admin/shared/StatusDropdown';

interface AdminProductDetailProps {
  brand: Brand;
  product: BrandProduct;
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

export default function AdminProductDetail({
  brand,
  product,
}: AdminProductDetailProps) {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-360">
      <Link href="/admin/products" className="hover:underline">
        ← 제품 목록으로 이동
      </Link>

      <div className="my-6 flex items-center justify-between gap-4">
        <div>
          <p>{brand.name}</p>
          <h1 className="text-h3">{product.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className='bg-white border border-gray-350 rounded-[10px] px-4 py-2.5'>
            <StatusDropdown
              isActive={product.isActive}
              onChange={async (isActive) => {
                await setProductActive(product.id, brand.id, isActive);
                router.refresh();
              }}
            />
          </div>
          <Button
            render={
              <Link
                href={`/admin/brands/${brand.id}/products/${product.id}/edit`}
              />
            }
            size="medium"
          >
            수정
          </Button>
          <ConfirmDeleteButton
            onConfirm={async () => {
              await deleteProduct(product.id, brand.id);
              router.push('/admin/products');
              router.refresh();
            }}
            confirmMessage={`"${product.name}" 제품을 삭제하시겠습니까? 삭제 시 되돌릴 수 없습니다.`}
            className={buttonVariants({ variant: 'danger', size: 'medium' })}
          >
            삭제
          </ConfirmDeleteButton>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-350 bg-white p-6">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="relative size-40 shrink-0 overflow-hidden rounded-xl border border-gray-350 bg-gray-50">
            {product.image ? (
              <Image
                src={product.image}
                alt=""
                fill
                sizes="160px"
                className="object-cover"
              />
            ) : null}
          </div>

          <div className="flex-1 [&>*+*]:mt-10">
            <div>
              <p className="mb-1 font-semibold">슬러그</p>
              <Link
                href={`/brand/${brand.slug}/${product.slug}`}
                target="_blank"
                rel="noreferrer"
                className="underline text-primary"
              >
                /brand/{brand.slug}/{product.slug}
              </Link>
            </div>

            {product.description && (
              <div>
                <p className="mb-1 font-semibold">제품 소개</p>
                <p className="whitespace-pre-line text-gray-750">{product.description}</p>
              </div>
            )}

            {product.specs.length > 0 && (
              <div>
                <p className="mb-2 font-semibold">제품 정보</p>
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-gray-750">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="col-span-2 grid grid-cols-[8rem_1fr]">
                      <dt>{spec.label}</dt>
                      <dd>
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {product.features.length > 0 && (
              <div>
                <p className="mb-2 font-semibold">제품특징</p>
                <ul className="flex flex-col gap-1.5 text-gray-750">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.ingredients && (
              <div>
                <p className="mb-1 font-semibold">원재료명</p>
                <p className="whitespace-pre-line text-gray-750">{product.ingredients}</p>
              </div>
            )}

            {product.nutrients.length > 0 && (
              <div>
                <p className="mb-2 font-semibold">등록 성분량</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-750">
                  {product.nutrients.flatMap(([first, second], index) => [
                    <div key={`${index}-0`} className="flex justify-between gap-2 border-b border-gray-200 py-1">
                      <span>{first.label}</span>
                      <span>{first.value}</span>
                    </div>,
                    second ? (
                      <div key={`${index}-1`} className="flex justify-between gap-2 border-b border-gray-200 py-1">
                        <span>{second.label}</span>
                        <span>{second.value}</span>
                      </div>
                    ) : (
                      <div key={`${index}-1`} />
                    ),
                  ])}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
