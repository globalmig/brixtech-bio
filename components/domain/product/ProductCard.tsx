import Image from 'next/image';
import Link from 'next/link';

import type { ProductItem } from '@/types/product';

interface ProductCardProps {
  product: ProductItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const content = (
    <>
      <div className="relative mb-auto aspect-square w-full overflow-hidden">
        {product.image && product.image !== '#' && (
          <Image
            src={product.image}
            alt={product.name ?? product.brand ?? ''}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        )}
      </div>

      <div>
        <p className="text-h6 lg:text-h5 font-bold lg:mt-4">{product.brand}</p>
        <p className="text-small lg:text-[1rem] text-text-info mt-1">
          {product.name}
        </p>
      </div>
    </>
  );

  if (product.href) {
    return (
      <Link href={product.href} className="flex h-full flex-col p-5 lg:p-8">
        {content}
      </Link>
    );
  }

  return <div className="flex h-full flex-col p-5 lg:p-8">{content}</div>;
}
