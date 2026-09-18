import { motion, useReducedMotion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface SectionDividerProps {
  icon: LucideIcon;
  label?: string;
  className?: string;
}

export default function SectionDivider({ icon: Icon, label, className = '' }: SectionDividerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      role="separator"
      aria-hidden="true"
      className={`relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-center overflow-hidden select-none pointer-events-none ${className}`}
    >
      {/* Left Gradient Line with subtle pulsing accent */}
      <div className="flex-1 flex items-center">
        <motion.div
          initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-px origin-right bg-gradient-to-r from-transparent via-slate-200 to-indigo-300/60 dark:via-slate-800 dark:to-indigo-500/40"
        />
        {/* Subtle decorative tech tick */}
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/40 dark:bg-indigo-400/40 shrink-0 ml-1.5 hidden sm:block" />
      </div>

      {/* Center Floating Icon Pill */}
      <motion.div
        initial={shouldReduceMotion ? false : { scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.15, ease: 'easeOut' }}
        className="mx-3 sm:mx-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs backdrop-blur-xs shrink-0 group transition-all"
      >
        <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <Icon className="w-3 h-3" />
        </div>
        {label && (
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </span>
        )}
      </motion.div>

      {/* Right Gradient Line with subtle pulsing accent */}
      <div className="flex-1 flex items-center">
        {/* Subtle decorative tech tick */}
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/40 dark:bg-indigo-400/40 shrink-0 mr-1.5 hidden sm:block" />
        <motion.div
          initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-px origin-left bg-gradient-to-l from-transparent via-slate-200 to-indigo-300/60 dark:via-slate-800 dark:to-indigo-500/40"
        />
      </div>
    </div>
  );
}
