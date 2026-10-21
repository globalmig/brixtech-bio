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

  return (
    <footer className="bg-primary-3 text-white">
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
            주소: 000시 00구 00로 00길 00
          </li>
        </ul>
        <p className="text-small mt-4 text-white/40">
          Copyright BRIXTECHBIO 2026. All rights reserved.
        </p>
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
              className="bg-primary-2 text-sm"
            >
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
