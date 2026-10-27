import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import AdminNav from '@/components/domain/admin/AdminNav';
import LogoutButton from '@/components/domain/admin/LogoutButton';
import { getCurrentUser } from '@/lib/supabase/auth';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="admin-shell flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b border-gray-350 bg-white px-6">
        <Link href="/admin/news" className="font-bold text-primary-2">
          BRIXTECH <span className="text-primary">ADMIN</span>
        </Link>
        <div className="flex items-center gap-4">
          <p className="text-small truncate text-text-info">
            관리자 {user.email}
          </p>
          <Link href="/" className="text-text-info hover:text-primary-2">
            사이트 돌아가기
          </Link>
          <span className="h-4 w-px bg-gray-300" aria-hidden />
          <LogoutButton />
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-56 shrink-0 border-r border-gray-350 bg-primary-2 p-5">
          <AdminNav />
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
