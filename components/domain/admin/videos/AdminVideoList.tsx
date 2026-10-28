'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  DropdownValue,
} from '@/components/common/Dropdown';
import { Input } from '@/components/common/Input';
import Pagination from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { VIDEO_CATEGORIES, getVideoCategoryLabel, type Video } from '@/types/video';

import ConfirmDeleteButton from '@/components/domain/admin/shared/ConfirmDeleteButton';

const ITEMS_PER_PAGE = 12;

const ALL_CATEGORY = 'all';

const CATEGORY_FILTER_OPTIONS = [
  { value: ALL_CATEGORY, label: '전체' },
  ...VIDEO_CATEGORIES,
];

interface AdminVideoListProps {
  videoList: Video[];
}

async function deleteVideo(id: string) {
  const response = await fetch(`/api/admin/videos/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error ?? '삭제에 실패했습니다.');
  }
}

export default function AdminVideoList({ videoList }: AdminVideoListProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<string>(ALL_CATEGORY);

  const filteredItems = useMemo(() => {
    const term = keyword.trim().toLowerCase();
    return videoList.filter((video) => {
      const matchesCategory = category === ALL_CATEGORY || video.category === category;
      const matchesKeyword = !term || video.title.toLowerCase().includes(term);
      return matchesCategory && matchesKeyword;
    });
  }, [videoList, keyword, category]);

  const categoryLabel = CATEGORY_FILTER_OPTIONS.find(
    (option) => option.value === category
  )?.label;

  const { currentItems, totalCount, currentPage, onPageChange } =
    usePagination(filteredItems, ITEMS_PER_PAGE);

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-350 bg-white">
        <div className="flex items-center justify-between border-b border-gray-350 px-5 py-4">
          <h2 className="font-semibold">영상 목록</h2>
          <span className="text-small text-text-info rounded-full bg-gray-100 px-3 py-1">
            Total: {totalCount}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-b border-gray-350 px-5 py-4">
          <div className="w-40">
            <Dropdown
              value={category}
              onValueChange={(value) => setCategory(value ?? ALL_CATEGORY)}
            >
              <DropdownTrigger className="h-9 w-full px-2.5 py-1">
                <DropdownValue>{categoryLabel}</DropdownValue>
              </DropdownTrigger>
              <DropdownContent>
                {CATEGORY_FILTER_OPTIONS.map((option) => (
                  <DropdownItem key={option.value} value={option.value}>
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>

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

        <div className="grid grid-cols-[1fr_7rem_8rem_6rem] items-center border-b border-gray-350 bg-gray-50 px-5 py-3 font-semibold">
          <span>제목</span>
          <span>분류</span>
          <span>게시일</span>
          <span className="text-right">관리</span>
        </div>

        {currentItems.length === 0 ? (
          <p className="text-text-info py-10 text-center">
            {keyword.trim() || category !== ALL_CATEGORY
              ? '검색 결과가 없습니다.'
              : '등록된 영상이 없습니다.'}
          </p>
        ) : (
          currentItems.map((video) => (
            <div
              key={video.id}
              className="grid grid-cols-[1fr_7rem_8rem_6rem] items-center border-b border-gray-200 px-5 py-3 last:border-b-0"
            >
              <Link
                href={`/admin/videos/${video.id}/edit`}
                className="truncate pr-4 hover:text-primary-2 hover:underline"
              >
                {video.title}
              </Link>
              <span className="text-text-info">{getVideoCategoryLabel(video.category)}</span>
              <span className="text-text-info">{video.publishedAt}</span>
              <div className="flex items-center justify-end gap-4">
                <Link
                  href={`/admin/videos/${video.id}/edit`}
                  className="font-semibold text-primary-2 hover:underline"
                >
                  수정
                </Link>
                <ConfirmDeleteButton
                  onConfirm={async () => {
                    await deleteVideo(video.id);
                    router.refresh();
                  }}
                  confirmMessage={`"${video.title}" 영상을 삭제하시겠습니까? 삭제 시 되돌릴 수 없습니다.`}
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
