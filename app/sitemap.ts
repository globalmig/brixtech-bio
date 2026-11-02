import type { MetadataRoute } from 'next';

import { getBrands } from '@/lib/brands';
import { getOrderedBusinessCategories } from '@/lib/business';
import { getNewsList } from '@/lib/news';
import { getAllProductsWithBrand } from '@/lib/products';
import { getVideoList } from '@/lib/videos';

const BASE_URL = 'https://www.brixtech-bio.co.kr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [brands, categories, news, products, videos] = await Promise.all([
    getBrands(),
    getOrderedBusinessCategories(),
    getNewsList(),
    getAllProductsWithBrand(),
    getVideoList(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about/vision`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/about/location`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/about/video`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/tech`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/tech/cultivation`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/business`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/brand`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/news`, changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE_URL}/news/inquiry`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const businessRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/business/${category.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const brandRoutes: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${BASE_URL}/brand/${brand.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map(({ brand, product }) => ({
    url: `${BASE_URL}/brand/${brand.slug}/${product.slug}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const newsRoutes: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${BASE_URL}/news/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const videoRoutes: MetadataRoute.Sitemap = videos.map((video) => ({
    url: `${BASE_URL}/about/video/${video.id}`,
    changeFrequency: 'monthly',
    priority: 0.4,
  }));

  return [
    ...staticRoutes,
    ...businessRoutes,
    ...brandRoutes,
    ...productRoutes,
    ...newsRoutes,
    ...videoRoutes,
  ];
}
