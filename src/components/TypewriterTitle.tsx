import { useState, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';

interface TypewriterTitleProps {
  titles?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

const DEFAULT_TITLES = [
  'Full-Stack Developer',
  'AI Software Engineer',
];

export default function TypewriterTitle({
  titles = DEFAULT_TITLES,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  className = '',
}: TypewriterTitleProps) {
  const shouldReduceMotion = useReducedMotion();
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const activeTitle = titles[titleIndex % titles.length] || '';

  useEffect(() => {
    // If user prefers reduced motion, don't type letter by letter; cycle gently
    if (shouldReduceMotion) {
      setDisplayedText(activeTitle);
      const interval = setInterval(() => {
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }, 4000);
      return () => clearInterval(interval);
    }

    let timer: ReturnType<typeof setTimeout>;

    if (isWaiting) {
      // Pause at full word before deleting
      timer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timer);
    }

    if (!isDeleting) {
      // Typing forward
      if (displayedText.length < activeTitle.length) {
        timer = setTimeout(() => {
          setDisplayedText(activeTitle.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Complete word reached
        setIsWaiting(true);
      }
    } else {
      // Deleting backwards
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(activeTitle.slice(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        // Completed deletion, move to next title
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [
    displayedText,
    isDeleting,
    isWaiting,
    titleIndex,
    activeTitle,
    titles,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    shouldReduceMotion,
  ]);

  return (
    <div
      className={`inline-flex items-center flex-wrap min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[2.75rem] font-typing ${className}`}
      aria-label={`Current role: ${activeTitle}`}
    >
      <span className="sr-only">{activeTitle}</span>
      <span
        aria-hidden="true"
        className="font-typing font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-300"
      >
        {shouldReduceMotion ? activeTitle : displayedText}
      </span>
      <span
        aria-hidden="true"
        className="inline-block w-[3px] h-[0.85em] ml-1.5 align-middle bg-indigo-600 dark:bg-cyan-400 rounded-full animate-cursor-blink shadow-xs shadow-indigo-500/50 dark:shadow-cyan-400/50"
      />
    </div>
  );
}
