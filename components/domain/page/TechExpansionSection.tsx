'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const NUMBER_SLOT_MS = 1800;

interface ExpansionGroup {
  goal: string;
  title: string;
  items: string[];
}

interface TechExpansionSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  groups: ExpansionGroup[];
}

export default function TechExpansionSection({
  eyebrow = 'EXPANSION',
  title,
  description,
  groups,
}: TechExpansionSectionProps) {
  const stepsRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const itemsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fixedHeight, setFixedHeight] = useState<number>();

  const measureFixedHeight = useCallback(() => {
    let baseHeightSum = 0;
    let maxItemsHeight = 0;

    groups.forEach((_, index) => {
      const rowEl = rowRefs.current[index];
      const itemsEl = itemsRefs.current[index];
      if (!rowEl || !itemsEl) return;

      const renderedItemsHeight = itemsEl.clientHeight;
      const itemsHeight = itemsEl.scrollHeight;

      baseHeightSum += rowEl.clientHeight - renderedItemsHeight;
      maxItemsHeight = Math.max(maxItemsHeight, itemsHeight);
    });

    setFixedHeight(baseHeightSum + maxItemsHeight);
  }, [groups]);

  useLayoutEffect(() => {
    measureFixedHeight();
  }, [measureFixedHeight]);

  useEffect(() => {
    window.addEventListener('resize', measureFixedHeight);
    return () => window.removeEventListener('resize', measureFixedHeight);
  }, [measureFixedHeight]);

  useEffect(() => {
    const node = stepsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % groups.length);
    }, NUMBER_SLOT_MS);

    return () => clearInterval(interval);
  }, [visible, groups.length]);

  return (
    <section>
      <div className="mx-auto w-full max-w-(--width-app-canvas) px-[4%] py-15 md:px-8 canvas:px-0 lg:pt-30 lg:pb-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          <div className="lg:flex-1">
            <p className="text-small text-black mb-4 flex items-center gap-3 font-bold">
              {eyebrow}
            </p>
            <h2 className="text-h4 text-black mb-5 whitespace-pre-line lg:text-h2">{title}</h2>
            {description ? (
              <p className="text-body text-black/50 mb-10 lg:mb-25">{description}</p>
            ) : null}
          </div>

          <div
            ref={stepsRef}
            style={{ height: fixedHeight }}
            className="overflow-hidden border-t border-black lg:w-200"
          >
            {groups.map((group, index) => {
              const isActive = visible && activeIndex === index;

              return (
                <div
                  key={group.goal}
                  ref={(el) => {
                    rowRefs.current[index] = el;
                  }}
                  className="border-divider-default relative isolate overflow-hidden border-b py-8"
                >
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute left-0 top-5 -z-10 text-[3.5rem] leading-none font-bold text-primary-2 italic select-none transition-all duration-1000 ease-out ${isActive ? 'opacity-15' : 'opacity-0'}`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div
                    className={`select-none pt-5 transition-transform duration-1000 ease-out ${isActive ? 'translate-x-4' : 'translate-x-0'}`}
                  >
                    <h3 className="text-h5 text-black mb-2 lg:text-h4">{group.title}</h3>
                  </div>

                  <div
                    className={`grid transition-all duration-700 ease-out ${isActive ? 'mt-5 grid-rows-[1fr] opacity-100 translate-x-4' : 'mt-0 grid-rows-[0fr] opacity-0 translate-x-0'}`}
                  >
                    <div
                      ref={(el) => {
                        itemsRefs.current[index] = el;
                      }}
                      className="overflow-hidden"
                    >
                      <ul className="flex flex-col gap-3">
                        {group.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="text-black/50 flex gap-2.5 text-[0.95rem] leading-6"
                          >
                            <span className="bg-primary-2/70 mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
