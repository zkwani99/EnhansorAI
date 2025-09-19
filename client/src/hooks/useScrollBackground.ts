import { useEffect, useRef } from "react";
import { useScrollBackgroundContext } from "../components/ScrollBackgroundProvider";

interface UseScrollBackgroundOptions {
  sectionId: string;
  threshold?: number;
  rootMargin?: string;
}

export function useScrollBackground({
  sectionId,
  threshold = 0.1,
  rootMargin = "200px 0px 0px 0px"
}: UseScrollBackgroundOptions) {
  const { activate, getScrollRoot } = useScrollBackgroundContext();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = getScrollRoot();
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Activate as soon as the section starts entering the viewport
        const isIntersecting = entry.isIntersecting;
        activate(sectionId, isIntersecting);
      },
      {
        root,
        threshold: [0, 0.1],
        rootMargin
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      // Clean up by deactivating this section
      activate(sectionId, false);
    };
  }, [sectionId, threshold, rootMargin, activate, getScrollRoot]);

  return sectionRef;
}