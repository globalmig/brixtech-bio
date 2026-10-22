import type { ReactNode } from 'react';

interface InfoRow {
  label: string;
  value: ReactNode;
}

interface InfoTableProps {
  rows: InfoRow[];
  size?: 'default' | 'large';
}

export default function InfoTable({ rows, size = 'default' }: InfoTableProps) {
  const isLarge = size === 'large';

  return (
    <dl className="divide-gray-300 divide-y border-t-2 border-b border-t-primary-2 border-b-gray-300">
      {rows.map((row, index) => (
        <div
          key={index}
          className={`grid grid-cols-[112px_1fr] gap-4 sm:grid-cols-[160px_1fr] ${
            isLarge ? 'py-10' : 'py-5'
          }`}
        >
          <dt
            className={`font-semibold ${isLarge ? 'text-[1.2rem]' : 'text-body'}`}
          >
            {row.label}
          </dt>
          <dd className={`text-text-sub leading-7 ${isLarge ? 'text-[1.2rem]' : 'text-body'}`}>
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
