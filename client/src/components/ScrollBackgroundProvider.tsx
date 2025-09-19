import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface ScrollBackgroundContextType {
  activate: (sectionId: string, active: boolean) => void;
  getScrollRoot: () => HTMLElement | null;
}

const ScrollBackgroundContext = createContext<ScrollBackgroundContextType | null>(null);

export function useScrollBackgroundContext() {
  const context = useContext(ScrollBackgroundContext);
  if (!context) {
    throw new Error('useScrollBackgroundContext must be used within ScrollBackgroundProvider');
  }
  return context;
}

interface ScrollBackgroundProviderProps {
  children: ReactNode;
}

export function ScrollBackgroundProvider({ children }: ScrollBackgroundProviderProps) {
  const activeSections = useRef(new Set<string>());
  const [isActive, setIsActive] = useState(false);
  const updateRef = useRef<number | null>(null);
  const appShellRef = useRef<HTMLElement | null>(null);

  // Debounced update function
  const updateDataAttribute = () => {
    if (updateRef.current) {
      cancelAnimationFrame(updateRef.current);
    }
    
    updateRef.current = requestAnimationFrame(() => {
      const shouldBeActive = activeSections.current.size > 0;
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      // Only apply scroll effect in light mode
      if (!isDarkMode && shouldBeActive !== isActive) {
        setIsActive(shouldBeActive);
        
        if (appShellRef.current) {
          appShellRef.current.setAttribute('data-scroll-dark', shouldBeActive.toString());
        }
      } else if (isDarkMode && isActive) {
        // Disable scroll effect in dark mode
        setIsActive(false);
        if (appShellRef.current) {
          appShellRef.current.setAttribute('data-scroll-dark', 'false');
        }
      }
    });
  };

  const activate = (sectionId: string, active: boolean) => {
    if (active) {
      activeSections.current.add(sectionId);
    } else {
      activeSections.current.delete(sectionId);
    }
    updateDataAttribute();
  };

  const getScrollRoot = () => appShellRef.current;

  // Initialize app shell reference
  useEffect(() => {
    appShellRef.current = document.getElementById('app-shell');
    if (!appShellRef.current) {
      console.warn('ScrollBackgroundProvider: #app-shell element not found');
    }
  }, []);

  // Listen for theme changes to disable effect in dark mode
  useEffect(() => {
    const observer = new MutationObserver(() => {
      updateDataAttribute();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [isActive]);

  return (
    <ScrollBackgroundContext.Provider value={{ activate, getScrollRoot }}>
      {children}
    </ScrollBackgroundContext.Provider>
  );
}