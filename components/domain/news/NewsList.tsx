'use client';

import Image from 'next/image';
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

export interface NewsItem {
  id: number;
  title: string;
  content?: string;
  date: string;
}

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
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <Dropdown
          value={filterField}
          onValueChange={(value) => setFilterField(value as NewsFilterField)}
        >
          <DropdownTrigger className="h-11 w-full sm:w-32">
            <DropdownValue>{filterLabel}</DropdownValue>
          </DropdownTrigger>
          <DropdownContent>
            {FILTER_OPTIONS.map((option) => (
              <DropdownItem key={option.value} value={option.value}>
                {option.label}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>

        <div className="w-full sm:w-80">
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

      <div className="border-text-default mt-6 border-t-2">
        <div className="text-text-default grid grid-cols-[3.5rem_1fr_6rem] items-center border-b border-gray-300 py-4 text-center text-[0.95rem] font-semibold sm:grid-cols-[5rem_1fr_9rem]">
          <span>No</span>
          <span>제목</span>
          <span>날짜</span>
        </div>

        {pagedItems.length === 0 ? (
          <p className="text-text-sub py-16 text-center text-[0.95rem]">등록된 소식이 없습니다.</p>
        ) : (
          pagedItems.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[3.5rem_1fr_6rem] items-center border-b border-gray-200 py-5 text-[0.9rem] sm:grid-cols-[5rem_1fr_9rem]"
            >
              <span className="text-primary text-center font-medium">
                {filteredItems.length - ((currentPage - 1) * itemsPerPage + index)}
              </span>
              <span className="text-text-default truncate px-2">{item.title}</span>
              <span className="text-text-info text-center">{item.date}</span>
            </div>
          ))
        )}
      </div>

      {filteredItems.length > itemsPerPage ? (
        <Pagination
          key={`${filterField}-${searchTerm}`}
          totalCount={filteredItems.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
        />
      ) : null}
    </div>
  );
}
