import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // jsdom(isomorphic-dompurify 의존성)의 하위 모듈이 ESM 전용(@exodus/bytes)이라
  // Turbopack 프로덕션 번들에 포함되면 ERR_REQUIRE_ESM으로 깨짐 → 번들링 제외
  serverExternalPackages: ['isomorphic-dompurify', 'jsdom'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
