import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseIntersectionObserverOptions {
  /**
   * Margin around the root. Defaults to accounting for fixed navbar and reading window.
   * Example: '-80px 0px -40% 0px' means top 80px (navbar) and bottom 40% are excluded.
   */
  rootMargin?: string;
  /**
   * Array of threshold percentages to track granular visibility.
   */
  threshold?: number | number[];
  /**
   * Initial active section before user scrolls.
   */
  defaultSection?: string;
}

/**
 * Custom hook that uses the browser IntersectionObserver API to determine
 * which section is currently visible in the viewport and update the activeSection state.
 *
 * @param sectionIds Array of HTML element IDs to observe (without `#`)
 * @param options IntersectionObserver options
 * @returns [activeSection, setActiveSection]
 */
export function useIntersectionObserver(
  sectionIds: string[],
  options: UseIntersectionObserverOptions = {}
): [string, (sectionId: string) => void] {
  const {
    rootMargin = '-80px 0px -35% 0px',
    threshold = [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    defaultSection = sectionIds[0] || 'home',
  } = options;

  const [activeSection, setActiveSectionState] = useState<string>(defaultSection);
  const isManualScrollLockRef = useRef<boolean>(false);
  const lockTimeoutRef = useRef<number | null>(null);

  // Map to store current intersection ratios of all monitored sections
  const intersectionRatiosRef = useRef<Map<string, number>>(new Map());

  // Programmatic setter with temporary scroll lock to ensure smooth-scroll clicks don't flicker
  const setActiveSection = useCallback((sectionId: string) => {
    setActiveSectionState(sectionId);
    isManualScrollLockRef.current = true;

    if (lockTimeoutRef.current) {
      window.clearTimeout(lockTimeoutRef.current);
    }

    lockTimeoutRef.current = window.setTimeout(() => {
      isManualScrollLockRef.current = false;
    }, 850);
  }, []);

  useEffect(() => {
    // Check if window and IntersectionObserver are supported
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    // Scroll boundary listener for very top and very bottom of the document
    const handleScrollBounds = () => {
      if (isManualScrollLockRef.current) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Top of page edge case
      if (scrollY < 60 && sectionIds.length > 0) {
        setActiveSectionState(sectionIds[0]);
        return;
      }

      // Bottom of page edge case (reaches footer / contact)
      if (windowHeight + scrollY >= documentHeight - 50 && sectionIds.length > 0) {
        setActiveSectionState(sectionIds[sectionIds.length - 1]);
      }
    };

    window.addEventListener('scroll', handleScrollBounds, { passive: true });

    // Instantiate IntersectionObserver
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isManualScrollLockRef.current) return;

      // Update ratios map for all triggered entries
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        if (id) {
          if (entry.isIntersecting) {
            intersectionRatiosRef.current.set(id, entry.intersectionRatio);
          } else {
            intersectionRatiosRef.current.delete(id);
          }
        }
      });

      // If at top or bottom boundaries, defer to boundary handler
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY < 60 && sectionIds.length > 0) {
        setActiveSectionState(sectionIds[0]);
        return;
      }

      if (windowHeight + scrollY >= documentHeight - 50 && sectionIds.length > 0) {
        setActiveSectionState(sectionIds[sectionIds.length - 1]);
        return;
      }

      // Find the currently intersecting section with the highest ratio or highest priority in DOM
      let bestSectionId: string | null = null;
      let maxRatio = -1;

      // Check sections in their registered order
      sectionIds.forEach((id) => {
        const ratio = intersectionRatiosRef.current.get(id) || 0;
        if (ratio > maxRatio && ratio > 0) {
          maxRatio = ratio;
          bestSectionId = id;
        }
      });

      if (bestSectionId) {
        setActiveSectionState(bestSectionId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null, // viewport
      rootMargin,
      threshold,
    });

    // Observe all existing section elements
    const elementsToObserve: HTMLElement[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elementsToObserve.push(el);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScrollBounds);
      if (lockTimeoutRef.current) {
        window.clearTimeout(lockTimeoutRef.current);
      }
      elementsToObserve.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [sectionIds, rootMargin, threshold]);

  return [activeSection, setActiveSection];
}

export default useIntersectionObserver;
