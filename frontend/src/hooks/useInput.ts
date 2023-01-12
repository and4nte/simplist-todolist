import { ChangeEvent, useState, useCallback } from 'react';

/**
 * custom hooks for TextField(input) Component.
 * @param {string} initialValue initial value of input
 */
const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return [value, handler, setValue] as [string, (e: ChangeEvent<HTMLInputElement>) => void, typeof setValue];
};

export default useInput;
