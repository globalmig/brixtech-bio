interface RoadmapItem {
  period: string;
  description: string;
}

interface RoadmapGridProps {
  items: RoadmapItem[];
}

export default function RoadmapGrid({ items }: RoadmapGridProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      {items.map((item) => (
        <div
          key={item.period}
          className="border-gray-300 bg-gray-50 rounded-2xl border p-5 sm:min-w-56 sm:flex-1"
        >
          <p className="text-small text-primary mb-2 font-bold tracking-wide">
            {item.period}
          </p>
          <p className="text-text-sub text-[0.9rem] leading-6">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
