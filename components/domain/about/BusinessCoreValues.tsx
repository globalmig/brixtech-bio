'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { BUSINESS_CATEGORIES } from '@/constants/home';

const AUTOPLAY_INTERVAL = 3000;

const BACKGROUND_IMAGES = [
  {
    desktop: '/images/about/about-health.png',
    mobile: '/images/about/about-health-mo.png',
  },
  {
    desktop: '/images/about/about-cosmetics.png',
    mobile: '/images/about/about-cosmetics-mo.png',
  },
  {
    desktop: '/images/about/about-pet-food.png',
    mobile: '/images/about/about-pet-food-mo.png',
  },
  {
    desktop: '/images/about/about-air.png',
    mobile: '/images/about/about-air-mo.png',
  },
  {
    desktop: '/images/about/about-smart-farm.png',
    mobile: '/images/about/about-smart-farm-mo.png',
  },
];

export default function BusinessCoreValues() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % BUSINESS_CATEGORIES.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="relative w-full overflow-hidden bg-primary-2 sm:h-115 lg:h-185"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0" aria-hidden>
        {BUSINESS_CATEGORIES.map((category, index) => {
          const images = BACKGROUND_IMAGES[index];

          return (
            <div
              key={category.title}
              className={`absolute inset-0 transition-opacity duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <Image
                src={images?.desktop ?? category.image}
                alt={category.title}
                fill
                sizes="100vw"
                priority={index === 0}
                className="hidden object-cover sm:block"
              />
              <Image
                src={images?.mobile ?? category.image}
                alt={category.title}
                fill
                sizes="100vw"
                priority={index === 0}
                className="block object-cover sm:hidden"
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <ul className="relative z-10 flex flex-col sm:grid sm:h-full sm:grid-cols-2 lg:grid-cols-5">
        {BUSINESS_CATEGORIES.map((category, index) => {
          const isActive = index === activeIndex;

          return (
            <li
              key={category.title}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              tabIndex={0}
              className={`relative flex cursor-pointer flex-col justify-center border-t border-white/15 p-8 outline-none transition-colors duration-300 first:border-t-0 sm:flex-1 sm:justify-end sm:border-t-0 sm:border-l sm:p-6 sm:first:border-l-0 lg:p-8 ${isActive ? 'bg-black/35 backdrop-blur-lg' : ''
                }`}
            >
              <div
                className={`transition-transform duration-500 ${isActive ? '-translate-y-2 lg:-translate-y-4' : ''}`}
              >
                <div
                  className={`relative mb-4 size-10 transition-opacity duration-300 lg:size-20 ${isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  <Image src={category.icon} alt={category.title} fill sizes="48px" />
                </div>

                <p className="mb-3 text-base text-white">{category.title}</p>
                <p className="text-h4 font-semibold text-white tracking-wide uppercase">
                  {category.label}
                </p>
                <p className="mt-4 text-small lg:text-base text-white">{category.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
