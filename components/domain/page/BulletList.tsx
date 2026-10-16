import type { ReactNode } from 'react';

interface BulletListProps {
  items: ReactNode[];
}

export default function BulletList({ items }: BulletListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, index) => (
        <li key={index} className="text-text-sub flex gap-2.5 text-[0.95rem] leading-6">
          <span className="bg-primary mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
