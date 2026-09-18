import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  LayoutGrid,
  SlidersHorizontal,
  CheckCircle2,
  Building2,
  MapPin,
  TrendingUp,
  ExternalLink,
  MessageSquareQuote,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  TESTIMONIALS_DATA,
  TESTIMONIALS_METRICS,
  TestimonialItem,
} from '../data/testimonialsData';
import FadeInUpSection from './FadeInUpSection';

interface TestimonialsProps {
  onContactClick?: (initialMessage?: string) => void;
}

export default function Testimonials({ onContactClick }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [progress, setProgress] = useState(0);

  const shouldReduceMotion = useReducedMotion();
  const progressIntervalRef = useRef<number | null>(null);
  const CYCLE_DURATION = 6500; // 6.5s cycle duration

  // Extract unique categories for filter tabs
  const categories = useMemo(() => {
    const set = new Set<string>();
    TESTIMONIALS_DATA.forEach((t) => set.add(t.category));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered items based on chosen category
  const filteredTestimonials = useMemo(() => {
    if (selectedCategory === 'All') return TESTIMONIALS_DATA;
    return TESTIMONIALS_DATA.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  // Keep index within bounds if category changes
  useEffect(() => {
    setCurrentIndex(0);
    setProgress(0);
  }, [selectedCategory]);

  const activeTestimonial = filteredTestimonials[currentIndex] || filteredTestimonials[0];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    setProgress(0);
  }, [filteredTestimonials.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
    setProgress(0);
  }, [filteredTestimonials.length]);

  const handleJumpTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  // Cycling timer logic with smooth progress bar
  useEffect(() => {
    if (viewMode !== 'carousel' || !isPlaying || isHovered || filteredTestimonials.length <= 1) {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
      }
      return;
    }

    const stepMs = 50;
    const progressIncrement = (stepMs / CYCLE_DURATION) * 100;

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + progressIncrement;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
      }
    };
  }, [viewMode, isPlaying, isHovered, filteredTestimonials.length, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'carousel') return;
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, handleNext, handlePrev]);

  // Handle contact referral with customized context
  const handleConsult = (testimonial: TestimonialItem) => {
    const msg = `Hi Kim San, I saw your work on "${testimonial.projectTitle}" for ${testimonial.company} and would love to discuss a similar project.`;
    if (onContactClick) {
      onContactClick(msg);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 relative bg-slate-50/70 dark:bg-slate-950/40 overflow-hidden"
      aria-label="Client Testimonials and Endorsements"
    >
      <FadeInUpSection>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-medium mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Client Feedback & Endorsements</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            What Clients & Partners Say
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Real feedback from engineering leaders, founders, and enterprises across Cambodia, Southeast Asia, and global teams who have partnered with me to launch reliable digital systems.
          </p>
        </div>

        {/* Aggregate Trust Metrics Banner */}
        <div className="mb-10 p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
          <div className="flex items-center gap-3.5 pt-2 sm:pt-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shrink-0 border border-amber-200/60 dark:border-amber-800/60">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white">
                {TESTIMONIALS_METRICS.averageRating.toFixed(1)} / 5.0
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Perfect Client Rating
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-2 sm:pt-0 md:pl-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/60">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white">
                {TESTIMONIALS_METRICS.onTimeDeliveryRate}%
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                On-Time Milestone Delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-2 sm:pt-0 md:pl-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200/60 dark:border-indigo-800/60">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white">
                {TESTIMONIALS_METRICS.repeatHireRate}%
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Repeat Collaboration Rate
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-2 sm:pt-0 md:pl-4">
            <div className="w-10 h-10 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-200/60 dark:border-cyan-800/60">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white">
                100% Verified
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct Enterprise Feedback
              </p>
            </div>
          </div>
        </div>

        {/* Filter & View Mode Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs scale-102'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher & Carousel Play/Pause Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {viewMode === 'carousel' && (
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  isPlaying
                    ? 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                    : 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                }`}
                title={isPlaying ? 'Pause automated cycling' : 'Resume automated cycling'}
                aria-label={isPlaying ? 'Pause automated carousel' : 'Play automated carousel'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="hidden sm:inline">Auto Cycle</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-amber-500 fill-current" />
                    <span className="hidden sm:inline">Paused</span>
                  </>
                )}
              </button>
            )}

            {/* View Mode Toggle */}
            <div className="inline-flex items-center p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <button
                id="testimonial-carousel-mode-btn"
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'carousel'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Carousel Mode"
                aria-label="Switch to carousel view"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="text-xs pr-1">Carousel</span>
              </button>

              <button
                id="testimonial-grid-mode-btn"
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Grid Mode"
                aria-label="Switch to grid layout"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="text-xs pr-1">Grid View</span>
              </button>
            </div>
          </div>
        </div>

        {/* VIEW 1: CYCLING CAROUSEL MODE */}
        {viewMode === 'carousel' && activeTestimonial && (
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            {/* Main Spotlight Carousel Card Container */}
            <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden">
              {/* Cycling Progress Indicator Line */}
              {isPlaying && !isHovered && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 z-20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
              )}

              {/* Decorative Large Watermark Quote Icon */}
              <div
                className="absolute -right-6 -bottom-8 pointer-events-none select-none text-slate-100 dark:text-slate-800/40 opacity-70"
                aria-hidden="true"
              >
                <Quote className="w-48 h-48 sm:w-64 sm:h-64" />
              </div>

              {/* Slide Content with AnimatePresence */}
              <div className="p-6 sm:p-10 lg:p-12 relative z-10 min-h-[420px] flex flex-col justify-between">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeTestimonial.id}
                    custom={direction}
                    variants={shouldReduceMotion ? undefined : slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col justify-between h-full space-y-6"
                  >
                    <div>
                      {/* Top Bar of Slide: Rating, Category, and Verified Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                        <div className="flex items-center gap-2">
                          {/* 5 Stars */}
                          <div className="flex items-center text-amber-400 gap-0.5">
                            {[...Array(activeTestimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                            5.0 Rating
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-200/60 dark:border-indigo-800/60">
                            {activeTestimonial.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified Client</span>
                          </span>
                        </div>
                      </div>

                      {/* Project Delivered Context Pill */}
                      <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span className="font-semibold text-slate-900 dark:text-white">
                          Project:
                        </span>
                        <span className="truncate">{activeTestimonial.projectTitle}</span>
                      </div>

                      {/* Testimonial Quote */}
                      <blockquote className="text-base sm:text-xl lg:text-2xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed sm:leading-relaxed mb-6">
                        &ldquo;{activeTestimonial.quote}&rdquo;
                      </blockquote>

                      {/* Highlight Metric Impact Card */}
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex flex-wrap items-center justify-between gap-3 max-w-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                            <TrendingUp className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-base sm:text-lg font-bold font-mono text-indigo-950 dark:text-indigo-200 leading-tight">
                              {activeTestimonial.metric.value}
                            </div>
                            <div className="text-xs text-indigo-800/80 dark:text-indigo-300">
                              {activeTestimonial.metric.label}
                            </div>
                          </div>
                        </div>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {activeTestimonial.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-indigo-200/50 dark:border-indigo-800/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Author Credentials & Action */}
                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Author Profile */}
                      <div className="flex items-center gap-3.5">
                        <img
                          src={activeTestimonial.avatar}
                          alt={activeTestimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/40 shadow-sm"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/images/kim-san.jpg';
                          }}
                        />
                        <div>
                          <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                            <span>{activeTestimonial.name}</span>
                            <span className="text-[11px] font-mono font-normal text-slate-400">
                              &bull; {activeTestimonial.date}
                            </span>
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                            {activeTestimonial.role}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                            <span className="inline-flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-indigo-500" />
                              <span>{activeTestimonial.company}</span>
                            </span>
                            <span>&bull;</span>
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{activeTestimonial.location}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Connect / Discuss Similar Project CTA */}
                      <button
                        type="button"
                        onClick={() => handleConsult(activeTestimonial)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all hover:scale-102 cursor-pointer self-start sm:self-auto"
                      >
                        <span>Discuss Similar Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Carousel Footer Navigation Toolbar */}
              <div className="px-6 py-4 bg-slate-50/90 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 relative z-10">
                {/* Previous / Next Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    id="testimonial-prev-btn"
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-800 hover:border-indigo-300 transition-all cursor-pointer shadow-2xs active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    id="testimonial-next-btn"
                    type="button"
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-800 hover:border-indigo-300 transition-all cursor-pointer shadow-2xs active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-1">
                    {currentIndex + 1} of {filteredTestimonials.length}
                  </span>
                </div>

                {/* Dot / Pill Jump Indicators */}
                <div className="flex items-center gap-1.5" role="tablist" aria-label="Testimonial slides">
                  {filteredTestimonials.map((t, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Jump to review by ${t.name}`}
                        onClick={() => handleJumpTo(idx)}
                        className={`transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'w-8 h-2.5 rounded-full bg-indigo-600'
                            : 'w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Companion Small Thumbnail Previews */}
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 mr-1">Clients:</span>
                  {filteredTestimonials.map((t, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleJumpTo(idx)}
                        title={`${t.name} - ${t.company}`}
                        className={`relative rounded-full transition-all cursor-pointer ${
                          isActive
                            ? 'ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-slate-900 scale-110'
                            : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-7 h-7 rounded-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: INTEGRATED MULTI-CARD GRID LAYOUT (Smooth grid integration) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTestimonials.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : idx * 0.05 }}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-indigo-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center text-amber-400 gap-0.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-200/60 dark:border-indigo-800/60">
                      {item.category}
                    </span>
                  </div>

                  {/* Project Context */}
                  <div className="mb-3 text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {item.projectTitle}
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-4 italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Highlight Metric */}
                  <div className="mb-4 p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-300 text-[11px]">
                      {item.metric.label}
                    </span>
                    <span className="font-mono font-bold text-indigo-700 dark:text-indigo-300">
                      {item.metric.value}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author Profile Footer */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                        {item.role}, {item.company}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleConsult(item)}
                    className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Inquire about similar deliverable"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </FadeInUpSection>
    </section>
  );
}
