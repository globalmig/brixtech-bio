import type { Metadata } from 'next';
import Link from 'next/link';

import DesignBrandSection from '@/components/domain/design-main/DesignBrandSection';
import DesignBusinessSection from '@/components/domain/design-main/DesignBusinessSection';
import DesignCompanySection from '@/components/domain/design-main/DesignCompanySection';
import DesignContactSection from '@/components/domain/design-main/DesignContactSection';
import DesignNewsSection from '@/components/domain/design-main/DesignNewsSection';
import DesignTechnologySection from '@/components/domain/design-main/DesignTechnologySection';
import DesignHeroSection from '@/components/domain/design-main/DesignHeroSection';
import DesignTechnologySection2 from '@/components/domain/design-main/DesignTechnologySection2';

export const metadata: Metadata = {
  title: 'DESIGN DRAFT | BRIXTECHBIO',
  robots: { index: false, follow: false },
};

export default function DesignPage() {
  return (
    <>
      <DesignHeroSection />
      <DesignCompanySection />
      <DesignTechnologySection2 />
      <DesignBusinessSection />
      <DesignBrandSection />
      <DesignNewsSection />
      <DesignContactSection />
    </>
  );
}
