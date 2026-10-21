import ComingSoonCard from '@/components/domain/product/ComingSoonCard';
import ProductCard from '@/components/domain/product/ProductCard';
import type { ProductItem } from '@/types/product';

interface ProductGridItemProps {
  product: ProductItem;
  /** true면 카드 자체에 #555(gray-750) 테두리를 둘러 개별 박스로 표시합니다. */
  bordered?: boolean;
}

export default function ProductGridItem({ product, bordered = false }: ProductGridItemProps) {
  const content =
    product.status === 'coming-soon' ? <ComingSoonCard /> : <ProductCard product={product} />;

  if (bordered) {
    return (
      <div className="aspect-square h-full min-h-0 overflow-hidden border border-gray-750 lg:aspect-auto">
        {content}
      </div>
    );
  }

  return content;
}
