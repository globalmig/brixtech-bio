import type { ReactNode } from 'react';

interface CheckListProps {
  items: ReactNode[];
}

export default function CheckList({ items }: CheckListProps) {
  return (
    <ul className="bg-gray-50 flex flex-col gap-4 rounded-2xl p-6 lg:p-8">
      {items.map((item, index) => (
        <li key={index} className="text-text-sub text-body flex gap-2.5 leading-7">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
            className="text-text-default mt-0.5 shrink-0"
          >
            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.3" />
            <path
              d="M6 10.2L8.7 13L14 7.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
