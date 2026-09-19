import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion, useInView, type Variants } from 'motion/react';
import FadeInUpSection from './FadeInUpSection';
import {
  Code2,
  Terminal,
  Globe,
  Layers,
  Palette,
  Zap,
  Server,
  Code,
  Cpu,
  Network,
  Database,
  HardDrive,
  Flame,
  Binary,
  CheckCircle2,
  GitBranch,
  Github,
  Box,
  Monitor,
  Send,
  Sparkles,
  Bot,
  Brain,
  Info,
  TrendingUp,
  Award,
  LucideIcon,
  Share2,
} from 'lucide-react';
import SkillsForceGraph from './SkillsForceGraph';
import { ProjectItem } from './Projects';
import { portfolio } from '../data/portfolio';

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'AI & Automation' | 'Database' | 'Programming' | 'Tools' | string;
  level: number;
  experience: string;
  icon: string;
  description: string;
}

interface SkillsProps {
  skills: SkillItem[];
  projects?: ProjectItem[];
}

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Terminal,
  Globe,
  Layers,
  Palette,
  Zap,
  Server,
  Code,
  Cpu,
  Network,
  Database,
  HardDrive,
  Flame,
  Binary,
  CheckCircle2,
  GitBranch,
  Github,
  Box,
  Monitor,
  Send,
  Sparkles,
  Bot,
  Brain,
};

interface DynamicProgressBarProps {
  level: number;
  shouldReduceMotion: boolean | null;
  delay?: number;
}

