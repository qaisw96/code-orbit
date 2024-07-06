import { useEffect, MutableRefObject } from 'react';

const useIntersectionObserver = (
  observerRef: MutableRefObject<HTMLElement | null>,
  callback: () => void,
  dependencies: any[]
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef, callback, ...dependencies]);
};

export default useIntersectionObserver;
