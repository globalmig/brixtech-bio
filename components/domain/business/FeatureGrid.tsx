import type { FeatureGridItem } from '@/types/business';

const GRID_COLS: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  5: 'sm:grid-cols-3 lg:grid-cols-5',
};

interface FeatureGridProps {
  items: FeatureGridItem[];
}

/**
 * 제목 + 라벨 + 설명 카드를 가로로 나열하는 그리드.
 * about 페이지의 "경쟁력", tech 페이지의 "3대 핵심 활성 성분" 섹션과 동일한 패턴입니다.
 */
export default function FeatureGrid({ items }: FeatureGridProps) {
  const gridClass = GRID_COLS[items.length] ?? 'sm:grid-cols-3';

  return (
    <div className={`grid grid-cols-1 gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-0 ${gridClass}`}>
      {items.map((item, index) => (
        <article key={index}>
          <p className="text-h5 lg:text-h4 text-black mb-2 font-bold">{item.title}</p>
          <p className="text-base font-semibold text-text-sub mb-6">{item.label}</p>
          <div className="mb-6 border-t border-gray-300 lg:mb-8" />
          <p className="text-body text-text-sub leading-6">{item.description}</p>
        </article>
      ))}
    </div>
  );
}
