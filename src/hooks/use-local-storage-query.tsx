import { useState } from 'react';
const useLocalStorageQuery = (
  key: string,
  defaultValue: string = ''
): [string, (value: string) => void] => {
  const [value, setValue] = useState<string>(() => {
    const stored = localStorage.getItem(key);

    return stored ?? defaultValue;
  });

  const updateValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, updateValue];
};

export default useLocalStorageQuery;
