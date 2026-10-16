interface CompareTableProps {
  headers: string[];
  rows: string[][];
}

export default function CompareTable({ headers, rows }: CompareTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-120 border-collapse text-[0.9rem]">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border-gray-300 bg-gray-50 text-text-info border px-3 py-2.5 text-left font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-gray-300 text-text-sub border px-3 py-2.5">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
