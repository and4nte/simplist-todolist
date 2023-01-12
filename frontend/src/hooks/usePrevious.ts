import { useRef, useEffect } from 'react';

/**
 * custom hooks for caching the previous value
 * @param {any} value initial value
 */
const usePrevious = (value: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
export default usePrevious;
