'use client';

import { Accordion } from '@base-ui/react/accordion';
import { useMemo, useState } from 'react';

import Pagination from '@/components/common/Pagination';
import { cn } from '@/lib/utils';

export interface FaqItem {
  id: number;
  category: string;
  num?: number;
  q: string;
  a: string;
}

export interface FaqCategoryOption {
  value: string;
  label: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  categories: FaqCategoryOption[];
  itemsPerPage?: number;
}

const ALL_CATEGORY = 'all';

export default function FaqAccordion({
  items,
  categories,
  itemsPerPage = 8,
}: FaqAccordionProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(
    () =>
      activeCategory === ALL_CATEGORY
        ? items
        : items.filter((item) => item.category === activeCategory),
    [items, activeCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pagedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    setPage(1);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {[{ value: ALL_CATEGORY, label: '전체' }, ...categories].map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => handleCategoryChange(category.value)}
            className={cn(
              'text-small cursor-pointer rounded-full border px-4 py-1.5 font-medium transition-colors',
              activeCategory === category.value
                ? 'border-primary bg-primary text-white'
                : 'border-gray-300 text-text-sub hover:border-primary hover:text-primary'
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {pagedItems.length === 0 ? (
        <p className="text-text-sub py-10 text-center text-[0.95rem]">
          해당 분류에 등록된 질문이 아직 없습니다.
        </p>
      ) : (
        <Accordion.Root className="divide-gray-300 border-gray-300 divide-y border-y">
          {pagedItems.map((item) => (
            <Accordion.Item key={item.id} value={item.id}>
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-4 py-3.75 text-left lg:py-7">
                  <span className="text-text-default text-[0.95rem] font-semibold">
                    <span className="text-text-disabled mr-1.5 font-normal">Q.</span>
                    {item.q}
                  </span>
                  <span className="text-text-info shrink-0 transition-transform group-data-panel-open:rotate-180">
                    ⌄
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
                <p className="text-text-sub pb-3.75 text-[0.9rem] leading-6 lg:pb-7">
                  <span className="text-text-disabled mr-1.5 font-normal">A.</span>
                  {item.a}
                </p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      )}

      {filteredItems.length > itemsPerPage ? (
        <Pagination
          key={activeCategory}
          totalCount={filteredItems.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
        />
      ) : null}
    </div>
  );
}
