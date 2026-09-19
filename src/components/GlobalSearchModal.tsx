import { useState, useEffect, useMemo, useRef, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  Command,
  CornerDownLeft,
  ArrowRight,
  FolderGit2,
  Cpu,
  Layers,
  Video,
  CreditCard,
  Briefcase,
  GraduationCap,
  MessageSquareQuote,
  Mail,
  Sparkles,
  BookOpen,
  Home,
  User,
  History,
  Trash2,
  LucideIcon,
} from 'lucide-react';
import { portfolio } from '../data/portfolio.js';
import { sampleCourses, Course } from '../data/coursesData';
import { ProjectItem } from './Projects';

export type SearchCategory = 'all' | 'projects' | 'skills' | 'sections' | 'courses' | 'services';

export interface SearchResultItem {
  id: string;
  type: 'project' | 'skill' | 'section' | 'course' | 'service';
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeColor?: string;
  icon: LucideIcon;
  tags?: string[];
  meta?: string;
  action: () => void;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenCourseModal: (courseId?: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

const SECTION_DEFINITIONS = [
  {
    id: 'home',
    title: 'Home & Hero Overview',
    subtitle: 'Full-Stack Developer & AI Software Engineer',
    description: 'Hero presentation, dynamic roles, introductory resume download, and core identity.',
    icon: Home,
    badge: 'Section',
  },
  {
    id: 'about',
    title: 'About Mr. KIM SAN',
    subtitle: 'Background, Philosophy & Experience Metrics',
    description: 'Software development history, production metrics, spoken languages, and engineering values.',
    icon: User,
    badge: 'Section',
  },
  {
    id: 'skills',
    title: 'Technical Skills & Technologies',
    subtitle: 'Frontend, Backend, AI & Tools Stack',
    description: 'React, TypeScript, Laravel, Docker, Gemini AI, RAG Vector Search, and full-stack proficiencies.',
    icon: Cpu,
    badge: 'Section',
  },
  {
    id: 'services',
    title: 'Services & Capabilities',
    subtitle: 'Engineering Offerings & Custom Software',
    description: 'AI & software engineering, SPA/PWA web dev, full-stack systems, admin dashboards, and REST APIs.',
    icon: Layers,
    badge: 'Section',
  },
  {
    id: 'pricing',
    title: 'Plans & Pricing Packages',
    subtitle: 'Starter, Professional & Enterprise Retainers',
    description: 'Standardized pricing plans, custom architectural retainers, and milestone consulting.',
    icon: CreditCard,
    badge: 'Section',
  },
  {
    id: 'projects',
    title: 'Featured Projects & Case Studies',
    subtitle: 'Production Applications & Deep Dives',
    description: 'CloudPulse AI SaaS, DevFlow CI/CD, ApexCraft Store, CollabSync Studio, and interactive source codes.',
    icon: FolderGit2,
    badge: 'Section',
  },
  {
    id: 'learning',
    title: 'Video Learning Studio (វីដេអូមេរៀន)',
    subtitle: 'Software Courses & Tutorials',
    description: 'Curated technical lessons in React, Laravel, Node.js, and Full-Stack development.',
    icon: Video,
    badge: 'Section',
  },
  {
    id: 'experience',
    title: 'Career & Work Experience',
    subtitle: 'Professional Timeline & Roles',
    description: 'Roles held at software agencies, tech companies, freelance leadership, and achievements.',
    icon: Briefcase,
    badge: 'Section',
  },
  {
    id: 'education',
    title: 'Education & Academic Degrees',
    subtitle: 'Computer Science & Certifications',
    description: 'University degrees, academic distinctions, and verified developer certifications.',
    icon: GraduationCap,
    badge: 'Section',
  },
  {
    id: 'testimonials',
    title: 'Reviews & Client Testimonials',
    subtitle: 'Endorsements & Recommendations',
    description: 'Direct feedback from engineering clients, founders, and team collaborators.',
    icon: MessageSquareQuote,
    badge: 'Section',
  },
  {
    id: 'contact',
    title: 'Contact & Inquiries',
    subtitle: 'Telegram, Email & Project Booking',
    description: 'Direct communication channels, consultation inquiries, and social links.',
    icon: Mail,
    badge: 'Section',
  },
];

const POPULAR_SUGGESTIONS = [
  'React',
  'Gemini AI',
  'CloudPulse',
  'Full Stack',
  'Docker',
  'Laravel',
  'TypeScript',
  'Pricing',
  'Video Courses',
];

const RECENT_SEARCHES_STORAGE_KEY = 'portfolio_recent_searches';

export default function GlobalSearchModal({
  isOpen,
  onClose,
  onSelectProject,
  onOpenCourseModal,
  onNavigateSection,
}: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY);
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 6));
      }
    } catch {
      // Ignore local storage errors
    }
  }, []);

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed || trimmed.length < 2) return;
    try {
      const updated = [trimmed, ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 6);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore local storage errors
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_STORAGE_KEY);
    } catch {
      // Ignore local storage errors
    }
  };

  // Focus input when modal opens & reset state
  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setQuery('');
      setActiveCategory('all');
    }
  }, [isOpen]);

  // Index all searchable entities
  const allSearchableItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Projects
    (portfolio.projects as ProjectItem[]).forEach((project) => {
      items.push({
        id: `project-${project.id}`,
        type: 'project',
        title: project.title,
        subtitle: `${project.category} Project • ${project.highlight || 'Featured'}`,
        description: project.description,
        badge: 'Project',
        badgeColor: 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
        icon: FolderGit2,
        tags: project.technologies,
        meta: project.dateCompleted || project.lastUpdated,
        action: () => {
          saveRecentSearch(project.title);
          onClose();
          onNavigateSection('projects');
          setTimeout(() => {
            onSelectProject(project);
          }, 300);
        },
      });
    });

    // 2. Skills
    (portfolio.skills as Array<{
      name: string;
      category: string;
      level: number;
      experience: string;
      description: string;
    }>).forEach((skill) => {
      items.push({
        id: `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        type: 'skill',
        title: skill.name,
        subtitle: `${skill.category} • ${skill.level}% Proficiency (${skill.experience})`,
        description: skill.description,
        badge: 'Skill',
        badgeColor: 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
        icon: Cpu,
        tags: [skill.category, `${skill.level}%`, skill.experience],
        action: () => {
          saveRecentSearch(skill.name);
          onClose();
          onNavigateSection('skills');
        },
      });
    });

    // 3. Sections
    SECTION_DEFINITIONS.forEach((sec) => {
      items.push({
        id: `section-${sec.id}`,
        type: 'section',
        title: sec.title,
        subtitle: sec.subtitle,
        description: sec.description,
        badge: 'Section',
        badgeColor: 'bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
        icon: sec.icon,
        tags: ['Navigation', sec.id],
        action: () => {
          saveRecentSearch(sec.title);
          onClose();
          onNavigateSection(sec.id);
        },
      });
    });

    // 4. Courses / Video Lessons
    (sampleCourses as Course[]).forEach((course) => {
      items.push({
        id: `course-${course.id}`,
        type: 'course',
        title: course.title,
        subtitle: `${course.category} • ${course.lessonsCount} Video Lessons (${course.totalDuration})`,
        description: `${course.description} — ${course.descriptionKh || ''}`,
        badge: 'Course',
        badgeColor: 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
        icon: Video,
        tags: [course.category, course.level, ...course.tags],
        meta: course.titleKh,
        action: () => {
          saveRecentSearch(course.title);
          onClose();
          onOpenCourseModal(course.id);
        },
      });
    });

    // 5. Services
    portfolio.services.forEach((service: {
      id: string;
      title: string;
      description: string;
      startingPrice: string;
      features: string[];
    }) => {
      items.push({
        id: `service-${service.id}`,
        type: 'service',
        title: service.title,
        subtitle: `Starting from ${service.startingPrice} • Service Offering`,
        description: `${service.description} Features: ${service.features.join(', ')}`,
        badge: 'Service',
        badgeColor: 'bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
        icon: Layers,
        tags: service.features,
        meta: service.startingPrice,
        action: () => {
          saveRecentSearch(service.title);
          onClose();
          onNavigateSection('services');
        },
      });
    });

    return items;
  }, [onClose, onNavigateSection, onSelectProject, onOpenCourseModal]);

  // Multi-token filter algorithm
  const filteredResults: SearchResultItem[] = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    let list = allSearchableItems;

    // Filter by selected tab category
    if (activeCategory !== 'all') {
      const typeMap: Record<SearchCategory, string> = {
        all: 'all',
        projects: 'project',
        skills: 'skill',
        sections: 'section',
        courses: 'course',
        services: 'service',
      };
      list = list.filter((item) => item.type === typeMap[activeCategory]);
    }

    if (!trimmed) {
      return list.slice(0, 10);
    }

    const tokens = trimmed.split(/\s+/).filter(Boolean);

    const scored = list
      .map((item) => {
        const titleLower = item.title.toLowerCase();
        const subtitleLower = item.subtitle.toLowerCase();
        const descLower = item.description.toLowerCase();
        const tagsJoined = (item.tags || []).join(' ').toLowerCase();
        const metaLower = (item.meta || '').toLowerCase();

        const fullCorpus = `${titleLower} ${subtitleLower} ${descLower} ${tagsJoined} ${metaLower}`;

        // Every token must match somewhere in the item
        const matchesAllTokens = tokens.every((token) => fullCorpus.includes(token));
        if (!matchesAllTokens) return { item, score: 0 };

        let score = 10;
        // Priority weightings
        if (titleLower === trimmed) score += 100;
        else if (titleLower.startsWith(trimmed)) score += 60;
        else if (titleLower.includes(trimmed)) score += 40;

        if (tagsJoined.includes(trimmed)) score += 30;
        if (subtitleLower.includes(trimmed)) score += 20;
        if (descLower.includes(trimmed)) score += 10;

        return { item, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item);

    return scored;
  }, [allSearchableItems, query, activeCategory]);

  // Adjust selectedIndex when list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  // Scroll active item into view
  useEffect(() => {
    const activeEl = listContainerRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  // Keyboard navigation within the modal
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredResults.length > 0 ? (prev + 1) % filteredResults.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredResults.length > 0 ? (prev - 1 + filteredResults.length) % filteredResults.length : 0
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        filteredResults[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Tab') {
      // Cycle through category tabs
      e.preventDefault();
      const categories: SearchCategory[] = ['all', 'projects', 'skills', 'sections', 'courses', 'services'];
      const currentIdx = categories.indexOf(activeCategory);
      const nextIdx = e.shiftKey
        ? (currentIdx - 1 + categories.length) % categories.length
        : (currentIdx + 1) % categories.length;
      setActiveCategory(categories[nextIdx]);
    }
  };

  const countsByCategory = useMemo(() => {
    const counts: Record<SearchCategory, number> = {
      all: allSearchableItems.length,
      projects: 0,
      skills: 0,
      sections: 0,
      courses: 0,
      services: 0,
    };
    allSearchableItems.forEach((item) => {
      if (item.type === 'project') counts.projects++;
      if (item.type === 'skill') counts.skills++;
      if (item.type === 'section') counts.sections++;
      if (item.type === 'course') counts.courses++;
      if (item.type === 'service') counts.services++;
    });
    return counts;
  }, [allSearchableItems]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-14 sm:pt-20"
          onKeyDown={handleKeyDown}
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Floating Command Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 360 }}
            className="relative w-full max-w-2xl sm:max-w-3xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl z-10 flex flex-col overflow-hidden max-h-[82vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Global Search Palette"
          >
            {/* Top Search Input Bar */}
            <div className="relative flex items-center px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
              <Search className="w-5 h-5 text-indigo-500 shrink-0 mr-3.5" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, skills, courses, sections, services..."
                className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                aria-label="Search input"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors mr-2 cursor-pointer"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <div className="flex items-center gap-1 shrink-0">
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  ESC
                </kbd>
                <button
                  type="button"
                  onClick={onClose}
                  className="sm:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="px-4 sm:px-6 py-2.5 border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
                Filter:
              </span>
              {[
                { key: 'all', label: 'All', count: countsByCategory.all },
                { key: 'projects', label: 'Projects', count: countsByCategory.projects },
                { key: 'skills', label: 'Skills', count: countsByCategory.skills },
                { key: 'sections', label: 'Sections', count: countsByCategory.sections },
                { key: 'courses', label: 'Courses', count: countsByCategory.courses },
                { key: 'services', label: 'Services', count: countsByCategory.services },
              ].map(({ key, label, count }) => {
                const isSelected = activeCategory === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveCategory(key as SearchCategory)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{label}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Results Container / Empty State */}
            <div
              ref={listContainerRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5 focus:outline-none"
            >
              {/* Empty query view: show suggestions and recent searches */}
              {!query && (
                <div className="p-3 sm:p-4 space-y-4">
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                        <span className="flex items-center gap-1.5">
                          <History className="w-3.5 h-3.5" />
                          <span>Recent Searches</span>
                        </span>
                        <button
                          type="button"
                          onClick={clearRecentSearches}
                          className="text-[11px] text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Clear</span>
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => setQuery(term)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                          >
                            <History className="w-3 h-3 text-slate-400" />
                            <span>{term}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Popular Searches</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SUGGESTIONS.map((sug) => (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => setQuery(sug)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white text-xs font-medium border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-slate-400 font-mono">
                    <p>Type keywords to search across 50+ projects, 20+ technologies, video lessons, and sections.</p>
                  </div>
                </div>
              )}

              {/* No results view */}
              {query && filteredResults.length === 0 && (
                <div className="py-12 px-4 text-center">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    No results found for &ldquo;{query}&rdquo;
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                    Try searching for broader terms like <span className="text-indigo-600 dark:text-indigo-400 font-semibold">React</span>, <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Docker</span>, <span className="text-indigo-600 dark:text-indigo-400 font-semibold">AI</span>, or selecting the &ldquo;All&rdquo; filter.
                  </p>
                </div>
              )}

              {/* Result items list */}
              {filteredResults.map((item, index) => {
                const isSelected = selectedIndex === index;
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    data-index={index}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`group relative p-3 sm:p-3.5 rounded-xl sm:rounded-2xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700/80 shadow-xs'
                        : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                          isSelected
                            ? 'bg-indigo-600 text-white scale-105 shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {item.title}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                              item.badgeColor || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {item.badge}
                          </span>
                        </div>

                        <div className="text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-1 mb-1">
                          {item.subtitle}
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 leading-relaxed">
                          {item.description}
                        </p>

                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {item.tags.slice(0, 4).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60"
                              >
                                {tag}
                              </span>
                            ))}
                            {item.tags.length > 4 && (
                              <span className="text-[10px] font-mono text-slate-400 self-center">
                                +{item.tags.length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Right Action Hint */}
                      <div className="hidden sm:flex items-center shrink-0 self-center">
                        <div
                          className={`p-1.5 rounded-lg transition-colors ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'text-slate-400 opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          <CornerDownLeft className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Keyboard Hint Bar */}
            <div className="px-4 sm:px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    &uarr;&darr;
                  </kbd>
                  <span>Navigate</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    &crarr;
                  </kbd>
                  <span>Select</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    TAB
                  </kbd>
                  <span>Filter</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    ESC
                  </kbd>
                  <span>Close</span>
                </span>
              </div>

              <div className="text-right">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                  {filteredResults.length}
                </span>{' '}
                matching item{filteredResults.length === 1 ? '' : 's'}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
