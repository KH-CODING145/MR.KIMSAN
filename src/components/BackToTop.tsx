import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  /**
   * Optional custom scroll threshold in pixels or function to determine if past hero.
   * By default, it dynamically checks if scrolled past the `#home` hero element.
   */
  targetSectionId?: string;
  onScrollToTop?: () => void;
}

export default function BackToTop({
  targetSectionId = 'home',
  onScrollToTop,
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      const heroElement = document.getElementById(targetSectionId);
      const scrollY = window.scrollY || window.pageYOffset;

      if (heroElement) {
        // Compute the bottom offset of the hero section
        const heroBottom = heroElement.offsetTop + heroElement.offsetHeight;
        // Show once the user scrolls past 70% of the hero section or past its bottom
        setIsVisible(scrollY > Math.max(heroBottom - 200, 350));
      } else {
        // Fallback standard threshold
        setIsVisible(scrollY > 400);
      }
    };

    // Check once on mount
    checkScrollPosition();

    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    window.addEventListener('resize', checkScrollPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [targetSectionId]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (onScrollToTop) {
      onScrollToTop();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-5 right-5 z-40"
        >
          <button
            id="back-to-top-btn"
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-800/90 shadow-lg hover:shadow-indigo-500/25 hover:border-indigo-500/80 hover:text-indigo-600 dark:hover:text-indigo-400 backdrop-blur-md transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
          >
            {/* Ambient glow on hover */}
            <span className="absolute inset-0 rounded-full bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

            {/* Icon */}
            <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
