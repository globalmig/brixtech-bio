import Link from 'next/link';

import ProductGridItem from '@/components/domain/product/ProductGridItem';
import { getFeaturedProducts } from '@/lib/products';

export default async function ProductSection() {
  const products = await getFeaturedProducts();

  return (
    <section className='mb-20 lg:mb-40'>
      <div className="mx-auto w-full max-w-(--width-app-canvas) mb-20 px-[4%] md:px-8 canvas:px-0">
       <p className="text-small text-black mb-4 font-bold lg:mb-8">
        PRODUCTS
      </p>
      <h2 className="text-h4 text-black mb-10 whitespace-pre-line lg:mb-20 lg:text-h2">
        {'제품의 라인업을 소개합니다.'}
      </h2>
      <Link
        href="/brand"
        className="group inline-flex items-center gap-3"
      >
        <span className="text-small text-black font-bold">VIEW ALL</span>
        <svg
          width="40"
          height="10"
          viewBox="0 0 40 10"
          fill="none"
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M0 5H38M38 5L32 1M38 5L32 9"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 px-[4%] lg:aspect-3/1 lg:auto-rows-fr lg:grid-cols-3 lg:gap-0 lg:px-0 lg:[&>*:not(:nth-child(-n+3))]:-mt-px lg:[&>*:not(:nth-child(3n+1))]:-ml-px">
        {products.map((product) => (
          <ProductGridItem key={product.id} product={product} bordered />
        ))}
      </div>
    </section>
  );
}
