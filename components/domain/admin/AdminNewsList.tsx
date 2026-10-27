'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Input } from '@/components/common/Input';
import Pagination from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import type { News } from '@/types/news';

import ConfirmDeleteButton from '@/components/domain/admin/ConfirmDeleteButton';

const ITEMS_PER_PAGE = 10;

interface AdminNewsListProps {
  newsList: News[];
}

async function deleteNews(id: string) {
  const response = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error ?? '삭제에 실패했습니다.');
  }
}

export default function AdminNewsList({ newsList }: AdminNewsListProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const filteredItems = useMemo(() => {
    const term = keyword.trim().toLowerCase();
    if (!term) return newsList;
    return newsList.filter((news) => news.title.toLowerCase().includes(term));
  }, [newsList, keyword]);

  const { currentItems, totalCount, currentPage, onPageChange } =
    usePagination(filteredItems, ITEMS_PER_PAGE);

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-350 bg-white">
        <div className="flex items-center justify-between border-b border-gray-350 px-5 py-4">
          <h2 className="font-semibold">소식 목록</h2>
          <span className="text-small text-text-info rounded-full bg-gray-100 px-3 py-1">
            Total: {totalCount}
          </span>
        </div>

        <div className="border-b border-gray-350 px-5 py-4">
          <div className="w-full max-w-80">
            <Input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="제목으로 검색"
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

        <div className="grid grid-cols-[1fr_8rem_6rem] items-center border-b border-gray-350 bg-gray-50 px-5 py-3 font-semibold">
          <span>제목</span>
          <span>등록일</span>
          <span className="text-right">관리</span>
        </div>

        {currentItems.length === 0 ? (
          <p className="text-text-info py-10 text-center">
            {keyword.trim() ? '검색 결과가 없습니다.' : '등록된 소식이 없습니다.'}
          </p>
        ) : (
          currentItems.map((news) => (
            <div
              key={news.id}
              className="grid grid-cols-[1fr_8rem_6rem] items-center border-b border-gray-200 px-5 py-3 last:border-b-0"
            >
              <Link
                href={`/admin/news/${news.id}/edit`}
                className="truncate pr-4 hover:text-primary-2 hover:underline"
              >
                {news.title}
              </Link>
              <span className="text-text-info">
                {news.createdAt.slice(0, 10)}
              </span>
              <div className="flex items-center justify-end gap-4">
                <Link
                  href={`/admin/news/${news.id}/edit`}
                  className="font-semibold text-primary-2 hover:underline"
                >
                  수정
                </Link>
                <ConfirmDeleteButton
                  onConfirm={async () => {
                    await deleteNews(news.id);
                    router.refresh();
                  }}
                  confirmMessage={`"${news.title}" 소식을 삭제하시겠습니까? 삭제 시 되돌릴 수 없습니다.`}
                  className="cursor-pointer text-text-info hover:text-system-alert hover:underline"
                >
                  삭제
                </ConfirmDeleteButton>
              </div>
            </div>
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
