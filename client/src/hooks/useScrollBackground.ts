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
  const body = document.body;
  const isDarkMode = documentElement.classList.contains('dark');
  
  // Skip effect in dark mode to avoid conflicts
  if (isDarkMode) {
    documentElement.classList.remove('scroll-dark');
    body.classList.remove('scroll-dark');
    return;
  }
  
  if (activeSections.size > 0) {
    documentElement.classList.add('scroll-dark');
    body.classList.add('scroll-dark');
  } else {
    documentElement.classList.remove('scroll-dark');
    body.classList.remove('scroll-dark');
  }
}

export function useScrollBackground({
  sectionId,
  threshold = 0.1,
  rootMargin = "0px"
}: UseScrollBackgroundOptions) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activeSections.add(sectionId);
          // Direct style application as backup
          document.body.style.backgroundColor = '#000000';
          document.body.style.transition = 'background-color 0.6s ease-in-out';
        } else {
          activeSections.delete(sectionId);
          if (activeSections.size === 0) {
            // Reset background when no sections are active
            document.body.style.backgroundColor = '';
          }
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
      activeSections.delete(sectionId);
      if (activeSections.size === 0) {
        document.body.style.backgroundColor = '';
      }
      updateBackgroundState();
    };
  }, [sectionId, threshold, rootMargin]);

  return sectionRef;
}