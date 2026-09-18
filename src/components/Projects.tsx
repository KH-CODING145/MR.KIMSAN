import { useState, useMemo, useEffect, useRef, MouseEvent } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { ExternalLink, Github, Sparkles, Eye, X, Code2, Search, Terminal, Calendar, Clock } from 'lucide-react';
import SourceCodeViewerModal from './SourceCodeViewerModal';
import { PROJECT_SOURCE_CODES } from '../data/projectSourceCodes';

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
 * Calculates estimated reading time for a project breakdown based on its full description,
 * stack architecture, and associated source code documentation.
 */
export function calculateProjectReadingTime(project: ProjectItem): number {
  if (project.readingTimeMinutes) return project.readingTimeMinutes;
  const source = PROJECT_SOURCE_CODES[project.id];
  const textCorpus = [
    project.title,
    project.description,
    project.highlight || '',
    project.technologies.join(' '),
    source?.architectureSummary || '',
    ...(source?.files.map((f) => `${f.filename} ${f.description}`) || []),
    ...(source?.simulationOutput?.logs || []),
  ].join(' ');

  const words = textCorpus.trim().split(/\s+/).filter(Boolean).length;
  // Standard technical breakdown reading speed: ~160 words per minute
  return Math.max(1, Math.round(words / 160));
}

interface TiltProjectCardProps {
  key?: string | number;
  project: ProjectItem;
  activeFilter: string;
  onFilterTech: (tech: string) => void;
  onSelectProject: (project: ProjectItem) => void;
  onInspectCode: (projectId: number) => void;
  shouldReduceMotion: boolean | null;
}

function TiltProjectCard({
  project,
  activeFilter,
  onFilterTech,
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
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

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
                className="p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-200 hover:scale-110 transition-transform shadow-sm cursor-pointer"
                title="Overview Details"
                aria-label={`Quick overview for ${project.title}`}
              >
                <Eye className="w-4 h-4" />
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
                <div
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400"
                  title="Estimated reading time for this project breakdown and architecture"
                >
                  <Clock className="w-3 h-3 text-indigo-500 shrink-0" />
                  <span>{calculateProjectReadingTime(project)} min read</span>
                </div>
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

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Technologies tags - clickable for quick tech stack filtering */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.map((tech) => {
                const isSelectedTech = activeFilter.toLowerCase() === tech.toLowerCase();
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFilterTech(isSelectedTech ? 'All' : tech);
                    }}
                    title={`Filter projects by ${tech}`}
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-all duration-150 cursor-pointer ${
                      isSelectedTech
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/60 dark:border-slate-700/60'
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Buttons: Inspect Source Code & Live Demo */}
        <div className="relative z-10 px-6 pb-6 pt-2 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800/80">
          {/* Inspect Source Code Full Function Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInspectCode(project.id);
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 active:scale-95 transition-all cursor-pointer"
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
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [internalSelectedProject, setInternalSelectedProject] = useState<ProjectItem | null>(null);
  const [inspectCodeProjectId, setInspectCodeProjectId] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const selectedProject =
    externalSelectedProject !== undefined ? externalSelectedProject : internalSelectedProject;

  const handleSelect = (project: ProjectItem | null) => {
    setInternalSelectedProject(project);
    if (onSelectProject) {
      onSelectProject(project);
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

  // Tech stack & category filter options
  const filterCategories = ['All', 'React', 'Laravel', 'Node.js', 'Python', 'Full Stack'];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const filterLower = activeFilter.toLowerCase();
      const matchesCategory =
        activeFilter === 'All' ||
        p.category.toLowerCase() === filterLower ||
        p.technologies.some((t) => t.toLowerCase() === filterLower);

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesQuery =
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies.some((t) => t.toLowerCase().includes(query)) ||
        (p.highlight && p.highlight.toLowerCase().includes(query)) ||
        (p.dateCompleted && p.dateCompleted.toLowerCase().includes(query)) ||
        (p.lastUpdated && p.lastUpdated.toLowerCase().includes(query)) ||
        `${calculateProjectReadingTime(p)} min read`.includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [projects, activeFilter, searchQuery]);

  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-slate-100/50 dark:bg-slate-900/30" aria-label="Featured Projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Tech Stack & Category Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 w-full sm:w-auto" role="tablist" aria-label="Project Tech Stacks and Categories">
            {filterCategories.map((filter) => {
              const isActive = activeFilter.toLowerCase() === filter.toLowerCase();
              return (
                <button
                  key={filter}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {filter}
                </button>
              );
            })}

            {/* Custom active tech stack badge if selected via tag click */}
            {!filterCategories.map((c) => c.toLowerCase()).includes(activeFilter.toLowerCase()) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white shadow-md shadow-indigo-600/25">
                <span>Tech: {activeFilter}</span>
                <button
                  type="button"
                  onClick={() => setActiveFilter('All')}
                  className="hover:text-indigo-200 cursor-pointer"
                  aria-label="Clear custom filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
          </div>

          {/* Real-time Project Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech, AI, stack..."
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-xs"
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

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-6 px-1">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredProjects.length}</strong> of {projects.length} projects
          </span>
          {searchQuery && (
            <span>Filtered by: &ldquo;{searchQuery}&rdquo;</span>
          )}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <TiltProjectCard
                key={project.id}
                project={project}
                activeFilter={activeFilter}
                onFilterTech={setActiveFilter}
                onSelectProject={handleSelect}
                onInspectCode={setInspectCodeProjectId}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal for Project Deep Dive */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => handleSelect(null)}
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
              >
                <button
                  type="button"
                  onClick={() => handleSelect(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-4 aspect-video rounded-2xl overflow-hidden bg-slate-950">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                    {selectedProject.category}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
                    title="Estimated reading time for this breakdown"
                  >
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{calculateProjectReadingTime(selectedProject)} min read</span>
                  </span>
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

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {selectedProject.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                <div className="mb-6">
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

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {/* Open Source Code Inspector */}
                  <button
                    type="button"
                    onClick={() => {
                      const id = selectedProject.id;
                      handleSelect(null);
                      setInspectCodeProjectId(id);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>Inspect Full Source Code</span>
                  </button>

                  {Boolean(selectedProject.demoUrl) && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit Live Demo</span>
                    </a>
                  )}

                  {Boolean(selectedProject.githubUrl) && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
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
      </div>
    </section>
  );
}
