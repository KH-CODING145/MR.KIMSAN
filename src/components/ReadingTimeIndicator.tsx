import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, BookOpen, Sparkles, Gauge, ChevronDown, Check } from 'lucide-react';
import {
  ReadingSpeed,
  READING_SPEEDS,
  calculateReadingTime,
  calculateRemainingReadingTime,
  ReadingTimeResult,
} from '../utils/readingTime';
import Tooltip from './Tooltip';

export interface ReadingTimeIndicatorProps {
  /**
   * The text or array of strings to calculate reading time from.
   */
  content: string | (string | undefined | null)[];

  /**
   * Presentation variant:
   * - 'badge': Compact pill indicator for project cards, lists, and summary headers.
   * - 'banner': Full interactive reading bar with progress tracking and pace selector for case study modals or articles.
   * - 'inline': Minimalist inline text with icon.
   */
  variant?: 'badge' | 'banner' | 'inline';

  /**
   * Optional active scroll progress (0 to 1) for real-time countdown calculation.
   */
  scrollProgress?: number;

  /**
   * Optional custom reading speed override.
   */
  initialSpeed?: ReadingSpeed;

  /**
   * Callback when user changes reading pace.
   */
  onSpeedChange?: (speed: ReadingSpeed) => void;

  className?: string;

  /**
   * Optional prefix or label override (e.g., 'Case Study').
   */
  label?: string;
}

export default function ReadingTimeIndicator({
  content,
  variant = 'badge',
  scrollProgress = 0,
  initialSpeed = 'standard',
  onSpeedChange,
  className = '',
  label,
}: ReadingTimeIndicatorProps) {
  const [selectedSpeed, setSelectedSpeed] = useState<ReadingSpeed>(initialSpeed);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);

  // Dynamic reading time calculations
  const stats: ReadingTimeResult = useMemo(() => {
    return calculateReadingTime(content, selectedSpeed);
  }, [content, selectedSpeed]);

  const { formattedRemaining, remainingMinutes } = useMemo(() => {
    return calculateRemainingReadingTime(stats.minutes, scrollProgress);
  }, [stats.minutes, scrollProgress]);

  const handleSelectSpeed = (speed: ReadingSpeed) => {
    setSelectedSpeed(speed);
    setIsSpeedMenuOpen(false);
    if (onSpeedChange) {
      onSpeedChange(speed);
    }
  };

  // 1. INLINE VARIANT
  if (variant === 'inline') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 ${className}`}
        title={`Estimated reading time at ${stats.wpm} words/min (${stats.wordsCount} words)`}
      >
        <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
        <span>{stats.formattedTime}</span>
      </span>
    );
  }

  // 2. BADGE VARIANT (Used on Project Cards and Summary Chips)
  if (variant === 'badge') {
    const tooltipText = `Case Study Breakdown: ~${stats.minutes} min read (${stats.wordsCount} words at ${stats.wpm} wpm)`;

    return (
      <Tooltip content={tooltipText} position="top">
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 shadow-xs transition-colors hover:bg-indigo-100/90 dark:hover:bg-indigo-900/60 cursor-default select-none ${className}`}
        >
          <Clock className="w-3 h-3 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>{label ? `${label} • ` : ''}{stats.formattedTime}</span>
        </div>
      </Tooltip>
    );
  }

  // 3. FULL BANNER VARIANT (Used in Project Case Study Modals & Articles)
  const progressPercent = Math.min(100, Math.max(0, Math.round(scrollProgress * 100)));

  return (
    <div
      className={`relative w-full rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-sm overflow-hidden ${className}`}
    >
      {/* Visual Live Scroll Progress Line at top edge */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Left: Dynamic Time & Remaining Indicators */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Time to Read: ~{stats.minutes} min
              </span>
              <span className="text-slate-300 dark:text-slate-700">&bull;</span>
              <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                {stats.wordsCount.toLocaleString()} words
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              <span>{formattedRemaining}</span>
              {progressPercent > 0 && (
                <>
                  <span>&bull;</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    {progressPercent}% completed
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Reading Pace Switcher Dropdown / Controls */}
        <div className="relative">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">Pace:</span>
            <button
              type="button"
              onClick={() => setIsSpeedMenuOpen(!isSpeedMenuOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all shadow-xs cursor-pointer"
              aria-label={`Reading speed: ${READING_SPEEDS[selectedSpeed].label}`}
              aria-expanded={isSpeedMenuOpen}
            >
              <Gauge className="w-3.5 h-3.5 text-indigo-500" />
              <span>{READING_SPEEDS[selectedSpeed].label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          {/* Speed Selector Dropdown */}
          <AnimatePresence>
            {isSpeedMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-64 p-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl z-30"
              >
                <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700/60 mb-1">
                  Adjust Reading Expectations
                </div>
                {(Object.keys(READING_SPEEDS) as ReadingSpeed[]).map((speedKey) => {
                  const item = READING_SPEEDS[speedKey];
                  const isCurrent = selectedSpeed === speedKey;
                  return (
                    <button
                      key={speedKey}
                      type="button"
                      onClick={() => handleSelectSpeed(speedKey)}
                      className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="mt-0.5">
                        {isCurrent ? (
                          <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        ) : (
                          <div className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span>{item.label}</span>
                          <span className="text-[10px] font-mono opacity-70">{item.wpm} wpm</span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-0.5 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
