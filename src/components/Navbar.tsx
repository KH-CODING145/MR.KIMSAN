import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Code2,
  ArrowUpRight,
  Video,
  Search,
  Home,
  User,
  Cpu,
  Layers,
  CreditCard,
  FolderGit2,
  Briefcase,
  GraduationCap,
  MessageSquareQuote,
  Mail,
  LucideIcon,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Tooltip from './Tooltip';
import { ThemeMode } from '../hooks/useTheme';

interface NavbarProps {
  theme: ThemeMode;
  resolvedTheme: 'dark' | 'light';
  setTheme: (mode: ThemeMode) => void;
  personalName: string;
  brandName?: string;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  onOpenCourseModal?: (courseId?: string) => void;
  onOpenSearch?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  tooltip: string;
  isLearning?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home', icon: Home, tooltip: 'Home & Overview' },
  { label: 'About', href: '#about', icon: User, tooltip: 'Bio & Background' },
  { label: 'Skills', href: '#skills', icon: Cpu, tooltip: 'Tech Stack & Skills' },
  { label: 'Services', href: '#services', icon: Layers, tooltip: 'Offered Services' },
  { label: 'Pricing', href: '#pricing', icon: CreditCard, tooltip: 'Plans & Pricing' },
  { label: 'Projects', href: '#projects', icon: FolderGit2, tooltip: 'Featured Projects' },
  { label: 'Learning', href: '#learning', icon: Video, isLearning: true, tooltip: 'Video Lessons Studio' },
  { label: 'Experience', href: '#experience', icon: Briefcase, tooltip: 'Career Experience' },
  { label: 'Education', href: '#education', icon: GraduationCap, tooltip: 'Degrees & Academic' },
  { label: 'Reviews', href: '#testimonials', icon: MessageSquareQuote, tooltip: 'Client Testimonials' },
  { label: 'Contact', href: '#contact', icon: Mail, tooltip: 'Get in Touch' },
];

export default function Navbar({
  theme,
  resolvedTheme,
  setTheme,
  personalName,
  brandName = 'PRO DIGITAL',
  activeSection: externalActiveSection,
  onSectionChange,
  onOpenCourseModal,
  onOpenSearch,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [internalActiveSection, setInternalActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeSection = externalActiveSection || internalActiveSection;

  // Monitor scroll for header backdrop blur & shadow styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key press or screen resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);

    if (targetId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        const headerOffset = 76;
        let targetTop = 0;
        let curr: HTMLElement | null = el;
        while (curr) {
          targetTop += curr.offsetTop;
          curr = curr.offsetParent as HTMLElement | null;
        }
        const offsetPosition = Math.max(0, targetTop - headerOffset);
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }

    history.pushState(null, '', href);
    setInternalActiveSection(targetId);
    if (onSectionChange) {
      onSectionChange(targetId);
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs'
            : 'bg-transparent border-b border-transparent py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand with Tooltip */}
            <Tooltip content="PRO DIGITAL Portfolio • Top" position="bottom">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="flex items-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
                aria-label={`${brandName} - Home`}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {brandName}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span className="font-name font-normal text-sm normal-case tracking-normal text-slate-800 dark:text-slate-200">{personalName}</span>
                    <span>&bull; Portfolio</span>
                  </span>
                </div>
              </a>
            </Tooltip>

            {/* Desktop Navigation with Tooltips and Icons */}
            <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                const Icon = item.icon;
                return (
                  <Tooltip key={item.href} content={item.tooltip} position="bottom">
                    <a
                      id={`nav-link-${item.href.substring(1)}`}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`group relative px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                        isActive
                          ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/40'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-900/60'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={`${item.label} - ${item.tooltip}`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 ${
                          isActive
                            ? 'text-indigo-600 dark:text-indigo-400'
                            : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                        }`}
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                      {item.isLearning && (
                        <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-xs">
                          VIDEO
                        </span>
                      )}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavTab"
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </Tooltip>
                );
              })}
            </nav>

            {/* Desktop Right Action: Search, Theme Switcher, Course Hub & Contact */}
            <div className="hidden xl:flex items-center gap-2.5">
              {onOpenSearch && (
                <Tooltip content="Quick Search Projects, Skills, Sections (⌘K)" position="bottom">
                  <button
                    id="desktop-search-btn"
                    type="button"
                    onClick={onOpenSearch}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100/90 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80 transition-all active:scale-95 cursor-pointer shadow-2xs group"
                    aria-label="Search portfolio (Press ⌘K)"
                  >
                    <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    <span className="text-slate-600 dark:text-slate-300">Search...</span>
                    <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700/80 shadow-2xs">
                      ⌘K
                    </kbd>
                  </button>
                </Tooltip>
              )}

              {onOpenCourseModal && (
                <Tooltip content="Open Video Learning Studio (វីដេអូមេរៀន)" position="bottom">
                  <button
                    type="button"
                    onClick={() => onOpenCourseModal()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 border border-indigo-200/80 dark:border-indigo-800 transition-colors active:scale-95 shadow-xs cursor-pointer"
                    aria-label="Course / Learning Video Studio"
                  >
                    <Video className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Courses</span>
                  </button>
                </Tooltip>
              )}
              <Tooltip content={`Theme Mode (${theme})`} position="bottom">
                <ThemeToggle theme={theme} resolvedTheme={resolvedTheme} setTheme={setTheme} />
              </Tooltip>
              <Tooltip content="Get in Touch & Discuss a Project" position="bottom">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all shadow-sm shadow-indigo-600/25 cursor-pointer"
                  aria-label="Contact - Get in Touch"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </Tooltip>
            </div>

            {/* Mobile / Tablet Right Bar: Search, Theme Toggle & Hamburger with Tooltips */}
            <div className="flex xl:hidden items-center gap-1.5">
              {onOpenSearch && (
                <Tooltip content="Search Portfolio (⌘K)" position="bottom">
                  <button
                    id="mobile-search-btn"
                    type="button"
                    onClick={onOpenSearch}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    aria-label="Open search palette"
                  >
                    <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </button>
                </Tooltip>
              )}
              <Tooltip content={`Theme (${theme})`} position="bottom">
                <ThemeToggle theme={theme} resolvedTheme={resolvedTheme} setTheme={setTheme} />
              </Tooltip>
              <Tooltip content={mobileMenuOpen ? 'Close Menu' : 'Open Menu'} position="left">
                <button
                  id="mobile-menu-btn"
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  aria-expanded={mobileMenuOpen}
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Mobile Animated Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-lg px-4 pt-2 pb-6 space-y-1 shadow-xl"
            >
              {onOpenSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 mb-2 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/80 dark:border-indigo-800 text-sm font-semibold transition-all cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Search className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Search Projects, Skills, Sections...</span>
                  </div>
                  <kbd className="px-2 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 rounded border border-indigo-200 dark:border-indigo-800">
                    ⌘K
                  </kbd>
                </button>
              )}

              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold border-l-4 border-indigo-600 dark:border-indigo-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.isLearning && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-600 text-white shadow-xs">
                        VIDEO LESSONS
                      </span>
                    )}
                  </a>
                );
              })}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                {onOpenCourseModal && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCourseModal();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-semibold text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors border border-indigo-200 dark:border-indigo-800 cursor-pointer shadow-xs"
                  >
                    <Video className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Open Video Learning Studio (វីដេអូមេរៀន)</span>
                  </button>
                )}
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
                >
                  <span>Let's Discuss a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 xl:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
