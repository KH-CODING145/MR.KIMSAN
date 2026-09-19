import { useState, useId, Key } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUp, Check, Clock, BookOpen, Sparkles } from 'lucide-react';
import { calculateRemainingReadingTime } from '../utils/readingTime';

export interface CircularScrollProgressProps {
  key?: Key;

  /**
   * Live scroll progress normalized between 0 and 1.
   */
  progress: number;

  /**
   * Callback fired when the user clicks the indicator to return to the top of the case study.
   */
  onScrollToTop?: () => void;

  /**
   * Total estimated reading time in minutes, used to compute live remaining reading time.
   */
  totalReadingMinutes?: number;

  /**
   * Case study title or short label for the tooltip.
   */
  title?: string;

  /**
   * Corner placement: 'bottom-right' (default), 'bottom-left', or 'top-right'.
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right';

  /**
   * Additional custom class names.
   */
  className?: string;

  /**
   * Whether to automatically hide when at 0% scroll progress. Default is false (always visible in case study).
   */
  autoHideAtZero?: boolean;
}

export default function CircularScrollProgress({
  progress,
  onScrollToTop,
  totalReadingMinutes,
  title,
  position = 'bottom-right',
  className = '',
  autoHideAtZero = false,
}: CircularScrollProgressProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const gradientId = useId();

  // Clamp normalized progress between 0 and 1
  const clampedProgress = Math.min(1, Math.max(0, progress || 0));
  const percentage = Math.round(clampedProgress * 100);
  const isCompleted = percentage >= 100;

  // Geometry calculations for SVG circular ring
  const size = 52;
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - clampedProgress * circumference;

  // Remaining reading time calculation
  const remainingTime = totalReadingMinutes
    ? calculateRemainingReadingTime(totalReadingMinutes, clampedProgress)
    : null;

  // Position styles
  const positionClasses = {
    'bottom-right': 'bottom-5 right-5 sm:bottom-6 sm:right-6',
    'bottom-left': 'bottom-5 left-5 sm:bottom-6 sm:left-6',
    'top-right': 'top-20 right-5 sm:top-20 sm:right-6',
  }[position];

  if (autoHideAtZero && percentage === 0) {
    return null;
  }

  return (
    <motion.aside
      aria-label="Case study scroll progress indicator"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.65, y: 16 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 12 }}
      transition={{
        type: 'spring',
        stiffness: 360,
        damping: 24,
        mass: 0.8,
        delay: 0.22,
      }}
      className={`absolute ${positionClasses} z-40 select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Detailed Depth Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute bottom-full right-0 mb-3 pointer-events-none w-52 p-3 rounded-2xl bg-slate-900/95 dark:bg-slate-800/95 text-white backdrop-blur-md border border-slate-700/60 dark:border-slate-600/60 shadow-xl shadow-slate-950/30 text-xs"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-slate-700/60 dark:border-slate-700">
              <span className="font-mono text-[10px] uppercase tracking-wider text-indigo-400 dark:text-indigo-300 font-semibold flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                <span>Reading Depth</span>
              </span>
              <span className="font-mono font-bold text-white text-[11px] flex items-center gap-1">
                {isCompleted && <Sparkles className="w-3 h-3 text-emerald-400" />}
                <span>{percentage}%</span>
              </span>
            </div>

            {title && (
              <p className="text-[11px] font-medium text-slate-200 truncate mb-1.5">
                {title}
              </p>
            )}

            {remainingTime && (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-300 mb-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>
                  {isCompleted ? 'Case study completed!' : `${remainingTime.formattedRemaining} left`}
                </span>
              </div>
            )}

            {onScrollToTop && (
              <div className="mt-2 pt-1.5 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-slate-400">
                <span>Click indicator</span>
                <span className="text-indigo-300 font-medium">Scroll to top &uarr;</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Circular Progress Button with 100% Pulse */}
      <motion.button
        type="button"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`Case study reading depth: ${percentage}%${isCompleted ? ' - Completed' : ''}`}
        aria-label={`Reading depth: ${percentage}%. ${isCompleted ? 'Completed. ' : ''}${onScrollToTop ? 'Click to jump to top.' : ''}`}
        onClick={onScrollToTop}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={
          isCompleted && !shouldReduceMotion
            ? {
                scale: [1, 1.06, 1, 1.04, 1],
                transition: {
                  duration: 2.2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                },
              }
            : {
                scale: 1,
              }
        }
        className={`group relative flex items-center justify-center w-[52px] h-[52px] rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer ${
          isCompleted
            ? 'shadow-emerald-500/25 border border-emerald-500/50 dark:border-emerald-400/50 ring-2 ring-emerald-500/25'
            : 'shadow-slate-900/10 dark:shadow-black/40 border border-slate-200/90 dark:border-slate-800'
        }`}
      >
        {/* Subtle Halo Pulse Ring when reaching 100% completion */}
        {isCompleted && !shouldReduceMotion && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: [0, 0.45, 0],
              scale: [0.95, 1.25, 1.45],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeOut',
            }}
            className="absolute inset-0 rounded-full border-2 border-emerald-500/60 dark:border-emerald-400/60 pointer-events-none"
          />
        )}

        {/* Circular Progress SVG Ring */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90 origin-center"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="60%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          {/* Background subtle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-slate-200/80 dark:stroke-slate-800"
            fill="transparent"
          />

          {/* Dynamic filled progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={isCompleted ? '#10b981' : `url(#${gradientId})`}
            strokeLinecap="round"
            fill="transparent"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              transition: 'stroke-dashoffset 150ms ease-out, stroke 250ms ease',
            }}
          />
        </svg>

        {/* Center Content: Percentage or Up-arrow on Hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isHovered && onScrollToTop ? (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.12 }}
              className="text-indigo-600 dark:text-indigo-400"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </motion.div>
          ) : isCompleted ? (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="text-emerald-600 dark:text-emerald-400"
            >
              <Check className="w-4 h-4 stroke-[3]" />
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center leading-none">
              <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-100">
                {percentage}
              </span>
              <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500 font-semibold -mt-0.5">
                %
              </span>
            </div>
          )}
        </div>
      </motion.button>
    </motion.aside>
  );
}
