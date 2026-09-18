import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects, { ProjectItem } from './components/Projects';
import Courses from './components/Courses';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import PortfolioSkeleton from './components/PortfolioSkeleton';
import PortfolioAppSourceModal from './components/PortfolioAppSourceModal';
import ResumeModal from './components/ResumeModal';
import CourseLearningModal from './components/CourseLearningModal';
import { useTheme } from './hooks/useTheme';
import { useMetaManager } from './hooks/useMetaManager';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { portfolio } from './data/portfolio.js';

const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'services',
  'projects',
  'learning',
  'experience',
  'education',
  'contact',
];

export default function App() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPortfolioSourceOpen, setIsPortfolioSourceOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>();
  const [selectedLessonId, setSelectedLessonId] = useState<string | undefined>();

  // Open course modal helper
  const handleOpenCourseModal = (courseId?: string, lessonId?: string) => {
    setSelectedCourseId(courseId);
    setSelectedLessonId(lessonId);
    setIsCourseModalOpen(true);
  };

  // Open course modal if hash indicates #courses or #learning-modal
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#learning-studio' || hash.startsWith('#course-player')) {
      setIsCourseModalOpen(true);
    }
  }, []);

  // Initialize data and allow components to mount before dismissing skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // IntersectionObserver API hook to automatically track visible section as user scrolls
  const [activeSection, setActiveSection] = useIntersectionObserver(SECTION_IDS, {
    rootMargin: '-80px 0px -35% 0px',
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    defaultSection: 'home',
  });

  // Dynamic Meta-Tag Manager & Schema.org JSON-LD graph generator (updates <head> automatically)
  useMetaManager({
    activeSection,
    activeProject,
  });

  return (
    <>
      {/* Loading Skeleton Screen */}
      <AnimatePresence>
        {isLoading && <PortfolioSkeleton key="portfolio-skeleton" />}
      </AnimatePresence>

      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300 flex flex-col font-sans">
      {/* Sticky Navbar with Active Section Sync */}
      <Navbar
        theme={theme}
        resolvedTheme={resolvedTheme}
        setTheme={setTheme}
        personalName={portfolio.personal.name}
        brandName={portfolio.brand || 'PRO DIGITAL'}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onOpenSourceModal={() => setIsPortfolioSourceOpen(true)}
        onOpenCourseModal={() => handleOpenCourseModal()}
      />

      {/* Main Content Areas */}
      <main id="main-content" className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          personal={portfolio.personal}
          social={portfolio.social}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenCourseModal={() => handleOpenCourseModal()}
        />

        {/* 2. About Section */}
        <About
          personal={portfolio.personal}
          about={portfolio.about}
          statistics={portfolio.statistics}
        />

        {/* 3. Skills Section */}
        <Skills skills={portfolio.skills as any} />

        {/* 4. Services Section */}
        <Services services={portfolio.services} />

        {/* 5. Projects Section with Active Project Tracking */}
        <Projects
          projects={portfolio.projects as ProjectItem[]}
          selectedProject={activeProject}
          onSelectProject={setActiveProject}
        />

        {/* 6. Course & Video Lessons Section */}
        <Courses onOpenCourseModal={handleOpenCourseModal} />

        {/* 7. Experience Section */}
        <Experience experience={portfolio.experience} />

        {/* 8. Education Section */}
        <Education
          education={portfolio.education}
          onOpenCourseModal={() => handleOpenCourseModal()}
        />

        {/* 9. Contact Section */}
        <Contact personal={portfolio.personal} social={portfolio.social} />
      </main>

      {/* Footer */}
      <Footer
        personal={portfolio.personal}
        social={portfolio.social}
        brandName={portfolio.brand || 'PRO DIGITAL'}
      />

      {/* Floating 'Back to Top' Button */}
      <BackToTop
        targetSectionId="home"
        onScrollToTop={() => setActiveSection('home')}
      />

      {/* Portfolio Source Code Modal */}
      <PortfolioAppSourceModal
        isOpen={isPortfolioSourceOpen}
        onClose={() => setIsPortfolioSourceOpen(false)}
      />

      {/* Resume / CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Online Course & Video Lessons Studio Modal */}
      <CourseLearningModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        initialCourseId={selectedCourseId}
        initialLessonId={selectedLessonId}
      />
    </div>
    </>
  );
}


