import { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, ImageOff } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  rootMargin?: string;
  threshold?: number;
  priority?: boolean;
}

export default function LazyImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  aspectRatio = 'aspect-[16/10]',
  rootMargin = '200px 0px',
  threshold = 0.01,
  priority = false,
}: LazyImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // If priority or already intersecting, don't observe
    if (priority || isInView) return;

    // Fallback if IntersectionObserver is unsupported in the runtime
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const currentEl = containerRef.current;
    if (!currentEl) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [priority, isInView, rootMargin, threshold]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-slate-900 select-none ${aspectRatio} ${containerClassName}`}
      aria-busy={!isLoaded && !hasError}
    >
      {/* Skeleton Shimmer Placeholder while not yet loaded */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-slate-900/95 overflow-hidden">
          {/* Subtle moving shimmer highlight */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          
          <div className="flex flex-col items-center gap-2 text-slate-600 dark:text-slate-600">
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50">
              <ImageIcon className="w-5 h-5 animate-pulse text-slate-500" />
            </div>
            <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500">
              {isInView ? 'Loading asset...' : 'Deferred'}
            </span>
          </div>
        </div>
      )}

      {/* Fallback Error View */}
      {hasError ? (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-slate-900 text-slate-500 p-4 text-center">
          <ImageOff className="w-8 h-8 mb-2 text-slate-600" />
          <span className="text-xs font-mono text-slate-400">{alt}</span>
          <span className="text-[10px] text-slate-600 mt-1 font-mono">Image unavailable</span>
        </div>
      ) : (
        /* Actual Image with deferred src assignment via IntersectionObserver */
        isInView && (
          <img
            src={src}
            alt={alt}
            decoding="async"
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`${className} transition-all duration-700 ease-out ${
              isLoaded
                ? 'opacity-100 blur-0 scale-100'
                : 'opacity-0 blur-sm scale-[1.02]'
            }`}
          />
        )
      )}
    </div>
  );
}
