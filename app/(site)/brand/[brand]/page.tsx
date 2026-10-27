import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import PageIntro from '@/components/domain/page/PageIntro';
import ProductGridItem from '@/components/domain/product/ProductGridItem';
import { getBrand, getBrands } from '@/lib/brands';
import { getBrandLineup } from '@/lib/products';

interface BrandDetailPageProps {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((brand) => ({ brand: brand.slug }));
}

export async function generateMetadata({ params }: BrandDetailPageProps): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = await getBrand(slug);

  return { title: brand ? `${brand.name} | BRIXTECHBIO` : 'BRIXTECHBIO' };
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const { brand: slug } = await params;
  const brand = await getBrand(slug);

  if (!brand) notFound();

  const lineup = await getBrandLineup(brand);

  return (
    <>
      <PageIntro eyebrow="브랜드 소개" title={brand.name} />

      <div className="relative flex flex-col items-center justify-center px-5 py-20 text-center lg:py-32">
        <Image
          src={brand.bannerImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />
        <p className="text-small relative mb-4 font-bold tracking-[0.2em] text-white uppercase lg:mb-6">
          {brand.category}
        </p>
        <div className="relative h-14 w-52 lg:h-20 lg:w-76">
          <Image
            src={brand.logoWhite}
            alt={brand.name}
            fill
            sizes="300px"
            className="object-contain"
          />
        </div>
        <p className="relative mt-6 text-body text-white lg:mt-8">{brand.tagline}</p>
      </div>

      <section className="py-15 canvas:py-30">
        <div className="mx-auto w-full max-w-360 px-[3%] canvas:px-0">
          <p className="text-small text-black mb-4 font-bold lg:mb-8">OUR PRODUCTS</p>
          <h2 className="text-h4 lg:text-h2 text-black mb-5">{brand.name}의 제품을 만나보세요</h2>
          <p className="text-body mb-10 text-gray-750 lg:mb-20">
            엄선된 성분과 세심한 기획으로 완성한 제품들을 소개합니다.
          </p>
        </div>

          <div className="grid grid-cols-1 gap-5 px-[4%] lg:aspect-3/1 lg:auto-rows-fr lg:grid-cols-3 lg:gap-0 lg:px-0 lg:[&>*:not(:nth-child(-n+3))]:-mt-px lg:[&>*:not(:nth-child(3n+1))]:-ml-px">
          {lineup.map((product) => (
            <ProductGridItem key={product.id} product={product} bordered />
          ))}
        </div>
      </section>
    </>
  );
}
