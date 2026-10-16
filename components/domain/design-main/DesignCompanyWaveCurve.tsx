'use client';

import { useEffect, useRef, useState } from 'react';

export default function DesignCompanyWaveCurve() {
  const pathRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    const path = pathRef.current;
    if (path) setLength(path.getTotalLength());
  }, []);

  useEffect(() => {
    const section = pathRef.current?.closest('section');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d="M 96 0 C 55 8, 30 18, 38 32 C 46 46, 78 48, 70 60 C 62 72, 24 68, 27 80 C 30 90, 46 96, 53 100"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        style={{
          strokeDasharray: length,
          strokeDashoffset: isDrawn ? 0 : length,
          opacity: isDrawn ? 0.3 : 0,
          transition:
            'stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.6s ease-out',
        }}
      />
    </svg>
  );
}
