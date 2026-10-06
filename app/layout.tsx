import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

import AosInit from '@/components/common/AosInit';

import './globals.css';

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
    url: "",
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
    'naver-site-verification': 'search- advider',
  }
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body>
        <AosInit />
        {children}
      </body>
    </html>
  );
}
