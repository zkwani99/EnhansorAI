import { useEffect, useRef } from "react";

interface UseScrollBackgroundOptions {
  backgroundColor: string;
  threshold?: number;
  rootMargin?: string;
}

export function useScrollBackground({
  backgroundColor = "#000000",
  threshold = 0.3,
  rootMargin = "0px"
}: UseScrollBackgroundOptions) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const body = document.body;
        
        if (entry.isIntersecting) {
          // Section is in view - apply dark background
          body.style.backgroundColor = backgroundColor;
          body.style.transition = "background-color 0.6s ease-in-out";
        } else {
          // Section is out of view - revert to default (white)
          body.style.backgroundColor = "#ffffff";
          body.style.transition = "background-color 0.6s ease-in-out";
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      // Clean up - reset to white background on unmount
      document.body.style.backgroundColor = "#ffffff";
    };
  }, [backgroundColor, threshold, rootMargin]);

  return sectionRef;
}