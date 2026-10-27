'use client';

import Image from 'next/image';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  DropdownValue,
} from '@/components/common/Dropdown';
import { Input } from '@/components/common/Input';

interface SearchFilterOption {
  value: string;
  label: string;
}

interface SearchFilterBarProps {
  filterOptions: SearchFilterOption[];
  filterValue: string;
  onFilterChange: (value: string) => void;
  keyword: string;
  onKeywordChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
}

export function SearchFilterBar({
  filterOptions,
  filterValue,
  onFilterChange,
  keyword,
  onKeywordChange,
  onSearch,
  placeholder = '검색어를 입력하세요.',
  className = '',
}: SearchFilterBarProps) {
  const filterLabel = filterOptions.find((option) => option.value === filterValue)?.label;

  return (
    <div className={`space-y-2 sm:flex sm:items-center sm:justify-center sm:gap-2 sm:space-y-0 ${className}`}>
      <Dropdown
        value={filterValue}
        onValueChange={(value) => {
          if (value) onFilterChange(value);
        }}
      >
        <DropdownTrigger className="h-auto w-32 rounded-[10px] border-gray-350 p-3 sm:p-5 lg:w-62.5">
          <DropdownValue className="text-gray-750">{filterLabel}</DropdownValue>
        </DropdownTrigger>
        <DropdownContent>
          {filterOptions.map((option) => (
            <DropdownItem key={option.value} value={option.value}>
              {option.label}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>

      <div className="w-full sm:w-80 lg:w-150">
        <Input
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              onSearch();
            }
          }}
          placeholder={placeholder}
          className="h-auto rounded-[10px] border-gray-350 py-3 pl-5 pr-11 placeholder:text-gray-750 sm:py-5"
          icon={
            <button
              type="button"
              onClick={onSearch}
              aria-label="검색"
              className="flex cursor-pointer items-center"
            >
              <Image src="/icons/search.svg" alt="" width={18} height={18} aria-hidden />
            </button>
          }
        />
      </div>
    </div>
  );
}
