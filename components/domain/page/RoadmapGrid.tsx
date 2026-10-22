interface RoadmapItem {
  year: string;
  yearLabel?: string;
  description: string[];
}

interface RoadmapGridProps {
  items: RoadmapItem[];
}

export default function RoadmapGrid({ items }: RoadmapGridProps) {
  return (
    <div className="border-t-black border-t-2">
      {items.map((item) => (
        <div
          key={item.year}
          className="border-divider-default flex flex-col gap-3 border-b py-8 sm:flex-row sm:items-start sm:gap-10 lg:py-10"
        >
          <div className="shrink-0 sm:w-40 lg:w-48">
            <p className="text-h5 lg:text-h3 text-black font-bold">{item.year}</p>
            <p className="text-black text-[1rem] font-semibold mt-1">{item.yearLabel}</p>
          </div>

          <div>
            {item.description.map((line) => (
              <p key={line} className="text-black text-[1rem] leading-7">
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
