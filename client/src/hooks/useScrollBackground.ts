import { useEffect, useRef } from "react";
import { useScrollBackgroundContext } from "../components/ScrollBackgroundProvider";

interface UseScrollBackgroundOptions {
  sectionId: string;
  threshold?: number;
  rootMargin?: string;
}

export function useScrollBackground({
  sectionId,
  threshold = 0.5,
  rootMargin = "0px 0px -40% 0px"
}: UseScrollBackgroundOptions) {
  const { activate, getScrollRoot } = useScrollBackgroundContext();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = getScrollRoot();
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only activate when at least 50% of the section is visible
        const isIntersecting = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        activate(sectionId, isIntersecting);
      },
      {
        root,
        threshold: [0, 0.3, 0.5, 0.7],
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