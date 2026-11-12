import { NextResponse } from 'next/server';

import { getNewsList } from '@/lib/news';
import { htmlToSummary } from '@/lib/utils';

export const revalidate = 3600;

const BASE_URL = 'https://www.brixtech-bio.co.kr';
const FEED_URL = `${BASE_URL}/rss.xml`;
const SITE_TITLE = '브릭스텍바이오 기업 소식';
const SITE_DESCRIPTION = '브릭스텍바이오의 최신 기업 소식과 보도자료를 전달하는 RSS 피드입니다.';
const MAX_ITEMS = 20;

function escapeCdata(value: string) {
  return value.replace(/]]>/g, ']]]]><![CDATA[>');
}

export async function GET() {
  const newsList = (await getNewsList()).slice(0, MAX_ITEMS);

  const lastBuildDate = newsList[0]
    ? new Date(newsList[0].updatedAt).toUTCString()
    : new Date().toUTCString();

  const items = newsList
    .map((item) => {
      const link = `${BASE_URL}/news/${item.id}`;
      const pubDate = new Date(item.createdAt).toUTCString();

      return `
    <item>
      <title><![CDATA[${escapeCdata(item.title)}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${escapeCdata(htmlToSummary(item.content))}]]></description>
      <content:encoded><![CDATA[${escapeCdata(item.content)}]]></content:encoded>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${BASE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>ko-KR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
