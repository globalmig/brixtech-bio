'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import Pagination from '@/components/common/Pagination';
import { SearchFilterBar } from '@/components/common/SearchFilterBar';
import type { NewsItem } from '@/types/news';

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

  return (
    <div>
      <SearchFilterBar
        filterOptions={FILTER_OPTIONS}
        filterValue={filterField}
        onFilterChange={(value) => setFilterField(value as NewsFilterField)}
        keyword={keyword}
        onKeywordChange={setKeyword}
        onSearch={handleSearch}
      />

      <div className="border-text-default mt-20 border-t-2">
        <div className="text-text-default grid grid-cols-[1fr_6rem] items-center border-b border-gray-300 py-5 text-center text-xs font-semibold sm:grid-cols-[1fr_9rem] lg:grid-cols-[5rem_1fr_9rem] lg:py-8 lg:text-[1.2rem]">
          <span className="hidden lg:block">No</span>
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
              className="grid grid-cols-[1fr_6rem] items-center border-b border-gray-200 py-5 text-xs transition-colors hover:bg-gray-50 sm:grid-cols-[1fr_9rem] lg:grid-cols-[5rem_1fr_9rem] lg:py-7.5 lg:text-base"
            >
              <span className="text-primary text-center font-medium hidden lg:block">
                {filteredItems.length - ((currentPage - 1) * itemsPerPage + index)}
              </span>
              <span className="text-text-default truncate px-2 text-base lg:text-[1.2rem]">{item.title}</span>
              <span className="text-text-info text-center">{item.date}</span>
            </Link>
          ))
        )}
      </div>

        <div className="mt-25 [&>div]:mt-0!">
          <Pagination
            key={`${filterField}-${searchTerm}`}
            totalCount={filteredItems.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
          />
        </div>
    </div>
  );
}
