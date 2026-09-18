import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface FadeInUpSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
  id?: string;
  viewportAmount?: number | 'some' | 'all';
  margin?: string;
}

/**
 * Reusable Framer Motion wrapper for entrance animations on scroll.
 * Delivers a smooth, premium fade-in-up transition configured with
 * an optical deceleration curve and respects user accessibility preferences.
 */
export default function FadeInUpSection({
  children,
  className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  delay = 0,
  yOffset = 36,
  duration = 0.7,
  id,
  viewportAmount = 0.08,
  margin = '0px 0px -40px 0px',
}: FadeInUpSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      initial={shouldReduceMotion ? false : { opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: viewportAmount, margin }}
      transition={{
        duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Secondary child motion wrapper for staggered element groups (e.g. section headers, grids)
 */
export function FadeInUpChild({
  children,
  className = '',
  delay = 0.1,
  yOffset = 20,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.55,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
