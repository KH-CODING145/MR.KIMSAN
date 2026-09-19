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
  layout?: boolean | 'position' | 'size';
  layoutId?: string;
  as?: 'div' | 'section' | 'article';
}

/**
 * Reusable Framer Motion layout animation wrapper for gentle fade & slide-in on scroll.
 * Configured with layout="position" for fluid reflows, an optical deceleration curve,
 * and strict user accessibility preferences (prefers-reduced-motion).
 */
export default function FadeInUpSection({
  children,
  className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  delay = 0,
  yOffset = 28,
  duration = 0.75,
  id,
  viewportAmount = 0.08,
  margin = '-40px 0px -40px 0px',
  layout = 'position',
  layoutId,
  as = 'div',
}: FadeInUpSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = {
    id,
    layout: shouldReduceMotion ? false : (layout ?? 'position'),
    layoutId,
    initial: shouldReduceMotion ? false : { opacity: 0, y: yOffset },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: viewportAmount, margin },
    transition: {
      duration: shouldReduceMotion ? 0 : duration,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
      layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
    className,
  };

  if (as === 'section') {
    return <motion.section {...motionProps}>{children}</motion.section>;
  }

  if (as === 'article') {
    return <motion.article {...motionProps}>{children}</motion.article>;
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
}

/**
 * Secondary child motion wrapper for staggered element groups (e.g. section headers, grids)
 */
export function FadeInUpChild({
  children,
  className = '',
  delay = 0.1,
  yOffset = 18,
  layout = 'position',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  layout?: boolean | 'position' | 'size';
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      layout={shouldReduceMotion ? false : (layout ?? 'position')}
      initial={shouldReduceMotion ? false : { opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '-20px 0px' }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
