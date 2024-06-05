import { MutableRefObject, useEffect, useState } from "react";

// Custom hook to check if a target element is in view
export const useScroll = (
  ref: MutableRefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {}
): boolean => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const observer = new IntersectionObserver(([entry]) => {
        setIsInView(entry.isIntersecting);
      }, options);

      observer.observe(element);

      return () => {
        observer.unobserve(element);
      };
    }
  }, [ref, options]);

  return isInView;
};