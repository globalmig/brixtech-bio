"use client"
import Link from 'next/link';
import type { MouseEvent } from 'react';
import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/common/Dialog';
import { NAV_ITEMS } from '@/constants/nav';

export default function Footer() {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const openComingSoon = (e: MouseEvent) => {
    e.preventDefault();
    setIsComingSoonOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-primary-3 text-white">
      <Button
        onClick={scrollToTop}
        aria-label="맨 위로 이동"
        className="fixed bottom-8 right-5 z-50 size-12 rounded-full p-0 shadow-lg md:right-8"
      >
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 10L8 6L12 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      <div className="mx-auto w-full max-w-(--width-app-canvas) px-5 py-10 md:px-8 canvas:px-0 lg:py-12">
        <div className="flex flex-col gap-6 border-b border-white/15 pb-8 md:flex-row md:items-start md:justify-between">
          <span className="text-h4">BRIXTECHBIO</span>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-small text-white/70 hover:text-white"
                    onClick={openComingSoon}
                  >
                    {item.label}
                  </Link>
                </li>
              ) :
                (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-small text-white/70 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
          </ul>
        </div>

        <ul className="flex flex-col gap-2 pt-8">
          <li className="text-h5 font-bold">02-6242-6584</li>
          <li className="text-small text-white/60">
            평일 09:00~18:00 / 주말 및 공휴일 휴무
          </li>
          <li className="text-small text-white/40">
            서울 사무소: 서울시 강남대로 101안길 13, B1~4F <br/>
            Lab. 연구실: 전남 나주시 빛가람로 737, 203호·303호
          </li>
          <li className="text-small text-white/40">
            대표자: 김선영 · 사업자등록번호: 858-81-04141 · 이메일: admin@brixtech-bio.co.kr
          </li>
        </ul>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            <li>
              <Link href="/privacy" className="text-small text-white/70 hover:text-white">
                개인정보처리방침
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-small text-white/70 hover:text-white">
                서비스 이용약관
              </Link>
            </li>
          </ul>

          <p className="text-small text-white/40">
            Copyright BRIXTECHBIO 2026. All rights reserved.
          </p>
        </div>
      </div>
      <Dialog open={isComingSoonOpen} onOpenChange={setIsComingSoonOpen}>
        <DialogContent className="w-80">
          <DialogHeader
            title="자사몰은 현재 준비중입니다."
          />
          <DialogFooter>
            <Button
              onClick={() => setIsComingSoonOpen(false)}
              size={'small'}
              className="text-sm"
            >
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
