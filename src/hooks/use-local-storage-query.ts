import { useEffect, useState } from 'react';

export default function useLocalStorageQuery(key: string) {
  const [state, setState] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(key);

    if (stored) setState(stored);
  }, [key]);

  const setLocalStorage = (value: string) => {
    setState(value);

    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  };

  return [state, setLocalStorage] as const;
}
