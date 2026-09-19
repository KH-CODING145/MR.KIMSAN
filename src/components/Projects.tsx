import { useState, useMemo, useEffect, useRef, MouseEvent, UIEvent } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ExternalLink,
  Github,
  Sparkles,
  Eye,
  X,
  Code2,
  Search,
  Terminal,
  Calendar,
  Clock,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Layers,
  FileText,
  AlertCircle,
  Lightbulb,
  Check,
  SlidersHorizontal,
  Filter,
  RotateCcw,
} from 'lucide-react';
import SourceCodeViewerModal from './SourceCodeViewerModal';
import { PROJECT_SOURCE_CODES } from '../data/projectSourceCodes';
import { PROJECT_CASE_STUDIES, getCaseStudyCorpus } from '../data/projectCaseStudies';
import ReadingTimeIndicator from './ReadingTimeIndicator';
import CircularScrollProgress from './CircularScrollProgress';
import LazyImage from './LazyImage';
import { calculateReadingTime } from '../utils/readingTime';
import FadeInUpSection from './FadeInUpSection';

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'React' | 'Laravel' | 'Full Stack' | 'Web' | 'Software';
  technologies: string[];
  demoUrl: string;
  githubUrl: string;
  highlight?: string;
  dateCompleted?: string;
  lastUpdated?: string;
  readingTimeMinutes?: number;
}

/**
 * Compiles complete text corpus for a project including title, description,
 * deep-dive case study, architecture summary, and source code files.
 */
export function getProjectContentCorpus(project: ProjectItem): string[] {
  const caseStudy = PROJECT_CASE_STUDIES[project.id];
  const source = PROJECT_SOURCE_CODES[project.id];

  return [
    project.title,
    project.description,
    project.highlight || '',
    project.technologies.join(' '),
    caseStudy ? getCaseStudyCorpus(caseStudy) : '',
    source?.architectureSummary || '',
    ...(source?.files.map((f) => `${f.filename} ${f.description}`) || []),
  ];
}

/**
 * Calculates estimated reading time for a project breakdown based on its full description,
 * stack architecture, case study, and associated source code documentation.
 */
export function calculateProjectReadingTime(project: ProjectItem): number {
  if (project.readingTimeMinutes) return project.readingTimeMinutes;
  const corpus = getProjectContentCorpus(project);
  return calculateReadingTime(corpus, 'standard').minutes;
}

// Helper to check if a project satisfies a specific technology filter
export function projectMatchesTech(project: ProjectItem, tech: string): boolean {
  const normTech = tech.trim().toLowerCase();
  if (normTech === 'ai') {
    return (
      project.technologies.some(
        (t) => t.toLowerCase().includes('ai') || t.toLowerCase().includes('gemini') || t.toLowerCase().includes('llm')
      ) ||
      project.title.toLowerCase().includes('ai') ||
      project.description.toLowerCase().includes('ai') ||
      Boolean(project.highlight && project.highlight.toLowerCase().includes('ai')) ||
      project.category.toLowerCase().includes('ai')
    );
  }

  return project.technologies.some((t) => {
    const normT = t.toLowerCase();
    return normT === normTech || normT.includes(normTech) || normTech.includes(normT);
  });
}

// Helper to check if a specific tech tag matches any active technology filter
export function isTechActive(techBadge: string, selectedTechs: string[]): boolean {
  if (!selectedTechs || selectedTechs.length === 0) return false;
  const normBadge = techBadge.trim().toLowerCase();
  return selectedTechs.some((selected) => {
    const normSel = selected.trim().toLowerCase();
    if (normSel === 'ai') {
      return normBadge.includes('ai') || normBadge.includes('gemini') || normBadge.includes('llm');
    }
    return normBadge === normSel || normBadge.includes(normSel) || normSel.includes(normBadge);
  });
}

