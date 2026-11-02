'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export interface LocationMapTab {
  key: string;
  label: string;
  address: string;
  mapQuery?: string;
  mapTitle: string;
}

interface LocationMapContextValue {
  tabs: LocationMapTab[];
  activeTab: LocationMapTab;
  setActiveKey: (key: string) => void;
}

const LocationMapContext = createContext<LocationMapContextValue | null>(null);

export function LocationMapProvider({
  tabs,
  children,
}: {
  tabs: LocationMapTab[];
  children: ReactNode;
}) {
  const [activeKey, setActiveKey] = useState(tabs[0]?.key);
  const activeTab = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];

  if (!activeTab) return null;

  return (
    <LocationMapContext.Provider value={{ tabs, activeTab, setActiveKey }}>
      {children}
    </LocationMapContext.Provider>
  );
}

export function useLocationMapContext() {
  const context = useContext(LocationMapContext);
  if (!context) {
    throw new Error('useLocationMapContext must be used within LocationMapProvider');
  }
  return context;
}
