'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';

import { AppStore } from '@/store';
import { setupStore } from '@/store';

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = setupStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
