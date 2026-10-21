interface RoadmapItem {
  year: string;
  yearLabel: string;
  description: string[];
}

interface RoadmapGridProps {
  items: RoadmapItem[];
}

export default function RoadmapGrid({ items }: RoadmapGridProps) {
  return (
    <div className="border-divider-strong border-t">
      {items.map((item) => (
        <div
          key={item.year}
          className="border-divider-default flex flex-col gap-3 border-b py-8 sm:flex-row sm:items-start sm:justify-between sm:gap-10 lg:py-10"
        >
          <div className="shrink-0">
            <p className="text-h5 lg:text-h4 text-black font-bold">{item.year}</p>
            <p className="text-small text-gray-750 mt-1">{item.yearLabel}</p>
          </div>

          <div>
            {item.description.map((line) => (
              <p key={line} className="text-text-sub text-[0.95rem] leading-7 lg:text-body">
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
