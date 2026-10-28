'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/admin/news', label: '기업 소식 관리' },
  { href: '/admin/videos', label: '영상 콘텐츠 관리' },
  { href: '/admin/brands', label: '브랜드 관리' },
  { href: '/admin/products', label: '제품 관리' },
  { href: '/admin/business', label: 'BUSINESS 관리' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'rounded-lg px-3 py-2.5 transition-colors',
              isActive
                ? 'bg-primary-2 font-semibold text-white'
                : 'text-gray-500 hover:bg-white/10'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
