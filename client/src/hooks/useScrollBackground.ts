import { useEffect, useRef } from "react";

interface UseScrollBackgroundOptions {
  sectionId: string;
  threshold?: number;
  rootMargin?: string;
}

// Global state to track which sections are intersecting
const activeSections = new Set<string>();

function updateBackgroundState() {
  const documentElement = document.documentElement;
  const isDarkMode = documentElement.classList.contains('dark');
  
  // Skip effect in dark mode to avoid conflicts
  if (isDarkMode) {
    documentElement.classList.remove('scroll-dark');
    return;
  }
  
  if (activeSections.size > 0) {
    documentElement.classList.add('scroll-dark');
  } else {
    documentElement.classList.remove('scroll-dark');
  }
}

export function useScrollBackground({
  sectionId,
  threshold = 0.3,
  rootMargin = "0px"
}: UseScrollBackgroundOptions) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activeSections.add(sectionId);
        } else {
          activeSections.delete(sectionId);
        }
        updateBackgroundState();
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
      // Clean up - remove this section from active sections
      activeSections.delete(sectionId);
      updateBackgroundState();
    };
  }, [sectionId, threshold, rootMargin]);

  return sectionRef;
}