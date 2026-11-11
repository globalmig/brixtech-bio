import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

import AosInit from '@/components/common/AosInit';
import JsonLd from '@/components/common/JsonLd';

import './globals.css';

const BASE_URL = 'https://www.brixtech-bio.co.kr';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '브릭스텍바이오',
  alternateName: 'BRIXTECHBIO',
  url: BASE_URL,
  logo: `${BASE_URL}/images/og_image.png`,
  description:
    '브릭스텍바이오는 미세조류 기반 기능성 원료와 친환경 바이오 응용 제품을 개발하는 마이크로알지 바이오 플랫폼입니다.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '강남대로 101안길 13, B1~4F',
    addressLocality: '서울특별시',
    addressCountry: 'KR',
  },
  telephone: '+82-2-6242-6584',
  email: 'admin@brixtech-bio.co.kr',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '브릭스텍바이오',
  url: BASE_URL,
};

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BRIXTECHBIO | 브릭스텍바이오',
  description:
    '브릭스텍바이오는 미세조류 기반 기능성 원료와 친환경 바이오 응용 제품을 개발하는 마이크로알지 바이오 플랫폼입니다.',
  keywords: [
    "브릭스텍", "브릭스텍바이오", "미세조류", "스피루리나", "배양", "배양기술", "바이오", "펫푸드", "화장품", "건강식품", "반려동물", "스마트팜",
  ],
  openGraph: {
    title: "BRIXTECHBIO | 브릭스텍바이오",
    description: "브릭스텍바이오는 미세조류 기반 기능성 원료와 친환경 바이오 응용 제품을 개발하는 마이크로알지 바이오 플랫폼입니다.",
    url: "https://www.brixtech-bio.co.kr",
    siteName: "브릭스텍바이오",
    images: [
      {
        url: "/images/og_image.png",
        width: 1200,
        height: 630,
        alt: "브릭스텍바이오",
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  other: {
    'naver-site-verification': 'f522bb90e196439746e7d5147578d0f1d9a1fa8e',
  }
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <AosInit />
        {children}
      </body>
    </html>
  );
}
