'use client';

import { useMemo, useState } from 'react';

import Pagination from '@/components/common/Pagination';
import { SearchFilterBar } from '@/components/common/SearchFilterBar';
import VideoGallery from '@/components/domain/video/VideoGallery';
import { VIDEO_CATEGORIES, type VideoItem } from '@/types/video';

type VideoFilterField = 'title' | 'content';

interface VideoBrowserProps {
  items: VideoItem[];
  itemsPerPage?: number;
}

const FILTER_OPTIONS: { value: VideoFilterField; label: string }[] = [
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
];

const ALL_CATEGORY = 'all';

const CATEGORY_OPTIONS = [{ value: ALL_CATEGORY, label: 'ALL' }, ...VIDEO_CATEGORIES];

export default function VideoBrowser({ items, itemsPerPage = 6 }: VideoBrowserProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);
  const [filterField, setFilterField] = useState<VideoFilterField>('title');
  const [keyword, setKeyword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORY || item.category === activeCategory;
      const target = filterField === 'title' ? item.title : (item.content ?? '');
      const matchesTerm = !term || target.toLowerCase().includes(term);
      return matchesCategory && matchesTerm;
    });
  }, [items, activeCategory, filterField, searchTerm]);

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

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    setPage(1);
  };

  return (
    <>
      <div>
        <div className="mx-auto w-full max-w-360 px-[3%] canvas:px-0">

          <SearchFilterBar
            filterOptions={FILTER_OPTIONS}
            filterValue={filterField}
            onFilterChange={(value) => {
              setFilterField(value as VideoFilterField);
              setPage(1);
            }}
            keyword={keyword}
            onKeywordChange={setKeyword}
            onSearch={handleSearch}
          />

          <ul className="text-small lg:text-[1rem] my-10 flex flex-wrap items-center justify-end gap-x-2 lg:my-15">
            {CATEGORY_OPTIONS.map((category, index) => (
              <li key={category.value} className="flex items-center gap-x-2">
                {index > 0 ? (
                  <span className="text-text-info" aria-hidden>
                    |
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={() => handleCategoryChange(category.value)}
                  className={
                    activeCategory === category.value
                      ? 'text-text-default cursor-pointer font-bold'
                      : 'text-text-info hover:text-text-default cursor-pointer'
                  }
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <VideoGallery items={pagedItems} />
        </div>

      </div>

      <div className="mt-25">
        <Pagination
          key={`${activeCategory}-${filterField}-${searchTerm}`}
          totalCount={filteredItems.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
