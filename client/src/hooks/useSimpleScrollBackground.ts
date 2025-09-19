import { useEffect, useRef } from "react";

interface UseSimpleScrollBackgroundOptions {
  sectionId: string;
}

// Simple global state to track active sections
const activeSections = new Set<string>();

function updateBackground() {
  const appShell = document.getElementById('app-shell');
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  if (!appShell || isDarkMode) return;
  
  const shouldBeBlack = activeSections.size > 0;
  
  console.log('[SimpleScroll] Updating background:', {
    activeSections: Array.from(activeSections),
    shouldBeBlack
  });
  
  if (shouldBeBlack) {
    appShell.style.backgroundColor = '#000000';
    appShell.style.color = '#ffffff';
  } else {
    appShell.style.backgroundColor = '';
    appShell.style.color = '';
  }
}

export function useSimpleScrollBackground({ sectionId }: UseSimpleScrollBackgroundOptions) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        console.log(`[SimpleScroll] ${sectionId}:`, {
          isIntersecting,
          ratio: entry.intersectionRatio
        });
        
        if (isIntersecting) {
          activeSections.add(sectionId);
        } else {
          activeSections.delete(sectionId);
        }
        
        updateBackground();
      },
      {
        threshold: [0, 0.1],
        rootMargin: "50px 0px 50px 0px"
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      activeSections.delete(sectionId);
      updateBackground();
    };
  }, [sectionId]);

  return sectionRef;
}