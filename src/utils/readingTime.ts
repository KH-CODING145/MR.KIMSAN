/**
 * Dynamic Reading Time Calculator Utility
 * Accurately estimates time required to read project case studies, technical breakdowns,
 * and blog-style articles based on word count and configurable reading speeds.
 */

export type ReadingSpeed = 'skim' | 'standard' | 'in-depth';

export interface ReadingSpeedConfig {
  label: string;
  wpm: number;
  description: string;
}

export const READING_SPEEDS: Record<ReadingSpeed, ReadingSpeedConfig> = {
  skim: {
    label: 'Quick Skim',
    wpm: 250,
    description: 'Fast overview of headings, bold takeaways, and diagrams (~250 wpm)',
  },
  standard: {
    label: 'Standard',
    wpm: 180,
    description: 'Comfortable paragraph-by-paragraph reading pace (~180 wpm)',
  },
  'in-depth': {
    label: 'Technical Study',
    wpm: 130,
    description: 'In-depth review of code snippets, architecture, and metrics (~130 wpm)',
  },
};

export interface ReadingTimeResult {
  wordsCount: number;
  minutes: number;
  totalSeconds: number;
  formattedTime: string;
  detailedTime: string;
  speed: ReadingSpeed;
  wpm: number;
}

/**
 * Strips code markup, markdown syntax, and punctuation noise to extract raw word count.
 */
export function countWords(content: string | (string | undefined | null)[]): number {
  const text = Array.isArray(content)
    ? content.filter(Boolean).join(' ')
    : String(content || '');

  if (!text.trim()) return 0;

  // Remove markdown symbols and code tags for realistic reading density
  const clean = text
    .replace(/```[\s\S]*?```/g, ' code snippet ') // Count code blocks as moderate word equivalent
    .replace(/`[^`]*`/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_~>\[\]()-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = clean.split(/\s+/).filter((word) => word.length > 0);
  return words.length;
}

/**
 * Calculates dynamic reading time based on content and chosen reading pace.
 */
export function calculateReadingTime(
  content: string | (string | undefined | null)[],
  speed: ReadingSpeed = 'standard'
): ReadingTimeResult {
  const wordsCount = countWords(content);
  const wpm = READING_SPEEDS[speed]?.wpm || 180;

  const totalMinutesFloat = wordsCount / wpm;
  const minutes = Math.max(1, Math.ceil(totalMinutesFloat));
  const totalSeconds = Math.max(1, Math.round(totalMinutesFloat * 60));

  return {
    wordsCount,
    minutes,
    totalSeconds,
    formattedTime: `${minutes} min read`,
    detailedTime: `${minutes} min read (${wordsCount.toLocaleString()} words)`,
    speed,
    wpm,
  };
}

/**
 * Calculates remaining reading time dynamically as the reader scrolls through the case study.
 */
export function calculateRemainingReadingTime(
  totalMinutes: number,
  scrollProgress: number // 0 to 1
): {
  remainingMinutes: number;
  formattedRemaining: string;
} {
  const clampedProgress = Math.min(1, Math.max(0, scrollProgress));
  const remainingMinutes = Math.max(0, Math.ceil(totalMinutes * (1 - clampedProgress)));

  if (clampedProgress >= 0.95) {
    return {
      remainingMinutes: 0,
      formattedRemaining: 'Finished reading',
    };
  }

  return {
    remainingMinutes,
    formattedRemaining: `${remainingMinutes} min remaining`,
  };
}
