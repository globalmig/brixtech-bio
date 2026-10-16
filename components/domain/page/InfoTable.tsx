import type { ReactNode } from 'react';

interface InfoRow {
  label: string;
  value: ReactNode;
}

interface InfoTableProps {
  rows: InfoRow[];
}

export default function InfoTable({ rows }: InfoTableProps) {
  return (
    <dl className="divide-gray-300 border-gray-300 divide-y border-y">
      {rows.map((row, index) => (
        <div
          key={index}
          className="grid grid-cols-[88px_1fr] gap-4 py-3 sm:grid-cols-[160px_1fr]"
        >
          <dt className="text-text-info text-small font-semibold">{row.label}</dt>
          <dd className="text-text-sub text-[0.95rem] leading-6">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