function DynamicProgressBar({ level, shouldReduceMotion, delay = 0 }: DynamicProgressBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20px' });
  const [currentScore, setCurrentScore] = useState(shouldReduceMotion ? level : 0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentScore(level);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    let animFrame: number;
    const duration = 1000; // ms
    const staggeredDelay = Math.min(delay * 1000, 350);

    const timer = setTimeout(() => {
      const animateStep = (now: number) => {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Quartic ease out for fluid deceleration
        const ease = 1 - Math.pow(1 - progress, 4);
        setCurrentScore(Math.round(ease * level));

        if (progress < 1) {
          animFrame = requestAnimationFrame(animateStep);
        }
      };
      animFrame = requestAnimationFrame(animateStep);
    }, staggeredDelay);

    return () => {
      clearTimeout(timer);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [isInView, level, shouldReduceMotion, delay]);

  const getTier = (val: number) => {
    if (val >= 94) {
      return {
        label: 'Mastery',
        badge: 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 border-indigo-200 dark:border-indigo-800',
      };
    }
    if (val >= 88) {
      return {
        label: 'Advanced',
        badge: 'text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/80 border-cyan-200 dark:border-cyan-800',
      };
    }
    if (val >= 80) {
      return {
        label: 'Proficient',
        badge: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800',
      };
    }
    return {
      label: 'Core',
      badge: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
    };
  };

  const tier = getTier(level);

  return (
    <div ref={containerRef} className="space-y-2 pt-1">
      {/* Top Labels */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Proficiency
          </span>
          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${tier.badge}`}>
            {tier.label}
          </span>
        </div>
        <div className="flex items-baseline gap-0.5">
          <span className="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400 tabular-nums">
            {currentScore}
          </span>
          <span className="text-[10px] font-mono text-indigo-500/80 dark:text-indigo-400/80 font-semibold">%</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/90 rounded-full p-0.5 border border-slate-200/80 dark:border-slate-700/60 overflow-hidden shadow-xs relative">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-400 dark:from-indigo-500 dark:via-cyan-400 dark:to-teal-300 relative shadow-xs"
          initial={shouldReduceMotion ? { width: `${level}%` } : { width: '0%' }}
          animate={isInView || shouldReduceMotion ? { width: `${level}%` } : { width: '0%' }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.1,
            ease: [0.16, 1, 0.3, 1],
            delay: shouldReduceMotion ? 0 : Math.min(delay, 0.3),
          }}
        >
          {/* Subtle glowing beacon on progress tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/95 shadow-xs" />
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills({ skills, projects }: SkillsProps) {
  const effectiveProjects = useMemo(() => {
    return projects && projects.length > 0 ? projects : (portfolio.projects as ProjectItem[]);
  }, [projects]);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [skillViewType, setSkillViewType] = useState<'graph' | 'cards'>('graph');
  const shouldReduceMotion = useReducedMotion();

  const handleSelectSkillFromGraph = useCallback(
    (skillName: string) => {
      const found = skills.find((s) => s.name.toLowerCase() === skillName.toLowerCase());
      if (found) {
        setActiveCategory(found.category);
      }
    },
    [skills]
  );

  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  }), [shouldReduceMotion]);

  const cardVariants: Variants = useMemo(() => ({
    hidden: shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  }), [shouldReduceMotion]);

  const categories = ['All', 'Frontend', 'Backend', 'AI & Automation', 'Database', 'Programming', 'Tools'];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: skills.length };
    skills.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, [skills]);

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return skills;
    return skills.filter((s) => s.category === activeCategory);
  }, [skills, activeCategory]);

  const averageProficiency = useMemo(() => {
    if (filteredSkills.length === 0) return 0;
    const total = filteredSkills.reduce((sum, item) => sum + item.level, 0);
    return Math.round(total / filteredSkills.length);
  }, [filteredSkills]);

  return (
    <section id="skills" className="py-20 lg:py-28 relative bg-slate-100/50 dark:bg-slate-900/30" aria-label="Skills & Technologies">
      <FadeInUpSection>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-xs uppercase font-mono tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
            Technical Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Skills &amp; Expertise
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
            A comprehensive overview of modern tools, languages, and frameworks leveraged to build scalable, production-grade digital products.
          </p>

          {/* Self-Assessed Disclaimer Note & Summary Stats */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 text-xs">
              <Info className="w-3.5 h-3.5 text-indigo-500" />
              <span>*Self-assessed familiarity calibrated from production deliverables and architecture experience.</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200/70 dark:border-indigo-800/70">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
              <span>Avg. {averageProficiency}% in {activeCategory} ({filteredSkills.length} items)</span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher: D3 Interactive Force Graph vs Grid of Cards */}
        <div className="flex justify-center mb-10 px-4">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-sm backdrop-blur-md">
            <button
              type="button"
              onClick={() => setSkillViewType('graph')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                skillViewType === 'graph'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>D3.js Force-Directed Graph</span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  skillViewType === 'graph'
                    ? 'bg-white/20 text-white'
                    : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                }`}
              >
                Interactive
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSkillViewType('cards')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                skillViewType === 'cards'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Proficiency Cards &amp; Grid</span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  skillViewType === 'cards'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                {skills.length}
              </span>
            </button>
          </div>
        </div>

        {skillViewType === 'cards' && (
          /* Category Filter Pills */
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 inline-flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </FadeInUpSection>

      {skillViewType === 'graph' ? (
        /* D3.js Force-Directed Graph Showcase */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkillsForceGraph
            skills={skills}
            projects={effectiveProjects}
            onSelectSkill={handleSelectSkillFromGraph}
          />
        </div>
      ) : (
        /* Skills Grid Container with Staggered Entrance */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.05, margin: '0px 0px -40px 0px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSkills.map((skill, index) => {
              const Icon = iconMap[skill.icon] || Code2;
              return (
                <motion.div
                  key={skill.name}
                  variants={cardVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-md transition-colors group flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Icon, Name, Category & Experience */}
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500 dark:group-hover:text-slate-950 transition-all duration-200 shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {skill.name}
                          </h3>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            {skill.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                        {skill.experience}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {skill.description}
                    </p>
                  </div>

                  {/* Dynamic Scroll-Triggered Animated Proficiency Progress Bar */}
                  <DynamicProgressBar
                    level={skill.level}
                    shouldReduceMotion={shouldReduceMotion}
                    delay={index * 0.05}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}
    </section>
  );
}
