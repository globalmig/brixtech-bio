'use client';

import { useLocationMapContext } from './LocationMapContext';

export default function LocationMapTabButtons() {
  const { tabs, activeTab, setActiveKey } = useLocationMapContext();

  return (
    <div className="flex lg:flex-col gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => setActiveKey(tab.key)}
          className={`cursor-pointer rounded-full px-5 py-2 text-[1rem] outline-none w-[48%] lg:w-40
            ${tab.key === activeTab.key
              ? 'bg-primary-2 font-bold text-white focus-visible:bg-primary-2'
              : ' bg-gray-100 text-gray-500 hover:bg-gray-200 focus-visible:bg-primary-2 focus-visible:text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
