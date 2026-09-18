import { motion } from 'motion/react';

export default function PortfolioSkeleton() {
  return (
    <motion.div
      id="portfolio-skeleton"
      role="status"
      aria-label="Loading portfolio content..."
      aria-busy="true"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 print:hidden transition-colors duration-300"
    >
      <span className="sr-only">Loading portfolio data and assets...</span>

      {/* 1. Header / Navbar Skeleton */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Name Skeleton */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="space-y-1.5">
              <div className="w-24 h-4 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <div className="w-32 h-2.5 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
            </div>
          </div>

          {/* Nav links skeleton (desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {[60, 50, 55, 65, 50, 70].map((width, idx) => (
              <div
                key={idx}
                style={{ width: `${width}px` }}
                className="h-4 rounded bg-slate-200 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>

          {/* Action buttons skeleton */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="hidden sm:block w-24 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>
        </div>
      </div>

      {/* 2. Hero Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Intro Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-48 h-7 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <div className="w-28 h-7 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
            </div>

            {/* Greeting */}
            <div className="w-28 h-4 rounded bg-indigo-200/70 dark:bg-indigo-900/40 animate-pulse" />

            {/* Name headline */}
            <div className="w-3/4 max-w-md h-9 sm:h-11 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />

            {/* Title / Role */}
            <div className="w-1/2 max-w-sm h-7 sm:h-8 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />

            {/* Paragraph Bio */}
            <div className="space-y-2.5 pt-2 max-w-2xl">
              <div className="w-full h-4 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="w-11/12 h-4 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="w-4/5 h-4 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
            </div>

            {/* Buttons row */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="w-36 h-12 rounded-xl bg-indigo-200 dark:bg-indigo-950/60 animate-pulse" />
              <div className="w-36 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            </div>

            {/* Social icons row */}
            <div className="flex items-center gap-3 pt-6 border-t border-slate-200/70 dark:border-slate-800/70">
              <div className="w-20 h-3 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <div className="flex gap-2.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Profile Card Skeleton */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[380px] sm:max-w-[420px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-xl space-y-4">
              {/* Avatar image container */}
              <div className="relative rounded-2xl aspect-square bg-slate-200 dark:bg-slate-800 animate-pulse flex items-end p-3">
                {/* Floating micro badge */}
                <div className="w-full h-9 rounded-xl bg-slate-300 dark:bg-slate-700/80" />
              </div>

              {/* Core Technologies pills skeleton */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="w-28 h-3 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="flex flex-wrap gap-1.5">
                  {[64, 56, 72, 60, 68].map((w, idx) => (
                    <div
                      key={idx}
                      style={{ width: `${w}px` }}
                      className="h-7 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse"
                    />
                  ))}
                </div>
              </div>

              {/* Languages skeleton */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="w-20 h-3 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                  <div className="w-16 h-3 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                </div>
                <div className="space-y-1.5">
                  {[80, 50, 50, 70, 40].map((_, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="flex justify-between">
                        <div className="w-12 h-2.5 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                        <div className="w-6 h-2.5 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. About Section Skeleton Preview */}
        <div className="mt-24 pt-16 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="flex flex-col items-center space-y-3 mb-12">
            <div className="w-28 h-3 rounded bg-indigo-200/70 dark:bg-indigo-900/40 animate-pulse" />
            <div className="w-48 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="w-12 h-1 rounded-full bg-indigo-300 dark:bg-indigo-800 animate-pulse" />
          </div>

          {/* 3 Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-center items-center space-y-2"
              >
                <div className="w-16 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="w-32 h-3.5 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="w-32 h-4 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="w-full h-3 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
                <div className="w-4/5 h-3 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
