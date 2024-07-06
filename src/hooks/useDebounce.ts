import { useEffect, useRef } from 'react';

const useDebounce = (
  callback: () => void,
  delay: number,
  dependencies: any[]
) => {
  const debounceTimeout = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, dependencies);
};

export default useDebounce;
