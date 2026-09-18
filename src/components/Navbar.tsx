import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Code2, ArrowUpRight, Video, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
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
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Projects', href: '#projects' },
  { label: 'Learning', href: '#learning', isLearning: true },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
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
            {/* Logo / Brand */}
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

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.href}
                    id={`nav-link-${item.href.substring(1)}`}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200 cursor-pointer flex items-center ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-900/60'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                    {item.isLearning && (
                      <span className="ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-xs">
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
                );
              })}
            </nav>

            {/* Desktop Right Action: Theme Switcher, Course Hub & Contact */}
            <div className="hidden xl:flex items-center gap-2.5">
              {onOpenCourseModal && (
                <button
                  type="button"
                  onClick={() => onOpenCourseModal()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 border border-indigo-200/80 dark:border-indigo-800 transition-colors active:scale-95 shadow-xs cursor-pointer"
                  title="Course / Learning Video Studio (វីដេអូមេរៀន)"
                >
                  <Video className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Courses</span>
                </button>
              )}
              <ThemeToggle theme={theme} resolvedTheme={resolvedTheme} setTheme={setTheme} />
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all shadow-sm shadow-indigo-600/25 cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile / Tablet Right Bar: Theme Toggle & Hamburger */}
            <div className="flex xl:hidden items-center gap-2">
              <ThemeToggle theme={theme} resolvedTheme={resolvedTheme} setTheme={setTheme} />
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
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
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
                    <div className="flex items-center gap-2">
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
