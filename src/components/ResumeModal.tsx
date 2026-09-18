import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, Copy, Check, Mail, Phone, MapPin, Briefcase, GraduationCap, Sparkles, Languages } from 'lucide-react';
import { portfolio } from '../data/portfolio.js';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    const summaryText = `${portfolio.personal.name} — ${portfolio.personal.title}
Email: ${portfolio.personal.email} | Phone: ${portfolio.personal.phone} | Location: ${portfolio.personal.location}

SUMMARY:
${portfolio.personal.description}

CORE SKILLS:
React, TypeScript, Next.js, Node.js, Laravel, Python, Gemini AI, PostgreSQL, Docker, Tailwind CSS.

EXPERIENCE:
${portfolio.experience.map((e) => `${e.position} @ ${e.company} (${e.period})\n- ${e.description.join('\n- ')}`).join('\n\n')}

EDUCATION:
${portfolio.education.map((ed) => `${ed.degree} - ${ed.institution} (${ed.period})`).join('\n')}
`;
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
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
          className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-900 dark:text-slate-100 z-10"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">COURSE / LEARNING &amp; Curriculum Vitae</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all border border-slate-200 dark:border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all border border-slate-200 dark:border-slate-700"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <a
                href="/resume.pdf"
                download="Mr_KIM_SAN_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Header / Identity */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {portfolio.personal.name}
                  </h1>
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {portfolio.personal.title}
                  </p>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{portfolio.personal.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{portfolio.personal.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{portfolio.personal.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
                {portfolio.personal.description}
              </p>
            </div>

            {/* Core Competencies */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Core Competencies & Stack</span>
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'React 19',
                  'TypeScript',
                  'Node.js',
                  'Laravel',
                  'Gemini AI & LLMs',
                  'PostgreSQL',
                  'MySQL',
                  'Docker',
                  'Tailwind CSS',
                  'REST APIs',
                  'CI/CD Pipelines',
                  'WebRTC',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold mb-4 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Work Experience</span>
              </h2>
              <div className="space-y-4">
                {portfolio.experience.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.position}
                      </h3>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {item.period}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 block mb-2">
                      {item.company} &bull; {item.location}
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                      {item.description.map((point, pIdx) => (
                        <li key={pIdx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold mb-3 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education & Certifications</span>
              </h2>
              <div className="space-y-3">
                {portfolio.education.map((edu, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{edu.institution}</p>
                    </div>
                    <span className="text-xs font-mono text-slate-500">{edu.period}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            {portfolio.languages && (
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold mb-3 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5" />
                  <span>Languages Proficiency</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {portfolio.languages.map((lang, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-center">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">{lang.name}</span>
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 block">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs text-slate-500">
            <span>Mr. KIM SAN &bull; Full-Stack & AI Software Developer</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
