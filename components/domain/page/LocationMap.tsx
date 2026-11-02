'use client';

import { useLocationMapContext } from './LocationMapContext';

export default function LocationMap() {
  const { activeTab } = useLocationMapContext();

  const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    activeTab.mapQuery ?? activeTab.address,
  )}&z=16&output=embed`;

  return (
    <div className="relative h-80 w-full overflow-hidden bg-gray-100 md:h-112 lg:h-128">
      <iframe
        key={activeTab.key}
        src={mapEmbedSrc}
        title={activeTab.mapTitle}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0"
      />
    </div>
  );
}
