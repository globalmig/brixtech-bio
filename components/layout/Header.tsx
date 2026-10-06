'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { NAV_ITEMS } from '@/constants/nav';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopNavOpen, setIsDesktopNavOpen] = useState(false);
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);
  const [subMenuLeft, setSubMenuLeft] = useState(0);
  const [columnWidths, setColumnWidths] = useState<number[]>(() => NAV_ITEMS.map(() => 0));
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileItem(null);
  };

  useEffect(() => {
    const updateSubMenuLayout = () => {
      const logoEl = logoRef.current;
      const itemEls = navItemRefs.current;
      if (!logoEl || itemEls.some((el) => !el)) return;
      const logoRect = logoEl.getBoundingClientRect();
      const itemRects = itemEls.map((el) => el!.getBoundingClientRect());
      setSubMenuLeft(itemRects[0].left - logoRect.left);
      setColumnWidths(itemRects.map((rect) => rect.width));
    };
    updateSubMenuLayout();
    window.addEventListener('resize', updateSubMenuLayout);
    return () => window.removeEventListener('resize', updateSubMenuLayout);
  }, []);

  return (
    <header
      className={`absolute inset-x-0 top-0 z-20 transition-colors duration-200 ${
        isDesktopNavOpen ? 'bg-white text-text-default' : 'text-white'
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
          className="hidden lg:flex lg:gap-x-17"
          onMouseEnter={() => setIsDesktopNavOpen(true)}
        >
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.href}
              ref={(el) => {
                navItemRefs.current[index] = el;
              }}
              href={item.href}
              onClick={() => setIsDesktopNavOpen(false)}
              onMouseEnter={() => setHoveredNavItem(item.href)}
              className="text-h5 font-semibold tracking-wide whitespace-nowrap hover:opacity-80"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="flex h-8 w-8 flex-col items-end justify-center gap-1.5 lg:hidden"
          aria-label="메뉴 열기"
          aria-expanded={isMenuOpen}
        >
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-4 bg-white" />
        </button>
      </div>

      {isDesktopNavOpen ? (
        <div
          className="border-divider-default hidden border-t bg-white lg:block"
          onMouseEnter={() => setIsDesktopNavOpen(true)}
        >
          <div className="mx-auto w-full max-w-(--width-app-canvas) px-5 py-6 md:px-8 canvas:px-0">
            <div
              className="grid gap-x-17"
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
            item.children ? (
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
    </header>
  );
}
