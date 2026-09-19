import {
  ReactNode,
  ReactElement,
  useState,
  useRef,
  useEffect,
  useId,
  isValidElement,
  cloneElement,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info } from 'lucide-react';

export interface TooltipProps {
  key?: string | number;
  /** Primary label or destination name */
  content: ReactNode | string;
  /**
   * Detailed clarification explaining what the icon represents and what clicking it does,
   * especially helpful for users unfamiliar with standard UI iconography.
   */
  description?: string;
  /** Optional icon name or symbol classification (e.g. "Microchip icon", "Magnifying glass") */
  iconName?: string;
  /** Optional keyboard shortcut (e.g. "⌘K", "Esc") */
  shortcut?: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  delay?: number;
  id?: string;
  /** Explicit width or max width override */
  maxWidth?: string;
}

/**
 * Accessible tooltip component adhering to WAI-ARIA Tooltip Pattern & WCAG 2.1 Criterion 1.4.13.
 *
 * Features:
 * - Links trigger to tooltip via aria-describedby
 * - Dismissable on Escape key without losing focus
 * - Truly hoverable (cursor can safely transition into tooltip content)
 * - Visible on both mouse hover and keyboard focus
 * - Clarifies UI iconography for users unfamiliar with standard symbols
 */
export default function Tooltip({
  content,
  description,
  iconName,
  shortcut,
  children,
  position = 'bottom',
  className = '',
  delay = 100,
  id: customId,
  maxWidth,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const generatedId = useId();
  const tooltipId = customId || `tooltip-${generatedId.replace(/:/g, '')}`;

  const showTooltip = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  // Close on Escape key press (WCAG 2.1 Content on Hover or Focus)
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideTooltip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2.5',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2.5',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-900 border-x-transparent border-b-transparent border-t-[5px] border-x-[5px]',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-900 border-x-transparent border-t-transparent border-b-[5px] border-x-[5px]',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-900 border-y-transparent border-r-transparent border-l-[5px] border-y-[5px]',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-900 border-y-transparent border-l-transparent border-r-[5px] border-y-[5px]',
  };

  const hasDetailedContent = Boolean(description || iconName || shortcut);

  // Clone child to apply aria-describedby so assistive technologies receive description
  const triggerElement = isValidElement(children)
    ? cloneElement(children as ReactElement<any>, {
        'aria-describedby': isVisible ? tooltipId : undefined,
      })
    : children;

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocusCapture={showTooltip}
      onBlurCapture={hideTooltip}
    >
      {triggerElement}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            aria-hidden={!isVisible}
            initial={{
              opacity: 0,
              scale: 0.94,
              y: position === 'bottom' ? -4 : position === 'top' ? 4 : 0,
              x: position === 'right' ? -4 : position === 'left' ? 4 : 0,
            }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            className={`absolute z-50 pointer-events-auto rounded-lg bg-slate-900/95 text-slate-100 shadow-xl shadow-black/25 border border-slate-700/80 backdrop-blur-md transition-shadow ${
              hasDetailedContent
                ? 'p-2.5 min-w-[180px] max-w-[280px] sm:max-w-[320px] text-left'
                : 'px-2.5 py-1.5 whitespace-nowrap text-xs font-medium'
            } ${maxWidth || ''} ${positionClasses[position]}`}
          >
            {/* Header row: Label + optional shortcut badge */}
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-xs text-white leading-tight">
                {content}
              </span>
              {shortcut && (
                <kbd className="shrink-0 px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-800 text-indigo-300 rounded border border-slate-700 shadow-2xs">
                  {shortcut}
                </kbd>
              )}
            </div>

            {/* Optional Icon classification & purpose clarification for users unfamiliar with standard UI icons */}
            {hasDetailedContent && (
              <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 space-y-1">
                {iconName && (
                  <div className="flex items-center gap-1 text-[10px] font-mono font-medium text-indigo-400">
                    <Info className="w-3 h-3 shrink-0" />
                    <span>{iconName}</span>
                  </div>
                )}
                {description && (
                  <p className="text-[11px] text-slate-300 leading-snug font-normal">
                    {description}
                  </p>
                )}
              </div>
            )}

            {/* Directional arrow pointer */}
            <span
              className={`absolute w-0 h-0 border-solid pointer-events-none ${arrowClasses[position]}`}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

