import { motion, useReducedMotion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  location?: string;
  description: string[];
  technologies: string[];
}

interface ExperienceProps {
  experience: ExperienceItem[];
}

export default function Experience({ experience }: ExperienceProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-20 lg:py-28 relative" aria-label="Work Experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Professional Experience
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
            Track record of shipping mission-critical web software and leading architectural improvements across teams.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central spine line (left-aligned on mobile, centered on large if preferred; left-spine is much cleaner & responsive) */}
          <div className="absolute top-4 bottom-4 left-4 sm:left-8 w-0.5 bg-slate-200 dark:bg-slate-800" />

          <div className="space-y-12">
            {experience.map((item, index) => (
              <motion.div
                key={item.company + item.period}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative flex items-start pl-10 sm:pl-16 group"
              >
                {/* Timeline node icon */}
                <div className="absolute left-2 sm:left-6 -translate-x-1/2 mt-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-950 border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center shadow-md group-hover:scale-125 transition-transform duration-200 z-10">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                </div>

                {/* Experience Card */}
                <div className="w-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-500/40 dark:hover:border-indigo-500/40 hover:shadow-md transition-all duration-200">
                  {/* Top Meta Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.position}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {item.company}
                        </span>
                        {item.location && (
                          <>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-medium self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 mb-6 text-sm text-slate-600 dark:text-slate-300">
                    {item.description.map((point, pIndex) => (
                      <li key={pIndex} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies tags */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 mr-2">
                      Stack:
                    </span>
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
