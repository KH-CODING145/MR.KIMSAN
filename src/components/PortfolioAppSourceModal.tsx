import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Download, FileCode, Code2, Sparkles, FolderTree } from 'lucide-react';

interface PortfolioAppSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PORTFOLIO_FILES = [
  {
    name: 'src/App.tsx',
    lang: 'typescript',
    size: '3.8 KB',
    description: 'Main App layout, theme orchestration, IntersectionObserver and dynamic SEO metadata synchronization.',
    code: `import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects, { ProjectItem } from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import PortfolioSkeleton from './components/PortfolioSkeleton';
import { useTheme } from './hooks/useTheme';
import { useMetaManager } from './hooks/useMetaManager';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { portfolio } from './data/portfolio.js';

export default function App() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // IntersectionObserver API hook to automatically track visible section as user scrolls
  const [activeSection, setActiveSection] = useIntersectionObserver(SECTION_IDS, {
    rootMargin: '-80px 0px -35% 0px',
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    defaultSection: 'home',
  });

  // Dynamic Meta-Tag Manager & Schema.org JSON-LD graph generator
  useMetaManager({ activeSection, activeProject });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar brandName={portfolio.brand} personalName={portfolio.personal.name} />
      <Hero personal={portfolio.personal} social={portfolio.social} />
      <Projects projects={portfolio.projects} />
      <Contact personal={portfolio.personal} social={portfolio.social} />
      <Footer brandName={portfolio.brand} personalName={portfolio.personal.name} />
    </div>
  );
}`
  },
  {
    name: 'src/utils/seo.ts',
    lang: 'typescript',
    size: '4.2 KB',
    description: 'Dynamic OpenGraph, Twitter Card, and Schema.org JSON-LD structured data engine.',
    code: `export interface SectionSeoConfig {
  section: string;
  title: string;
  description: string;
  keywords: string;
}

export const SECTION_SEO_MAP: Record<string, SectionSeoConfig> = {
  home: {
    section: 'home',
    title: 'PRO DIGITAL — Full-Stack Developer & BUILD SOFTWARE WITH AI',
    description: 'Professional portfolio of PRO DIGITAL by Mr.KIM SAN, a Full-Stack Developer engineering modern web applications and building intelligent software solutions with AI.',
    keywords: 'PRO DIGITAL, Mr.KIM SAN, Full-Stack Developer, Build Software with AI, AI Software Engineering, Gemini, React, TypeScript',
  }
};

export function updateDocumentSeo(config: SectionSeoConfig): void {
  document.title = config.title;
  // Dynamic OpenGraph & Meta Tag Mutator
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', config.description);
}`
  },
  {
    name: 'src/index.css',
    lang: 'css',
    size: '2.5 KB',
    description: 'Tailwind CSS v4 setup, Pervitina Dex & A4 Speed font-face configurations, and custom styling.',
    code: `@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@font-face {
  font-family: 'Pervitina Dex';
  src: url('/fonts/PervitinaDex.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'A4 Speed';
  src: url('/fonts/A4Speed.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@theme {
  --font-name: 'Pervitina Dex', system-ui, sans-serif;
  --font-display: 'Pervitina Dex', system-ui, sans-serif;
  --font-typing: 'A4 Speed', system-ui, sans-serif;
}

.font-name {
  font-family: 'Pervitina Dex', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: 0.04em;
}

.font-typing {
  font-family: 'A4 Speed', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: 0.05em;
}`
  }
];

export default function PortfolioAppSourceModal({ isOpen, onClose }: PortfolioAppSourceModalProps) {
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const file = PORTFOLIO_FILES[selectedFileIdx];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(file.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([file.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name.split('/').pop() || 'code.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-100 z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Portfolio Architecture & Source Code</h3>
                <p className="text-xs text-slate-400">
                  Inspect the clean React 19, TypeScript, and Tailwind CSS code behind this portfolio.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-60 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/50 p-3 space-y-1">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 px-2 py-1 flex items-center gap-1.5">
                <FolderTree className="w-3.5 h-3.5" />
                <span>Source Files</span>
              </div>
              {PORTFOLIO_FILES.map((f, i) => (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => setSelectedFileIdx(i)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-mono transition-colors ${
                    selectedFileIdx === i
                      ? 'bg-indigo-600/25 text-indigo-300 border border-indigo-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{f.name.split('/').pop()}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{f.size}</span>
                </button>
              ))}
            </div>

            {/* Code view */}
            <div className="flex-1 bg-slate-950 p-4 overflow-y-auto flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 mb-3">
                <span className="font-mono text-indigo-400">{file.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-x-auto font-mono text-xs leading-5 select-text text-slate-200">
                {file.code.split('\n').map((line, idx) => (
                  <div key={idx} className="flex hover:bg-slate-900/50 px-1 rounded">
                    <span className="w-8 text-right pr-3 text-slate-600 select-none">{idx + 1}</span>
                    <span className="whitespace-pre">{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Engineered with React 19 + TypeScript + Tailwind CSS</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
