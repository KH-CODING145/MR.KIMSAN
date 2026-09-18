import { motion, useReducedMotion } from 'motion/react';
import { GraduationCap, Award, Calendar, BookOpen, Video, Play, ArrowRight } from 'lucide-react';

interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  period: string;
  description: string;
  achievements?: string[];
}

interface EducationProps {
  education: EducationItem[];
  onOpenCourseModal?: () => void;
}

export default function Education({ education, onOpenCourseModal }: EducationProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="education" className="py-20 lg:py-28 relative bg-slate-100/50 dark:bg-slate-900/30" aria-label="Education and Certifications">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
            Academic Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Education &amp; Credentials
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
            Foundational computer science principles and advanced professional engineering accreditations.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.map((item, index) => (
            <motion.div
              key={item.institution + item.degree}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.degree}
                </h3>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">
                  {item.field}
                </p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                  {item.institution}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {item.achievements && item.achievements.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Distinctions
                  </span>
                  {item.achievements.map((ach) => (
                    <div key={ach} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Online Video Lessons Callout */}
        {onOpenCourseModal && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="mt-12 max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/60 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Continuous Learning &amp; Video Hub (វីដេអូមេរៀនអនឡាញ)
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  Explore practical developer masterclasses in React 19, Laravel 11, Node.js, and Python AI automation.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenCourseModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Video Lessons</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
