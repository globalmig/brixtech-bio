interface NutrientRow {
  label: string;
  value: string;
}

interface NutrientTableProps {
  /** 한 행에 좌/우로 나란히 표시할 성분 2개씩 묶어서 전달합니다. 홀수개면 마지막 행의 두 번째 칸은 null로 비웁니다. */
  rows: [NutrientRow, NutrientRow | null][];
}

function NutrientCell({ label, value }: NutrientRow) {
  return (
    <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr]">
      <p className="bg-gray-50 text-text-default text-body flex items-center p-7.5 font-semibold">
        {label}
      </p>
      <p className="text-text-sub text-body flex items-center p-7.5">{value}</p>
    </div>
  );
}

export default function NutrientTable({ rows }: NutrientTableProps) {
  return (
    <div className="border-gray-300 divide-gray-300 divide-y border-y">
      {rows.map(([left, right]) => (
        <div
          key={left.label}
          className="divide-gray-300 grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0"
        >
          <NutrientCell {...left} />
          {right ? <NutrientCell {...right} /> : null}
        </div>
      ))}
    </div>
  );
}
