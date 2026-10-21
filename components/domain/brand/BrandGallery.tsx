'use client';

import { useMemo, useState } from 'react';

import BrandShowcaseCard from '@/components/domain/brand/BrandShowcaseCard';
import ComingSoonCard from '@/components/domain/product/ComingSoonCard';
import type { Brand } from '@/types/brand';

interface BrandGalleryProps {
  brands: Brand[];
  categories: string[];
}

const ALL_CATEGORY = 'ALL';

export default function BrandGallery({ brands, categories }: BrandGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);

  const filteredBrands = useMemo(
    () =>
      activeCategory === ALL_CATEGORY
        ? brands
        : brands.filter((brand) => brand.businessCategory === activeCategory),
    [brands, activeCategory]
  );

  return (
    <>
      <div className="px-[4%] lg:px-6">
        <ul className="text-small lg:text-[1rem] flex flex-wrap items-center gap-x-2">
          {[ALL_CATEGORY, ...categories].map((category, index) => (
            <li key={category} className="flex items-center gap-x-2">
              {index > 0 ? (
                <span className="text-text-info" aria-hidden>
                  |
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? 'text-text-default font-bold'
                    : 'text-text-info hover:text-text-default cursor-pointer'
                }
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {filteredBrands.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-5 px-[4%] lg:mt-10 lg:grid-cols-3 lg:gap-2 lg:px-6">
          {filteredBrands.map((brand) => (
            <BrandShowcaseCard
              key={brand.slug}
              href={`/brand/${brand.slug}`}
              image={brand.bgImage}
              logo={brand.logoWhite}
              logoAlt={brand.name}
              description={brand.cardDescription}
            />
          ))}
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={`gallery-coming-soon-${index}`} className="aspect-square border border-gray-750">
              <ComingSoonCard />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 border-t border-b border-gray-750 px-[4%] py-20 lg:mt-10 lg:px-6 lg:py-28">
          <ComingSoonCard size="large" />
        </div>
      )}
    </>
  );
}