interface TiltProjectCardProps {
  key?: string | number;
  project: ProjectItem;
  selectedTechs: string[];
  onToggleTech: (tech: string) => void;
  onSelectProject: (project: ProjectItem) => void;
  onInspectCode: (projectId: number) => void;
  shouldReduceMotion: boolean | null;
}

function TiltProjectCard({
  project,
  selectedTechs,
  onToggleTech,
  onSelectProject,
  onInspectCode,
  shouldReduceMotion,
}: TiltProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth, natural spring physics without snap or jitter
  const springConfig = { damping: 22, stiffness: 240, mass: 0.55 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Subtle 3D tilt angles (capped at ±6 degrees for refined premium feel)
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  // Dynamic specular sheen tracking cursor across the surface
  const glareBackground = useTransform(
    [springX, springY],
    ([x, y]) => {
      const px = Math.round(((Number(x) || 0) + 0.5) * 100);
      const py = Math.round(((Number(y) || 0) + 0.5) * 100);
      return `radial-gradient(circle 350px at ${px}% ${py}%, rgba(99, 102, 241, 0.12), rgba(255, 255, 255, 0.08) 30%, transparent 70%)`;
    }
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{ perspective: 1100 }}
      className="h-full"
    >
      <motion.article
        ref={cardRef}
        layout
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                y: -6,
                scale: 1.015,
                transition: { duration: 0.25, ease: 'easeOut' },
              }
        }
        transition={{ duration: 0.3 }}
        className="relative flex flex-col justify-between h-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-950/40 transition-shadow duration-300 group"
      >
        {/* Dynamic specular glare sheen that follows mouse cursor */}
        {!shouldReduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 rounded-3xl transition-opacity duration-300"
            style={{
              background: glareBackground,
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}

        {/* Project Image & Overlay */}
        <div>
          <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
            <LazyImage
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              aspectRatio="aspect-[16/10]"
              rootMargin="250px 0px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

            {/* Category badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-900/80 backdrop-blur-md text-white border border-slate-700/60 shadow-xs">
                {project.category}
              </span>
            </div>

            {/* Highlight Pill if present */}
            {project.highlight && (
              <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-indigo-500/90 text-white shadow-xs">
                <Sparkles className="w-3 h-3" />
                <span>{project.highlight}</span>
              </div>
            )}

            {/* Quick action buttons on hover */}
            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onInspectCode(project.id);
                }}
                className="p-2 rounded-xl bg-slate-900/90 backdrop-blur-md text-cyan-400 hover:text-white hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
                title="Inspect Source Code"
                aria-label={`Inspect source code for ${project.title}`}
              >
                <Code2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProject(project);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/95 hover:bg-indigo-600 backdrop-blur-md text-white text-xs font-semibold hover:scale-105 transition-all shadow-sm cursor-pointer"
                title="Read Comprehensive Case Study"
                aria-label={`Read case study for ${project.title}`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Case Study</span>
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            {/* Category, Reading Time & Date Completed / Last Updated Header */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {project.category}
                </span>
                <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                <ReadingTimeIndicator
                  content={getProjectContentCorpus(project)}
                  variant="badge"
                />
              </div>

              {(project.dateCompleted || project.lastUpdated) && (
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 shadow-xs"
                  title={`Completed / Last Updated: ${project.dateCompleted || project.lastUpdated}`}
                >
                  <Calendar className="w-3 h-3 text-indigo-500 shrink-0" />
                  <span>{project.dateCompleted || project.lastUpdated}</span>
                </div>
              )}
            </div>

            <h3
              onClick={() => onSelectProject(project)}
              className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer"
              title="Click to read full case study"
            >
              {project.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Technologies tags - clickable for quick tech stack toggling */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.map((tech) => {
                const isSelectedTech = isTechActive(tech, selectedTechs);
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTech(tech);
                    }}
                    title={isSelectedTech ? `Remove ${tech} filter` : `Filter by ${tech}`}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-all duration-150 cursor-pointer ${
                      isSelectedTech
                        ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/60 dark:border-slate-700/60'
                    }`}
                  >
                    {isSelectedTech && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    <span>{tech}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Buttons: Case Study, Inspect Source Code & Live Demo */}
        <div className="relative z-10 px-6 pb-6 pt-2 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800/80">
          {/* Read Case Study Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProject(project);
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/80 dark:border-indigo-800/80 active:scale-95 transition-all cursor-pointer"
            title="Read case study with dynamic time to read"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span>Case Study</span>
          </button>

          {/* Inspect Source Code Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInspectCode(project.id);
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 active:scale-95 transition-all cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Source Code</span>
          </button>

          {Boolean(project.demoUrl) ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInspectCode(project.id);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Sandbox</span>
            </button>
          )}

          {Boolean(project.githubUrl) && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title="GitHub Repository"
              aria-label="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </motion.article>
    </div>
  );
}

interface ProjectsProps {
  projects: ProjectItem[];
  selectedProject?: ProjectItem | null;
  onSelectProject?: (project: ProjectItem | null) => void;
}

export default function Projects({
  projects,
  selectedProject: externalSelectedProject,
  onSelectProject,
}: ProjectsProps) {
  // Technology stack toggle filtering state
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [matchMode, setMatchMode] = useState<'any' | 'all'>('any');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllTechStacks, setShowAllTechStacks] = useState<boolean>(false);

  const [internalSelectedProject, setInternalSelectedProject] = useState<ProjectItem | null>(null);
  const [inspectCodeProjectId, setInspectCodeProjectId] = useState<number | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<'case-study' | 'overview'>('case-study');
  const [modalScrollProgress, setModalScrollProgress] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  const selectedProject =
    externalSelectedProject !== undefined ? externalSelectedProject : internalSelectedProject;

  const modalScrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollModalToTop = () => {
    if (modalScrollContainerRef.current) {
      modalScrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // Live corpus and reading time estimation for the currently active case study
  const activeCaseStudyCorpus = useMemo(() => {
    if (!selectedProject) return [];
    const caseStudy = PROJECT_CASE_STUDIES[selectedProject.id];
    return caseStudy ? getCaseStudyCorpus(caseStudy) : getProjectContentCorpus(selectedProject);
  }, [selectedProject]);

  const activeCaseStudyReadingMinutes = useMemo(() => {
    if (!activeCaseStudyCorpus || activeCaseStudyCorpus.length === 0) return 3;
    return calculateReadingTime(activeCaseStudyCorpus).minutes;
  }, [activeCaseStudyCorpus]);

  const handleSelect = (project: ProjectItem | null) => {
    setInternalSelectedProject(project);
    if (project) {
      setModalScrollProgress(0);
      setModalActiveTab('case-study');
      if (modalScrollContainerRef.current) {
        modalScrollContainerRef.current.scrollTop = 0;
      }
    }
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

  const handleModalScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollHeight - target.clientHeight;
    if (maxScroll > 0) {
      setModalScrollProgress(Math.min(1, Math.max(0, target.scrollTop / maxScroll)));
    } else {
      setModalScrollProgress(0);
    }
  };

  // Deep-linking: open project modal if URL hash matches #project-ID
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project-')) {
        const id = parseInt(hash.replace('#project-', ''), 10);
        const match = projects.find((p) => p.id === id);
        if (match) {
          handleSelect(match);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [projects]);

  // Primary curated technology stacks
  const PRIMARY_TECH_STACKS = [
    'React',
    'Node.js',
    'AI',
    'Laravel',
    'Docker',
    'Python',
    'PostgreSQL',
    'Tailwind CSS',
    'Firebase',
  ];

  // Dynamically extract any remaining unique technology tags from projects
  const allExtractedTechs = useMemo(() => {
    const list: string[] = [];
    projects.forEach((p) => {
      p.technologies.forEach((t) => {
        const canonical = t.toLowerCase().includes('gemini') || t.toLowerCase() === 'ai' ? 'AI' : t;
        if (!list.includes(canonical)) {
          list.push(canonical);
        }
      });
    });
    return list;
  }, [projects]);

  const secondaryTechStacks = useMemo(() => {
    return allExtractedTechs.filter(
      (t) => !PRIMARY_TECH_STACKS.some((pt) => pt.toLowerCase() === t.toLowerCase())
    );
  }, [allExtractedTechs]);

  const visibleTechStacks = showAllTechStacks
    ? Array.from(new Set([...PRIMARY_TECH_STACKS, ...secondaryTechStacks]))
    : PRIMARY_TECH_STACKS;

  // Project count mapping per tech stack
  const techCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const allPossible = Array.from(new Set([...PRIMARY_TECH_STACKS, ...allExtractedTechs]));
    allPossible.forEach((tech) => {
      counts[tech] = projects.filter((p) => projectMatchesTech(p, tech)).length;
    });
    return counts;
  }, [projects, allExtractedTechs]);

  // Toggle technology stack filter
  const handleToggleTech = (tech: string) => {
    const canonical =
      tech.toLowerCase().includes('gemini') || tech.toLowerCase() === 'ai' ? 'AI' : tech;
    setSelectedTechs((prev) => {
      const isPresent = prev.some((t) => t.toLowerCase() === canonical.toLowerCase());
      if (isPresent) {
        return prev.filter((t) => t.toLowerCase() !== canonical.toLowerCase());
      } else {
        return [...prev, canonical];
      }
    });
  };

  const handleClearTechFilters = () => {
    setSelectedTechs([]);
  };

  const categories = ['All', 'Full Stack', 'React', 'Laravel', 'Software', 'Web'];

  // Filtered projects computed based on active tech stack toggles, category, and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // 1. Tech stack toggle filter
      let matchesTech = true;
      if (selectedTechs.length > 0) {
        if (matchMode === 'any') {
          matchesTech = selectedTechs.some((tech) => projectMatchesTech(p, tech));
        } else {
          matchesTech = selectedTechs.every((tech) => projectMatchesTech(p, tech));
        }
      }
      if (!matchesTech) return false;

      // 2. Category filter
      if (activeCategory !== 'All') {
        const catLower = activeCategory.toLowerCase();
        const matchesCat =
          p.category.toLowerCase() === catLower || p.category.toLowerCase().includes(catLower);
        if (!matchesCat) return false;
      }

      // 3. Search query filter
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;

      return (
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies.some((t) => t.toLowerCase().includes(query)) ||
        (p.highlight && p.highlight.toLowerCase().includes(query)) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        (p.dateCompleted && p.dateCompleted.toLowerCase().includes(query)) ||
        (p.lastUpdated && p.lastUpdated.toLowerCase().includes(query)) ||
        `${calculateProjectReadingTime(p)} min read`.includes(query)
      );
    });
  }, [projects, selectedTechs, matchMode, activeCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-slate-100/50 dark:bg-slate-900/30" aria-label="Featured Projects">
      <FadeInUpSection>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
            Selected Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
            A showcase of real-world production web applications, SaaS dashboards, and distributed systems.
          </p>
        </div>

        {/* Technology Stack Filtering Dashboard */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-xs">
          {/* Header Row: Filter title, match mode, reset button */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 pb-3 border-b border-slate-200/60 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Filter by Tech Stack
              </span>
              {selectedTechs.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {selectedTechs.length} active
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              {/* Match Mode Switcher (Visible when 2 or more tech stacks are toggled) */}
              {selectedTechs.length >= 2 && (
                <div className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-medium border border-slate-200 dark:border-slate-700">
                  <span className="px-1.5 text-slate-400 text-[10px] uppercase font-mono">Match:</span>
                  <button
                    type="button"
                    onClick={() => setMatchMode('any')}
                    className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                      matchMode === 'any'
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title="Shows projects that use AT LEAST ONE of the selected technology stacks"
                  >
                    Any (OR)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMatchMode('all')}
                    className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                      matchMode === 'all'
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title="Shows projects that use ALL of the selected technology stacks"
                  >
                    All (AND)
                  </button>
                </div>
              )}

              {/* Reset All Filters Button */}
              {(selectedTechs.length > 0 || activeCategory !== 'All' || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    handleClearTechFilters();
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Reset all active filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Technology Stack Toggle Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {/* All Projects Pill */}
            <button
              type="button"
              role="button"
              aria-pressed={selectedTechs.length === 0}
              onClick={handleClearTechFilters}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                selectedTechs.length === 0
                  ? 'bg-indigo-600 text-white shadow-xs scale-102 ring-2 ring-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>All Tech</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                selectedTechs.length === 0
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}>
                {projects.length}
              </span>
            </button>

            {/* Tech Stack Toggle Buttons */}
            {visibleTechStacks.map((tech) => {
              const isSelected = selectedTechs.some((t) => t.toLowerCase() === tech.toLowerCase());
              const count = techCounts[tech] || 0;

              return (
                <button
                  key={tech}
                  type="button"
                  role="button"
                  aria-pressed={isSelected}
                  onClick={() => handleToggleTech(tech)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs scale-102 ring-2 ring-indigo-400/40'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 border border-slate-200 dark:border-slate-800'
                  }`}
                  title={isSelected ? `Click to unselect ${tech}` : `Click to filter by ${tech}`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  <span>{tech}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isSelected
                        ? 'bg-white/25 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Expand / Collapse Secondary Stacks */}
            {secondaryTechStacks.length > 0 && (
              <button
                type="button"
                onClick={() => setShowAllTechStacks((prev) => !prev)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border border-dashed border-indigo-200 dark:border-indigo-800 transition-colors cursor-pointer"
              >
                <span>{showAllTechStacks ? 'Show fewer' : `+${secondaryTechStacks.length} more`}</span>
              </button>
            )}
          </div>

          {/* Secondary Filter Row: Search & Category pills */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/60">
            {/* Category Sub-filter */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1 hidden md:inline-block">
                Category:
              </span>
              {categories.map((cat) => {
                const isCatActive = activeCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                      isCatActive
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Real-time Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, features..."
                className="w-full pl-8 pr-8 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Active Filter Badges Ribbon */}
        {selectedTechs.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 px-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Active Tech Filters:
            </span>
            {selectedTechs.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 shadow-2xs"
              >
                <span>{tech}</span>
                <button
                  type="button"
                  onClick={() => handleToggleTech(tech)}
                  className="p-0.5 rounded hover:bg-indigo-200 dark:hover:bg-indigo-900 text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-200 cursor-pointer"
                  title={`Remove ${tech} filter`}
                  aria-label={`Remove ${tech} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={handleClearTechFilters}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium ml-1 cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-6 px-1">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredProjects.length}</strong> of {projects.length} projects
          </span>
          {searchQuery && (
            <span>Search query: &ldquo;{searchQuery}&rdquo;</span>
          )}
        </div>

        {/* Projects Grid or Friendly Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 px-6 text-center rounded-3xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 shadow-sm">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Filter className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              No projects match the selected technology filters
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
              {matchMode === 'all' && selectedTechs.length > 1
                ? `No single project uses all of the selected stacks: ${selectedTechs.join(' + ')}. Try switching to "Match Any (OR)" mode or clearing filters.`
                : `No projects found matching the active filters (${selectedTechs.join(', ')})${searchQuery ? ` and query "${searchQuery}"` : ''}.`}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {matchMode === 'all' && selectedTechs.length > 1 && (
                <button
                  type="button"
                  onClick={() => setMatchMode('any')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Switch to Match Any (OR)</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setSelectedTechs([]);
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <TiltProjectCard
                  key={project.id}
                  project={project}
                  selectedTechs={selectedTechs}
                  onToggleTech={handleToggleTech}
                  onSelectProject={handleSelect}
                  onInspectCode={setInspectCodeProjectId}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Modal for Project Deep Dive & Blog-Style Case Study */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => handleSelect(null)}
                className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl z-10 max-h-[92vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100"
              >
                {/* Modal Top Header with Tabs & Close */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/80 dark:bg-slate-950/60 backdrop-blur-md shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 shrink-0">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                      {selectedProject.title}
                    </h3>
                  </div>

                  {/* Navigation Tabs between Case Study & Overview */}
                  <div className="flex items-center gap-2">
                    <div className="flex p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => {
                          setModalActiveTab('case-study');
                          handleScrollModalToTop();
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          modalActiveTab === 'case-study'
                            ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Case Study</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setModalActiveTab('overview');
                          handleScrollModalToTop();
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          modalActiveTab === 'overview'
                            ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Overview</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelect(null)}
                      className="p-2 rounded-xl bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      aria-label="Close dialog"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Scrollable Body with Live Scroll Progress Tracking */}
                <div
                  ref={modalScrollContainerRef}
                  onScroll={handleModalScroll}
                  className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6"
                >
                  {modalActiveTab === 'case-study' ? (
                    (() => {
                      const caseStudy = PROJECT_CASE_STUDIES[selectedProject.id];
                      const corpus = caseStudy
                        ? getCaseStudyCorpus(caseStudy)
                        : getProjectContentCorpus(selectedProject);

                      return (
                        <div className="space-y-8">
                          {/* Dynamic Reading Time & Scroll Progress Banner */}
                          <div className="sticky top-0 z-30 -mt-2 pt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md pb-2">
                            <ReadingTimeIndicator
                              content={corpus}
                              variant="banner"
                              scrollProgress={modalScrollProgress}
                            />
                          </div>

                          {/* Case Study Header & Meta Information */}
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                              {caseStudy?.publishDate && (
                                <span className="inline-flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-indigo-500" />
                                  <span>{caseStudy.publishDate}</span>
                                </span>
                              )}
                              <span>&bull;</span>
                              <span>Author: {caseStudy?.author || 'KIM SAN'}</span>
                              <span>&bull;</span>
                              <span>Role: {caseStudy?.role || 'Lead Software Architect'}</span>
                              {caseStudy?.targetAudience && (
                                <>
                                  <span>&bull;</span>
                                  <span className="text-cyan-600 dark:text-cyan-400">
                                    Target: {caseStudy.targetAudience}
                                  </span>
                                </>
                              )}
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                              {caseStudy?.title || selectedProject.title}
                            </h2>
                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                              {caseStudy?.subtitle || selectedProject.description}
                            </p>
                          </div>

                          {/* Executive Summary Callout */}
                          {caseStudy?.executiveSummary && (
                            <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-3.5">
                              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                              <div>
                                <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-indigo-900 dark:text-indigo-300 mb-1.5">
                                  Executive Summary
                                </h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                  {caseStudy.executiveSummary}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Section 1: The Challenge & Core Bottlenecks */}
                          {caseStudy?.challenge && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-amber-500" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                  1. The Challenge & Core Bottlenecks
                                </h3>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {caseStudy.challenge.overview}
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                {caseStudy.challenge.keyBottlenecks.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                                  >
                                    <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                                      {idx + 1}
                                    </span>
                                    <span className="leading-snug">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Section 2: Architecture & Decision Logs */}
                          {caseStudy?.architecture && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Layers className="w-5 h-5 text-indigo-500" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                  2. Architectural Decisions & Tech Stack Rationale
                                </h3>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {caseStudy.architecture.description}
                              </p>
                              <div className="grid grid-cols-1 gap-3">
                                {caseStudy.architecture.techStackChoices.map((choice, idx) => (
                                  <div
                                    key={idx}
                                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800"
                                  >
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                                        {choice.technology}
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                      {choice.reason}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Section 3: Engineering Solutions & Implementation */}
                          {caseStudy?.engineeringSolutions && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-cyan-500" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                  3. Key Engineering Solutions
                                </h3>
                              </div>
                              <div className="space-y-3">
                                {caseStudy.engineeringSolutions.map((sol, idx) => (
                                  <div
                                    key={idx}
                                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800"
                                  >
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                                      {sol.title}
                                    </h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                      {sol.detail}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Section 4: Quantifiable Results & Metrics Grid */}
                          {caseStudy?.metrics && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-emerald-500" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                  4. Quantifiable Results & Performance Benchmarks
                                </h3>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {caseStudy.metrics.map((res, idx) => (
                                  <div
                                    key={idx}
                                    className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-center"
                                  >
                                    <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                                      {res.value}
                                    </div>
                                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
                                      {res.label}
                                    </div>
                                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                                      {res.change || res.description}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Section 5: Lessons Learned & Key Takeaways */}
                          {caseStudy?.keyTakeaways && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                  5. Lessons Learned & Key Takeaways
                                </h3>
                              </div>
                              <ul className="space-y-2">
                                {caseStudy.keyTakeaways.map((point, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="leading-relaxed">{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })()
                  ) : (
                    /* Overview Tab: Visual Preview, Stack Tags & Specs */
                    <div className="space-y-6">
                      <div className="aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <LazyImage
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          className="w-full h-full object-cover"
                          aspectRatio="aspect-video"
                          priority={true}
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                          {selectedProject.category}
                        </span>
                        <ReadingTimeIndicator
                          content={getProjectContentCorpus(selectedProject)}
                          variant="badge"
                        />
                        {(selectedProject.dateCompleted || selectedProject.lastUpdated) && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                            <span>Completed: {selectedProject.dateCompleted || selectedProject.lastUpdated}</span>
                          </span>
                        )}
                        {selectedProject.highlight && (
                          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                            &bull; {selectedProject.highlight}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {selectedProject.title}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {selectedProject.description}
                      </p>

                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                          Stack Architecture
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((t) => (
                            <span
                              key={t}
                              className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Circular Scroll-Progress Indicator Pinned to the Corner of Case Studies */}
                <AnimatePresence>
                  {modalActiveTab === 'case-study' && (
                    <CircularScrollProgress
                      key={`case-study-progress-${selectedProject.id}`}
                      progress={modalScrollProgress}
                      onScrollToTop={handleScrollModalToTop}
                      totalReadingMinutes={activeCaseStudyReadingMinutes}
                      title={selectedProject.title}
                      position="bottom-right"
                      className="bottom-20 right-5 sm:bottom-22 sm:right-7"
                    />
                  )}
                </AnimatePresence>

                {/* Modal Footer with Action Buttons */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <ReadingTimeIndicator
                      content={getProjectContentCorpus(selectedProject)}
                      variant="inline"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Open Source Code Inspector */}
                    <button
                      type="button"
                      onClick={() => {
                        const id = selectedProject.id;
                        handleSelect(null);
                        setInspectCodeProjectId(id);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
                    >
                      <Code2 className="w-4 h-4" />
                      <span>Inspect Source Code</span>
                    </button>

                    {Boolean(selectedProject.demoUrl) && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}

                    {Boolean(selectedProject.githubUrl) && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Real Source Code & Simulation Inspector Modal */}
        <SourceCodeViewerModal
          projectId={inspectCodeProjectId}
          isOpen={inspectCodeProjectId !== null}
          onClose={() => setInspectCodeProjectId(null)}
          externalGithubUrl={
            inspectCodeProjectId
              ? projects.find((p) => p.id === inspectCodeProjectId)?.githubUrl
              : undefined
          }
        />
      </FadeInUpSection>
    </section>
  );
}
