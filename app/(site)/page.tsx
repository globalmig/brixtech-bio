import BrandSection from '@/components/domain/home/BrandSection';
import BusinessSection from '@/components/domain/home/BusinessSection';
import ContactSection from '@/components/domain/home/ContactSection';
import HeroSection from '@/components/domain/home/HeroSection';
import NewsSection from '@/components/domain/home/NewsSection';
import OurCompanySection from '@/components/domain/home/OurCompanySection';
import ProductSection from '@/components/domain/home/ProductSection';
import TechnologySection from '@/components/domain/home/TechnologySection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OurCompanySection />
      <ProductSection />
      <TechnologySection />
      <BusinessSection />
      <BrandSection />
      <NewsSection />
      <ContactSection />
    </>
  );
}
