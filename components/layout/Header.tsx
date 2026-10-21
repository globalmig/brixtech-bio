'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';

import { Button } from '@/components/common/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/common/Dialog';
import { NAV_ITEMS } from '@/constants/nav';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopNavOpen, setIsDesktopNavOpen] = useState(false);
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);
  const [layoutMetrics, setLayoutMetrics] = useState({
    logoLeft: 0,
    navRight: 0,
    itemWidths: NAV_ITEMS.map(() => 0),
  });
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // 데스크톱 서브메뉴 상/하위 카테고리 "세트" 정렬 계산용.
  // nav는 hover 시 gap-x-17 -> gap-x-24로 CSS transition과 함께 넓어지는데,
  // 애니메이션 도중 getBoundingClientRect로 위치를 측정하면 중간값(stale)을 읽게 되어
  // 서브메뉴가 상위 카테고리와 어긋난다. 그래서 위치는 애니메이션에 의존하지 않고
  // (gap에 영향받지 않는) 아이템 폭 + 목표 gap 값으로 직접 계산한다.
  const NAV_GAP_REM = { closed: 17 * 0.25, open: 24 * 0.25 } as const;
  const ROOT_FONT_SIZE_PX = 16;
  const gapPx = (isDesktopNavOpen ? NAV_GAP_REM.open : NAV_GAP_REM.closed) * ROOT_FONT_SIZE_PX;
  const { logoLeft, navRight, itemWidths } = layoutMetrics;
  const totalNavWidth =
    itemWidths.reduce((sum, width) => sum + width, 0) +
    gapPx * Math.max(itemWidths.length - 1, 0);
  const navLeft = navRight - totalNavWidth;
  const subMenuLeft = navLeft - logoLeft;
  const columnWidths = itemWidths;

  const openComingSoon = (e: MouseEvent) => {
    e.preventDefault();
    setIsComingSoonOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileItem(null);
  };

  useLayoutEffect(() => {
    const updateLayoutMetrics = () => {
      const logoEl = logoRef.current;
      const navEl = navRef.current;
      const itemEls = navItemRefs.current;
      if (!logoEl || !navEl || itemEls.some((el) => !el)) return;
      const logoRect = logoEl.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();
      const itemRects = itemEls.map((el) => el!.getBoundingClientRect());
      setLayoutMetrics({
        logoLeft: logoRect.left,
        navRight: navRect.right,
        itemWidths: itemRects.map((rect) => rect.width),
      });
    };
    updateLayoutMetrics();
    window.addEventListener('resize', updateLayoutMetrics);
    return () => window.removeEventListener('resize', updateLayoutMetrics);
  }, [isDesktopNavOpen]);

  return (
    <header
      className={`absolute inset-x-0 top-0 z-20 transition-colors duration-200 ${
        isDesktopNavOpen
          ? 'bg-white text-text-default'
          : isHome
            ? 'text-white'
            : 'text-text-default'
      }`}
      onMouseLeave={() => {
        setIsDesktopNavOpen(false);
        setHoveredNavItem(null);
      }}
    >
      <div className="mx-auto flex w-full max-w-(--width-app-canvas) items-center justify-between px-5 py-6 md:px-8 canvas:px-0">
        <Link
          ref={logoRef}
          href="/"
          className="text-h4 lg:text-h2 font-bold tracking-tight"
        >
          BRIXTECHBIO
        </Link>

        <nav
          ref={navRef}
          className={`hidden lg:flex lg:items-center lg:transition-[gap] lg:duration-300 lg:ease-out ${
            isDesktopNavOpen ? 'lg:gap-x-24' : 'lg:gap-x-17'
          }`}
          onMouseEnter={() => setIsDesktopNavOpen(true)}
        >
          {NAV_ITEMS.map((item, index) =>
            item.external ? (
              <Link
                key={item.href}
                ref={(el) => {
                  navItemRefs.current[index] = el;
                }}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled="true"
                onClick={openComingSoon}
                className="text-h6 rounded-full border border-current px-4 py-1.5 tracking-wide whitespace-nowrap opacity-90"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.href}
                ref={(el) => {
                  navItemRefs.current[index] = el;
                }}
                href={item.href}
                onClick={() => setIsDesktopNavOpen(false)}
                onMouseEnter={() => setHoveredNavItem(item.href)}
                className="text-h5 font-semibold whitespace-nowrap hover:opacity-80"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="flex h-8 w-8 flex-col items-end justify-center gap-1.5 lg:hidden"
          aria-label="메뉴 열기"
          aria-expanded={isMenuOpen}
        >
          <span className={`h-0.5 w-6 ${isHome ? 'bg-white' : 'bg-text-default'}`} />
          <span className={`h-0.5 w-4 ${isHome ? 'bg-white' : 'bg-text-default'}`} />
        </button>
      </div>

      {isDesktopNavOpen ? (
        <div
          className="border-divider-default hidden border-t bg-white lg:block"
          onMouseEnter={() => setIsDesktopNavOpen(true)}
        >
          <div className="mx-auto w-full max-w-(--width-app-canvas) px-5 py-6 md:px-8 canvas:px-0">
            <div
              className="grid gap-x-24"
              style={{
                marginLeft: subMenuLeft,
                gridTemplateColumns: columnWidths.map((width) => `${width}px`).join(' '),
              }}
            >
              {NAV_ITEMS.map((item) => (
                <ul
                  key={item.href}
                  className="flex flex-col items-center gap-5"
                  onMouseEnter={() => setHoveredNavItem(item.href)}
                >
                  {item.children?.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={() => setIsDesktopNavOpen(false)}
                        className={`text-small lg:text-[1rem] hover:font-bold block text-center whitespace-nowrap ${
                          hoveredNavItem === item.href
                            ? 'text-text-default'
                            : 'text-text-info'
                        }`}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`bg-primary-3 fixed inset-0 z-30 flex h-full w-full flex-col px-5 py-6 transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex items-center justify-between">
          <span className="text-h6 font-bold">BRIXTECHBIO</span>
          <button
            type="button"
            onClick={closeMobileMenu}
            className="flex h-8 w-8 items-center justify-center"
            aria-label="메뉴 닫기"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M2 2L18 18M18 2L2 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="mt-10 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item) =>
            item.external ? (
              <Link
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled="true"
                onClick={openComingSoon}
                className="text-small mt-2 w-fit rounded-full border border-current px-4 py-1.5 opacity-70"
              >
                {item.label}
              </Link>
            ) : item.children ? (
              <div key={item.href}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenMobileItem((prev) => (prev === item.href ? null : item.href))
                  }
                  className="text-h5 flex w-full items-center justify-between rounded-lg px-2 py-3 font-semibold hover:bg-white/10"
                  aria-expanded={openMobileItem === item.href}
                >
                  {item.label}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`transition-transform duration-200 ${
                      openMobileItem === item.href ? 'rotate-180' : ''
                    }`}
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div
                  className={`grid transition-all duration-200 ${
                    openMobileItem === item.href
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <ul className="flex flex-col gap-1 overflow-hidden pb-2 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={closeMobileMenu}
                          className="text-body block rounded-lg px-2 py-2.5 text-white/80 hover:bg-white/10"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="text-h5 rounded-lg px-2 py-3 font-semibold hover:bg-white/10"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
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
    </header>
  );
}
