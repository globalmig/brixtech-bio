import { notFound, redirect } from 'next/navigation';

import { getOrderedBusinessCategories } from '@/lib/business';

export default async function BusinessIndexPage() {
  const categories = await getOrderedBusinessCategories();
  if (categories.length === 0) notFound();
  redirect(`/business/${categories[0].slug}`);
}
