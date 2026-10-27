import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import CheckList from '@/components/domain/page/CheckList';
import InfoTable from '@/components/domain/page/InfoTable';
import PageIntro from '@/components/domain/page/PageIntro';
import NutrientTable from '@/components/domain/product/NutrientTable';
import { getAllProductsWithBrand, getBrandProduct } from '@/lib/products';

interface ProductDetailPageProps {
  params: Promise<{ brand: string; product: string }>;
}

export async function generateStaticParams() {
  const items = await getAllProductsWithBrand();
  return items.map(({ brand, product }) => ({
    brand: brand.slug,
    product: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { brand: brandSlug, product: productSlug } = await params;
  const found = await getBrandProduct(brandSlug, productSlug);

  return { title: found ? `${found.product.name} | BRIXTECHBIO` : 'BRIXTECHBIO' };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { brand: brandSlug, product: productSlug } = await params;
  const found = await getBrandProduct(brandSlug, productSlug);

  if (!found) notFound();

  const { brand, product } = found;

  return (
    <>
      <PageIntro eyebrow="제품" title={brand.name} lastCrumb={product.name} />

      <div className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <section className="py-10 lg:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-18.75">
            <div className="border-gray-300 relative aspect-square w-full overflow-hidden border lg:w-164.25 lg:shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 657px, 100vw"
                className="object-contain"
              />
            </div>

            <div className="lg:flex-1">
              <h1 className="text-h4 lg:text-h3 text-primary-2 font-bold">{product.name}</h1>
              <p className="text-text-sub mt-4 text-[1.2rem] leading-7">{product.description}</p>

              <div className="mt-8 lg:mt-40">
                <InfoTable
                  size="large"
                  rows={product.specs.map((spec) => ({
                    label: spec.label,
                    value: spec.accent ? (
                      <span className="text-primary-4">{spec.value}</span>
                    ) : (
                      spec.value
                    ),
                  }))}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-12">
          <h2 className="text-h5 lg:text-h4 text-primary-2 mb-6 font-bold lg:mb-8">제품 특징</h2>
          <CheckList items={product.features} />
        </section>

        <section className="py-10 lg:py-12">
          <h2 className="text-h5 lg:text-h4 text-primary-2 mb-6 font-bold lg:mb-8">원재료명</h2>
          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8">
            <p className="text-text-sub text-body leading-7">{product.ingredients}</p>
          </div>
        </section>

        <section className="py-10 lg:py-12">
          <h2 className="text-h5 lg:text-h4 text-primary-2 mb-6 font-bold lg:mb-8">
            등록 성분량
          </h2>
          <NutrientTable rows={product.nutrients} />
        </section>
      </div>
    </>
  );
}
