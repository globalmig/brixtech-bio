'use client';

import Image from 'next/image';
import Link from 'next/link';
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
import type { NewsItem } from '@/constants/news';

export type { NewsItem };

type NewsFilterField = 'title' | 'content';

interface NewsListProps {
  items: NewsItem[];
  itemsPerPage?: number;
}

const FILTER_OPTIONS: { value: NewsFilterField; label: string }[] = [
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
];

export default function NewsList({ items, itemsPerPage = 10 }: NewsListProps) {
  const [filterField, setFilterField] = useState<NewsFilterField>('title');
  const [keyword, setKeyword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) => {
      const target = filterField === 'title' ? item.title : (item.content ?? '');
      return target.toLowerCase().includes(term);
    });
  }, [items, filterField, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pagedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setSearchTerm(keyword);
    setPage(1);
  };

  const filterLabel = FILTER_OPTIONS.find((option) => option.value === filterField)?.label;

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
        <Dropdown
          value={filterField}
          onValueChange={(value) => setFilterField(value as NewsFilterField)}
        >
          <DropdownTrigger className="h-auto w-full rounded-[10px] border-gray-350 p-5 sm:w-32 lg:w-62.5">
            <DropdownValue className="text-gray-750">{filterLabel}</DropdownValue>
          </DropdownTrigger>
          <DropdownContent>
            {FILTER_OPTIONS.map((option) => (
              <DropdownItem key={option.value} value={option.value}>
                {option.label}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>

        <div className="w-full sm:w-80 lg:w-150">
          <Input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleSearch();
              }
            }}
            placeholder="검색어를 입력하세요."
            className="h-auto rounded-[10px] border-gray-350 py-5 pl-5 pr-11 placeholder:text-gray-750"
            icon={
              <button
                type="button"
                onClick={handleSearch}
                aria-label="검색"
                className="flex cursor-pointer items-center"
              >
                <Image src="/icons/search.svg" alt="" width={18} height={18} aria-hidden />
              </button>
            }
          />
        </div>
      </div>

      <div className="border-text-default mt-20 border-t-2">
        <div className="text-text-default text-[1.2rem] grid grid-cols-[3.5rem_1fr_6rem] items-center border-b border-gray-300 py-8 text-center font-semibold sm:grid-cols-[5rem_1fr_9rem]">
          <span>No</span>
          <span>제목</span>
          <span>날짜</span>
        </div>

        {pagedItems.length === 0 ? (
          <p className="text-text-sub py-16 text-center text-[0.95rem]">등록된 소식이 없습니다.</p>
        ) : (
          pagedItems.map((item, index) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="grid grid-cols-[3.5rem_1fr_6rem] items-center border-b border-gray-200 py-7.5 text-base transition-colors hover:bg-gray-50 sm:grid-cols-[5rem_1fr_9rem]"
            >
              <span className="text-primary text-center font-medium">
                {filteredItems.length - ((currentPage - 1) * itemsPerPage + index)}
              </span>
              <span className="text-text-default text-[1.2rem] truncate px-2">{item.title}</span>
              <span className="text-text-info text-center">{item.date}</span>
            </Link>
          ))
        )}
      </div>

      {filteredItems.length > itemsPerPage ? (
        <div className="mt-25 [&>div]:mt-0!">
          <Pagination
            key={`${filterField}-${searchTerm}`}
            totalCount={filteredItems.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
          />
        </div>
      ) : null}
    </div>
  );
}
