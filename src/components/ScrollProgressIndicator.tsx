import { useState, useEffect, useRef, useCallback, MouseEvent } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

interface ScrollProgressIndicatorProps {
  className?: string;
  showPercentageOnHover?: boolean;
}

export default function ScrollProgressIndicator({
  className = '',
  showPercentageOnHover = true,
}: ScrollProgressIndicatorProps) {
  const [percent, setPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; percentage: number } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Framer motion scroll hook
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 28,
    restDelta: 0.001,
  });

  // Keep numerical percentage in sync for ARIA and tooltip
  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
      setPercent(0);
      setIsVisible(false);
      return;
    }
    const currentPercent = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)));
    setPercent(currentPercent);
    setIsVisible(scrollTop > 15);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [updateScrollProgress]);

  // Allow user to click anywhere on the top bar to smoothly scrub / jump to that section
  const handleTrackClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = trackRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = ratio * docHeight;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const target = trackRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setHoverPosition({
      x: e.clientX,
      percentage: Math.round(ratio * 100),
    });
  };

  return (
    <aside
      aria-label="Reading progress indicator"
      className={`fixed top-0 left-0 right-0 z-[100] select-none ${className}`}
    >
      {/* Clickable interactive hit area container (height expanded for easy hover/scrub, visual bar remains sleek) */}
      <div
        ref={trackRef}
        id="scroll-progress-container"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${percent}% page read`}
        title={`Reading progress: ${percent}% (click to jump)`}
        onClick={handleTrackClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoverPosition(null);
        }}
        onMouseMove={handleMouseMove}
        className={`group relative w-full cursor-pointer transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ height: '6px' }}
      >
        {/* Subtle background track */}
        <div className="absolute inset-x-0 top-0 h-[3px] group-hover:h-[5px] bg-slate-200/40 dark:bg-slate-800/40 backdrop-blur-xs transition-all duration-200" />

        {/* Animated fill indicator using spring physics */}
        <motion.div
          id="scroll-progress-fill"
          style={{ scaleX }}
          className="absolute inset-x-0 top-0 h-[3px] group-hover:h-[5px] origin-left bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-400 dark:from-indigo-400 dark:via-cyan-400 dark:to-emerald-400 shadow-[0_0_10px_rgba(99,102,241,0.65)] transition-all duration-200"
        />

        {/* Glowing trailing pulse pin head */}
        <motion.div
          style={{ left: `${percent}%` }}
          className="absolute top-0 -translate-x-1/2 w-2 h-[5px] rounded-full bg-cyan-300 dark:bg-white shadow-[0_0_8px_rgba(34,211,238,0.9)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        />
      </div>

      {/* Floating percentage badge on hover */}
      {showPercentageOnHover && isHovered && hoverPosition && (
        <div
          className="fixed top-3 -translate-x-1/2 pointer-events-none z-[101] px-2.5 py-1 rounded-full bg-slate-900/90 dark:bg-white/95 text-white dark:text-slate-900 text-[11px] font-mono font-bold tracking-tight shadow-lg border border-slate-700/50 dark:border-slate-200/50 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 flex items-center gap-1.5"
          style={{ left: `${hoverPosition.x}px` }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 dark:bg-indigo-600 animate-pulse" />
          <span>Jump to {hoverPosition.percentage}%</span>
        </div>
      )}
    </aside>
  );
}
